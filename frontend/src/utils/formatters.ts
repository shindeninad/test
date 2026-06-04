import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatDate = (date: string | Date, format = 'MMM DD, YYYY'): string => {
  return dayjs(date).format(format);
};

export const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs}h ${mins}m ${secs}s`;
  }
  if (mins > 0) {
    return `${mins}m ${secs}s`;
  }
  return `${secs}s`;
};

export const formatPercent = (value: number, decimals = 1): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

export const formatScore = (score: number): string => {
  return score.toLocaleString();
};

export const getRelativeTime = (date: string | Date): string => {
  return dayjs(date).fromNow();
};

export const calculateAccuracy = (correct: number, total: number): number => {
  if (total === 0) return 0;
  return (correct / total) * 100;
};

export const calculatePoints = (
  isCorrect: boolean,
  responseTime: number,
  maxResponseTime: number,
  basePoints: number = 10
): number => {
  if (!isCorrect) return 0;

  const timeBonus = Math.max(0, (1 - responseTime / maxResponseTime) * basePoints);
  return basePoints + Math.round(timeBonus);
};