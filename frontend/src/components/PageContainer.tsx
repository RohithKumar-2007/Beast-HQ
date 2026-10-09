import React, { useEffect } from 'react';

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  title,
  children,
  className = '',
}) => {
  useEffect(() => {
    document.title = `${title} | BEAST HQ`;
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <main id="main-content" className={`page-container ${className}`}>
      {children}
    </main>
  );
};
