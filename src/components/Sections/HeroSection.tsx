import LinkedinSVG from "../../../public/assets/icons/LinkedinSVG";
import GithubSVG from "../../../public/assets/icons/GithubSVG";

export function HeroSection() {
  return (
    <section className="interfaces">
      <div className="interfaces__wrapper">
        <h2 className="interfaces__title">
          Soluções para interfaces dinâmicas e responsivas
        </h2>

        <div className="interfaces__columns">
          <div className="interfaces__column interfaces__column--about">
            <div className="about__intro">
              <div className="about-float">
                <div className="about">
                  <div className="about__details">
                    <ul className="about__list">
                      <li
                        className="about__item"
                        onClick={() =>
                          window.open(
                            "https://linkedin.com/in/raoni-lucas",
                            "_blank",
                          )
                        }
                      >
                        {/* LinkedIn SVG */}
                        <LinkedinSVG />
                      </li>

                      <li
                        className="about__item"
                        onClick={() =>
                          window.open("https://github.com/RaoniLucas", "_blank")
                        }
                      >
                        {/* GitHub SVG */}
                        <GithubSVG />
                      </li>

                      {/*<li className="about__item"></li>
                      <li className="about__item"></li>*/}
                    </ul>
                  </div>
                  <p className="about__text-wrap">
                    Sou estudante de Análise e Desenvolvimento de Sistemas e
                    estou construindo minha trajetória com foco no
                    desenvolvimento web. Ao longo do curso, passei a estudar
                    projetos utilizando HTML, CSS e JavaScript, sempre buscando
                    transformar teoria em soluções práticas e estruturadas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
