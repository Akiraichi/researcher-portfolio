"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { PALETTES, PaletteName, PaletteDef } from "@/components/researcher/theme";

export default function PaletteSwitcher({
  paletteName,
  setPaletteName,
}: {
  paletteName: PaletteName;
  setPaletteName: (p: PaletteName) => void;
}) {
  const names = Object.keys(PALETTES) as PaletteName[];
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <Button
        variant="ghost"
        className="rounded-full"
        aria-label="Change accent color"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="palette-popover"
        onClick={() => setOpen((v) => !v)}
      >
        <Palette className="h-5 w-5" />
      </Button>

      {open && (
        <div
          id="palette-popover"
          role="menu"
          className="absolute left-0 mt-2 z-20 flex items-center gap-1 rounded-full bg-white dark:bg-slate-900 p-2 shadow border border-slate-200 dark:border-slate-700"
        >
          {names.map((key) => {
            const pal: PaletteDef = PALETTES[key];
            const isActive = paletteName === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setPaletteName(key);
                  setOpen(false);
                }}
                className={`h-5 w-5 rounded-full border border-slate-300 dark:border-slate-700 ${
                  isActive ? "ring-2 ring-offset-2 ring-[var(--brand)]" : ""
                }`}
                style={{ background: pal.base }}
                aria-label={`Use ${key} palette`}
                role="menuitemradio"
                aria-checked={isActive}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
