interface ToggleProps {
  isMenuOpen: boolean,
}

export default function MenuIcon({isMenuOpen}: ToggleProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_34_9)">
        <rect id="border-menu-icon" x="3.5" y="3.5" width="93" height="93" rx="19.5" stroke="black" strokeWidth="4"/>
        <rect className={`line-menu-icon ${isMenuOpen ? 'open' : 'close'}`} x="35" width="3" height="95" fill="black" />
      </g>
      <defs>
        <clipPath id="clip0_34_9">
          <rect width="100" height="100" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}
