export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';
export const WS_URL = process.env.REACT_APP_WS_URL || 'ws://localhost:3001';

export const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  MATCHING: 'matching',
  IMAGE: 'image',
  DRAG_DROP: 'drag_drop',
};

export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
};

export const USER_ROLES = {
  TRAINER: 'trainer',
  ADMIN: 'admin',
  PARTICIPANT: 'participant',
};

export const QUIZ_STATUS = {
  ACTIVE: 'active',
  PAUSED: 'paused',
  COMPLETED: 'completed',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const TIMEOUT_VALUES = {
  API_TIMEOUT: 10000,
  QUESTION_TIMER: 30000,
  RECONNECT_DELAY: 3000,
};