import React from 'react';
import './Leaderboard.scss';

export interface LeaderboardEntry {
  rank: number;
  participantId: string;
  name: string;
  score: number;
  correctAnswers: number;
  totalAnswers: number;
  accuracy: number;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  maxDisplay?: number;
  isLive?: boolean;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  entries,
  maxDisplay = 4,
  isLive = true,
}) => {
  const displayEntries = entries.slice(0, maxDisplay);

  return (
    <div className={`leaderboard ${isLive ? 'live' : ''}`}>
      <h3 className="leaderboard-title">
        🏆 Live Leaderboard
      </h3>

      <div className="leaderboard-content">
        {displayEntries.length === 0 ? (
          <div className="leaderboard-empty">
            <p>No participants yet</p>
          </div>
        ) : (
          <div className="leaderboard-list">
            {displayEntries.map((entry, index) => (
              <div
                key={entry.participantId}
                className={`leaderboard-entry rank-${index + 1}`}
              >
                <div className="entry-rank">
                  <span className="rank-number">{entry.rank}</span>
                  {index === 0 && <span className="rank-medal">🥇</span>}
                  {index === 1 && <span className="rank-medal">🥈</span>}
                  {index === 2 && <span className="rank-medal">🥉</span>}
                </div>

                <div className="entry-info">
                  <div className="entry-name">{entry.name}</div>
                  <div className="entry-stats">
                    {entry.correctAnswers}/{entry.totalAnswers} correct
                    {' '}
                    ({entry.accuracy}%)
                  </div>
                </div>

                <div className="entry-score">
                  <span className="score-value">{entry.score}</span>
                  <span className="score-label">pts</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
