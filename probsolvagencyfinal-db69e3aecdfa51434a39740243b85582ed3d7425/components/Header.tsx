
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Theme } from '../types';
import { SunIcon, MoonIcon, SearchIcon } from './Icons';
import SearchModal from './SearchModal';

interface HeaderProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, setTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const handleSearchClick = () => {
    setIsSearchOpen(true);
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/about', label: 'About' },
    { path: '/blog', label: 'Blog' },
    { path: '/careers', label: 'Careers' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <div 
        className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
      <header className={`premium-header-container ${isMounted ? 'header-animate-in' : ''}`}>
        <div className="premium-header-content">
          <Link to="/" className="premium-header-logo">
            ProbSolv
          </Link>

          <nav className="premium-header-nav">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path} 
                className={`premium-header-nav-link ${location.pathname === link.path ? 'text-white' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="premium-header-actions">
            <button
              onClick={handleSearchClick}
              className="search-btn flex"
              aria-label="Search site"
            >
              <SearchIcon className="h-5 w-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn flex"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <SunIcon className={`sun-icon ${theme === 'dark' ? 'active' : ''}`} />
              <MoonIcon className={`moon-icon ${theme === 'light' ? 'active' : ''}`} />
            </button>
            <button onClick={() => navigate('/contact')} className="premium-header-cta">
              Start Project
            </button>
            <button 
              className={`premium-header-hamburger ${isMenuOpen ? 'active' : ''}`} 
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              aria-expanded={isMenuOpen}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
        
        <div className={`premium-header-mobile-menu ${isMenuOpen ? 'active' : ''}`}>
          <nav className="mobile-menu-nav">
              {navLinks.map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className="premium-header-nav-link mobile"
                  >
                      {link.label}
                  </Link>
              ))}
          </nav>
        </div>
      </header>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
