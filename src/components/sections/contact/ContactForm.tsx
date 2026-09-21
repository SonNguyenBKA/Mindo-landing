"use client";

import { useId, useState } from "react";
import {
  SUBJECTS,
  contactSchema,
  toFieldErrors,
  type ContactFieldErrors,
} from "@/lib/contact-schema";
import { ArrowRightIcon, Button } from "@/components/ui/Button";
import { ChevronDownIcon } from "@/components/ui/Icons";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent"; message: string }
  | { kind: "error"; message: string };

const FIELD_BASE =
  "w-full rounded-xl border border-haze/22 bg-white/5 px-4 text-[15px] leading-[22px] text-snow " +
  "placeholder:text-[#7a92b0] transition-colors outline-none " +
  "focus:border-lime/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-lime/20";

export function ContactForm() {
  const uid = useId();
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<ContactFieldErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Giữ tham chiếu tới form ngay lúc này: sau `await` đầu tiên,
    // `event.currentTarget` đã bị React trả về null.
    const form = event.currentTarget;

    const data = new FormData(form);
    const candidate = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
      // Checkbox không được tick thì FormData không có key này
      consent: data.get("consent") === "on",
    };

    // Validate ở client trước để báo lỗi ngay, không cần chờ mạng
    const parsed = contactSchema.safeParse(candidate);
    if (!parsed.success) {
      setErrors(toFieldErrors(parsed.error));
      setStatus({ kind: "idle" });
      return;
    }

    setErrors({});
    setStatus({ kind: "sending" });

    type ApiResponse = {
      ok: boolean;
      message?: string;
      fieldErrors?: ContactFieldErrors;
    };

    let payload: ApiResponse;
    let httpOk: boolean;

    // Chỉ bọc riêng phần gọi mạng. Nếu bọc cả đoạn xử lý phía sau thì một lỗi
    // lập trình bất kỳ cũng bị báo thành "lỗi kết nối" — sai và khó lần ra.
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      httpOk = res.ok;
      payload = (await res.json()) as ApiResponse;
    } catch {
      setStatus({
        kind: "error",
        message:
          "Không kết nối được tới máy chủ. Kiểm tra mạng rồi thử lại, hoặc email trực tiếp cho hotro@mindo.vn.",
      });
      return;
    }

    if (!httpOk || !payload.ok) {
      if (payload.fieldErrors) setErrors(payload.fieldErrors);
      setStatus({
        kind: "error",
        message: payload.message ?? "Gửi không thành công. Vui lòng thử lại.",
      });
      return;
    }

    setStatus({ kind: "sent", message: payload.message ?? "Đã gửi." });
    form.reset();
  }

  const sending = status.kind === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex w-full flex-col gap-4.5 rounded-[20px] border border-haze/18 bg-white/5 p-6 shadow-[0_0_36px_0_rgb(180_208_1/0.1),0_20px_44px_-8px_rgb(0_0_0/0.4)] backdrop-blur-sm sm:p-8"
    >
      {/* Họ tên + email */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Field
          id={`${uid}-name`}
          label="Họ và tên"
          error={errors.name}
          className="flex-1"
        >
          <input
            id={`${uid}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Nguyễn Văn A"
            aria-invalid={!!errors.name}
            className={`${FIELD_BASE} h-[50px]`}
          />
        </Field>

        <Field
          id={`${uid}-email`}
          label="Email"
          error={errors.email}
          className="flex-1"
        >
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="ban@congty.vn"
            aria-invalid={!!errors.email}
            className={`${FIELD_BASE} h-[50px]`}
          />
        </Field>
      </div>

      {/* Chủ đề */}
      <Field id={`${uid}-subject`} label="Chủ đề" error={errors.subject}>
        <div className="relative">
          <select
            id={`${uid}-subject`}
            name="subject"
            defaultValue={SUBJECTS[0]}
            aria-invalid={!!errors.subject}
            className={`${FIELD_BASE} h-[50px] cursor-pointer appearance-none pr-11`}
          >
            {SUBJECTS.map((s) => (
              // `text-ink` để chữ trong danh sách mở ra vẫn đọc được
              <option key={s} value={s} className="text-ink">
                {s}
              </option>
            ))}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-haze" />
        </div>
      </Field>

      {/* Nội dung */}
      <Field id={`${uid}-message`} label="Nội dung" error={errors.message}>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={5}
          placeholder="Mô tả ngắn gọn việc bạn cần — kèm mã giao dịch hoặc số seri Peer nếu có."
          aria-invalid={!!errors.message}
          className={`${FIELD_BASE} min-h-32 resize-y py-3.5`}
        />
      </Field>

      {/* Đồng ý */}
      <div>
        <label className="flex cursor-pointer items-start gap-2.5">
          <input
            type="checkbox"
            name="consent"
            aria-invalid={!!errors.consent}
            className="mt-0.5 size-5 shrink-0 cursor-pointer appearance-none rounded-md border border-haze/35 bg-white/5 transition-colors checked:border-lime checked:bg-lime focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime
              checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22none%22 stroke=%22%2308182f%22 stroke-width=%222.6%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22m5 10.5 3.2 3.2L15 6.6%22/></svg>')] checked:bg-center checked:bg-no-repeat"
          />
          <span className="text-[13px] leading-5 text-[#7a92b0]">
            Tôi đồng ý để Mindo dùng thông tin này liên hệ lại về đúng yêu cầu
            trên.
          </span>
        </label>
        {errors.consent ? (
          <p className="mt-1.5 text-[12px] leading-4 text-[#fca5a5]">
            {errors.consent}
          </p>
        ) : null}
      </div>

      {/* Nút gửi */}
      <Button
        type="submit"
        variant="lime-glow"
        size="lg"
        disabled={sending}
        className="w-full text-[15px] disabled:cursor-not-allowed"
      >
        {sending ? (
          <>
            <Spinner />
            Đang gửi…
          </>
        ) : (
          <>
            Gửi tin nhắn
            <ArrowRightIcon className="size-4" />
          </>
        )}
      </Button>

      {/* Thông báo kết quả — `role=status` để trình đọc màn hình đọc lên */}
      <div role="status" aria-live="polite">
        {status.kind === "sent" ? (
          <p className="flex items-start gap-2 rounded-xl border border-lime/30 bg-lime/10 px-4 py-3 text-[13px] leading-5 text-lime">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-lime" />
            {status.message}
          </p>
        ) : null}
        {status.kind === "error" ? (
          <p className="flex items-start gap-2 rounded-xl border border-[#f87171]/30 bg-[#f87171]/10 px-4 py-3 text-[13px] leading-5 text-[#fca5a5]">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#f87171]" />
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label
        htmlFor={id}
        className="text-[13px] leading-[18px] font-semibold text-haze"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-[12px] leading-4 text-[#fca5a5]">{error}</p>
      ) : null}
    </div>
  );
}

function Spinner() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 animate-spin"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeOpacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
