// hooks/useScrollPosition.ts
import { useState, useEffect } from "react";

export function useScrollPosition(threshold: number = 50) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Pega o scroll do root (que agora é o elemento com scroll)
      const root = document.getElementById('root');
      let position = window.scrollY;

      // Se o root tiver scroll, usa ele
      if (root) {
        position = root.scrollTop;
      }

      console.log("Scroll position:", position); // Debug
      setIsScrolled(position > threshold);
    };

    // Adiciona listener no root
    const root = document.getElementById('root');
    if (root) {
      root.addEventListener("scroll", handleScroll, { passive: true });
    }

    // Fallback para window scroll
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Verificação inicial
    handleScroll();

    return () => {
      if (root) {
        root.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isScrolled;
}
