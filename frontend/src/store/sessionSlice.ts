import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Participant {
  id: string;
  name: string;
  nickname: string;
  joinedAt: string;
}

export interface ParticipantScore {
  participantId: string;
  name: string;
  score: number;
  correctAnswers: number;
  totalAnswers: number;
  accuracy: number;
}

export interface Question {
  id: string;
  type: string;
  content: string;
  imageUrl?: string;
  options?: Array<{
    id: string;
    text: string;
  }>;
}

export interface QuizSession {
  id: string;
  quizId: string;
  trainerId: string;
  status: 'active' | 'paused' | 'completed';
  startedAt: string;
  currentQuestionIndex: number;
  currentQuestion?: Question;
  participants: Participant[];
  leaderboard: ParticipantScore[];
  totalParticipants: number;
}

interface SessionState {
  session: QuizSession | null;
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
  currentAnswer: string | null;
  hasAnswered: boolean;
  responseTime: number;
}

const initialState: SessionState = {
  session: null,
  isLoading: false,
  error: null,
  isConnected: false,
  currentAnswer: null,
  hasAnswered: false,
  responseTime: 0,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSession: (state, action: PayloadAction<QuizSession>) => {
      state.session = action.payload;
      state.isLoading = false;
    },
    updateLeaderboard: (state, action: PayloadAction<ParticipantScore[]>) => {
      if (state.session) {
        state.session.leaderboard = action.payload;
      }
    },
    addParticipant: (state, action: PayloadAction<Participant>) => {
      if (state.session) {
        state.session.participants.push(action.payload);
        state.session.totalParticipants = state.session.participants.length;
      }
    },
    removeParticipant: (state, action: PayloadAction<string>) => {
      if (state.session) {
        state.session.participants = state.session.participants.filter(
          (p) => p.id !== action.payload
        );
        state.session.totalParticipants = state.session.participants.length;
      }
    },
    nextQuestion: (state, action: PayloadAction<Question>) => {
      if (state.session) {
        state.session.currentQuestionIndex += 1;
        state.session.currentQuestion = action.payload;
        state.currentAnswer = null;
        state.hasAnswered = false;
        state.responseTime = 0;
      }
    },
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    submitAnswer: (state, action: PayloadAction<{ answer: string; responseTime: number }>) => {
      state.currentAnswer = action.payload.answer;
      state.hasAnswered = true;
      state.responseTime = action.payload.responseTime;
    },
    endSession: (state) => {
      if (state.session) {
        state.session.status = 'completed';
      }
    },
    clearSession: (state) => {
      state.session = null;
      state.currentAnswer = null;
      state.hasAnswered = false;
      state.responseTime = 0;
    },
  },
});

export const {
  setLoading,
  setError,
  setSession,
  updateLeaderboard,
  addParticipant,
  removeParticipant,
  nextQuestion,
  setConnectionStatus,
  submitAnswer,
  endSession,
  clearSession,
} = sessionSlice.actions;

export default sessionSlice.reducer;
