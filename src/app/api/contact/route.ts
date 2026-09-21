import { NextResponse } from "next/server";
import { contactSchema, toFieldErrors } from "@/lib/contact-schema";

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

  const { name, email, subject, message } = parsed.data;

  // Dữ liệu đã hợp lệ -> giờ mới trừ lượt
  recordHit(ip);

  // TODO: nối vào kênh nhận thật — ví dụ Resend / SMTP / CRM / Slack webhook.
  //
  //   import { Resend } from "resend";
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "website@mindo.vn",
  //     to: subject === "Mindo Peer & đại lý" ? "peer@mindo.vn" : "hotro@mindo.vn",
  //     replyTo: email,
  //     subject: `[${subject}] ${name}`,
  //     text: message,
  //   });
  //
  // Hiện tại chỉ ghi log để không làm mất yêu cầu trong lúc chưa cấu hình.
  console.info("[contact] yêu cầu mới", {
    name,
    email,
    subject,
    length: message.length,
    ip,
    at: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    message:
      "Đã nhận yêu cầu của bạn. Đội ngũ Mindo sẽ phản hồi qua email trong 24 giờ làm việc.",
  });
}
