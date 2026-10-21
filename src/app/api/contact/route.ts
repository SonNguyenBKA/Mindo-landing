import { NextResponse } from "next/server";
import { AGENCY_SUBJECT, contactSchema, toFieldErrors } from "@/lib/contact-schema";

/** Chặn spam thô: giới hạn số lần gửi theo IP trong một khoảng thời gian. */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 phút

/**
 * Bộ đếm nằm trong RAM của tiến trình. Đủ cho một server đơn lẻ; nếu chạy
 * nhiều instance hoặc trên serverless thì cần chuyển sang Redis/KV.
 */
const hits = new Map<string, { count: number; resetAt: number }>();

/** Còn lượt gửi hay không. Chỉ đọc, không tính thêm lượt. */
function hasQuota(ip: string): boolean {
  const entry = hits.get(ip);
  if (!entry || Date.now() > entry.resetAt) return true;
  return entry.count < RATE_LIMIT_MAX;
}

/**
 * Ghi nhận một lượt gửi.
 *
 * Chỉ gọi sau khi dữ liệu đã hợp lệ: nếu tính cả những lần điền sai thì người
 * dùng gõ sai vài lần là bị chặn oan, dù chưa gửi được tin nào.
 */
function recordHit(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return;
  }
  entry.count += 1;
}

/** Dọn các bản ghi đã hết hạn để Map không phình mãi. */
function sweep() {
  const now = Date.now();
  for (const [ip, entry] of hits) {
    if (now > entry.resetAt) hits.delete(ip);
  }
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  sweep();

  if (!hasQuota(ip)) {
    return NextResponse.json(
      {
        ok: false,
        message: "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau ít phút.",
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Dữ liệu gửi lên không hợp lệ." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Vui lòng kiểm tra lại các trường được đánh dấu.",
        fieldErrors: toFieldErrors(parsed.error),
      },
      { status: 422 },
    );
  }

  const { name, email, subject, message, phone } = parsed.data;

  // Dữ liệu đã hợp lệ -> giờ mới trừ lượt
  recordHit(ip);

  /*
   * Chuyển về API Mindo (bảng "Liên hệ từ website", Marketing xử lý trong admin).
   * Cấu hình bằng biến môi trường, không ghi cứng: MINDO_API_URL và WEBSITE_LEAD_SECRET
   * (mã bí mật dùng chung với API). Thiếu cấu hình thì báo lỗi thật — không giả vờ đã nhận.
   */
  const apiUrl = process.env.MINDO_API_URL?.replace(/\/$/, "");
  const secret = process.env.WEBSITE_LEAD_SECRET;
  if (!apiUrl || !secret) {
    console.error("[contact] chưa cấu hình MINDO_API_URL / WEBSITE_LEAD_SECRET");
    return NextResponse.json(
      { ok: false, message: "Chưa gửi được lúc này. Vui lòng thử lại sau ít phút." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(`${apiUrl}/api/v1/public/website-leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-website-secret": secret },
      body: JSON.stringify({
        kind: subject === AGENCY_SUBJECT ? "AGENCY" : "CONTACT",
        name,
        email,
        phone: phone || undefined,
        subject,
        message,
        ip: ip === "unknown" ? undefined : ip.slice(0, 64),
        user_agent: request.headers.get("user-agent")?.slice(0, 300) || undefined,
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
  } catch (error) {
    console.error("[contact] gửi về API thất bại", error);
    return NextResponse.json(
      { ok: false, message: "Chưa gửi được lúc này. Vui lòng thử lại sau ít phút." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "Đã nhận yêu cầu của bạn. Đội ngũ Mindo sẽ phản hồi qua email trong 24 giờ làm việc.",
  });
}
