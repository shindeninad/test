# Setup & Development Guide

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- PostgreSQL 14 or higher
- Git

## Project Structure

```
NiCE-AI-Quiz-Platform/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.tsx
│   ├── package.json
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── app.ts
│   ├── tests/
│   ├── package.json
│   └── tsconfig.json
│
├── database/
│   ├── migrations/
│   ├── seeds/
│   └── schema.sql
│
├── ai-service/
│   ├── src/
│   ├── tests/
│   └── requirements.txt
│
└── docs/
    ├── REQUIREMENTS.md
    ├── SETUP.md
    ├── API.md
    └── ARCHITECTURE.md
```

## Frontend Setup

### Installation

```bash
cd frontend
npm install
```

### Environment Variables

Create `.env.local`:

```
REACT_APP_API_BASE_URL=http://localhost:3001
REACT_APP_WS_URL=ws://localhost:3001
```

### Running Development Server

```bash
npm start
```

Frontend will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## Backend Setup

### Installation

```bash
cd backend
npm install
```

### Environment Variables

Create `.env`:

```
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/nice_quiz
JWT_SECRET=your-secret-key-here
AI_API_KEY=your-openai-key
AI_API_URL=https://api.openai.com/v1
```

### Database Setup

```bash
# Create database
createdb nice_quiz

# Run migrations
npm run migrate

# Seed sample data (optional)
npm run seed
```

### Running Development Server

```bash
npm run dev
```

Backend API will be available at `http://localhost:3001`

## Database Setup

### PostgreSQL Installation

macOS with Homebrew:
```bash
brew install postgresql
brew services start postgresql
```

Linux (Ubuntu):
```bash
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

Windows:
Download from https://www.postgresql.org/download/windows/

### Database Creation

```bash
psql -U postgres
CREATE DATABASE nice_quiz;
```

### Running Migrations

```bash
cd database
psql -U postgres -d nice_quiz -f schema.sql
```

## AI Service Setup

### Installation

```bash
cd ai-service
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Environment Variables

Create `.env`:

```
OPENAI_API_KEY=your-key-here
MODEL=gpt-4
TEMPERATURE=0.7
```

### Running AI Service

```bash
python main.py
```

## Running Tests

### Frontend Tests

```bash
cd frontend
npm test
```

### Backend Tests

```bash
cd backend
npm test
```

### AI Service Tests

```bash
cd ai-service
pytest tests/
```

## Docker Setup (Optional)

Build containers:

```bash
docker-compose build
```

Start services:

```bash
docker-compose up
```

## Accessing the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Docs**: http://localhost:3001/api/docs

## Development Workflow

1. Create a feature branch: `git checkout -b feat/feature-name`
2. Make changes
3. Write/update tests
4. Run linter: `npm run lint`
5. Commit changes: `git commit -m "feat: description"`
6. Push branch: `git push origin feat/feature-name`
7. Create Pull Request

## Troubleshooting

### Port Already in Use

Change port in `.env`:
```
PORT=3001  # Change to different port
```

### Database Connection Error

Check PostgreSQL is running:
```bash
psql -U postgres -c "SELECT 1;"
```

### Module Not Found

Clear node_modules and reinstall:
```bash
rm -rf node_modules
npm install
```

## Next Steps

1. Read [ARCHITECTURE.md](ARCHITECTURE.md) for system design
2. Review [API.md](API.md) for endpoint documentation
3. Check [REQUIREMENTS.md](REQUIREMENTS.md) for detailed specs
4. Run tests to verify setup: `npm test`
