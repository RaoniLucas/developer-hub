import "./HeroSection.css";
import { useFitToWidth } from "../../../hooks/useFitToWidth";
import { useSectionVisibility } from "../../../hooks/useSectionVisibility";
import {
  useTypewriterSequence,
  renderSegments,
  type Target,
} from "../../../hooks/useTypewriter";

const titleTargets: Target[] = [
  { segments: [{ text: "developer" }] },
  { segments: [{ text: "hub" }] },
];

const tagTargets: Target[] = [
  {
    segments: [
      { text: "<", className: "tech-tags__bracket" },
      { text: "user-interface", className: "tech-tags__name tag-title" },
      { text: "></", className: "tech-tags__bracket" },
      { text: "user-interface", className: "tech-tags__name tag-title" },
      { text: ">", className: "tech-tags__bracket" },
    ],
  },
  {
    segments: [
      { text: "<", className: "tech-tags__bracket" },
      { text: "user-experience", className: "tech-tags__name tag-title" },
      { text: "></", className: "tech-tags__bracket" },
      { text: "user-experience", className: "tech-tags__name tag-title" },
      { text: ">", className: "tech-tags__bracket" },
    ],
  },
];

export function HeroSection() {
  const { sectionRef, isVisible } = useSectionVisibility<HTMLElement>();
  const { containerRef: titleRef, fontSize } = useFitToWidth(
    ["developer", "hub_"],
    { minSize: 24, maxSize: 500 }
  );

  const titleTypewriter = useTypewriterSequence(titleTargets, {
    speed: 55,
    startDelay: 300,
    pause: 200,
  });
  const { revealed: titleRevealed, activeIndex: titleActiveIndex } =
    titleTypewriter;
  const hubLength = titleTargets[1].segments[0].text.length;
  const titleIsComplete =
    titleActiveIndex >= 1 && titleRevealed[1] >= hubLength;
  const tagsTypewriter = useTypewriterSequence(tagTargets, {
    speed: 55,
    startDelay: 0,
    pause: 200,
    enabled: isVisible && titleIsComplete,
  });
  const { revealed: tagRevealed, activeIndex: tagActiveIndex } = tagsTypewriter;
  const developerLength = titleTargets[0].segments[0].text.length;
  const showDeveloperCursor =
    titleActiveIndex === 0 &&
    titleRevealed[0] <= developerLength - 2;

  return (
    <section ref={sectionRef} className="interfaces">
      <div className="interfaces__wrapper">
        <h2 className="interfaces__title" ref={titleRef} style={{ fontSize }}>
          <span>
            {renderSegments(titleTargets[0].segments, titleRevealed[0])}
            {showDeveloperCursor && (
              <span className="interfaces__title-cursor">_</span>
            )}
          </span>
          <span>
            {renderSegments(titleTargets[1].segments, titleRevealed[1])}
            {titleActiveIndex >= 1 && (
              <span className="interfaces__title-cursor">_</span>
            )}
          </span>
        </h2>
        <div className="tech-tags">
          <span
            className={`tech-tags__group ${
              tagActiveIndex === 0 ? "typewriter-cursor" : ""
            }`}
          >
            {renderSegments(tagTargets[0].segments, tagRevealed[0])}
          </span>
          <span
            className={`tech-tags__group ${
              tagActiveIndex === 1 ? "typewriter-cursor" : ""
            }`}
          >
            {renderSegments(tagTargets[1].segments, tagRevealed[1])}
          </span>
        </div>
      </div>
      <div
        className={`interfaces__wrapper interfaces__wrapper--bottom ${
          isVisible ? "interfaces__wrapper--visible" : ""
        }`}
      >
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
