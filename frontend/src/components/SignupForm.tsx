import React, { useState } from 'react';
import { Button } from './Button';
import { UserPlus, CheckCircle2, AlertTriangle, ShieldAlert } from './icons';
import { API_BASE_URL } from '../config/api';

interface SignupFormData {
  name: string;
  email: string;
  favoriteContentType: string;
  reason: string;
}

export const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    favoriteContentType: 'Other',
    reason: '',
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when user edits
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);

    // Client-side validation
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim().toLowerCase();
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedName) {
      setErrorMessage('Please enter your name.');
      return;
    }

    if (!trimmedEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/community/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          favoriteContentType: formData.favoriteContentType,
          reason: formData.reason.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage(
          `Welcome to BEAST HQ, ${trimmedName}! Your fan profile has been registered in the database.`
        );
        // Reset form
        setFormData({
          name: '',
          email: '',
          favoriteContentType: 'Other',
          reason: '',
        });
      } else {
        setErrorMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (err: unknown) {
      console.error('Signup submit error:', err);
      setErrorMessage(
        'Unable to connect to BEAST HQ API server. Please make sure the server is running.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="quiz-card" style={{ maxWidth: '700px' }} id="signup-section">
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xs)' }}>
        <span className="section-heading-badge" style={{ backgroundColor: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}>
          <UserPlus size={12} /> UNOFFICIAL FAN COMMUNITY SIGNUP
        </span>
        <h2 className="text-h2" style={{ marginTop: 'var(--spacing-xs)' }}>
          Join the BEAST HQ Fan Roster
        </h2>
        <p className="text-supporting" style={{ maxWidth: '50ch', margin: '0 auto' }}>
          Sign up as a community member on this unofficial MrBeast fan showcase website.
        </p>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div
          role="status"
          aria-live="polite"
          style={{
            padding: 'var(--spacing-md)',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-status-success)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-xs)',
          }}
        >
          <CheckCircle2 size={20} style={{ flexShrink: 0 }} />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          style={{
            padding: 'var(--spacing-md)',
            backgroundColor: 'rgba(255, 51, 102, 0.12)',
            border: '1px solid rgba(255, 51, 102, 0.4)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-energy)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-xs)',
          }}
        >
          <AlertTriangle size={20} style={{ flexShrink: 0 }} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        {/* Name Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label htmlFor="signup-name" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Full Name <span style={{ color: 'var(--color-energy)' }}>*</span>
          </label>
          <input
            id="signup-name"
            name="name"
            type="text"
            required
            maxLength={100}
            placeholder="e.g. Alex Morgan"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
            className="search-input"
            style={{ paddingLeft: 'var(--spacing-md)' }}
          />
        </div>

        {/* Email Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label htmlFor="signup-email" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Email Address <span style={{ color: 'var(--color-energy)' }}>*</span>
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            required
            maxLength={255}
            placeholder="e.g. alex@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="search-input"
            style={{ paddingLeft: 'var(--spacing-md)' }}
          />
        </div>

        {/* Favorite Content Type Dropdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label htmlFor="signup-category" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Favorite Content Type
          </label>
          <select
            id="signup-category"
            name="favoriteContentType"
            value={formData.favoriteContentType}
            onChange={handleChange}
            disabled={isSubmitting}
            className="search-input"
            style={{ paddingLeft: 'var(--spacing-md)', cursor: 'pointer' }}
          >
            <option value="Challenges">Challenges & Comparisons</option>
            <option value="Philanthropy">Beast Philanthropy & Giving</option>
            <option value="Gaming">Gaming & Virtual Arenas</option>
            <option value="Survival">Extreme Survival Stunts</option>
            <option value="Travel">Travel & Comparisons</option>
            <option value="Other">Other / General Fan</option>
          </select>
        </div>

        {/* Reason Field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label htmlFor="signup-reason" style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Why would you like to join? <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>(Optional)</span>
          </label>
          <textarea
            id="signup-reason"
            name="reason"
            rows={3}
            maxLength={500}
            placeholder="Tell us what you enjoy most about MrBeast videos..."
            value={formData.reason}
            onChange={handleChange}
            disabled={isSubmitting}
            className="search-input"
            style={{ paddingLeft: 'var(--spacing-md)', resize: 'vertical' }}
          />
        </div>

        {/* Submit Button */}
        <div style={{ marginTop: 'var(--spacing-xs)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
          <Button
            variant="primary"
            size="lg"
            type="submit"
            disabled={isSubmitting}
            icon={<UserPlus size={18} />}
          >
            {isSubmitting ? 'Submitting Registration...' : 'Complete Registration'}
          </Button>

          <div style={{ fontSize: 'var(--font-size-metadata)', color: 'var(--color-text-muted)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <ShieldAlert size={12} />
            <span>Unofficial fan project. No passwords or sensitive personal data requested.</span>
          </div>
        </div>
      </form>
    </div>
  );
};
