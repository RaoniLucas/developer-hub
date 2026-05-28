import MenuIcon from '../../../public/assets/icons/MenuIcon';

interface HeaderProps {
  isMenuOpen: boolean
  onToggleMenu: () => void
}

export function Header({ isMenuOpen, onToggleMenu }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="user-profile-container">
          <button
            id="menu-button"
            className={`menu-button ${isMenuOpen ? 'active' : 'hidden'}`}
            onClick={onToggleMenu}
          >
            <MenuIcon isMenuOpen={isMenuOpen} />
          </button>

          <span id="name">Raoni Lucas</span>
        </div>
      </div>
    </header>
  )
}
