# NiCE AI Quiz Platform - Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      PARTICIPANTS                           │
│              (Web Browser / Tablet / Mobile)                │
└──────────────────┬──────────────────────────────────────────┘
                   │ HTTP/WebSocket
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND APPLICATION                     │
│  (React/Vue SPA - NiCE Branded, Responsive UI)             │
│                                                              │
│  - Quiz Interface (Trainer & Participant)                  │
│  - Question Bank Manager                                   │
│  - Analytics Dashboard                                     │
│  - Leaderboard Display                                     │
└──────────────────┬──────────────────────────────────────────┘
                   │ REST API / GraphQL / WebSocket
                   ▼
┌─────────────────────────────────────────────────────────────┐
│                      API GATEWAY / LOAD BALANCER            │
│              (Optional - For scalability)                   │
└──────────────────┬──────────────────────────────────────────┘
                   │
        ┌──────────┼──────────┬──────────┐
        ▼          ▼          ▼          ▼
┌──────────────┐ ┌────────┐ ┌────────┐ ┌──────────┐
│ REST API     │ │WebSocket│ │GraphQL │ │Real-time │
│(Node/Express)│ │Server   │ │Server  │ │Updates   │
└──────┬───────┘ └────┬───┘ └───┬────┘ └─────┬────┘
       │              │         │            │
       └──────────────┼─────────┼────────────┘
                      ▼
       ┌──────────────────────────────────────┐
       │     BACKEND APPLICATION LAYER        │
       │  (Node.js/Express or Python/FastAPI) │
       │                                      │
       │  - Authentication & Authorization   │
       │  - Quiz Business Logic               │
       │  - Question Management               │
       │  - Scoring Engine                    │
       │  - Real-time Session Management     │
       │  - Reporting Engine                  │
       └────────────┬─────────────────────────┘
                    │
        ┌───────────┼────────────┬──────────┐
        ▼           ▼            ▼          ▼
   ┌─────────┐ ┌──────────┐ ┌─────────┐ ┌──────────┐
   │Database │ │ AI       │ │ Cache   │ │ File     │
   │(SQL)    │ │ Service  │ │(Redis)  │ │ Storage  │
   │         │ │(Python)  │ │         │ │(S3/Blob) │
   └────┬────┘ └────┬─────┘ └────┬────┘ └────┬─────┘
        │            │            │           │
        └────────────┼────────────┼───────────┘
                     ▼
        ┌──────────────────────────────────┐
        │   INFRASTRUCTURE & DEPLOYMENT    │
        │   (Blue Hopper / Cloud Provider) │
        └──────────────────────────────────┘
```

## Component Architecture

### 1. Frontend Layer

**Technology**: React/Vue.js with TypeScript

**Key Components**:

```
src/
├── components/
│   ├── QuizBuilder/          # Quiz creation wizard
│   ├── QuestionBank/         # Question management
│   ├── LiveQuiz/             # Real-time quiz display
│   ├── Leaderboard/          # Live ranking display
│   ├── Analytics/            # Reporting & insights
│   ├── TrainerDashboard/     # Control panel
│   └── Common/               # Shared components
├── pages/
│   ├── Login
│   ├── Dashboard
│   ├── QuizCreate
│   ├── QuizRun
│   └── Reports
├── services/
│   ├── api/                  # API client
│   ├── websocket/            # Real-time updates
│   └── auth/                 # Authentication
└── styles/
    └── nice-branding/        # NiCE design tokens
```

**Styling**: NiCE Design System
- Custom CSS/SCSS following NiCE branding
- Responsive breakpoints (mobile, tablet, desktop)
- Accessibility standards (WCAG 2.1 AA)

### 2. Backend Layer

**Technology**: Node.js with Express / Python with FastAPI

**Architecture Pattern**: Layered Architecture

```
src/
├── api/
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── quizzes.ts
│   │   ├── questions.ts
│   │   ├── sessions.ts
│   │   └── reports.ts
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Auth, logging, etc.
│   └── validators/           # Input validation
│
├── services/
│   ├── quiz.service.ts       # Quiz business logic
│   ├── scoring.service.ts    # Points calculation
│   ├── leaderboard.service.ts # Ranking logic
│   ├── question.service.ts   # Question management
│   ├── session.service.ts    # Quiz session management
│   ├── ai.service.ts         # AI integration
│   └── report.service.ts     # Analytics
│
├── models/
│   ├── User.ts
│   ├── Quiz.ts
│   ├── Question.ts
│   ├── QuizSession.ts
│   ├── Response.ts
│   └── Report.ts
│
├── database/
│   ├── connection.ts
│   ├── repositories/         # Data access layer
│   └── migrations/
│
├── websocket/
│   ├── handlers/
│   └── events/               # Real-time event definitions
│
└── utils/
    ├── logger.ts
    ├── errors.ts
    └── helpers.ts
```

### 3. Database Layer

**Technology**: PostgreSQL

**Key Tables**:

```sql
-- Users & Authentication
Users (id, email, name, role, password_hash, created_at)
Trainers (id, user_id, department, organization)

-- Quiz Hierarchy
Products (id, name, description)
Courses (id, product_id, name, description)
Quizzes (id, course_id, name, description, created_by, is_locked, created_at)
QuizVersions (id, quiz_id, version, changes, created_at)

-- Question Bank
Questions (id, course_id, topic, type, content, correct_answer, points, 
           difficulty, image_url, created_by, created_at)
QuestionOptions (id, question_id, option_text, is_correct)
QuestionTags (id, question_id, tag)

-- Quiz Sessions
QuizSessions (id, quiz_id, trainer_id, status, start_time, end_time, 
              max_participants, configuration)
SessionParticipants (id, session_id, participant_name, nickname, 
                     ip_address, joined_at)

-- Responses & Scoring
ParticipantResponses (id, session_id, participant_id, question_id, 
                      answer, response_time, points_earned, created_at)
SessionScores (id, session_id, participant_id, total_points, rank, 
               accuracy_rate)

-- Reports
QuizReports (id, quiz_id, session_id, report_data, created_at)
TrainerMetrics (id, trainer_id, quiz_id, metrics, created_at)
```

### 4. AI Service Layer

**Technology**: Python with FastAPI / LangChain

**Responsibilities**:
- Generate questions from topic/course
- Validate question quality
- Suggest difficulty levels
- Analyze commonly missed questions
- Generate quiz recommendations

**Endpoints**:
```
POST /api/ai/generate-questions
  Input: topic, count, difficulty, question_type
  Output: list of generated questions

POST /api/ai/validate-question
  Input: question object
  Output: quality score, feedback

POST /api/ai/suggest-difficulty
  Input: question text, course context
  Output: difficulty level

POST /api/ai/analyze-performance
  Input: session data
  Output: insights, recommendations
```

### 5. Real-time Communication

**Technology**: WebSocket (Socket.io / native WebSocket)

**Events**:

```javascript
// Participant events
socket.on('join-quiz', (sessionId, participantInfo))
socket.on('submit-answer', (questionId, answer, responseTime))
socket.on('disconnect', () => {})

// Trainer events
socket.on('start-quiz', (sessionId))
socket.on('next-question', (sessionId))
socket.on('show-answers', (sessionId))
socket.on('end-quiz', (sessionId))

// Broadcast events
socket.emit('question-updated', (question))
socket.emit('leaderboard-updated', (scores))
socket.emit('quiz-ended', (results))
socket.emit('participant-joined', (participantInfo))
socket.emit('participant-left', (participantId))
```

### 6. Caching Layer

**Technology**: Redis

**Use Cases**:
- Cache active quiz sessions
- Store leaderboard scores (real-time)
- Cache frequently accessed questions
- Session state management

**Key Redis Structures**:
```
quiz:session:{sessionId}:scores -> SORTED SET (for leaderboard)
quiz:session:{sessionId}:state -> HASH (session metadata)
question:{questionId} -> STRING (cached question)
user:session:{sessionId} -> SET (active participants)
```

### 7. File Storage

**Technology**: S3 / Azure Blob Storage / Local Storage (development)

**Purpose**:
- Store quiz question images
- Store diagrams and screenshots
- Store participant response attachments
- Generate PDF reports

**Structure**:
```
/questions/{quizId}/{questionId}/image.png
/sessions/{sessionId}/responses/
/reports/{reportId}/report.pdf
```

## Data Flow Examples

### Quiz Creation Flow

```
1. Trainer creates quiz
   Frontend: Quiz Builder → Backend API: POST /api/quizzes
   
2. Backend validates & stores
   - Validate quiz metadata
   - Create quiz record
   - Store questions
   - Create version record
   
3. Return quiz ID to frontend
   Frontend: Redirect to quiz dashboard
```

### Quiz Execution Flow

```
1. Trainer starts quiz
   Frontend: Start button → Backend: POST /api/sessions
   Backend: Create session, generate WebSocket token
   
2. Participants join
   - Frontend: Enter name/nickname
   - WebSocket: emit 'join-quiz'
   - Backend: Add participant, broadcast update
   
3. Show question
   Trainer clicks "Next"
   → WebSocket: emit 'show-question'
   → All clients: display question
   → Timer starts
   
4. Participants answer
   - Frontend: Submit answer
   - Backend: Validate, calculate points
   - WebSocket: Update leaderboard
   
5. Trainer controls answer reveal
   Trainer clicks "Show Answers"
   → All clients: display correct answer
   → Trainer discusses if needed
   
6. Next question or end
   Repeat or end session
```

### Real-time Leaderboard Update

```
Participant submits answer
  ↓
Backend: POST /api/responses
  ├─ Validate answer
  ├─ Calculate points (correct_factor + speed_factor)
  ├─ Update database
  └─ Update Redis cache
  ↓
WebSocket: emit 'score-updated'
  ↓
All clients: 
  ├─ Update local leaderboard
  ├─ Re-sort participants
  └─ Animate score change
```

## Security Architecture

### Authentication
- JWT-based authentication
- Refresh token rotation
- Secure session management

### Authorization
- Role-based access control (RBAC)
  - Admin: Full platform access
  - Trainer: Create & run quizzes, view own reports
  - Participant: Answer quizzes
  
### Data Protection
- HTTPS/TLS for all communication
- Sensitive data encrypted at rest
- Input validation & sanitization
- SQL injection prevention (parameterized queries)

### API Security
- Rate limiting per user/IP
- CORS configuration
- CSRF token validation
- API key rotation for AI service

## Scalability Considerations

### Horizontal Scaling
- Stateless API servers (can add/remove instances)
- Load balancer for traffic distribution
- Database connection pooling

### Caching Strategy
- Redis for session state
- HTTP caching headers
- CDN for static assets

### Database Optimization
- Indexes on frequently queried columns
- Partitioning quiz history by date
- Archive old sessions

### WebSocket Scalability
- Redis Pub/Sub for cross-instance messaging
- Connection pooling
- Graceful degradation

## Deployment Architecture

### Environments
1. **Development**: Local machine or dev server
2. **Staging**: Blue Hopper staging environment
3. **Production**: Blue Hopper production environment

### CI/CD Pipeline
```
Git Commit
  ↓
GitHub Actions / GitLab CI
  ├─ Lint & Format Check
  ├─ Unit Tests
  ├─ Integration Tests
  └─ Build Docker Images
  ↓
Push to Registry
  ↓
Deploy to Staging
  ├─ Smoke Tests
  └─ Performance Tests
  ↓
Approve & Deploy to Production
```

### Infrastructure as Code
- Terraform / CloudFormation for infrastructure
- Docker Compose for local development
- Kubernetes for production (optional)

## Performance Targets

| Metric | Target |
|--------|--------|
| Page Load Time | < 2s |
| API Response Time | < 200ms (p95) |
| Leaderboard Update | < 500ms |
| WebSocket Latency | < 100ms |
| Database Query | < 100ms (p95) |
| Concurrent Users | 100+ per session |
| Session Throughput | 1000+ sessions/day |

## Disaster Recovery

- Database backups: Daily + continuous replication
- Point-in-time recovery: 30-day retention
- Test recovery: Monthly
- RTO: < 1 hour
- RPO: < 5 minutes
