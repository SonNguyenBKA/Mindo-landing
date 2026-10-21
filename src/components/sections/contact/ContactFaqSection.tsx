import { ContactFaq } from "./ContactFaq";

export function ContactFaqSection() {
  return (
    <section className="bg-mist text-ink section-pad">
      <div className="container-mindo">
        <h2 className="section-title text-center">Câu hỏi thường gặp</h2>
        <ContactFaq />
      </div>
    </section>
  );
}
