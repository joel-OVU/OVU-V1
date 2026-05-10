import { faq } from "@/src/content/en";
import { faqStyles as qs } from "@/src/styles/faq";
import FaqCard from "@/src/components/molecules/FaqCard/FaqCard";

export default function FaqSection() {
  return (
    <section id="faq" className={qs.section}>
      <div className={qs.container}>
        <h2 className={qs.title}>{faq.title}</h2>
        <div className={qs.list}>
          {faq.items.map((item, i) => (
            <FaqCard key={i} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
