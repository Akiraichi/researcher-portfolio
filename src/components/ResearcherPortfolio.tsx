"use client";
import React, {useMemo, useState} from "react";
import {FileText} from "lucide-react";

// shadcn/ui（利用可能）
import {Separator} from "@/components/ui/separator";
import { Publication, Experience, Profile, TypeFilter } from "@/components/researcher/types";
import { useTheme } from "@/components/researcher/utils";
import HeaderBar from "@/components/researcher/HeaderBar";
import HeroSection from "@/components/researcher/HeroSection";
import PublicationsSection from "@/components/researcher/PublicationsSection";
import ExperienceSection from "@/components/researcher/ExperienceSection";
import AboutSection from "@/components/researcher/AboutSection";
import ContactCTA from "@/components/researcher/ContactCTA";
// -----------------------------------------------------
// データ: src/data/*.json を編集すると内容が更新されます
// -----------------------------------------------------
import profileJson from "@/data/profile.json";
import experiencesJson from "@/data/experiences.json";
import publicationsJson from "@/data/publications.json";
import newsJson from "@/data/news.json";



const PROFILE: Profile = profileJson as Profile;

// 経歴・学歴
const EXPERIENCES: Experience[] = experiencesJson as unknown as Experience[];

// 代表業績（ダミー）。ご自身の情報に置き換えてください
const PUBLICATIONS: Publication[] = publicationsJson as unknown as Publication[];

const NEWS: { date: string; text: string }[] = newsJson as { date: string; text: string }[];

// -----------------------------------------------------
// メインコンポーネント
// -----------------------------------------------------

export default function ResearcherPortfolio() {
    const {isDark, setIsDark, paletteName, setPaletteName} = useTheme();
    const [query, setQuery] = useState<string>("");
    const [typeFilter, setTypeFilter] = useState<TypeFilter>("All");
    const [yearFilter, setYearFilter] = useState<string>("All");
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const years = useMemo<string[]>(
        () => [
            "All",
            ...Array.from(new Set(PUBLICATIONS.map((p) => p.year)))
                .sort((a, b) => b - a)
                .map(String),
        ],
        []
    );

    const types: string[] = ["All", "Journal", "Conference", "Preprint"];

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return PUBLICATIONS.filter((p) => {
            const hitQ =
                !q ||
                p.title.toLowerCase().includes(q) ||
                p.authors.join(", ").toLowerCase().includes(q) ||
                p.venue.toLowerCase().includes(q) ||
                (p.tags || []).some((t) => t.toLowerCase().includes(q));
            const hitType = typeFilter === "All" || p.type === typeFilter;
            const hitYear = yearFilter === "All" || String(p.year) === String(yearFilter);
            return hitQ && hitType && hitYear;
        }).sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
    }, [query, typeFilter, yearFilter]);

    const onCopy = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 1500);
        } catch {
            // noop
        }
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            {/* アクセシビリティ：スキップリンク */}
            <a
                href="#content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 bg-[var(--brand)] text-white px-4 py-2 rounded-xl shadow"
            >
                Skip to content
            </a>

            {/* ヒーロー */}
            <HeaderBar
                profileName={PROFILE.name}
                isDark={isDark}
                setIsDark={setIsDark}
                paletteName={paletteName}
                setPaletteName={setPaletteName}
            />

            <main id="content">
                {/* Hero */}
                <HeroSection profile={PROFILE}/>

                <Separator className="my-8"/>

                {/* Publications */}
                <PublicationsSection
                    query={query}
                    setQuery={setQuery}
                    typeFilter={typeFilter}
                    setTypeFilter={(v) => setTypeFilter(v as TypeFilter)}
                    yearFilter={yearFilter}
                    setYearFilter={setYearFilter}
                    years={years}
                    types={types}
                    filtered={filtered}
                    copiedId={copiedId}
                    onCopy={onCopy}
                />

                <Separator className="my-10"/>

                {/* Experience & Education */}
                <ExperienceSection experiences={EXPERIENCES}/>

                <Separator className="my-10"/>

                {/* News / Updates */}
                <section id="news" className="max-w-6xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                        <FileText className="h-6 w-6"/> News
                    </h2>
                    {/* Timeline */}
                    <div className="relative mt-6">
                        {/* Vertical line */}
                        <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800" aria-hidden="true"/>
                        <ol className="space-y-6">
                            {([...NEWS]
                                .sort((a, b) => {
                                    const da = Date.parse(a.date);
                                    const db = Date.parse(b.date);
                                    if (isNaN(da) || isNaN(db)) return 0;
                                    return db - da;
                                }))
                                .map((n, i) => {
                                    let display = n.date;
                                    let dateTime = n.date;
                                    const ms = Date.parse(n.date);
                                    if (!isNaN(ms)) {
                                        const d = new Date(ms);
                                        display = new Intl.DateTimeFormat("ja-JP", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                        }).format(d);
                                        dateTime = d.toISOString().slice(0, 10);
                                    }
                                    return (
                                        <li key={i} className="relative pl-10 md:pl-12">
                                            {/* Dot */}
                                            <span className="absolute left-[0.625rem] top-2 h-3 w-3 rounded-full bg-[var(--primary)] ring-2 ring-white dark:ring-slate-950" aria-hidden="true"/>
                                            <div className="flex flex-wrap items-start gap-3">
                                                <time dateTime={dateTime} aria-label={`更新日 ${display}`} className="inline-flex items-center justify-center text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                                    {display}
                                                </time>
                                                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{n.text}</p>
                                            </div>
                                        </li>
                                    );
                                })}
                        </ol>
                    </div>
                </section>

                <Separator className="my-10"/>

                {/* About */}
                <AboutSection profile={PROFILE}/>

                <Separator className="my-10"/>

                {/* Contact CTA */}
                <ContactCTA email={PROFILE.email} cvUrl={PROFILE.cvUrl}/>
            </main>

            <footer className="py-8 border-t border-slate-200 dark:border-slate-800 text-sm text-center text-slate-500">
                © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
            </footer>
        </div>
    );
}