# NiCE AI Quiz Platform - REST API Documentation

## Base URL

```
http://localhost:3001/api
```

## Authentication

All endpoints (except `/auth/login` and `/auth/register`) require JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

---

## Authentication Endpoints

### POST /auth/register

Register a new trainer account.

**Request Body:**
```json
{
  "email": "trainer@example.com",
  "password": "securePassword123",
  "name": "John Trainer",
  "department": "Sales Training"
}
```

**Response (201):**
```json
{
  "id": "user123",
  "email": "trainer@example.com",
  "name": "John Trainer",
  "role": "trainer",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### POST /auth/login

Authenticate and get JWT token.

**Request Body:**
```json
{
  "email": "trainer@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "id": "user123",
  "email": "trainer@example.com",
  "name": "John Trainer",
  "role": "trainer",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### POST /auth/refresh

Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## Quiz Endpoints

### GET /quizzes

List all quizzes (paginated).

**Query Parameters:**
- `page` (integer, default: 1)
- `limit` (integer, default: 20)
- `course_id` (string, optional) - Filter by course
- `search` (string, optional) - Search quiz title

**Response (200):**
```json
{
  "data": [
    {
      "id": "quiz123",
      "title": "WFM Fundamentals",
      "description": "Basic WFM concepts",
      "courseId": "course456",
      "courseName": "Forecasting",
      "productId": "product789",
      "productName": "WFM",
      "createdBy": "user123",
      "createdAt": "2026-06-04T10:00:00Z",
      "isLocked": false,
      "questionCount": 5,
      "estimatedDuration": 300
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 20,
    "pages": 3
  }
}
```

### POST /quizzes

Create a new quiz.

**Request Body:**
```json
{
  "title": "WFM Fundamentals",
  "description": "Basic WFM concepts",
  "courseId": "course456",
  "questions": [
    {
      "questionId": "q1",
      "order": 1
    }
  ],
  "timing": {
    "perQuestion": 30,
    "showAnswerDelay": 2
  }
}
```

**Response (201):**
```json
{
  "id": "quiz123",
  "title": "WFM Fundamentals",
  "description": "Basic WFM concepts",
  "courseId": "course456",
  "createdBy": "user123",
  "createdAt": "2026-06-04T10:00:00Z",
  "isLocked": false
}
```

### GET /quizzes/:id

Get quiz details.

**Response (200):**
```json
{
  "id": "quiz123",
  "title": "WFM Fundamentals",
  "description": "Basic WFM concepts",
  "courseId": "course456",
  "courseName": "Forecasting",
  "productId": "product789",
  "productName": "WFM",
  "createdBy": "user123",
  "createdAt": "2026-06-04T10:00:00Z",
  "isLocked": false,
  "questions": [
    {
      "id": "q1",
      "order": 1,
      "type": "multiple_choice",
      "content": "What is forecasting?",
      "imageUrl": null,
      "options": [
        { "id": "opt1", "text": "Answer 1", "isCorrect": true },
        { "id": "opt2", "text": "Answer 2", "isCorrect": false }
      ]
    }
  ],
  "timing": {
    "perQuestion": 30,
    "showAnswerDelay": 2
  }
}
```

### PUT /quizzes/:id

Update quiz details.

**Request Body:**
```json
{
  "title": "WFM Fundamentals v2",
  "description": "Updated description",
  "isLocked": true
}
```

**Response (200):**
```json
{
  "id": "quiz123",
  "title": "WFM Fundamentals v2",
  "description": "Updated description",
  "isLocked": true
}
```

### DELETE /quizzes/:id

Delete a quiz.

**Response (204):** No content

### POST /quizzes/:id/share

Share quiz with other trainers.

**Request Body:**
```json
{
  "trainerIds": ["user456", "user789"],
  "permission": "read"
}
```

**Response (200):**
```json
{
  "message": "Quiz shared successfully",
  "sharedWith": ["user456", "user789"]
}
```

---

## Question Bank Endpoints

### GET /questions

List all questions (paginated).

**Query Parameters:**
- `page` (integer, default: 1)
- `limit` (integer, default: 20)
- `course_id` (string, optional)
- `topic` (string, optional)
- `difficulty` (string, optional) - easy, medium, hard
- `type` (string, optional) - multiple_choice, matching, image, etc.

**Response (200):**
```json
{
  "data": [
    {
      "id": "q1",
      "type": "multiple_choice",
      "content": "What is forecasting?",
      "topic": "Forecasting Basics",
      "difficulty": "easy",
      "pointValue": 10,
      "imageUrl": null,
      "createdBy": "user123",
      "createdAt": "2026-06-04T10:00:00Z",
      "options": [
        { "id": "opt1", "text": "Answer 1", "isCorrect": true },
        { "id": "opt2", "text": "Answer 2", "isCorrect": false }
      ]
    }
  ],
  "pagination": { "total": 100, "page": 1, "limit": 20, "pages": 5 }
}
```

### POST /questions

Create a new question.

**Request Body:**
```json
{
  "type": "multiple_choice",
  "content": "What is forecasting?",
  "courseId": "course456",
  "topic": "Forecasting Basics",
  "difficulty": "easy",
  "pointValue": 10,
  "imageUrl": null,
  "options": [
    { "text": "Answer 1", "isCorrect": true },
    { "text": "Answer 2", "isCorrect": false }
  ]
}
```

**Response (201):**
```json
{
  "id": "q1",
  "type": "multiple_choice",
  "content": "What is forecasting?",
  "courseId": "course456",
  "topic": "Forecasting Basics",
  "difficulty": "easy",
  "pointValue": 10,
  "createdBy": "user123",
  "createdAt": "2026-06-04T10:00:00Z"
}
```

### GET /questions/:id

Get question details.

**Response (200):**
```json
{
  "id": "q1",
  "type": "multiple_choice",
  "content": "What is forecasting?",
  "courseId": "course456",
  "topic": "Forecasting Basics",
  "difficulty": "easy",
  "pointValue": 10,
  "imageUrl": null,
  "options": [
    { "id": "opt1", "text": "Answer 1", "isCorrect": true },
    { "id": "opt2", "text": "Answer 2", "isCorrect": false }
  ],
  "createdBy": "user123",
  "createdAt": "2026-06-04T10:00:00Z"
}
```

### PUT /questions/:id

Update question.

**Response (200):** Updated question object

### DELETE /questions/:id

Delete question.

**Response (204):** No content

---

## Quiz Session Endpoints

### POST /sessions

Start a new quiz session.

**Request Body:**
```json
{
  "quizId": "quiz123",
  "maxParticipants": 50,
  "settings": {
    "showLeaderboard": true,
    "showAnswersImmediately": false,
    "randomizeQuestions": true
  }
}
```

**Response (201):**
```json
{
  "id": "session123",
  "quizId": "quiz123",
  "trainerId": "user123",
  "status": "active",
  "startedAt": "2026-06-04T10:00:00Z",
  "participantCount": 0,
  "currentQuestionIndex": 0,
  "sessionToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

### GET /sessions/:id

Get session details and status.

**Response (200):**
```json
{
  "id": "session123",
  "quizId": "quiz123",
  "trainerId": "user123",
  "status": "active",
  "startedAt": "2026-06-04T10:00:00Z",
  "currentQuestionIndex": 0,
  "currentQuestion": {
    "id": "q1",
    "type": "multiple_choice",
    "content": "What is forecasting?",
    "options": [
      { "id": "opt1", "text": "Answer 1" },
      { "id": "opt2", "text": "Answer 2" }
    ]
  },
  "participants": [
    {
      "id": "p1",
      "name": "John",
      "nickname": "JD",
      "joinedAt": "2026-06-04T10:00:05Z"
    }
  ],
  "leaderboard": [
    {
      "participantId": "p1",
      "name": "John",
      "score": 100,
      "correctAnswers": 5
    }
  ]
}
```

### POST /sessions/:id/next-question

Advance to next question (trainer only).

**Response (200):**
```json
{
  "currentQuestionIndex": 1,
  "currentQuestion": {
    "id": "q2",
    "type": "multiple_choice",
    "content": "Next question?"
  }
}
```

### POST /sessions/:id/show-answers

Reveal correct answers (trainer only).

**Request Body:**
```json
{
  "delay": 2
}
```

**Response (200):**
```json
{
  "message": "Answers will be shown in 2 seconds",
  "correctAnswers": [
    { "questionId": "q1", "correctOptionId": "opt1" }
  ]
}
```

### POST /sessions/:id/end

End quiz session.

**Response (200):**
```json
{
  "id": "session123",
  "status": "completed",
  "endedAt": "2026-06-04T10:15:00Z",
  "totalParticipants": 25,
  "results": {
    "avgScore": 75.5,
    "highestScore": 100,
    "lowestScore": 40
  }
}
```

---

## Response Endpoints

### POST /sessions/:sessionId/responses

Submit participant answer.

**Request Body:**
```json
{
  "questionId": "q1",
  "answer": "opt1",
  "responseTime": 8500
}
```

**Response (200):**
```json
{
  "id": "resp123",
  "questionId": "q1",
  "answer": "opt1",
  "isCorrect": true,
  "pointsEarned": 10,
  "responseTime": 8500,
  "totalScore": 100
}
```

### GET /sessions/:sessionId/responses

Get all responses for a session.

**Response (200):**
```json
{
  "data": [
    {
      "id": "resp123",
      "questionId": "q1",
      "participantId": "p1",
      "answer": "opt1",
      "isCorrect": true,
      "pointsEarned": 10,
      "responseTime": 8500,
      "submittedAt": "2026-06-04T10:00:10Z"
    }
  ]
}
```

---

## Report Endpoints

### GET /reports

List quiz reports.

**Query Parameters:**
- `startDate` (ISO string, optional)
- `endDate` (ISO string, optional)
- `courseId` (string, optional)
- `trainerId` (string, optional)

**Response (200):**
```json
{
  "data": [
    {
      "id": "report123",
      "quizId": "quiz123",
      "sessionId": "session123",
      "trainerId": "user123",
      "courseId": "course456",
      "completedAt": "2026-06-04T10:15:00Z",
      "totalParticipants": 25,
      "avgScore": 75.5,
      "highestScore": 100,
      "lowestScore": 40
    }
  ]
}
```

### GET /reports/:id

Get detailed report.

**Response (200):**
```json
{
  "id": "report123",
  "quizId": "quiz123",
  "sessionId": "session123",
  "trainerId": "user123",
  "courseId": "course456",
  "quizTitle": "WFM Fundamentals",
  "completedAt": "2026-06-04T10:15:00Z",
  "duration": 900,
  "totalParticipants": 25,
  "avgScore": 75.5,
  "scores": [
    {
      "participantId": "p1",
      "participantName": "John",
      "score": 100,
      "accuracy": 100,
      "avgResponseTime": 8500
    }
  ],
  "questionAnalysis": [
    {
      "questionId": "q1",
      "question": "What is forecasting?",
      "correctRate": 96,
      "avgResponseTime": 8500,
      "difficulty": "easy"
    }
  ]
}
```

### GET /reports/trainer/:trainerId/metrics

Get trainer performance metrics.

**Query Parameters:**
- `period` (string) - day, week, month, year

**Response (200):**
```json
{
  "trainerId": "user123",
  "period": "month",
  "quizzesRun": 15,
  "totalParticipants": 325,
  "avgSessionScore": 78.3,
  "mostUsedQuiz": "quiz123",
  "topPerformingCourse": "course456",
  "trend": [
    { "date": "2026-06-01", "quizzesRun": 2, "avgScore": 75 }
  ]
}
```

---

## Content Hierarchy Endpoints

### GET /products

List all products.

**Response (200):**
```json
{
  "data": [
    { "id": "prod1", "name": "WFM", "description": "Workforce Management" },
    { "id": "prod2", "name": "Engage", "description": "Customer Engagement" }
  ]
}
```

### GET /products/:productId/courses

List courses for a product.

**Response (200):**
```json
{
  "data": [
    { "id": "course1", "name": "Forecasting", "productId": "prod1" },
    { "id": "course2", "name": "Scheduling", "productId": "prod1" }
  ]
}
```

### GET /courses/:courseId/questions

List questions for a course.

**Response (200):**
```json
{
  "data": [
    { "id": "q1", "content": "Question 1", "type": "multiple_choice" }
  ]
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Invalid request body",
  "details": { "field": "email", "message": "Invalid email format" }
}
```

### 401 Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Missing or invalid token"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden",
  "message": "You do not have permission to access this resource"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "Quiz not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred",
  "requestId": "req123456"
}
```

---

## Rate Limiting

- **Default**: 100 requests per 15 minutes per user
- **Headers**: 
  - `X-RateLimit-Limit`: Total requests allowed
  - `X-RateLimit-Remaining`: Requests remaining
  - `X-RateLimit-Reset`: Unix timestamp when limit resets

---

## Pagination

All list endpoints support pagination:

**Query Parameters:**
- `page` (integer, default: 1)
- `limit` (integer, default: 20, max: 100)

**Response includes:**
```json
{
  "data": [...],
  "pagination": {
    "total": 500,
    "page": 1,
    "limit": 20,
    "pages": 25
  }
}
```
