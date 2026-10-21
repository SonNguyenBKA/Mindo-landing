import { ContactForm } from "./ContactForm";

export function ContactFormSection() {
  return (
    <section
      id="gui-tin-nhan"
      className="contact-surface bg-space text-snow pb-24 scroll-below-header"
    >
      {/* Nối liền phần đầu trang (cùng nền): một đường mảnh ngăn, không thêm khối mới */}
      <div className="container-mindo grid items-start gap-10 border-t border-white/10 pt-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20 lg:pt-16">
        <div>
          <p className="section-label text-haze">Gửi tin nhắn</p>
          <h2 className="section-title">Mindo lắng nghe.</h2>
          <p className="section-description text-haze">
            Chia sẻ điều bạn cần hỗ trợ. Đội ngũ Mindo sẽ phản hồi qua địa chỉ
            email trong biểu mẫu.
          </p>
          <dl className="mt-10 grid gap-6">
            <div className="border-t border-white/15 pt-5">
              <dt className="text-sm font-medium">Giờ làm việc</dt>
              <dd className="mt-2 text-sm leading-6 text-haze">
                T2 – T7, 8:30 – 18:00 (GMT+7)
              </dd>
            </div>
            <div className="border-t border-white/15 pt-5">
              <dt className="text-sm font-medium">Dữ liệu của bạn</dt>
              <dd className="mt-2 text-sm leading-6 text-haze">
                Chỉ dùng để xử lý yêu cầu này.
              </dd>
            </div>
          </dl>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
