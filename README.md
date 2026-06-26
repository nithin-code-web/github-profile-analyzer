# GitHub Profile Analyzer API

A backend service built with Node.js, Express.js, Prisma, PostgreSQL, and the GitHub Public API. It analyzes GitHub user profiles, stores useful insights in PostgreSQL, caches analyzed profiles, and exposes REST APIs to read the saved profile data.

## Live Demo

API Base URL:

```text
https://github-profile-analyzer-production-89e6.up.railway.app/
```

## Features

* Fetch GitHub user profile data using the GitHub Public API
* Analyze and store profile insights in PostgreSQL
* Cache previously analyzed profiles to reduce unnecessary GitHub API calls
* Retrieve all analyzed profiles ordered by profile score
* Retrieve a specific profile by username
* Environment variable support using dotenv
* Prisma ORM setup for Railway PostgreSQL
* Error handling for invalid GitHub usernames

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Prisma
* GitHub Public API
* Axios
* Dotenv
* Railway

## Project Structure

```text
src/
|-- config/
|   `-- db.js
|-- controllers/
|   `-- githubControllers.js
|-- routes/
|   `-- githubRoutes.js
`-- app.js

prisma/
|-- migrations/
|-- prismaClient.js
`-- schema.prisma
```

## Database Model

Prisma model: `GithubProfile`

| Field            | Type      | Notes                     |
| ---------------- | --------- | ------------------------- |
| id               | Int       | Primary key               |
| username         | String    | Unique GitHub username    |
| name             | String?   | GitHub display name       |
| bio              | String?   | GitHub bio                |
| followers        | Int       | Follower count            |
| following        | Int       | Following count           |
| publicRepos      | Int       | Public repository count   |
| avatarUrl        | String?   | Avatar image URL          |
| githubUrl        | String?   | GitHub profile URL        |
| company          | String?   | Company value from GitHub |
| location         | String?   | Location value from GitHub |
| accountCreatedAt | DateTime? | GitHub account creation   |
| profileScore     | Int       | Calculated profile score  |
| analyzedAt       | DateTime  | Saved analysis timestamp  |

Database table: `github_profiles`

## Profile Score Formula

```text
Profile Score = (Followers * 2) + (Public Repositories * 5)
```

This score provides a simple metric representing a user's GitHub popularity and repository activity.

## API Endpoints

### Analyze GitHub Profile

```http
POST /api/github/analyze/:username
```

Example:

```http
POST /api/github/analyze/torvalds
```

### Get All Profiles

```http
GET /api/github/profiles
```

### Get Profile By Username

```http
GET /api/github/profile/:username
```

Example:

```http
GET /api/github/profile/torvalds
```

## Example Response

```json
{
  "success": true,
  "source": "GitHub API",
  "data": {
    "id": 1,
    "username": "torvalds",
    "followers": 305052,
    "public_repos": 11,
    "profile_score": 610159,
    "analyzed_at": "2026-06-26T00:00:00.000Z"
  }
}
```

## Environment Variables

Create a `.env` file in the root directory.

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require"
PORT=5000
```

## Installation

```bash
git clone https://github.com/nithin-code-web/github-profile-analyzer
cd github-profile-analyzer
npm install
```

## Prisma Commands

```bash
npx prisma generate
npx prisma migrate deploy
```

For local development after changing `schema.prisma`:

```bash
npx prisma migrate dev
```

## Run Development Server

```bash
npm run dev
```

## Run Production Server

```bash
npm start
```

## Deployment

The application is deployed on Railway and uses Railway PostgreSQL through Prisma.

Live URL:

```text
https://github-profile-analyzer-production-89e6.up.railway.app/
```

## Author

Nithin Budime

Backend Developer | Full Stack Development Learner
