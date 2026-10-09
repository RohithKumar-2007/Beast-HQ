import React from 'react';
import { ShieldAlert } from './icons';

interface DisclaimerBadgeProps {
  compact?: boolean;
}

export const DisclaimerBadge: React.FC<DisclaimerBadgeProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="dev-badge" style={{ backgroundColor: 'rgba(100, 116, 139, 0.1)', color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}>
        <ShieldAlert size={14} />
        <span>UNOFFICIAL FAN PROJECT</span>
      </div>
    );
  }

  return (
    <div className="footer-disclaimer-card">
      <ShieldAlert size={20} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
      <div>
        <strong style={{ color: 'var(--color-text-primary)', display: 'block', marginBottom: '2px' }}>
          Fan Showcase & Community Disclaimer
        </strong>
        <p style={{ margin: 0 }}>
          BEAST HQ is an independent, unofficial fan website dedicated to MrBeast (Jimmy Donaldson). 
          This project is not affiliated with, sponsored by, or endorsed by MrBeast or any associated brand entities.
        </p>
      </div>
    </div>
  );
};
