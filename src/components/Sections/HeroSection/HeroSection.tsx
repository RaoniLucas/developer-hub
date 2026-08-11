import { useLayoutEffect, useRef } from "react";
import "./HeroSection.css";

function useFitTextGroup({
  minSize = 20,
  maxSize = 500,
}: { minSize?: number; maxSize?: number } = {}) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const spans = Array.from(container.children) as HTMLElement[];
    if (spans.length === 0) return;

    const fit = () => {
      const targetWidth = container.clientWidth;
      if (targetWidth === 0) return;

      spans.forEach((el) => (el.style.fontSize = `${maxSize}px`));
      const widths = spans.map((el) => el.scrollWidth);
      const widestNatural = Math.max(...widths);
      if (widestNatural === 0) return;

      let newSize = (targetWidth / widestNatural) * maxSize;
      newSize = Math.min(Math.max(newSize, minSize), maxSize);

      spans.forEach((el) => (el.style.fontSize = `${newSize}px`));
    };

    fit();

    if (typeof ResizeObserver === "undefined") return;

    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(container);

    if (document.fonts) {
      document.fonts.ready.then(fit);
    }

    return () => resizeObserver.disconnect();
  }, [minSize, maxSize]);

  return containerRef;
}

export function HeroSection() {
  const titleRef = useFitTextGroup({ minSize: 24, maxSize: 500 });

  return (
    <section className="interfaces">
      <div className="interfaces__wrapper">
        <h2 className="interfaces__title" ref={titleRef}>
          <span>developer</span>
          <span>_hub</span>
        </h2>
        <div className="tech-tags">
          <span className="tech-tags__group">
            <span className="tech-tags__bracket">&lt;</span>
            <span className="tech-tags__name">UserInterface</span>
            <span className="tech-tags__bracket">&gt;&lt;/</span>
            <span className="tech-tags__name">UserInterface</span>
            <span className="tech-tags__bracket">&gt;</span>
          </span>
          <br />
          <span className="tech-tags__group">
            <span className="tech-tags__bracket">&lt;</span>
            <span className="tech-tags__name">UserExperience</span>
            <span className="tech-tags__bracket">&gt;&lt;/</span>
            <span className="tech-tags__name">UserExperience</span>
            <span className="tech-tags__bracket">&gt;</span>
          </span>
        </div>
      </div>
      <div className="interfaces__wrapper interfaces__wrapper--bottom">
        <p className="about__text-wrap">
          Sou estudante de Análise e Desenvolvimento de Sistemas e estou
          construindo minha trajetória com foco no desenvolvimento web. Ao longo
          do curso, passei a estudar projetos utilizando HTML, CSS e JavaScript,
          sempre buscando transformar teoria em soluções práticas e
          estruturadas.
        </p>
        <div className="interfaces__name-block">
          <span className="interfaces__role">
            Front-End Developer / User Interface / User Experience
          </span>
          <span className="name">Raoni Lucas</span>
          <span className="name">2026</span>
        </div>
      </div>
    </section>
  );
}
