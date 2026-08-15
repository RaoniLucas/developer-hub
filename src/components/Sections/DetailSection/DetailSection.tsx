import "./DetailSection.css";
import { useSectionVisibility } from "../../../hooks/useSectionVisibility";
import {
  renderSegments,
  useTypewriterSequence,
  type Segment,
  type Target,
} from "../../../hooks/useTypewriter";

const tools = ["HTML", "CSS", "JavaScript", "TypeScript", "NodeJS", "React"];

const openingTag: Segment[] = [
  { text: "<", className: "tech-tags__bracket" },
  { text: "ferramentas", className: "tech-tags__name tag-title" },
  { text: ">", className: "tech-tags__bracket" },
];

const closingTag: Segment[] = [
  { text: "</", className: "tech-tags__bracket" },
  { text: "ferramentas", className: "tech-tags__name tag-title" },
  { text: ">", className: "tech-tags__bracket" },
];

const contentSegments: Segment[] = tools.map((tool) => ({
  text: tool,
  className: "tech-tags__name",
}));

const detailTargets: Target[] = [
  { segments: openingTag },
  { segments: contentSegments },
  { segments: closingTag },
];

function renderToolList(revealedCount: number) {
  let remaining = revealedCount;

  return tools.map((tool) => {
    const visibleLength = Math.max(0, Math.min(tool.length, remaining));
    remaining -= tool.length;

    if (visibleLength === 0) return null;

    return (
      <li key={tool}>
        <span className="tech-tags__name">{tool.slice(0, visibleLength)}</span>
      </li>
    );
  });
}

export function DetailSection() {
  const { sectionRef, isVisible } = useSectionVisibility<HTMLElement>();
  const { revealed, activeIndex } = useTypewriterSequence(detailTargets, {
    speed: 55,
    startDelay: 250,
    pause: 220,
    enabled: isVisible,
  });

  return (
    <section ref={sectionRef} className="interfaces">
      <ul className="interfaces__about-container">
        {Array.from({ length: 4 }, (_, index) => (
          <li key={index}>
            <div className={`tech-tags about ${isVisible ? "about--visible" : ""}`}>
              <span className="tech-tags__group about-tools">
                <span
                  className={`about-tools__opening-tag ${
                    activeIndex === 0 ? "typewriter-cursor" : ""
                  }`}
                >
                  {renderSegments(openingTag, revealed[0])}
                </span>
                <ul
                  className={`about-tools__list ${
                    activeIndex === 1 ? "typewriter-cursor" : ""
                  }`}
                >
                  {renderToolList(revealed[1])}
                </ul>
                <span
                  className={`about-tools__closing-tag ${
                    activeIndex === 2 ? "typewriter-cursor" : ""
                  }`}
                >
                  {renderSegments(closingTag, revealed[2])}
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
