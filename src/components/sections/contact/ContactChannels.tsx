import { MailIcon, PeerIcon } from "@/components/ui/Icons";
import { ArrowRightIcon } from "@/components/ui/Button";

const CHANNELS = [
  {
    title: "Hỗ trợ tài khoản",
    desc: "Đăng nhập, xác minh, ví Mindo và lịch sử giao dịch.",
    email: "hotro@mindo.vn",
    Icon: MailIcon,
  },
  {
    title: "Mindo Peer & đại lý",
    desc: "Sở hữu Mindo Peer theo năm sinh, mở đại lý và giá đại lý.",
    email: "peer@mindo.vn",
    Icon: PeerIcon,
  },
];

export function ContactChannels() {
  return (
    <section className="bg-white text-ink section-pad">
      <div className="container-mindo grid gap-10 md:grid-cols-2">
        {CHANNELS.map(({ title, desc, email, Icon }) => (
          <article key={email} className="border-t border-line pt-6">
            <Icon className="size-7" />
            <h2 className="mt-6 text-2xl font-semibold">{title}</h2>
            <p className="mt-3 text-base leading-7 text-slate-dim">{desc}</p>
            <a className="text-link mt-5" href={`mailto:${email}`}>
              {email}
              <ArrowRightIcon />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
