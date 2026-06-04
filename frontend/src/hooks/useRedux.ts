import React from 'react';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '@store/store';

// Export pre-typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Auth Hook
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    isLoading: auth.isLoading,
    error: auth.error,
    dispatch,
  };
};

// Quiz Hook
export const useQuiz = () => {
  const dispatch = useAppDispatch();
  const quiz = useAppSelector((state) => state.quiz);

  return {
    quizzes: quiz.quizzes,
    currentQuiz: quiz.currentQuiz,
    draftQuiz: quiz.draftQuiz,
    questions: quiz.questions,
    isLoading: quiz.isLoading,
    error: quiz.error,
    pagination: quiz.pagination,
    dispatch,
  };
};

// Session Hook
export const useSession = () => {
  const dispatch = useAppDispatch();
  const session = useAppSelector((state) => state.session);

  return {
    session: session.session,
    isLoading: session.isLoading,
    error: session.error,
    isConnected: session.isConnected,
    currentAnswer: session.currentAnswer,
    hasAnswered: session.hasAnswered,
    responseTime: session.responseTime,
    dispatch,
  };
};
