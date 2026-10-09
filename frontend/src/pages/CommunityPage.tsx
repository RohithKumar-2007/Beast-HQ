import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from '../components/PageContainer';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { FanQuiz } from '../components/FanQuiz';
import { SignupForm } from '../components/SignupForm';
import { DisclaimerBadge } from '../components/DisclaimerBadge';
import {
  Users,
  Sparkles,
  ArrowRight,
  Video,
  Compass,
  Home
} from '../components/icons';

export const CommunityPage: React.FC = () => {
  const scrollToQuiz = () => {
    const el = document.getElementById('quiz-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSignup = () => {
    const el = document.getElementById('signup-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <PageContainer title="Community Hub & Signup — BEAST HQ">
      {/* ==========================================
          SECTION A — COMMUNITY INTRODUCTION
          ========================================== */}
      <section style={{ marginBottom: 'var(--spacing-2xl)' }} aria-label="Community Intro">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)', flexWrap: 'wrap', marginBottom: 'var(--spacing-xs)' }}>
          <span className="section-heading-badge">
            <Users size={12} /> FAN COMMUNITY HUB
          </span>
          <DisclaimerBadge compact />
        </div>

        <h1 className="text-display" style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-xs)' }}>
          Welcome to the <span style={{ color: 'var(--color-accent)' }}>BEAST HQ</span> Fan Community
        </h1>

        <p className="text-body" style={{ fontSize: '1.125rem', maxWidth: '70ch', lineHeight: 1.6 }}>
          BEAST HQ is an independent, fan-made space celebrating YouTube pioneer Jimmy Donaldson (MrBeast), 
          his channel productions, philanthropic projects, and the millions of supporters who follow his story.
        </p>

        <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap', marginTop: 'var(--spacing-md)' }}>
          <Button variant="primary" size="lg" onClick={scrollToQuiz} icon={<Sparkles size={18} />}>
            Take the Fan Quiz
          </Button>
          <Button variant="outline" size="lg" onClick={scrollToSignup} icon={<Users size={18} />}>
            Join Community Roster
          </Button>
        </div>
      </section>

      {/* ==========================================
          SECTION B — FAN QUIZ ("What Kind of Beast Fan Are You?")
          ========================================== */}
      <section aria-label="Interactive Fan Quiz">
        <SectionHeading
          title="What Kind of Beast Fan Are You?"
          subtitle="Answer 3 quick questions to discover your unique Beast Fan Persona!"
          badge="Interactive Fan Quiz"
        />

        {/* Interactive Quiz Component */}
        <FanQuiz />
      </section>

      {/* ==========================================
          SECTION C — REAL COMMUNITY SIGNUP FORM (PHASE 6)
          ========================================== */}
      <section style={{ marginTop: 'var(--spacing-3xl)' }} aria-label="Community Member Registration">
        <SectionHeading
          title="Register for the Community Roster"
          subtitle="Join our community database to save your registration and support the fan showcase."
          badge="Real Express & MongoDB Registration"
        />

        {/* Real Community Signup Form Component */}
        <SignupForm />
      </section>

      {/* ==========================================
          SECTION D — USEFUL NAVIGATION LINKS
          ========================================== */}
      <section style={{ marginTop: 'var(--spacing-3xl)', marginBottom: 'var(--spacing-2xl)' }} aria-label="Community Navigation Links">
        <SectionHeading
          title="Explore More of BEAST HQ"
          subtitle="Continue your journey through our verified creator showcase and milestone timeline."
          badge="Site Navigation"
        />

        <div className="grid-cards">
          <div className="content-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
              <span className="section-heading-badge">Video Showcase</span>
              <Video size={20} style={{ color: 'var(--color-accent)' }} />
            </div>
            <h3 className="content-card-title">Content Catalog</h3>
            <p className="content-card-body">
              Browse 10 verified real MrBeast videos with real-time title search and category filter pills.
            </p>
            <div className="content-card-footer">
              <Link to="/content" className="btn btn-sm btn-outline">
                Explore Videos <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="content-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
              <span className="section-heading-badge">Chronological Story</span>
              <Compass size={20} style={{ color: 'var(--color-accent)' }} />
            </div>
            <h3 className="content-card-title">Creator Journey</h3>
            <p className="content-card-body">
              Follow the verified 2012–2024 creator timeline and Beast Philanthropy milestones.
            </p>
            <div className="content-card-footer">
              <Link to="/journey" className="btn btn-sm btn-outline">
                Discover Journey <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="content-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--spacing-xs)' }}>
              <span className="section-heading-badge">Main Overview</span>
              <Home size={20} style={{ color: 'var(--color-accent)' }} />
            </div>
            <h3 className="content-card-title">Home Showcase</h3>
            <p className="content-card-body">
              Return to the main BEAST HQ overview featuring live backend health check status.
            </p>
            <div className="content-card-footer">
              <Link to="/" className="btn btn-sm btn-outline">
                Return Home <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
