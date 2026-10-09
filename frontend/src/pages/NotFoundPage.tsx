import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { Button } from '../components/Button';
import { Home, Compass, AlertTriangle } from '../components/icons';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <PageContainer title="404 — Page Not Found">
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--spacing-3xl) var(--spacing-md)',
        minHeight: '50vh',
      }}>
        <div style={{
          padding: 'var(--spacing-md)',
          backgroundColor: 'var(--color-bg-surface)',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-accent)',
          marginBottom: 'var(--spacing-md)',
        }}>
          <AlertTriangle size={48} />
        </div>

        <span className="dev-badge" style={{ marginBottom: 'var(--spacing-xs)' }}>ERROR 404</span>
        
        <h1 className="text-display" style={{ marginBottom: 'var(--spacing-sm)' }}>
          Page Not Found
        </h1>

        <p className="text-body" style={{ maxWidth: '50ch', marginBottom: 'var(--spacing-xl)' }}>
          The path you are looking for does not exist on BEAST HQ. Check the web address or return to one of our active routes.
        </p>

        <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="primary" icon={<Home size={16} />}>
              Return to Home
            </Button>
          </Link>
          <Link to="/content" style={{ textDecoration: 'none' }}>
            <Button variant="outline" icon={<Compass size={16} />}>
              Explore Showcase
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};
