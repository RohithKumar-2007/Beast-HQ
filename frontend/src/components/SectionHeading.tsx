import React from 'react';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2' | 'h3';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  badge,
  align = 'left',
  as: Component = 'h2',
}) => {
  const isCenter = align === 'center';

  return (
    <header className="section-heading" style={{ alignItems: isCenter ? 'center' : 'flex-start', textAlign: isCenter ? 'center' : 'left' }}>
      {badge && <span className="section-heading-badge">{badge}</span>}
      <Component className={Component === 'h1' ? 'text-h1' : Component === 'h3' ? 'text-h3' : 'text-h2'}>
        {title}
      </Component>
      {subtitle && <p className="section-heading-subtitle">{subtitle}</p>}
    </header>
  );
};
