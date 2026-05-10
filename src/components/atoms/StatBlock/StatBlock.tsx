import { successStyles as xs } from "@/src/styles/success";

interface StatBlockProps {
  value: string;
  label: string;
}

export default function StatBlock({ value, label }: StatBlockProps) {
  return (
    <div className="text-right">
      <p className={xs.statValue}>{value}</p>
      <p className={xs.statLabel}>{label}</p>
    </div>
  );
}
