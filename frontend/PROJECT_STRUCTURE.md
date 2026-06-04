# Frontend Project Structure

```
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/
│   │   ├── Common/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   │
│   │   ├── Quiz/
│   │   │   ├── QuizBuilder.tsx
│   │   │   ├── QuizPreview.tsx
│   │   │   ├── QuestionForm.tsx
│   │   │   └── QuizList.tsx
│   │   │
│   │   ├── QuestionBank/
│   │   │   ├── QuestionBankManager.tsx
│   │   │   ├── QuestionForm.tsx
│   │   │   ├── QuestionList.tsx
│   │   │   └── QuestionSearch.tsx
│   │   │
│   │   ├── LiveQuiz/
│   │   │   ├── TrainerDashboard.tsx
│   │   │   ├── QuestionDisplay.tsx
│   │   │   ├── ParticipantView.tsx
│   │   │   └── SessionControls.tsx
│   │   │
│   │   ├── Leaderboard/
│   │   │   ├── Leaderboard.tsx
│   │   │   ├── LeaderboardCard.tsx
│   │   │   └── ParticipantRow.tsx
│   │   │
│   │   ├── Analytics/
│   │   │   ├── ReportDashboard.tsx
│   │   │   ├── QuizReport.tsx
│   │   │   ├── TrainerMetrics.tsx
│   │   │   └── Charts.tsx
│   │   │
│   │   └── Auth/
│   │       ├── LoginForm.tsx
│   │       ├── RegisterForm.tsx
│   │       └── ProtectedRoute.tsx
│   │
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── QuizBuilderPage.tsx
│   │   ├── QuestionBankPage.tsx
│   │   ├── LiveQuizPage.tsx
│   │   ├── ReportsPage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   ├── services/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── quiz.api.ts
│   │   │   ├── question.api.ts
│   │   │   ├── session.api.ts
│   │   │   ├── auth.api.ts
│   │   │   └── report.api.ts
│   │   │
│   │   ├── websocket/
│   │   │   ├── socket.ts
│   │   │   ├── listeners.ts
│   │   │   └── emitters.ts
│   │   │
│   │   └── auth/
│   │       ├── authService.ts
│   │       └── tokenManager.ts
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useQuiz.ts
│   │   ├── useSession.ts
│   │   ├── useLeaderboard.ts
│   │   └── useApi.ts
│   │
│   ├── store/
│   │   ├── authSlice.ts
│   │   ├── quizSlice.ts
│   │   ├── sessionSlice.ts
│   │   ├── leaderboardSlice.ts
│   │   └── store.ts
│   │
│   ├── styles/
│   │   ├── nice-branding/
│   │   │   ├── colors.scss
│   │   │   ├── typography.scss
│   │   │   ├── spacing.scss
│   │   │   ├── buttons.scss
│   │   │   ├── forms.scss
│   │   │   └── components.scss
│   │   │
│   │   ├── theme/
│   │   │   ├── light.scss
│   │   │   ├── dark.scss
│   │   │   └── variables.scss
│   │   │
│   │   └── globals.scss
│   │
│   ├── types/
│   │   ├── index.ts
│   │   ├── api.ts
│   │   ├── quiz.ts
│   │   ├── user.ts
│   │   └── websocket.ts
│   │
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   ├── validators.ts
│   │   └── formatters.ts
│   │
│   ├── App.tsx
│   ├── App.scss
│   └── index.tsx
│
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── tsconfig.json
├── package.json
└── README.md
