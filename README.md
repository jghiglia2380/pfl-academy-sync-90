# Sync-90: Personal Finance Literacy Curriculum

A consolidated repository for the Personal Finance Literacy curriculum, combining day 1 and day 2 content with skill builder activities.

## Repository Structure

```
Sync-90/
├── src/
│   ├── components/
│   │   ├── curriculum/
│   │   │   ├── standards/           # One directory per standard
│   │   │   │   ├── standard-1/
│   │   │   │   │   ├── chapters/
│   │   │   │   │   │   ├── 1.1/
│   │   │   │   │   │   │   ├── student/
│   │   │   │   │   │   │   │   ├── day1.md
│   │   │   │   │   │   │   │   └── day2.md
│   │   │   │   │   │   │   └── teacher/
│   │   │   │   │   │   │       ├── guide-day1.md
│   │   │   │   │   │   │       └── guide-day2.md
│   │   │   │   │   │   └── ...
│   │   │   │   └── ...
│   │   │   ├── assets/             # Shared assets
│   │   │   └── architecture.json   # Curriculum architecture
│   │   └── skill/                  # Skill builder components
│   │       ├── standard-1/         # Skill builders for Standard 1
│   │       ├── standard-2/         # Skill builders for Standard 2
│   │       └── ...
│   ├── pages/
│   │   ├── student/                # Student-facing pages
│   │   └── teacher/                # Teacher-facing pages
│   └── assessment/                 # Assessment components
│       ├── templates/              # Assessment templates
│       ├── question-bank/          # Question bank
│       └── rubrics/                # Assessment rubrics
```

## Content Organization

### Curriculum Content
- Organized by standard and chapter
- Each chapter contains:
  - Student-facing content (day1.md, day2.md)
  - Teacher guides (guide-day1.md, guide-day2.md)
  - Associated skill builder activities

### Skill Builders
- Organized by standard
- Each skill builder is a React component
- Mapped to specific standards and chapters in `skill-builder-mapping.json`

### Assessment Library
- Templates for different assessment types
- Question bank organized by standard and chapter
- Rubrics for projects and skill builders

## Development Workflow

1. **Content Development**
   - Create/update curriculum content in markdown
   - Develop skill builder components
   - Update architecture.json as needed

2. **Assessment Development**
   - Create assessment templates
   - Develop question bank
   - Design rubrics

3. **Integration**
   - Map skill builders to standards/chapters
   - Link assessments to content
   - Update documentation

## Getting Started

1. Clone the repository
2. Install dependencies
3. Review the architecture.json file
4. Follow the development workflow

## Contributing

1. Create a new branch for your changes
2. Make your changes
3. Update documentation as needed
4. Submit a pull request

## License

[Add your license information here]

# PFL Academy Admin Dashboard

A Next.js application for managing the PFL Academy curriculum, assessments, and teacher permissions.

## Features

- Curriculum Configuration
- Teacher Permissions Management
- Grade Weighting Configuration
- Assessment Library
- Admin Dashboard

## Prerequisites

- Node.js 18.x or later
- Supabase account
- SMTP server (for email notifications)

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd pfl-academy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file based on `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

4. Update the environment variables in `.env.local` with your Supabase credentials.

## Database Setup

1. Create a new Supabase project
2. Run the SQL schema from `supabase/schema.sql`
3. Set up Row Level Security (RLS) policies as defined in the schema

## Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Deployment

### Vercel Deployment

1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Add the environment variables in the Vercel dashboard
4. Deploy

### Manual Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

## API Routes

- `/api/admin` - Admin dashboard data
- `/api/curriculum` - Curriculum management
- `/api/teachers` - Teacher management
- `/api/grade-weighting` - Grade weighting configuration
- `/api/assessments` - Assessment management

## Database Schema

The application uses the following main tables:

- `users` - User accounts and roles
- `teachers` - Teacher-specific data and permissions
- `standards` - Curriculum standards
- `chapters` - Course chapters
- `assessments` - Assessment data
- `grade_weighting` - Grade distribution configuration
- `activity_log` - System activity tracking

## Authentication

The application uses Supabase Auth for authentication with the following roles:

- `admin` - Full access to all features
- `teacher` - Access to curriculum and assessment management
- `student` - Access to student features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License. 