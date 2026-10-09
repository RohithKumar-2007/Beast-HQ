import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  QUIZ_QUESTIONS,
  RESULT_DETAILS,
  calculateQuizResult,
  FanCategory
} from '../data/quiz';
import { Button } from './Button';
import {
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Compass,
  Video,
  Home
} from './icons';

export const FanQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [quizResult, setQuizResult] = useState<FanCategory | null>(null);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const selectedOptionId = selectedAnswers[currentQuestion?.id] || '';
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNextQuestion = () => {
    if (!selectedOptionId) return;

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Calculate final result
      const allSelectedIds = Object.values({
        ...selectedAnswers,
        [currentQuestion.id]: selectedOptionId,
      });
      const resultCategory = calculateQuizResult(allSelectedIds);
      setQuizResult(resultCategory);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setQuizResult(null);
  };

  return (
    <div className="quiz-card" id="quiz-section">
      {/* Quiz Active View */}
      {quizResult === null ? (
        <div>
          {/* Header & Progress Indicator */}
          <div className="quiz-progress-wrapper" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 'var(--font-size-supporting)' }}>
              <span className="section-heading-badge" style={{ fontSize: '0.7rem' }}>
                FAN PERSONA QUIZ
              </span>
              <span className="text-metadata" style={{ color: 'var(--color-accent)' }}>
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
            </div>
            <div className="quiz-progress-track">
              <div
                className="quiz-progress-fill"
                style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Title & Subtitle */}
          <div style={{ marginBottom: 'var(--spacing-lg)' }}>
            <h2 className="text-h2" style={{ color: 'var(--color-text-primary)', marginBottom: '4px' }}>
              {currentQuestion.title}
            </h2>
            <p className="text-supporting">{currentQuestion.subtitle}</p>
          </div>

          {/* Radio Group Options List */}
          <ul className="quiz-options-group" role="radiogroup" aria-label={currentQuestion.title}>
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              return (
                <li key={option.id} className="quiz-option-item">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    className={`quiz-option-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(option.id)}
                  >
                    <div className="quiz-radio-circle" aria-hidden="true">
                      {isSelected && <div className="quiz-radio-dot" />}
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: '1rem', color: isSelected ? 'var(--color-accent)' : 'var(--color-text-primary)' }}>
                        {option.text}
                      </strong>
                      <span className="text-supporting" style={{ fontSize: '0.85rem' }}>
                        {option.description}
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Action Footer */}
          <div style={{ marginTop: 'var(--spacing-xl)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span className="text-metadata">
              {selectedOptionId ? 'Click next to proceed' : 'Select an answer to continue'}
            </span>
            <Button
              variant="primary"
              size="md"
              disabled={!selectedOptionId}
              onClick={handleNextQuestion}
              icon={currentQuestionIndex === totalQuestions - 1 ? <CheckCircle2 size={16} /> : <ArrowRight size={16} />}
            >
              {currentQuestionIndex === totalQuestions - 1 ? 'See Your Persona Result' : 'Next Question'}
            </Button>
          </div>
        </div>
      ) : (
        /* Quiz Result Screen View */
        <div className="quiz-result-box" role="status" aria-live="polite">
          <span className="section-heading-badge" style={{ backgroundColor: 'var(--color-accent-subtle)', color: 'var(--color-accent)' }}>
            {RESULT_DETAILS[quizResult].badge}
          </span>

          <div style={{ margin: 'var(--spacing-xs) 0' }}>
            <h2 className="text-display" style={{ color: 'var(--color-accent)', marginBottom: '4px' }}>
              {RESULT_DETAILS[quizResult].title}
            </h2>
            <p className="text-body" style={{ maxWidth: '55ch', margin: '0 auto' }}>
              {RESULT_DETAILS[quizResult].summary}
            </p>
          </div>

          {/* Key Traits List */}
          <ul className="traits-list" aria-label="Personality Traits">
            {RESULT_DETAILS[quizResult].traits.map((trait, idx) => (
              <li key={idx} className="trait-chip">
                ★ {trait}
              </li>
            ))}
          </ul>

          {/* Recommended Next Actions */}
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap', justifyContent: 'center', marginTop: 'var(--spacing-md)' }}>
            <Link to={RESULT_DETAILS[quizResult].recommendedRoute} style={{ textDecoration: 'none' }}>
              <Button variant="primary" size="md" icon={<ArrowRight size={16} />}>
                {RESULT_DETAILS[quizResult].recommendedText}
              </Button>
            </Link>
            <Button variant="secondary" size="md" onClick={handleRestartQuiz} icon={<RotateCcw size={16} />}>
              Retake Quiz
            </Button>
          </div>

          {/* Section C: Useful Navigation links */}
          <div style={{ marginTop: 'var(--spacing-lg)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-lg)', flexWrap: 'wrap', fontSize: 'var(--font-size-supporting)' }}>
            <Link to="/content" className="footer-link">
              <Video size={14} /> Explore Content Showcase
            </Link>
            <Link to="/journey" className="footer-link">
              <Compass size={14} /> Discover Creator Journey
            </Link>
            <Link to="/" className="footer-link">
              <Home size={14} /> Return to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
