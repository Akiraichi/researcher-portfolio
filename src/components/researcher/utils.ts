import { useEffect, useState } from "react";
import { PALETTES, PaletteName } from "./theme";

// Local storage state hook
export function useLocalStorage<T>(
  key: string,
  initial: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // Initialize with the provided initial value to keep SSR and first client render consistent
  const [value, setValue] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage after mount to avoid hydration mismatches
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
      if (raw != null) {
        setValue(JSON.parse(raw) as T);
      }
    } catch {
      // noop
    } finally {
      setLoaded(true);
    }
  }, [key]);

  // Persist to localStorage only after we loaded any existing value
  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // noop
    }
  }, [key, value, loaded]);

  return [value, setValue];
}

// Theme state and application hook
export function useTheme() {
  const [isDark, setIsDark] = useLocalStorage<boolean>("theme.dark", true);
  const [paletteName, setPaletteName] = useLocalStorage<PaletteName>(
    "theme.palette",
    "indigo"
  );

  useEffect(() => {
    const root = document.documentElement;
    const palette = PALETTES[paletteName] ?? PALETTES.indigo;
    root.style.setProperty("--brand", palette.base);
    root.style.setProperty("--brand-soft", palette.soft);
    root.classList.toggle("dark", isDark);
  }, [isDark, paletteName]);

  return { isDark, setIsDark, paletteName, setPaletteName } as const;
}
