import React from "react";

export default function Select({
  value,
  onChange,
  label,
  options,
  icon,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  options: string[];
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-slate-500 hidden sm:block">{icon}</div>
      <label className="sr-only">{label}</label>
      <select
        className="h-9 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
