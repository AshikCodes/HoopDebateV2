"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

type Debate = {
  id: string;
  question: string;
  option_left: string;
  option_right: string;
  votes_left: number;
  votes_right: number;
  sort_order: number;
};

const RESULTS_PAUSE_MS = 2500;
const PCT_ANIM_MS = 700;

function useAnimatedPercent(target: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / PCT_ANIM_MS, 1);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(eased * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active]);

  return value;
}

export default function Home() {
  const [debates, setDebates] = useState<Debate[]>([]);
  const [index, setIndex] = useState(0);
  const [locked, setLocked] = useState(false);
  const [picked, setPicked] = useState<"left" | "right" | null>(null);
  const [counts, setCounts] = useState({ left: 0, right: 0 });

  const debate = debates[index];

  useEffect(() => {
    getSupabase()
      .from("debates")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        if (data) setDebates(data as Debate[]);
      });
  }, []);

  useEffect(() => {
    if (!locked || debates.length === 0) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % debates.length);
      setLocked(false);
      setPicked(null);
    }, RESULTS_PAUSE_MS);
    return () => clearTimeout(t);
  }, [locked, debates.length]);

  async function vote(side: "left" | "right") {
    if (locked || !debate) return;
    setLocked(true);
    setPicked(side);

    const { data, error } = await getSupabase().rpc("cast_vote", {
      p_id: debate.id,
      p_side: side,
    });

    if (error) {
      alert("Vote failed. Check Supabase setup.");
      setLocked(false);
      setPicked(null);
      return;
    }

    const row = data?.[0] as { votes_left: number; votes_right: number } | undefined;
    if (row) {
      setCounts({ left: row.votes_left, right: row.votes_right });
    }
  }

  const total = counts.left + counts.right;
  const leftPct = total ? Math.round((counts.left / total) * 100) : 50;
  const rightPct = 100 - leftPct;
  const animatedLeft = useAnimatedPercent(leftPct, locked);
  const animatedRight = useAnimatedPercent(rightPct, locked);

  if (!debates.length) {
    return (
      <main className="flex min-h-dvh w-full items-center justify-center px-4">
        <p className="text-zinc-400">Loading…</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-dvh w-full flex-col">
      <header className="w-full shrink-0 px-4 pt-6 pb-4 md:px-6 md:pt-8 md:pb-5">
        <h1 className="text-center text-2xl font-bold leading-tight md:text-3xl lg:text-4xl">
          {debate.question}
        </h1>

        {locked && (
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-orange-500 transition-all duration-700 ease-out"
              style={{ width: `${leftPct}%` }}
            />
          </div>
        )}
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-2 gap-3 px-3 pb-3 md:grid-cols-2 md:grid-rows-1 md:gap-4 md:px-4 md:pb-4">
        <button
          type="button"
          disabled={locked}
          onClick={() => vote("left")}
          className={`flex min-h-[38vh] flex-col items-center justify-center rounded-3xl border border-zinc-700 bg-zinc-900 p-8 text-center text-2xl transition hover:border-orange-500 disabled:cursor-default md:min-h-0 md:h-full md:p-12 md:text-3xl lg:text-4xl ${
            locked && picked === "left" ? "ring-2 ring-orange-500" : ""
          }`}
        >
          <span className="font-semibold">{debate.option_left}</span>
          {locked && (
            <span className="mt-4 block text-5xl font-bold text-orange-500 md:text-6xl">
              {animatedLeft}%
            </span>
          )}
        </button>

        <button
          type="button"
          disabled={locked}
          onClick={() => vote("right")}
          className={`flex min-h-[38vh] flex-col items-center justify-center rounded-3xl border border-zinc-700 bg-zinc-900 p-8 text-center text-2xl transition hover:border-sky-500 disabled:cursor-default md:min-h-0 md:h-full md:p-12 md:text-3xl lg:text-4xl ${
            locked && picked === "right" ? "ring-2 ring-sky-500" : ""
          }`}
        >
          <span className="font-semibold">{debate.option_right}</span>
          {locked && (
            <span className="mt-4 block text-5xl font-bold text-sky-400 md:text-6xl">
              {animatedRight}%
            </span>
          )}
        </button>
      </div>
    </main>
  );
}
