import React from 'react';
import './QuestionDisplay.scss';

export interface QuestionOption {
  id: string;
  text: string;
}

export interface QuestionDisplayProps {
  number: number;
  totalQuestions: number;
  type: string;
  content: string;
  imageUrl?: string;
  options: QuestionOption[];
  timeRemaining?: number;
  totalTime?: number;
  selectedAnswer?: string;
  onSelectAnswer: (optionId: string) => void;
  disabled?: boolean;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  number,
  totalQuestions,
  type,
  content,
  imageUrl,
  options,
  timeRemaining,
  totalTime,
  selectedAnswer,
  onSelectAnswer,
  disabled,
}) => {
  const progressPercent = totalTime ? (timeRemaining! / totalTime) * 100 : 0;

  return (
    <div className="question-display">
      <div className="question-header">
        <span className="question-counter">
          Question {number} of {totalQuestions}
        </span>
        {timeRemaining !== undefined && (
          <div className={`question-timer ${timeRemaining < 5 ? 'warning' : ''}`}>
            ⏱️ {timeRemaining}s
          </div>
        )}
      </div>

      {timeRemaining !== undefined && (
        <div className="question-progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: timeRemaining < 5 ? '#ef4444' : '#2563eb',
            }}
          />
        </div>
      )}

      <div className="question-content">
        <h2 className="question-text">{content}</h2>

        {imageUrl && (
          <div className="question-image">
            <img src={imageUrl} alt="Question visual" />
          </div>
        )}
      </div>

      <div className="question-options">
        {options.map((option) => (
          <button
            key={option.id}
            className={`option-btn ${selectedAnswer === option.id ? 'selected' : ''}`}
            onClick={() => onSelectAnswer(option.id)}
            disabled={disabled}
          >
            <span className="option-text">{option.text}</span>
            {selectedAnswer === option.id && (
              <span className="option-check">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
