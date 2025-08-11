import React from "react";
import { Button } from "@/components/ui/button";
import { Mail, Download } from "lucide-react";
import contactJson from "@/data/contact.json";

export default function ContactCTA({ email, cvUrl }: { email: string; cvUrl: string }) {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 pb-16">
      <div className="rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 bg-[var(--brand-soft)] dark:bg-slate-900">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div className="text-xl md:text-2xl font-semibold">{contactJson.ctaText}</div>
          <div className="md:ml-auto flex gap-3">
            <Button asChild className="bg-[var(--brand)] hover:opacity-90">
              <a href={`mailto:${email}`}>
                <Mail className="mr-2 h-4 w-4" /> {contactJson.emailButtonLabel}
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={cvUrl} download>
                <Download className="mr-2 h-4 w-4" /> {contactJson.cvButtonLabel}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
