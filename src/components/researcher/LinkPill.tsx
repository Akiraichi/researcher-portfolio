import React from "react";
import { Link as LinkIcon } from "lucide-react";

export default function LinkPill({
  href,
  children,
}: React.PropsWithChildren<{ href: string }>) {
  return (
    <a
      className="inline-flex items-center gap-1 text-sm px-2 py-1 rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <LinkIcon className="h-3.5 w-3.5" /> {children}
    </a>
  );
}
