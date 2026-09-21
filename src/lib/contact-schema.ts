import { z } from "zod";

/** Các chủ đề cho phép chọn — phải khớp với nhóm phụ trách ở section "Kênh liên hệ". */
export const SUBJECTS = [
  "Hỗ trợ tài khoản",
  "Mindo Peer & đại lý",
  "Bộ sưu tập Mindo và giao dịch",
  "Hợp tác kinh doanh",
  "Khác",
] as const;

/**
 * Schema dùng chung cho cả client và server.
 *
 * Client validate để phản hồi ngay cho người dùng; server validate lại vì
 * request nào cũng có thể bị sửa hoặc gọi trực tiếp, không qua form.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Vui lòng nhập họ và tên (ít nhất 2 ký tự).")
    .max(100, "Họ và tên quá dài."),
  email: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập email.")
    .email("Email chưa đúng định dạng.")
    .max(200, "Email quá dài."),
  subject: z.enum(SUBJECTS, { message: "Vui lòng chọn một chủ đề." }),
  message: z
    .string()
    .trim()
    .min(10, "Vui lòng mô tả rõ hơn (ít nhất 10 ký tự).")
    .max(4000, "Nội dung quá dài (tối đa 4000 ký tự)."),
  consent: z.literal(true, {
    message: "Bạn cần đồng ý để Mindo liên hệ lại.",
  }),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Lỗi theo từng trường, dùng để hiển thị dưới ô nhập tương ứng. */
export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;

/** Gom lỗi của Zod thành dạng `{ tên trường: thông báo đầu tiên }`. */
export function toFieldErrors(error: z.ZodError): ContactFieldErrors {
  const out: ContactFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof ContactInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
