import React from "react";
import { FileText } from "lucide-react";

export interface NewsItem {
  date: string;
  text: string;
}

export default function NewsSection({ news }: { news: NewsItem[] }) {
  return (
    <section id="news" className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
        <FileText className="h-6 w-6" /> News
      </h2>
      <div className="mt-6 space-y-3">
        {news.map((n, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-3 rounded-xl border border-slate-200 dark:border-slate-800"
          >
            <div className="text-sm font-medium w-28 shrink-0 text-slate-500">
              {n.date}
            </div>
            <div className="text-slate-700 dark:text-slate-300">{n.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
