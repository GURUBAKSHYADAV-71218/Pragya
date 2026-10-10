"use client";
import { useEffect } from "react";
import { usePracticeData } from "@/hooks/usePracticeData";
/** Applies the reduce-motion preference. Theme is handled separately by lib/theme so it is instant and flash-free. */
export default function SettingsApplier() {
  const { data } = usePracticeData();
  useEffect(() => { document.documentElement.toggleAttribute("data-rm", data.settings.reducedMotion); }, [data.settings.reducedMotion]);
  return null;
}
