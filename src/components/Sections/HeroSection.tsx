// import { useFitText } from "../../hooks/useFitText";

export function HeroSection() {
  // const titleRef = useFitText();

  const CodeLogo = () => {
    return (
      <svg
        viewBox="0 0 1080 120"
        className="code-logo"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          .code-logo {
            width: 100%;
            /* max-width: 1000px; */
            height: auto;
            display: block;
          }

          .code {
            font-family: 'JetBrains Mono', 'Fira Code', monospace;
            font-size: clamp(18px, 6vw, 48px);
            font-weight: 500;
          }

          @media (min-width: 600px) {
            .code {
              font-size: clamp(36px, 6vw, 56px);
            }
          }

          .tag {
            fill: #cfcfcf;
          }

          .text {
            fill: #4DA3FF;
          }
        `}</style>

        <text x="20" y="75" className="code">
          <tspan className="tag">&lt;</tspan>
          <tspan className="text">Developer Hub</tspan>
          <tspan className="tag">&gt;&lt;/</tspan>
          <tspan className="text">Developer Hub</tspan>
          <tspan className="tag">&gt;</tspan>
        </text>
      </svg>
    );
  };


  return (
    <section className="interfaces">
      <div className="interfaces__wrapper">
        {/*<h2 className="interfaces__title">
          Soluções para interfaces dinâmicas e responsivas
        </h2>*/}
        <h2 className="interfaces__title">
          Developer
          Hub
        </h2>

        <div>
          <CodeLogo />
        </div>
      </div>

      {/*<hr className="interfaces__divider" />*/}

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
