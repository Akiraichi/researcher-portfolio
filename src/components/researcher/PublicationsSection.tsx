import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, Calendar, Filter as FilterIcon, Copy, Check } from "lucide-react";
import LinkPill from "@/components/researcher/LinkPill";
import Select from "@/components/researcher/Select";

interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: string;
  tags?: string[];
  links?: { arxiv?: string; pdf?: string; code?: string; doi?: string };
  bibtex: string;
}

interface Props {
  query: string;
  setQuery: (v: string) => void;
  typeFilter: string;
  setTypeFilter: (v: string) => void;
  yearFilter: string;
  setYearFilter: (v: string) => void;
  years: string[];
  types: string[];
  filtered: Publication[];
  copiedId: string | null;
  onCopy: (text: string, id: string) => void;
}

export default function PublicationsSection({
  query,
  setQuery,
  typeFilter,
  setTypeFilter,
  yearFilter,
  setYearFilter,
  years,
  types,
  filtered,
  copiedId,
  onCopy,
}: Props) {
  return (
    <section id="publications" className="max-w-6xl mx-auto px-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6" /> Publications
        </h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search title, author, tag..."
              className="pl-9 w-64"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={typeFilter}
              onChange={(v) => setTypeFilter(v)}
              label="Type"
              options={types}
              icon={<FilterIcon className="h-4 w-4" />}
            />
            <Select
              value={yearFilter}
              onChange={(v) => setYearFilter(v)}
              label="Year"
              options={years}
              icon={<Calendar className="h-4 w-4" />}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {filtered.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25 }}
          >
            <Card className="group/card h-full border-slate-200 dark:border-slate-800 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900">
              <CardHeader>
                <CardTitle className="text-base md:text-lg leading-snug">
                  {p.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  {p.authors.join(", ")}
                </div>
                <div className="text-sm text-slate-500">
                  <span className="font-medium">{p.venue}</span> • {p.year} • {p.type}
                </div>
                <div className="flex flex-wrap gap-2">
                  {(p.tags || []).map((t) => (
                    <Badge key={t} variant="secondary">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="group/buttons flex flex-wrap items-center gap-2 pt-1">
                  {p.links?.arxiv && <LinkPill href={p.links.arxiv}>arXiv</LinkPill>}
                  {p.links?.pdf && <LinkPill href={p.links.pdf}>PDF</LinkPill>}
                  {p.links?.doi && <LinkPill href={p.links.doi}>DOI</LinkPill>}
                  {p.links?.code && <LinkPill href={p.links.code}>Code</LinkPill>}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="ml-auto transition-colors group-hover/buttons:bg-slate-100 dark:group-hover/buttons:bg-slate-800 group-hover/buttons:text-slate-900 dark:group-hover/buttons:text-slate-100"
                    onClick={() => onCopy(p.bibtex, p.id)}
                  >
                    {copiedId === p.id ? (
                      <Check className="h-4 w-4 mr-1" />
                    ) : (
                      <Copy className="h-4 w-4 mr-1" />
                    )}
                    {copiedId === p.id ? "Copied" : "BibTeX"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
