import { useEffect, useRef, useState } from "react";

export function useSectionVisibility<T extends HTMLElement>(
  threshold = 0.6
) {
  const sectionRef = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const scrollRoot = document.getElementById("root");

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio >= threshold);
      },
      {
        root: scrollRoot,
        threshold: [0, threshold, 1],
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [threshold]);

  return { sectionRef, isVisible };
}
