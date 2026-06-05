import { useEffect, useRef } from "react";

export function useFitText() {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fit = () => {
      const container = el.parentElement;
      const section = container?.parentElement;
      if (!container || !section) return;

      const bottomWrapper = section.querySelector<HTMLElement>(
        ".interfaces__wrapper:nth-child(2)",
      );
      if (!bottomWrapper) return;

      const containerWidth = container.offsetWidth;
      const availableHeight =
        bottomWrapper.getBoundingClientRect().top -
        container.getBoundingClientRect().top;

      const spans = el.querySelectorAll<HTMLElement>("span");

      let low = 1;
      let high = 400;

      while (low < high - 1) {
        const mid = Math.floor((low + high) / 2);
        spans.forEach((span) => (span.style.fontSize = mid + "px"));

        const fitsWidth =
          Math.max(...Array.from(spans).map((s) => s.scrollWidth)) <=
          containerWidth;
        const fitsHeight = el.scrollHeight <= availableHeight;

        if (fitsWidth && fitsHeight) {
          low = mid;
        } else {
          high = mid;
        }
      }

      const finalVw = (low / window.innerWidth) * 100;
      spans.forEach(
        (span) => (span.style.fontSize = finalVw.toFixed(2) + "vw"),
      );
    };

    fit();

    const observer = new ResizeObserver(fit);
    observer.observe(el.parentElement?.parentElement ?? document.body);

    return () => observer.disconnect();
  }, []);

  return ref;
}
