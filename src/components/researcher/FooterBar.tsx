import React from "react";

export default function FooterBar({ name }: { name: string }) {
  return (
    <footer className="py-8 border-t border-slate-200 dark:border-slate-800 text-sm text-center text-slate-500">
      © {new Date().getFullYear()} {name}. All rights reserved.
    </footer>
  );
}
