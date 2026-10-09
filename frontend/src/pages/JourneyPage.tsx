import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/PageContainer';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { VideoCard } from '../components/VideoCard';
import { DisclaimerBadge } from '../components/DisclaimerBadge';
import { JOURNEY_MILESTONES } from '../data/journey';
import { FEATURED_VIDEOS } from '../data/videos';
import {
  Compass,
  Milestone,
  ExternalLink,
  Video,
  Users,
  Award,
  Sparkles,
  ShieldAlert,
  ArrowRight
} from '../components/icons';

export const JourneyPage: React.FC = () => {
  // Select 3 representative videos demonstrating production evolution
  const evolutionVideos = FEATURED_VIDEOS.slice(0, 3);

  return (
    <PageContainer title="Creator Journey — MrBeast Story & Milestones">
      {/* ==========================================
          SECTION A — HERO SECTION
          ========================================== */}
      <section style={{ marginBottom: 'var(--spacing-3xl)' }} aria-label="Journey Hero">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', flexWrap: 'wrap', marginBottom: 'var(--spacing-xs)' }}>
          <span className="section-heading-badge">
            <Compass size={12} /> CREATOR TIMELINE & STORY
          </span>
          <DisclaimerBadge compact />
        </div>

        <h1 className="text-display" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-xs)' }}>
          The Journey Behind <span style={{ color: 'var(--color-accent)' }}>MrBeast</span>
        </h1>

        <p className="text-body" style={{ fontSize: '1.125rem', maxWidth: '70ch', lineHeight: 1.6 }}>
          From creating early gaming clips in North Carolina to building one of the largest media 
          and philanthropic operations on the internet — explore the verified milestones of Jimmy Donaldson's career.
        </p>

        {/* Quick Journey Snapshot Banner */}
        <div
          style={{
            marginTop: 'var(--spacing-xl)',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            backgroundColor: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--spacing-md)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <div style={{ padding: 'var(--spacing-xs)', backgroundColor: 'var(--color-accent-subtle)', borderRadius: 'var(--radius-md)', color: 'var(--color-accent)' }}>
              <Milestone size={24} />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '1rem', color: 'var(--color-text-primary)' }}>
                6 Verified Major Milestones
              </strong>
              <span className="text-supporting">Chronological timeline from 2012 to present</span>
            </div>
          </div>

          <a href="#timeline-start" style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="sm" icon={<ArrowRight size={14} />}>
              Scroll to Timeline
            </Button>
          </a>
        </div>
      </section>

      {/* ==========================================
          SECTION B — EARLY BEGINNINGS
          ========================================== */}
      <section style={{ marginBottom: 'var(--spacing-3xl)' }} aria-label="Early Beginnings">
        <SectionHeading
          title="Early Beginnings (2012)"
          subtitle="The initial foundation of Jimmy Donaldson's digital media career."
          badge="Origin Story"
        />

        <div className="source-citation-box">
          <p style={{ margin: 0, lineHeight: 1.7, fontSize: '1.05rem', color: 'var(--color-text-primary)' }}>
            Jimmy Donaldson registered his YouTube channel in February 2012 at age 13 under the handle <strong>@MrBeast6000</strong>. 
            His early uploads focused on video game walkthroughs and commentary. Over the next several years, he experimented endlessly with video titles, thumbnails, and editing formats to understand the underlying mechanics of online audience engagement.
          </p>
          <div style={{ marginTop: 'var(--spacing-sm)', fontSize: 'var(--font-size-metadata)', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldAlert size={14} style={{ color: 'var(--color-accent)' }} />
            <span>Factual Verification: Sourced directly from public YouTube registry records and verified channel archives.</span>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION C — VERIFIED TIMELINE
          ========================================== */}
      <section id="timeline-start" style={{ marginBottom: 'var(--spacing-3xl)' }} aria-label="Verified Milestone Timeline">
        <SectionHeading
          title="Verified Creator Timeline"
          subtitle="Chronological record of key public milestones in the development of MrBeast's content and philanthropy."
          badge="Milestone Record"
        />

        <div className="timeline-container">
          <div className="timeline-line" aria-hidden="true" />

          <ol className="timeline-list">
            {JOURNEY_MILESTONES.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <li key={item.id} className={`timeline-item ${isEven ? 'even' : 'odd'}`}>
                  <div className="timeline-dot" aria-hidden="true" />

                  <div className="timeline-card">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: isEven ? 'flex-end' : 'flex-start', gap: '8px' }}>
                      <span className="timeline-year-badge">{item.year}</span>
                      <span className="dev-badge" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>{item.category}</span>
                    </div>

                    <h3 className="text-h3" style={{ marginTop: '4px' }}>{item.title}</h3>
                    <p className="text-supporting" style={{ lineHeight: 1.6 }}>{item.description}</p>

                    {item.keyHighlight && (
                      <div style={{ marginTop: '2px', fontSize: '0.8125rem', color: 'var(--color-accent)', fontWeight: 600 }}>
                        ★ {item.keyHighlight}
                      </div>
                    )}

                    <div style={{ marginTop: 'var(--spacing-xs)', paddingTop: 'var(--spacing-2xs)', borderTop: '1px solid var(--color-border)' }}>
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="timeline-source-tag"
                        aria-label={`Verify source for ${item.title}: ${item.sourceName} (opens in new tab)`}
                      >
                        <span>Source: {item.sourceName}</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ==========================================
          SECTION D — CONTENT EVOLUTION
          ========================================== */}
      <section style={{ marginBottom: 'var(--spacing-3xl)' }} aria-label="Content Evolution">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
          <SectionHeading
            title="Evolution of Production & Content"
            subtitle="Real video records illustrating the scaling production value and complexity over time."
            badge="Production Evolution"
          />
          <Link to="/content" style={{ textDecoration: 'none' }}>
            <Button variant="outline" size="sm" icon={<Video size={14} />}>
              Explore Full Video Library
            </Button>
          </Link>
        </div>

        <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {evolutionVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION E — BROADER CREATOR WORK & PHILANTHROPY
          ========================================== */}
      <section style={{ marginBottom: 'var(--spacing-3xl)' }} aria-label="Broader Work and Philanthropy">
        <SectionHeading
          title="Broader Creator Initiatives & Philanthropy"
          subtitle="Distinguishing main entertainment productions from dedicated environmental and humanitarian organizations."
          badge="Humanitarian Impact"
        />

        <div className="grid-cards">
          <div className="content-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
              <span className="section-heading-badge">501(c)(3) Organization</span>
              <Award size={20} style={{ color: 'var(--color-accent)' }} />
            </div>
            <h3 className="content-card-title">Beast Philanthropy</h3>
            <p className="content-card-body">
              A registered 501(c)(3) non-profit organization operating food banks, housing construction, and clean water well projects funded by YouTube revenues and donor contributions.
            </p>
            <div className="content-card-footer">
              <a
                href="https://www.beastphilanthropy.org"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={{ color: 'var(--color-accent)', fontWeight: 600 }}
              >
                <span>Visit BeastPhilanthropy.org</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          <div className="content-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
              <span className="section-heading-badge">Global Environmental</span>
              <Sparkles size={20} style={{ color: 'var(--color-energy)' }} />
            </div>
            <h3 className="content-card-title">#TeamTrees & #TeamSeas</h3>
            <p className="content-card-body">
              Global collaborative fundraising campaigns in partnership with Mark Rober, Arbor Day Foundation, and Ocean Conservancy, planting 20M+ trees and removing 30M+ lbs of ocean trash.
            </p>
            <div className="content-card-footer">
              <a
                href="https://teamtrees.org"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={{ color: 'var(--color-accent)', fontWeight: 600 }}
              >
                <span>Visit TeamTrees.org</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION F — CONTINUE EXPLORING (CTAs)
          ========================================== */}
      <section aria-label="Continue Exploring">
        <div className="cta-banner">
          <span className="section-heading-badge" style={{ backgroundColor: 'var(--color-accent-subtle)', color: 'var(--color-accent)', borderColor: 'var(--color-accent-border)' }}>
            <Compass size={12} /> CONTINUE EXPLORING
          </span>
          <h2 className="text-h1" style={{ maxWidth: '24ch' }}>
            Discover Videos & Join the Fan Community
          </h2>
          <p className="text-body" style={{ maxWidth: '55ch' }}>
            Explore verified video highlights in the Content Showcase or head over to the Community Hub.
          </p>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap', justifyContent: 'center', marginTop: 'var(--spacing-xs)' }}>
            <Link to="/content" style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="lg" icon={<Video size={18} />}>
                Explore Content Catalog
              </Button>
            </Link>
            <Link to="/community" style={{ textDecoration: 'none' }}>
              <Button variant="outline" size="lg" icon={<Users size={18} />}>
                Join Fan Community
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
