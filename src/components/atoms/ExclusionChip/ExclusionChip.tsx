import React from "react";
import { X } from "lucide-react";
import { servicesStyles as ss } from "@/src/styles/services";

interface ExclusionChipProps {
  key?: React.Key;
  label: string;
}

export default function ExclusionChip({ label }: ExclusionChipProps) {
  return (
    <div className={ss.exclusionChip}>
      <X className={ss.exclusionIcon} /> {label}
    </div>
  );
}
