import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Download, Mail, Github, Linkedin, BookOpen } from "lucide-react";

interface Profile {
  name: string;
  title: string;
  affiliation: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  cvUrl: string;
}

export default function HeroSection({ profile }: { profile: Profile }) {
  const PROFILE = profile;
  return (
    <section className="relative">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="h-64 bg-[var(--brand-soft)] dark:bg-slate-900" />
      </div>
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-[1fr,1.2fr] gap-8 items-center"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              {PROFILE.name}
            </h1>
            <p className="mt-3 text-lg text-slate-700 dark:text-slate-300">
              {PROFILE.title}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-slate-600 dark:text-slate-400">
              <MapPin className="h-4 w-4" />
              <span>
                {PROFILE.affiliation} • {PROFILE.location}
              </span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="bg-[var(--brand)] hover:opacity-90">
                <a href={PROFILE.cvUrl} download>
                  <Download className="mr-2 h-4 w-4" /> Download CV
                </a>
              </Button>
              <Button variant="secondary" asChild>
                <a href={`mailto:${PROFILE.email}`}>
                  <Mail className="mr-2 h-4 w-4" /> Contact
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={PROFILE.github} target="_blank" rel="noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                </a>
              </Button>
            </div>
          </div>
          <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" /> Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc ml-5 space-y-2 text-slate-700 dark:text-slate-300">
                <li>Focus: quantum kernels, EQS, measurement-based learning.</li>
                <li>Goal: sample-efficient, stable training beyond barren plateaus.</li>
                <li>Tooling: Python, Qiskit, PennyLane, Rust for performance.</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
