import type { LucideIcon } from "lucide-react";
import { contactStyles as cs } from "@/src/styles/contact";

interface BenefitItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function BenefitItem({ icon: Icon, title, description }: BenefitItemProps) {
  return (
    <div className={cs.benefitRow}>
      <div className={cs.benefitIcon}>
        <Icon className={cs.benefitIconInner} />
      </div>
      <div>
        <h4 className={cs.benefitTitle}>{title}</h4>
        <p className={cs.benefitDesc}>{description}</p>
      </div>
    </div>
  );
}
