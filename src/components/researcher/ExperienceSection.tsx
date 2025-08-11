import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export interface Experience {
  title: string;
  org: string;
  period: string;
  bullets: string[];
}

export default function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
        <GraduationCap className="h-6 w-6" /> Experience & Education
      </h2>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {experiences.map((e, i) => (
          <Card key={i} className="group/card border-slate-200 dark:border-slate-800 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-lg">{e.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-slate-600 dark:text-slate-300">{e.org}</div>
              <div className="text-sm text-slate-500">{e.period}</div>
              <ul className="list-disc ml-5 text-sm space-y-1 text-slate-700 dark:text-slate-300">
                {e.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
