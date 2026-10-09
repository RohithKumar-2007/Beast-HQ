import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/PageContainer';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { VideoCard } from '../components/VideoCard';
import { DisclaimerBadge } from '../components/DisclaimerBadge';
import { FEATURED_VIDEOS } from '../data/videos';
import { CREATOR_INFO } from '../data/creatorInfo';
import {
  Video,
  Users,
  Compass,
  ArrowRight,
  Sparkles,
  Server,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Flame,
  Award,
  Milestone
} from '../components/icons';

import { API_BASE_URL } from '../config/api';

export const HomePage: React.FC = () => {
  const [healthStatus, setHealthStatus] = useState<{ status: string; service?: string } | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/health`)
      .then((res) => res.json())
      .then((data) => setHealthStatus(data))
      .catch(() => setHealthStatus({ status: 'offline' }));
  }, []);

  return (
    <PageContainer title="Home — MrBeast Fan Showcase">
      {/* ==========================================
          SECTION A — HERO
          ========================================== */}
      <section className="hero-section" aria-label="Introduction Hero">
        <div className="hero-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', flexWrap: 'wrap' }}>
            <span className="section-heading-badge">
              <Sparkles size={12} /> FAN SHOWCASE & COMMUNITY
            </span>
            <DisclaimerBadge compact />
          </div>

          <h1 className="text-display" style={{ color: 'var(--color-text-primary)' }}>
            The Ultimate Showcase for <span style={{ color: 'var(--color-accent)' }}>MrBeast</span> Content & Story
          </h1>

          <p className="text-body" style={{ fontSize: '1.125rem', maxWidth: '65ch', lineHeight: 1.6 }}>
            BEAST HQ is an unofficial fan showcase celebrating YouTube pioneer Jimmy Donaldson (MrBeast). 
            Explore verified video highlights, milestone history, and interactive community experiences.
          </p>

          <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap', marginTop: 'var(--spacing-sm)' }}>
            <Link to="/content" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="lg" icon={<Video size={18} />}>
                Explore Content
              </Button>
            </Link>
            <Link to="/community" style={{ textDecoration: 'none' }}>
              <Button variant="outline" size="lg" icon={<Users size={18} />}>
                Join Community
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="hero-visual-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="text-metadata" style={{ color: 'var(--color-accent)' }}>CREATOR SNAPSHOT</span>
            <span className="dev-badge" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-status-success)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
              VERIFIED CREATOR
            </span>
          </div>

          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '4px' }}>
              Jimmy Donaldson
            </h2>
            <p className="text-supporting" style={{ color: 'var(--color-text-secondary)' }}>
              Creator, Producer & Philanthropist (@MrBeast)
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-xs)', padding: 'var(--spacing-sm)', backgroundColor: 'var(--color-bg-page)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <div>
              <span className="text-metadata" style={{ display: 'block' }}>Pillars</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--color-accent)' }}>Challenges</strong>
            </div>
            <div>
              <span className="text-metadata" style={{ display: 'block' }}>Scope</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>Global</strong>
            </div>
            <div>
              <span className="text-metadata" style={{ display: 'block' }}>Impact</span>
              <strong style={{ fontSize: '0.9rem', color: 'var(--color-energy)' }}>Philanthropy</strong>
            </div>
          </div>

          {/* Backend Connection Badge */}
          <div style={{ padding: 'var(--spacing-xs) var(--spacing-sm)', backgroundColor: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', fontSize: '0.8125rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-secondary)' }}>
              <Server size={14} /> System Status:
            </span>
            {healthStatus?.status === 'ok' ? (
              <span style={{ color: 'var(--color-status-success)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={14} /> Backend API Online
              </span>
            ) : (
              <span style={{ color: 'var(--color-status-dev)', fontWeight: 600 }}>Phase 1 API Ready</span>
            )}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION B — CREATOR INTRODUCTION
          ========================================== */}
      <section style={{ marginBottom: 'var(--spacing-3xl)' }} aria-label="About MrBeast">
        <SectionHeading
          title="About Jimmy Donaldson (MrBeast)"
          subtitle="Pioneering large-scale digital entertainment, viral endurance challenges, and global philanthropic projects."
          badge="Creator Profile"
        />

        <div className="source-citation-box" style={{ marginBottom: 'var(--spacing-lg)' }}>
          <p style={{ margin: 0, lineHeight: 1.6 }}>
            {CREATOR_INFO.summary}
          </p>
          <div style={{ marginTop: 'var(--spacing-xs)', fontSize: 'var(--font-size-metadata)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldAlert size={14} style={{ color: 'var(--color-accent)' }} />
            <span>Fact-Check Verification: Information compiled strictly from official broadcasts and public media records.</span>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION C — FEATURED CONTENT
          ========================================== */}
      <section style={{ marginBottom: 'var(--spacing-3xl)' }} aria-label="Featured Videos">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
          <SectionHeading
            title="Featured Creator Content"
            subtitle="Curated collection of verified MrBeast videos from official YouTube publications."
            badge="Video Showcase"
          />
          <Link to="/content" style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="sm" icon={<ArrowRight size={14} />}>
              View All Content
            </Button>
          </Link>
        </div>

        <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {FEATURED_VIDEOS.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION D — CREATOR HIGHLIGHTS
          ========================================== */}
      <section style={{ marginBottom: 'var(--spacing-3xl)' }} aria-label="Content Pillars">
        <SectionHeading
          title="Core Pillars of MrBeast's Work"
          subtitle="Understanding the distinct categories that define Jimmy Donaldson's content ecosystem."
          badge="Content Pillars"
        />

        <div className="grid-cards">
          {CREATOR_INFO.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="content-card"
              style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="section-heading-badge" style={{ fontSize: '0.7rem' }}>
                  {pillar.tag}
                </span>
                {idx === 0 ? <Flame size={20} style={{ color: 'var(--color-accent)' }} /> : idx === 1 ? <Award size={20} style={{ color: 'var(--color-accent)' }} /> : <Sparkles size={20} style={{ color: 'var(--color-energy)' }} />}
              </div>
              <h3 className="content-card-title">{pillar.title}</h3>
              <p className="content-card-body">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION E — JOURNEY PREVIEW
          ========================================== */}
      <section style={{ marginBottom: 'var(--spacing-3xl)' }} aria-label="Creator Journey Preview">
        <div
          style={{
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-xl)',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--spacing-lg)',
            alignItems: 'center',
          }}
        >
          <div>
            <span className="section-heading-badge" style={{ marginBottom: 'var(--spacing-xs)' }}>
              <Milestone size={12} /> CREATOR STORY
            </span>
            <h2 className="text-h2" style={{ marginBottom: 'var(--spacing-xs)' }}>
              The Evolution of a Digital Pioneer
            </h2>
            <p className="text-body" style={{ maxWidth: '60ch', marginBottom: 'var(--spacing-md)' }}>
              From uploading early videos in 2012 to building one of the largest media brands in the world — discover the verified milestones that shaped Jimmy Donaldson's journey.
            </p>
            <Link to="/journey" style={{ textDecoration: 'none' }}>
              <Button variant="primary" icon={<Compass size={16} />}>
                Explore Full Creator Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION F — COMMUNITY CALL TO ACTION
          ========================================== */}
      <section aria-label="Community CTA">
        <div className="cta-banner">
          <span className="section-heading-badge" style={{ backgroundColor: 'var(--color-energy-subtle)', color: 'var(--color-energy)', borderColor: 'rgba(255, 51, 102, 0.3)' }}>
            <Users size={12} /> FAN COMMUNITY
          </span>
          <h2 className="text-h1" style={{ maxWidth: '24ch' }}>
            What Kind of Beast Fan Are You?
          </h2>
          <p className="text-body" style={{ maxWidth: '55ch' }}>
            Join fellow fans in celebrating MrBeast content. Prepare for interactive fan persona quizzes and community roster registration in upcoming phases.
          </p>
          <Link to="/community" style={{ textDecoration: 'none', marginTop: 'var(--spacing-xs)' }}>
            <Button variant="primary" size="lg" icon={<ArrowRight size={18} />}>
              Discover Fan Persona & Join
            </Button>
          </Link>
        </div>
      </section>

      {/* ==========================================
          SECTION G — FOOTER DISCLAIMS & OFFICIAL LINKS
          ========================================== */}
      <section style={{ marginTop: 'var(--spacing-xl)', marginBottom: 'var(--spacing-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-md)', flexWrap: 'wrap', fontSize: 'var(--font-size-supporting)' }}>
          <span className="text-metadata">Verified Official Channel Links:</span>
          {CREATOR_INFO.officialChannels.map((channel) => (
            <a
              key={channel.handle}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link"
              style={{ color: 'var(--color-accent)', fontWeight: 600 }}
            >
              <span>{channel.name} ({channel.handle})</span>
              <ExternalLink size={12} />
            </a>
          ))}
        </div>
      </section>
    </PageContainer>
  );
};
