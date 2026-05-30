# GitHub Profile Analyzer API

A backend service built with **Node.js, Express.js, MySQL, and GitHub Public API** that analyzes GitHub user profiles, stores useful insights in a MySQL database, and provides APIs to retrieve analyzed profile data.

## Features

* Fetch GitHub user profile data using GitHub Public API
* Analyze and store profile insights
* Store data in MySQL database
* Prevent duplicate API calls using database caching
* Retrieve all analyzed profiles
* Retrieve a specific analyzed profile by username
* Environment variable support using dotenv
* Error handling for invalid GitHub usernames

---

## Tech Stack

* Node.js
* Express.js
* MySQL
* GitHub Public API
* Axios
* Dotenv

---

## Project Structure

```text
src/
├── config/
│   └── db.js
├── controllers/
│   └── githubController.js
├── routes/
│   └── githubRoutes.js
├── app.js
```

---

## Database Schema

Table: `github_profiles`

| Column             | Type                     |
| ------------------ | ------------------------ |
| id                 | INT (PK, AUTO_INCREMENT) |
| username           | VARCHAR(255)             |
| name               | VARCHAR(255)             |
| bio                | TEXT                     |
| followers          | INT                      |
| following          | INT                      |
| public_repos       | INT                      |
| avatar_url         | TEXT                     |
| github_url         | TEXT                     |
| company            | VARCHAR(255)             |
| location           | VARCHAR(255)             |
| account_created_at | DATETIME                 |
| profile_score      | INT                      |
| analyzed_at        | TIMESTAMP                |

---

## Profile Score Formula

```text
Profile Score = (Followers × 2) + (Public Repositories × 5)
```

This score provides a simple measure of profile popularity and repository activity.

---

## API Endpoints

### Analyze GitHub Profile

```http
POST /api/github/analyze/:username
```

Example:

```http
POST /api/github/analyze/torvalds
```

---

### Get All Analyzed Profiles

```http
GET /api/github/profiles
```

---

### Get Profile By Username

```http
GET /api/github/profile/:username
```

Example:

```http
GET /api/github/profile/torvalds
```

---

## Environment Variables

Create a `.env` file in the root directory.

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=github_analyzer
PORT=5000
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd github-profile-analyzer
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file and add the required values.

### Start Server

```bash
npm run dev
```

or

```bash
npm start
```

---

## API Response Example

```json
{
  "success": true,
  "source": "GitHub API",
  "data": {
    "username": "torvalds",
    "followers": 305052,
    "public_repos": 11,
    "profile_score": 610159
  }
}
```

---

## Live Deployment

Backend URL:

```text
Add your deployed API URL here
```

---

## Author

Nithin Budime

Backend Developer | Full Stack Development Learner

```
```
