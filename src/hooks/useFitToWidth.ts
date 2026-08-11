import { useLayoutEffect, useRef, useState } from "react";

export function useFitToWidth(
  lines: string[],
  { minSize = 24, maxSize = 500 }: { minSize?: number; maxSize?: number } = {}
) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const [fontSize, setFontSize] = useState(maxSize);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const fit = () => {
      const targetWidth = container.clientWidth;
      if (targetWidth === 0) return;

      const computed = getComputedStyle(container);
      const ghost = document.createElement("div");
      ghost.style.position = "absolute";
      ghost.style.visibility = "hidden";
      ghost.style.whiteSpace = "nowrap";
      ghost.style.pointerEvents = "none";
      ghost.style.top = "-9999px";
      ghost.style.left = "-9999px";
      ghost.style.fontFamily = computed.fontFamily;
      ghost.style.fontWeight = computed.fontWeight;
      ghost.style.letterSpacing = computed.letterSpacing;
      ghost.style.fontSize = `${maxSize}px`;
      document.body.appendChild(ghost);

      let widest = 0;
      lines.forEach((line) => {
        ghost.textContent = line;
        widest = Math.max(widest, ghost.scrollWidth);
      });

      document.body.removeChild(ghost);
      if (widest === 0) return;

      let newSize = (targetWidth / widest) * maxSize;
      newSize = Math.min(Math.max(newSize, minSize), maxSize);
      setFontSize(newSize);
    };

    fit();

    if (typeof ResizeObserver === "undefined") return;
    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(container);

    if (document.fonts) document.fonts.ready.then(fit);

    return () => resizeObserver.disconnect();
  }, [lines, minSize, maxSize]);

  return { containerRef, fontSize };
}
