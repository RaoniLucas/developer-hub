import "./HeroSection.css";
import { useFitToWidth } from "../../../hooks/useFitToWidth";
import {
  useTypewriterSequence,
  renderSegments,
  type Target,
} from "../../../hooks/useTypewriter";

/* ============================================================
   DADOS DO TYPEWRITER
   ============================================================ */
const titleTargets: Target[] = [
  { segments: [{ text: "developer" }] },
  { segments: [{ text: "hub" }] },
];

const tagTargets: Target[] = [
  {
    segments: [
      { text: "<", className: "tech-tags__bracket" },
      { text: "user-interface", className: "tech-tags__name" },
      { text: "></", className: "tech-tags__bracket" },
      { text: "user-interface", className: "tech-tags__name" },
      { text: ">", className: "tech-tags__bracket" },
    ],
  },
  {
    segments: [
      { text: "<", className: "tech-tags__bracket" },
      { text: "user-experience", className: "tech-tags__name" },
      { text: "></", className: "tech-tags__bracket" },
      { text: "user-experience", className: "tech-tags__name" },
      { text: ">", className: "tech-tags__bracket" },
    ],
  },
];

// título (índices 0,1) + tags (índices 2,3) digitados em uma única sequência
const allTargets: Target[] = [...titleTargets, ...tagTargets];

export function HeroSection() {
  const { containerRef: titleRef, fontSize } = useFitToWidth(
    titleTargets.map((t) => t.segments.map((s) => s.text).join("")),
    { minSize: 24, maxSize: 500 }
  );

  const { revealed, activeIndex } = useTypewriterSequence(allTargets, {
    speed: 55,
    startDelay: 300,
    pause: 200,
  });

  return (
    <section className="interfaces">
      <div className="interfaces__wrapper">
        <h2 className="interfaces__title" ref={titleRef} style={{ fontSize }}>
          <span className={activeIndex === 0 ? "typewriter-cursor--underline" : undefined}>
            {renderSegments(titleTargets[0].segments, revealed[0])}
          </span>
          {/* activeIndex >= 1: o cursor aparece assim que "_hub" começa a
              ser digitado e continua piscando para sempre, mesmo depois
              que as tech-tags já tiverem terminado de digitar */}
          <span className={activeIndex >= 1 ? "typewriter-cursor--underline" : undefined}>
            {renderSegments(titleTargets[1].segments, revealed[1])}
          </span>
        </h2>
        <div className="tech-tags">
          <span
            className={`tech-tags__group ${activeIndex === 2 ? "typewriter-cursor" : ""}`}
          >
            {renderSegments(tagTargets[0].segments, revealed[2])}
          </span>
          <span
            className={`tech-tags__group ${activeIndex === 3 ? "typewriter-cursor" : ""}`}
          >
            {renderSegments(tagTargets[1].segments, revealed[3])}
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
            Front-End Developer / UI / UX
          </span>
          <span className="name">Raoni Lucas</span>
          <span className="name">2026</span>
        </div>
      </div>
    </section>
  );
}
