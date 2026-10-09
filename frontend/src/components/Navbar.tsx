import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Flame, Video, Compass, Users } from './icons';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', path: '/', icon: Flame },
    { label: 'Content', path: '/content', icon: Video },
    { label: 'Journey', path: '/journey', icon: Compass },
    { label: 'Community', path: '/community', icon: Users },
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand Logo & Unofficial Badge */}
        <NavLink to="/" className="navbar-brand" onClick={closeMobileMenu} aria-label="BEAST HQ Home">
          <span>BEAST HQ</span>
          <span className="navbar-brand-badge">FAN HUB</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation">
          <ul className="navbar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? 'navbar-link active' : 'navbar-link'
                    }
                    end={item.path === '/'}
                  >
                    <Icon size={16} aria-hidden="true" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Header CTA Button */}
        <div style={{ display: 'none', alignItems: 'center', gap: 'var(--spacing-xs)' }} className="navbar-cta-wrapper">
          <Link to="/community" style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="sm" icon={<Users size={14} />}>
              Join Community
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="navbar-toggle"
          onClick={toggleMobileMenu}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <nav aria-label="Mobile Navigation">
          <ul className="navbar-mobile-menu">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive ? 'navbar-link active' : 'navbar-link'
                    }
                    onClick={closeMobileMenu}
                    end={item.path === '/'}
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
            <li style={{ paddingTop: 'var(--spacing-xs)', borderTop: '1px solid var(--color-border)' }}>
              <Link to="/community" onClick={closeMobileMenu} style={{ textDecoration: 'none', display: 'block' }}>
                <Button variant="primary" size="md" fullWidth icon={<Users size={16} />}>
                  Join Fan Community
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
