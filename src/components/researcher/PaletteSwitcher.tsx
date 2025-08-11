import React from "react";
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

  return (
    <div className="relative">
      <div className="flex items-center gap-1">
        <Button variant="ghost" className="rounded-full" aria-label="Change accent color">
          <Palette className="h-5 w-5" />
        </Button>
        <div className="hidden sm:flex items-center gap-1">
          {names.map((key) => {
            const pal: PaletteDef = PALETTES[key];
            return (
              <button
                key={key}
                onClick={() => setPaletteName(key)}
                className={`h-5 w-5 rounded-full border border-slate-300 dark:border-slate-700 ${
                  paletteName === key ? "ring-2 ring-offset-2 ring-[var(--brand)]" : ""
                }`}
                style={{ background: pal.base }}
                aria-label={`Use ${key} palette`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
