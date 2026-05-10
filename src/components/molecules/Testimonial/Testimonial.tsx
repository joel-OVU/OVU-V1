import { contactStyles as cs } from "@/src/styles/contact";

interface TestimonialProps {
  quote: string;
  initials: string;
  name: string;
  role: string;
}

export default function Testimonial({ quote, initials, name, role }: TestimonialProps) {
  return (
    <div className={cs.testimonial}>
      {quote}
      <div className={cs.testimonialMeta}>
        <div className={cs.testimonialAvatar}>{initials}</div>
        <div>
          <p className={cs.testimonialName}>{name}</p>
          <p className={cs.testimonialRole}>{role}</p>
        </div>
      </div>
    </div>
  );
}
