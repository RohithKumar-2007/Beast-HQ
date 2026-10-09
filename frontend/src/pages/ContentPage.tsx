import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/PageContainer';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { VideoCard } from '../components/VideoCard';
import { DisclaimerBadge } from '../components/DisclaimerBadge';
import { FEATURED_VIDEOS, CATEGORIES, VideoCategory } from '../data/videos';
import {
  Search,
  X,
  Video,
  ExternalLink,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Users
} from '../components/icons';

export const ContentPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>('All');

  // Featured video for prominent hero display
  const featuredVideo = useMemo(
    () => FEATURED_VIDEOS.find((v) => v.featured) || FEATURED_VIDEOS[0],
    []
  );

  // Combined search and category filtering
  const filteredVideos = useMemo(() => {
    return FEATURED_VIDEOS.filter((video) => {
      const matchesCategory =
        selectedCategory === 'All' || video.category === selectedCategory;
      const matchesSearch = video.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <PageContainer title="Content Explorer — MrBeast Verified Videos">
      {/* ==========================================
          SECTION B — PAGE INTRODUCTION
          ========================================== */}
      <section style={{ marginBottom: 'var(--spacing-2xl)' }} aria-label="Content Explorer Intro">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: 'var(--spacing-xs)' }}>
          <span className="section-heading-badge">
            <Video size={12} /> CREATOR CONTENT CATALOG
          </span>
          <DisclaimerBadge compact />
        </div>

        <h1 className="text-display" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-xs)' }}>
          Explore the <span style={{ color: 'var(--color-accent)' }}>Beast Universe</span>
        </h1>

        <p className="text-body" style={{ fontSize: '1.125rem', maxWidth: '70ch' }}>
          Browse a curated collection of verified videos from Jimmy Donaldson’s official 
          YouTube publications (<strong>@MrBeast</strong> and <strong>@BeastPhilanthropy</strong>). 
          Search by video title or filter by content category.
        </p>
      </section>

      {/* ==========================================
          SECTION C — FEATURED VIDEO SHOWCASE
          ========================================== */}
      <section style={{ marginBottom: 'var(--spacing-3xl)' }} aria-label="Featured Video">
        <SectionHeading
          title="Featured Highlight"
          subtitle="Spotlight on one of the most iconic verified productions in the catalog."
          badge="Featured Record"
        />

        <div className="featured-video-banner">
          {/* Thumbnail / Media Container */}
          <div className="video-thumb-wrapper" style={{ minHeight: '260px' }}>
            <img
              src={featuredVideo.thumbnailUrl}
              alt={`Featured video thumbnail: ${featuredVideo.title}`}
              className="video-thumb-img"
              loading="eager"
            />
            <div className="video-thumb-overlay">
              <a
                href={featuredVideo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch featured video "${featuredVideo.title}" on YouTube`}
                className="video-play-btn"
                style={{ width: '60px', height: '60px', textDecoration: 'none' }}
              >
                <Video size={28} />
              </a>
            </div>
          </div>

          {/* Featured Content Details */}
          <div className="featured-video-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="section-heading-badge">{featuredVideo.category}</span>
              {featuredVideo.publishedYear && (
                <span className="text-metadata">{featuredVideo.publishedYear}</span>
              )}
            </div>

            <h2 className="text-h2" style={{ color: 'var(--color-text-primary)' }}>
              {featuredVideo.title}
            </h2>

            <p className="text-supporting" style={{ lineHeight: 1.6 }}>
              {featuredVideo.description}
            </p>

            <div style={{ marginTop: 'var(--spacing-sm)' }}>
              <a
                href={featuredVideo.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Button variant="primary" size="md" icon={<ExternalLink size={16} />}>
                  Watch on YouTube
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTIONS D & E — SEARCH & CATEGORY FILTERS
          ========================================== */}
      <section style={{ marginBottom: 'var(--spacing-2xl)' }} aria-label="Search and Filter Controls">
        <SectionHeading
          title="Video Library Catalog"
          subtitle="Filter through curated videos using title keywords or category classifications."
          badge="Catalog Filter"
        />

        <div className="explorer-controls">
          {/* Search Input Field */}
          <div className="search-input-wrapper">
            <Search size={18} className="search-input-icon" aria-hidden="true" />
            <input
              type="text"
              className="search-input"
              placeholder="Search videos by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search videos by title"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search input"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <ul className="category-filter-list" role="tablist" aria-label="Filter videos by category">
            {CATEGORIES.map((cat) => (
              <li key={cat} role="presentation">
                <button
                  type="button"
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ==========================================
          SECTION F & G — VIDEO GRID & EMPTY STATE
          ========================================== */}
      <section style={{ marginBottom: 'var(--spacing-3xl)' }} aria-label="Video Catalog Grid">
        {filteredVideos.length > 0 ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
              <span className="text-supporting">
                Showing <strong>{filteredVideos.length}</strong> verified video{filteredVideos.length > 1 ? 's' : ''}
                {selectedCategory !== 'All' ? ` in "${selectedCategory}"` : ''}
                {searchQuery ? ` matching "${searchQuery}"` : ''}
              </span>
              {(selectedCategory !== 'All' || searchQuery) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-accent)',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  Reset all filters
                </button>
              )}
            </div>

            <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        ) : (
          /* Empty State Fallback (Section G) */
          <div className="empty-state-card" role="status" aria-live="polite">
            <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--color-bg-page)', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)', color: 'var(--color-accent)' }}>
              <HelpCircle size={36} />
            </div>

            <h3 className="text-h3">No videos found</h3>
            <p className="text-body" style={{ maxWidth: '45ch' }}>
              No verified videos matched your search query <strong>"{searchQuery}"</strong>
              {selectedCategory !== 'All' && <span> under category <strong>"{selectedCategory}"</strong></span>}.
            </p>

            <Button variant="primary" size="md" onClick={resetFilters} icon={<Sparkles size={16} />}>
              Clear Search & Reset Filters
            </Button>
          </div>
        )}
      </section>

      {/* ==========================================
          SECTION H — COMMUNITY CALL TO ACTION
          ========================================== */}
      <section aria-label="Community CTA">
        <div className="cta-banner">
          <span className="section-heading-badge" style={{ backgroundColor: 'var(--color-energy-subtle)', color: 'var(--color-energy)', borderColor: 'rgba(255, 51, 102, 0.3)' }}>
            <Users size={12} /> FAN COMMUNITY
          </span>
          <h2 className="text-h1" style={{ maxWidth: '24ch' }}>
            Ready to Connect with Fellow Beast Fans?
          </h2>
          <p className="text-body" style={{ maxWidth: '55ch' }}>
            Discover your Beast Fan Persona and prepare for community membership in upcoming development phases.
          </p>
          <Link to="/community" style={{ textDecoration: 'none', marginTop: 'var(--spacing-xs)' }}>
            <Button variant="primary" size="lg" icon={<ArrowRight size={18} />}>
              Discover Fan Persona & Join
            </Button>
          </Link>
        </div>
      </section>
    </PageContainer>
  );
};
