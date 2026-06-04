# NiCE AI Quiz Platform

A modern, scalable quiz platform designed for enterprise training with AI-powered capabilities, built as an alternative to Kahoot with enhanced flexibility and control.

## Overview

The NiCE AI Quiz Platform is a centrally hosted, trainer-centric solution designed to deliver engaging, competitive learning experiences. It supports dynamic quiz generation, comprehensive analytics, and trainer-controlled quiz delivery with real-time leaderboard tracking.

## Key Features

### Platform Core
- **Single Centralized Environment**: Hosted in the Blue Hopper environment
- **Multi-Business Unit Support**: Initially designed for Training, extensible to CXone and other units
- **Individual Trainer Access**: Each trainer can create, manage, and run quizzes independently
- **Engagement-Focused**: Emphasizes competition, points-based scoring, and fun factor

### Quiz Management
- **Question Banks**: Centralized, reusable question repositories organized by Product → Course → Topic
- **Dynamic Quiz Generation**: Generate quizzes on-the-fly from selected question pools
- **Quiz Hierarchy**: Support for folder-like structure (Product/Course/Quiz/Question Bank)
- **Quiz Sharing**: Trainers can share and reuse quizzes with other trainers
- **Quiz Locking**: Ability to lock quizzes so only admins can modify approved content
- **Configurable Timing**: Per-question timing configuration

### Scoring & Leaderboard
- **Dual-Factor Scoring**: Points based on correctness + response speed (reaction time)
- **Participant Names**: Support for real names and optional nicknames
- **Live Leaderboard**: Display top performers (e.g., Top 4) during quiz execution
- **Competitive Experience**: Real-time ranking and engagement metrics

### Advanced Question Types
- **Multiple Choice** (standard)
- **Image-Based Questions**: Diagrams, screenshots, product interfaces, architecture drawings
- **Matching Exercises**: Connect-the-boxes style interactions
- **Drag-and-Drop**: Interactive question formats
- **No Character Limits**: Full support for rich question content

### Answer Management
- **Trainer-Controlled Display**: Trainer decides when participants see correct answers
- **Flexible Review**: Control answer visibility independently of question progression

### Reporting & Analytics
- **Quiz Details**: Course name, quiz date, product information
- **Trainer Metrics**: Quiz results by trainer, historical reporting, trend analysis
- **Future Analytics**: Participation rates, average scores, most frequently missed questions

### User Interface
- **NiCE Branding**: Full compliance with NiCE colors, styling, and design standards
- **Trainer Controls**: Leaderboard display and trainer-controlled question progression
- **Responsive Design**: Works across desktop and tablet devices

## Project Structure

```
NiCE-AI-Quiz-Platform/
├── frontend/                 # React/Vue frontend application
├── backend/                  # Node.js/Express API server
├── database/                 # Database schemas and migrations
├── ai-service/              # AI-powered question generation
├── docs/                     # Project documentation
├── tests/                    # Test suites
└── deployment/              # Deployment configurations
```

## Tech Stack

- **Frontend**: [React/Vue - to be determined]
- **Backend**: [Node.js/Express or Python/FastAPI - to be determined]
- **Database**: [PostgreSQL - recommended]
- **AI Integration**: [OpenAI API / Custom ML models]
- **Hosting**: Blue Hopper environment
- **Styling**: NiCE Design System

## Getting Started

See [SETUP.md](docs/SETUP.md) for detailed installation and development instructions.

## Constraints & Requirements

### Performance
- Quiz sessions should remain short and engaging (max 5 minutes recommended)
- Real-time leaderboard updates with minimal latency
- Support for concurrent quiz sessions

### Security
- Trainer authentication and authorization
- Quiz access control (locked vs. unlocked quizzes)
- Secure question bank management

### Scalability
- Support multiple concurrent trainers
- Handle large question banks (1000+ questions)
- Scale to enterprise training environment

## Roadmap

### Phase 1 (MVP)
- [ ] Basic quiz creation and delivery
- [ ] Question bank management
- [ ] Live leaderboard
- [ ] Simple reporting

### Phase 2
- [ ] AI-assisted question generation
- [ ] Advanced question types (matching, drag-and-drop)
- [ ] Enhanced analytics and reporting
- [ ] Quiz sharing between trainers

### Phase 3
- [ ] Full AI question bank expansion
- [ ] Integration with CXone and other business units
- [ ] Advanced performance analytics
- [ ] Mobile app

## Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for contribution guidelines.

## License

[To be determined]

## Support

For issues and questions, please open a GitHub issue or contact the development team.
