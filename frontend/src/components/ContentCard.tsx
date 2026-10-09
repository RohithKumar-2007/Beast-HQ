import React from 'react';

export interface ContentCardProps {
  title: string;
  description: string;
  badge?: string;
  footerText?: string;
  action?: React.ReactNode;
  interactive?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  description,
  badge,
  footerText,
  action,
  interactive = false,
  onClick,
  icon,
}) => {
  const classes = [
    'content-card',
    interactive ? 'content-card-interactive' : '',
  ].filter(Boolean).join(' ');

  return (
    <article
      className={classes}
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onKeyDown={interactive ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      } : undefined}
    >
      <div className="content-card-header">
        {icon && <div style={{ color: 'var(--color-accent)' }}>{icon}</div>}
        {badge && <span className="dev-badge">{badge}</span>}
      </div>

      <h3 className="content-card-title">{title}</h3>
      <p className="content-card-body">{description}</p>

      {(footerText || action) && (
        <div className="content-card-footer">
          {footerText ? <span className="text-metadata">{footerText}</span> : <div />}
          {action && <div>{action}</div>}
        </div>
      )}
    </article>
  );
};
