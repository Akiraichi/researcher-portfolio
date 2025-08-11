import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Mail, Github, Linkedin } from "lucide-react";
import about from "@/data/about.json";

interface Profile {
  email: string;
  github: string;
  linkedin: string;
}

export default function AboutSection({ profile }: { profile: Profile }) {
  const PROFILE = profile;
  return (
    <section id="about" className="max-w-6xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
        <BookOpen className="h-6 w-6" /> About
      </h2>
      <div className="mt-4 grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-slate-200 dark:border-slate-800">
          <CardContent className="pt-6 leading-7 text-slate-700 dark:text-slate-300">
            {(about as { text: string }).text}
          </CardContent>
        </Card>
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-slate-700 dark:text-slate-300">
            <a className="flex items-center gap-2 hover:underline" href={`mailto:${PROFILE.email}`}>
              <Mail className="h-4 w-4" /> {PROFILE.email}
            </a>
            <a className="flex items-center gap-2 hover:underline" href={PROFILE.github} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a className="flex items-center gap-2 hover:underline" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
