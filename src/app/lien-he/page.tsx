import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/contact/ContactHero";
import { ContactFaqSection } from "@/components/sections/contact/ContactFaqSection";

export const metadata: Metadata = {
  title: "Liên hệ",
  description:
    "Liên hệ đội ngũ Mindo — hỗ trợ tài khoản, mua Mindo Peer theo giá đại lý. Phản hồi trong 24 giờ làm việc.",
  alternates: { canonical: "/lien-he" },
  openGraph: {
    title: "Liên hệ · Mindo",
    description:
      "Nói chuyện với đội ngũ Mindo — hỗ trợ tài khoản và Mindo Peer.",
    url: "/lien-he",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFaqSection />
    </>
  );
}
