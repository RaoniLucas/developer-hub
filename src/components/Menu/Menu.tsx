import { useTheme } from "../../contexts/ThemeContext";
import { useMenu } from "../../hooks/useMenu";
import { Modal } from "../Modal/Modal";
import { ContactModal } from "../Modal/ContactModal/ContactModal";
import MenuIcon from "../../assets/icons/MenuIcon";
import "./Menu.css";

import LinkedinSVG from "../../assets/icons/LinkedinSVG";
import GithubSVG from "../../assets/icons/GithubSVG";

interface MenuProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Menu({ isOpen, onToggle }: MenuProps) {
  const { theme, toggleTheme } = useTheme();
  const { contactOpen, setContactOpen, handleContactClick } = useMenu({
    isOpen,
    onToggle,
  });

  return (
    <>
      <div
        id="menu-container"
        className={`menu-container ${isOpen ? "active" : "hidden"}`}
      >
        <header className="header-menu">
          <div className="header-menu-container">
            <button
              className={`menu-button menu-button--inside ${isOpen ? "active" : "hidden"}`}
              onClick={onToggle}
            >
              <MenuIcon isMenuOpen={isOpen} />
            </button>

            <span className="switch-container" onClick={toggleTheme}>
              <div className={`switch ${theme}`} />
            </span>
          </div>
        </header>

        <nav className="nav-menu">
          <h3 className="subtitle-menu">Contatos</h3>
          <ul className="menu-list">
            <li className="menu-option" onClick={handleContactClick}>
              <div className="content-listitem">
                <span className="text-option">Mensagem</span>
              </div>
              <ArrowIcon />
            </li>

            <li
              className="menu-option"
              onClick={() => (window.location.href = "./pages/document.html")}
            >
              <div className="content-listitem">
                <span className="text-option">Documentos</span>
              </div>
              <ArrowIcon />
            </li>
          </ul>

          <h3 className="subtitle-menu">Features & Atualizações</h3>
          <ul className="menu-list">
            <li className="menu-option">
              <div className="content-listitem">
                <span className="text-option">Atualizações</span>
              </div>
              <ArrowIcon />
            </li>
          </ul>
        </nav>

        <footer className="footer-menu">
          <div className="about__details">
            <ul className="about__list">
              <li
                className="about__item"
                onClick={() =>
                  window.open("https://linkedin.com/in/raoni-lucas", "_blank")
                }
              >
                <LinkedinSVG />
              </li>

              <li
                className="about__item"
                onClick={() =>
                  window.open("https://github.com/RaoniLucas", "_blank")
                }
              >
                <GithubSVG />
              </li>
            </ul>
          </div>
        </footer>
      </div>

      <Modal isOpen={contactOpen} onClose={() => setContactOpen(false)}>
        <ContactModal onClose={() => setContactOpen(false)} />
      </Modal>
    </>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="arrow-icon"
      width="12"
      height="12"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="line-arrow-icon"
        d="M48.8417 97.7545C46.5001 100.099 42.7011 100.102 40.3564 97.7602L38.2337 95.6403C35.889 93.2987 35.8864 89.4997 38.228 87.155L76.3864 48.9458L87 59.5454L48.8417 97.7545Z"
        fill="silver"
      />
      <path
        className="line-arrow-icon"
        d="M87 59.5454L76.4005 70.159L38.1913 32.0007C35.8466 29.6591 35.844 25.8601 38.1856 23.5154L40.3055 21.3927C42.6471 19.048 46.4461 19.0454 48.7908 21.387L87 59.5454Z"
        fill="silver"
      />
    </svg>
  );
}
