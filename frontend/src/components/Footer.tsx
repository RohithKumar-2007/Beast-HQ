import React from 'react';
import { NavLink } from 'react-router-dom';
import { DisclaimerBadge } from './DisclaimerBadge';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand-info">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>BEAST HQ</h2>
            <DisclaimerBadge />
          </div>
          
          <div className="footer-links-group">
            <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-muted)' }}>
              Navigation
            </h3>
            <NavLink to="/" className="footer-link">Home Placeholder</NavLink>
            <NavLink to="/content" className="footer-link">Content Showcase</NavLink>
            <NavLink to="/journey" className="footer-link">Creator Journey</NavLink>
            <NavLink to="/community" className="footer-link">Community Hub</NavLink>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} BEAST HQ — Unofficial Fan Platform. Built with React & Node.js.</span>
          <span>Phase 1 Architecture Foundation</span>
        </div>
      </div>
    </footer>
  );
};
