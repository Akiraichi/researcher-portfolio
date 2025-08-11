import React from "react";
import { Button } from "@/components/ui/button";
import PaletteSwitcher from "@/components/researcher/PaletteSwitcher";
import { Sun, Moon } from "lucide-react";
import { PaletteName } from "@/components/researcher/theme";

interface HeaderBarProps {
  profileName: string;
  isDark: boolean;
  setIsDark: (v: boolean) => void;
  paletteName: PaletteName;
  setPaletteName: (p: PaletteName) => void;
}

export default function HeaderBar({
  profileName,
  isDark,
  setIsDark,
  paletteName,
  setPaletteName,
}: HeaderBarProps) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 border-b border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[var(--brand)]" />
            <span className="font-semibold">{profileName}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:opacity-80">About</a>
            <a href="#publications" className="hover:opacity-80">Publications</a>
            <a href="#experience" className="hover:opacity-80">Experience</a>
            <a href="#news" className="hover:opacity-80">News</a>
            <a href="#contact" className="hover:opacity-80">Contact</a>
          </nav>
          <div className="flex items-center gap-2">
            <PaletteSwitcher paletteName={paletteName} setPaletteName={setPaletteName} />
            <Button
              variant="ghost"
              className="rounded-full"
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle color theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
