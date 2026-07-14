import "./styles/fonts/ClashDisplay_Complete/WEB/css/clash-display.css";

import "./styles/styles.css";

import { useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Header } from "./components/Header/Header";
import { Menu } from "./components/Menu/Menu";
import { HeroSection } from "./components/Sections/HeroSection/HeroSection";
import { DetailSection } from "./components/Sections/DetailSection/DetailSection";

export function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <ThemeProvider>
      <Menu isOpen={isMenuOpen} onToggle={handleToggleMenu} />

      <Header isMenuOpen={isMenuOpen} onToggleMenu={handleToggleMenu} />

      <main>
        <HeroSection />
        <DetailSection />
      </main>

      <footer />
    </ThemeProvider>
  );
}
