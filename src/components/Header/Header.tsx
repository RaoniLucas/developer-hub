import MenuIcon from "../../../public/assets/icons/MenuIcon";

interface HeaderProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export function Header({ isMenuOpen, onToggleMenu }: HeaderProps) {
  return (
    <header className="header">
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
