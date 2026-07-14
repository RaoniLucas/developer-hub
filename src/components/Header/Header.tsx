import { useScrollPosition } from "../../hooks/useScrollPosition";
import MenuIcon from "../../assets/icons/MenuIcon";
import "./Header.css";

interface HeaderProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export function Header({ isMenuOpen, onToggleMenu }: HeaderProps) {
  const isScrolled = useScrollPosition(50);

  return (
    <header className={`header ${isScrolled ? "header-scrolled" : ""}`}>
      <div className="header-container">
        <div className="user-profile-container">
          <button
            id="menu-button"
            className={`menu-button menu-button--header ${isMenuOpen ? "active" : "hidden"}`}
            onClick={onToggleMenu}
          >
            <MenuIcon isMenuOpen={isMenuOpen} />
          </button>
        </div>
        <div>
          <span>2026</span>
        </div>
      </div>
    </header>
  );
}
