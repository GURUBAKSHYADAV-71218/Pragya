"use client";
import { useCallback, useEffect, useState } from "react";
import { emptyData, repository, type PracticeData } from "@/lib/repository";
export function usePracticeData() {
  const [data, setData] = useState<PracticeData>(emptyData());
  const [ready, setReady] = useState(false);
  const refresh = useCallback(async () => { setData(await repository.load()); setReady(true); }, []);
  useEffect(() => { void refresh(); }, [refresh]);
  return { data, ready, refresh };
}
