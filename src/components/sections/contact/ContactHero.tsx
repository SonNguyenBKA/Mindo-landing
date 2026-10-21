import { OpenAgencyButton } from "@/components/agency/AgencyCta";
import { ArrowRightIcon } from "@/components/ui/Button";
import { Glow } from "@/components/bg/Glow";
import { CalendarIcon, ChatIcon, IdCardIcon } from "@/components/ui/Icons";
import { ContactForm } from "./ContactForm";

const FACTS = [
  { label: "Phản hồi trong 24 giờ làm việc", value: "Tiếng Việt và tiếng Anh", Icon: ChatIcon },
  { label: "T2 – T7, 8:30 – 18:00", value: "Giờ Việt Nam (GMT+7)", Icon: CalendarIcon },
  { label: "Dữ liệu của bạn", value: "Chỉ dùng để xử lý yêu cầu này", Icon: IdCardIcon },
];

/**
 * Trang Liên hệ — một khối duy nhất (21/10/2026): bên trái tiêu đề, giới thiệu, vài
 * thông tin và lối sang popup đại lý; bên phải là form, thấy ngay ở màn đầu. Trước đây
 * phần đầu và phần form tách hai khối cùng nền, lặp tiêu đề.
 */
export function ContactHero() {
  return (
    <section
      id="gui-tin-nhan"
      className="contact-surface relative isolate overflow-hidden bg-space pt-32 pb-24 text-snow sm:pt-40 scroll-below-header"
    >
      {/* không khí: lime sau tiêu đề, xanh sau form */}
      <Glow color="#b4d001" size={520} opacity={0.1} blur={110} className="-top-40 -left-40 -z-10" />
      <Glow color="#4f86ff" size={640} opacity={0.16} blur={120} className="top-10 -right-48 -z-10" />
      {/* Điện thoại: tiêu đề → form → thông tin. Máy tính: tiêu đề và thông tin bên trái, form bên phải */}
      <div className="container-mindo grid items-start gap-x-20 gap-y-12 lg:grid-cols-[.9fr_1.1fr] lg:grid-rows-[auto_1fr]">
        <div className="lg:col-start-1 lg:row-start-1">
          <p className="section-label text-haze">Liên hệ với Mindo</p>
          <h1 className="text-[clamp(36px,4.5vw,56px)] leading-[1.15] font-medium tracking-[-0.035em]">
            Nói chuyện với
            <br />
            <span className="text-lime-soft">đội ngũ Mindo.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-haze">
            Cần hỗ trợ tài khoản, hợp tác hay có câu hỏi về Mindo? Gửi lời nhắn, đội ngũ Mindo sẽ phản hồi
            qua email.
          </p>
        </div>

        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <ContactForm />
        </div>

        <div className="lg:col-start-1 lg:row-start-2 lg:-mt-2">
          <ul className="grid max-w-md gap-3">
            {FACTS.map(({ label, value, Icon }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/[0.06] text-lime-soft ring-1 ring-white/10">
                  <Icon className="size-5" />
                </span>
                <span className="flex flex-col">
                  <b className="text-[15px] font-medium text-snow">{label}</b>
                  <span className="text-sm text-haze">{value}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* Mở đại lý đi qua popup riêng (có số điện thoại), không qua form này */}
          <OpenAgencyButton className="contact-agency-card mt-8">
            <span>
              <small>Muốn mở đại lý?</small>
              <b>Đăng ký đại lý Peer</b>
            </span>
            <i aria-hidden="true">
              <ArrowRightIcon />
            </i>
          </OpenAgencyButton>
        </div>
      </div>
    </section>
  );
}
