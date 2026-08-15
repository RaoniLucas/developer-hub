import { useEffect, useState } from "react";

export type Segment = { text: string; className?: string };
export type Target = { segments: Segment[] };

type TypewriterOptions = {
  speed?: number;
  startDelay?: number;
  pause?: number;
  enabled?: boolean;
};

export function useTypewriterSequence(
  targets: Target[],
  {
    speed = 45,
    startDelay = 300,
    pause = 250,
    enabled = true,
  }: TypewriterOptions = {}
) {
  const [revealed, setRevealed] = useState<number[]>(() =>
    targets.map(() => 0)
  );
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    setRevealed(targets.map(() => 0));
    setActiveIndex(-1);

    if (!enabled || targets.length === 0) {
      return () => {
        cancelled = true;
        if (timeoutId) clearTimeout(timeoutId);
      };
    }

    const totalLength = (target: Target) =>
      target.segments.reduce((sum, segment) => sum + segment.text.length, 0);

    const typeTarget = (index: number) => {
      if (cancelled || index >= targets.length) return;

      setActiveIndex(index);
      const total = totalLength(targets[index]);
      let count = 0;

      const step = () => {
        if (cancelled) return;

        count++;
        setRevealed((previous) => {
          const next = [...previous];
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

      if (total === 0) {
        timeoutId = setTimeout(() => typeTarget(index + 1), pause);
      } else {
        timeoutId = setTimeout(step, speed);
      }
    };

    timeoutId = setTimeout(() => typeTarget(0), startDelay);

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [targets, speed, startDelay, pause, enabled]);

  return {
    revealed,
    activeIndex,
    isDone: activeIndex >= targets.length,
  };
}

export function renderSegments(segments: Segment[], revealedCount: number) {
  let remaining = revealedCount;

  return segments.map((segment, index) => {
    const take = Math.max(0, Math.min(segment.text.length, remaining));
    remaining -= segment.text.length;

    return (
      <span key={index} className={segment.className}>
        {segment.text.slice(0, take)}
      </span>
    );
  });
}
