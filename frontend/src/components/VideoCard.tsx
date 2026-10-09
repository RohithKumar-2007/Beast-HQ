import React from 'react';
import { VideoItem } from '../data/videos';
import { Video, ExternalLink } from './icons';

interface VideoCardProps {
  video: VideoItem;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <article className="video-card">
      <a
        href={video.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch "${video.title}" on YouTube (opens in new tab)`}
        style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        {/* Video Thumbnail Wrapper */}
        <div className="video-thumb-wrapper">
          <img
            src={video.thumbnailUrl}
            alt={`Official YouTube thumbnail for video: ${video.title}`}
            className="video-thumb-img"
            loading="lazy"
          />
          <div className="video-thumb-overlay">
            <div className="video-play-btn" aria-hidden="true">
              <Video size={20} />
            </div>
          </div>
          {video.duration && (
            <span
              className="text-metadata"
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                backgroundColor: 'rgba(11, 15, 23, 0.85)',
                padding: '2px 6px',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-text-primary)',
              }}
            >
              {video.duration}
            </span>
          )}
        </div>

        {/* Video Card Content Body */}
        <div className="video-card-body">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span
              className="section-heading-badge"
              style={{ padding: '2px 8px', fontSize: '0.7rem' }}
            >
              {video.category}
            </span>
            <span className="text-metadata" style={{ color: 'var(--color-accent)' }}>
              YouTube Channel
            </span>
          </div>

          <h3 className="video-card-title">{video.title}</h3>
          <p className="text-supporting" style={{ flex: 1, marginBottom: 'var(--spacing-xs)' }}>
            {video.description}
          </p>

          <div
            style={{
              paddingTop: 'var(--spacing-xs)',
              borderTop: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 'var(--font-size-supporting)',
              color: 'var(--color-accent)',
              fontWeight: 600,
            }}
          >
            <span>Watch on YouTube</span>
            <ExternalLink size={16} />
          </div>
        </div>
      </a>
    </article>
  );
};
