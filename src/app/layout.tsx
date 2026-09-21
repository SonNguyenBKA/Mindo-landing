import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = "https://mindo.vn";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mindo",
    template: "%s · Mindo",
  },
  description:
    "Mindo — nền tảng số thế hệ mới: trợ lý AI, nhắn tin và gọi video, tin tức thị trường và Mindo Peer trong chung một tài khoản.",
  keywords: [
    "Mindo",
    "trợ lý AI",
    "nhắn tin",
    "gọi video",
    "tin tức thị trường",
    "Mindo Peer",
    "ví Mindo",
  ],
  authors: [{ name: "Mindo Technology JSC" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: SITE_URL,
    siteName: "Mindo",
    title: "Mindo — AI trả lời. Nhắn tin, gọi điện. Xác lập sở hữu.",
    description:
      "Trợ lý AI, nhắn tin và gọi video, tin tức thị trường và Mindo Peer — chung một tài khoản.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mindo — AI trả lời. Nhắn tin, gọi điện. Xác lập sở hữu.",
    description:
      "Trợ lý AI, nhắn tin và gọi video, tin tức thị trường và Mindo Peer — chung một tài khoản.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#04122a",
  colorScheme: "dark",
};

/**
 * Khi JS bị tắt, không có GSAP để chạy reveal — nên bỏ hẳn trạng thái ẩn ban
 * đầu để nội dung vẫn đọc được.
 *
 * Dùng `<noscript>` thay vì script chặn render vì script sửa class của <html>
 * sẽ gây lệch hydration với React (server và client ra HTML khác nhau).
 */
const NOSCRIPT_CSS = `
html.mindo-motion [data-reveal] { opacity: 1 !important; }
html.mindo-motion [data-mask-line] > span { transform: none !important; }
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      // Next 16 không còn tự vô hiệu hoá `scroll-behavior: smooth` khi chuyển
      // route như bản 15. Thuộc tính này bật lại hành vi đó, để điều hướng
      // nhảy tức thì thay vì cuộn mượt qua cả trang.
      data-scroll-behavior="smooth"
      className={`${beVietnamPro.variable} mindo-motion antialiased`}
      /*
       * Extension trình duyệt hay gắn thêm class/thuộc tính vào <html> trước
       * khi React hydrate (dark-mode, dịch trang, quản lý mật khẩu...). Khi đó
       * React coi là hydration mismatch và **vứt bỏ toàn bộ phần server render
       * để dựng lại từ client** — chậm và nháy màn hình, dù chẳng có gì sai.
       *
       * Cờ này chỉ áp dụng cho chính thẻ <html>, không lan xuống phần tử con,
       * nên vẫn báo bình thường nếu component của mình lệch thật.
       */
      suppressHydrationWarning
    >
      <head>
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: NOSCRIPT_CSS }} />
        </noscript>
      </head>
      <body className="min-h-dvh bg-space text-snow">
        <SmoothScrollProvider />
        <a
          href="#noi-dung"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-lime focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-ink"
        >
          Tới nội dung chính
        </a>
        <Header />
        <main id="noi-dung">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
