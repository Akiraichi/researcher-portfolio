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
                    <div className="mt-6 space-y-3">
                        {NEWS.map((n, i) => (
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