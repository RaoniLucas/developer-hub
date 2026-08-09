import "./HeroSection.css";

export function HeroSection() {
  return (
    <section className="interfaces">
      <div className="interfaces__wrapper">
        <h2 className="interfaces__title">
          Developer
          <br />
          Hub
        </h2>

        <div>
          <span>
            {/*<CodeLogo />*/}
            <span>&lt;</span>
            <span>UserInterface</span>
            <span>&gt;&lt;/</span>
            <span>UserInterface</span>
            <span>&gt;</span>
          </span>
          <span>
            {/*<CodeLogo />*/}
            <span>&lt;</span>
            <span>UserExperience</span>
            <span>&gt;&lt;/</span>
            <span>UserExperience</span>
            <span>&gt;</span>
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
