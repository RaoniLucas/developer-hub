import { useEffect, useState } from "react";

export type Segment = { text: string; className?: string };
export type Target = { segments: Segment[] };

export function useTypewriterSequence(
  targets: Target[],
  {
    speed = 45,
    startDelay = 300,
    pause = 250,
  }: { speed?: number; startDelay?: number; pause?: number } = {}
) {
  const [revealed, setRevealed] = useState<number[]>(() => targets.map(() => 0));
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const totalLength = (t: Target) =>
      t.segments.reduce((sum, s) => sum + s.text.length, 0);

    const typeTarget = (index: number) => {
      if (cancelled || index >= targets.length) return;
      setActiveIndex(index);
      const total = totalLength(targets[index]);
      let count = 0;

      const step = () => {
        if (cancelled) return;
        count++;
        setRevealed((prev) => {
          const next = [...prev];
          next[index] = count;
          return next;
        });
        if (count < total) {
          timeoutId = setTimeout(step, speed);
        } else if (index + 1 < targets.length) {
          timeoutId = setTimeout(() => typeTarget(index + 1), pause);
        } else {
          timeoutId = setTimeout(() => setActiveIndex(targets.length), pause);
        }
      };

      timeoutId = setTimeout(step, speed);
    };

    timeoutId = setTimeout(() => typeTarget(0), startDelay);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [targets, speed, startDelay, pause]);

  return { revealed, activeIndex, isDone: activeIndex >= targets.length - 1 };
}

export function renderSegments(segments: Segment[], revealedCount: number) {
  let remaining = revealedCount;
  return segments.map((seg, i) => {
    const take = Math.max(0, Math.min(seg.text.length, remaining));
    remaining -= seg.text.length;
    return (
      <span key={i} className={seg.className}>
        {seg.text.slice(0, take)}
      </span>
    );
  });
}
