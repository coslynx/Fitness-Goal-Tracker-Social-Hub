<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
Fitness-Goal-Tracker-Social-Hub
</h1>
<h4 align="center">A web application designed to empower fitness enthusiasts to set, track, and share their fitness goals.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-Next.js-blue" alt="">
  <img src="https://img.shields.io/badge/Frontend-TypeScript,_React,_HTML,_CSS-red" alt="">
  <img src="https://img.shields.io/badge/Backend-Node.js,_Express.js-blue" alt="">
  <img src="https://img.shields.io/badge/Database-PostgreSQL-green" alt="">
  <img src="https://img.shields.io/badge/LLMs-Custom,_Gemini,_OpenAI-black" alt="">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/Fitness-Goal-Tracker-Social-Hub?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/Fitness-Goal-Tracker-Social-Hub?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/Fitness-Goal-Tracker-Social-Hub?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview

This repository houses the source code for the "Fitness Goal Tracker & Social Hub" Minimum Viable Product (MVP), a web application designed to help fitness enthusiasts achieve their goals by providing a user-friendly platform to set, track, and share their progress. This MVP leverages a powerful combination of modern technologies, including React, TypeScript, Next.js, Node.js, Express.js, PostgreSQL, and custom LLMs. It prioritizes a clean and efficient architecture, a robust API layer, and a smooth, engaging user experience.

## 📦 Features

|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🔐 | **User Authentication**   | Secure user login and registration with email/password and potential social login integration using NextAuth.js.                             |
| 🎯 | **Goal Setting**  | Users can set specific fitness goals, defining targets and deadlines.                                                                                                    |
| 📈 | **Progress Tracking** | Visual progress charts and graphs to track users' progress towards their goals.                                                                                                     |
| 💬 | **Social Feed**     | A social feed allows users to share their fitness journeys, achievements, and provide encouragement to others.                                                                                             |
| 👤 | **Profile Management**     | Users can customize their profiles with basic information and potentially add photos.                                                                                                 |
| ⚙️ | **Architecture**   | The codebase employs a modular architecture with clearly defined components for UI, API, and data handling, facilitating maintainability and scalability.             |
| 📄 | **Documentation**  | Detailed README file with instructions on how to set up, run, and deploy the application.                                                                                                        |
| 🧪 | **Testing**        | Comprehensive unit tests for UI components and backend services ensure code robustness and reliability.       |
| ⚡️  | **Performance**    | Optimized frontend rendering and API calls, leveraging techniques like server-side rendering and caching to enhance application speed.   |
| 🔒 | **Security**       | Robust security measures include password hashing, input validation, and secure communication protocols. |
| 🌐 | **API Documentation**| Extensive API documentation details all endpoints, methods, and expected responses, facilitating integration with other applications.   |
| 🔀 | **Version Control**| Utilizes Git for version control with GitHub Actions workflow files for automated build and release processes.|
| 🔌 | **Integrations**   | Potential integrations with fitness trackers, wearable devices, and external APIs to enhance data capture and functionality. |
| 📶 | **Scalability**    | Designed with scalability in mind to handle increased user loads and data volumes in the future.              |

## 📂 Structure

```text
fitness-tracker/
├── src
│   ├── shared
│   │   └── utils
│   │       ├── date
│   │       │   └── formatDate.ts
│   │       ├── string
│   │       │   └── capitalize.ts
│   │       ├── api
│   │       │   ├── apiClient.ts
│   │       │   └── axiosInstance.ts
│   │       ├── constants
│   │       │   ├── errorCodes.ts
│   │       │   └── httpStatusCodes.ts
│   │       ├── types
│   │       │   ├── user.ts
│   │       │   ├── goal.ts
│   │       │   └── post.ts
│   │       └── index.ts
│   ├── frontend
│   │   ├── app
│   │   │   ├── src
│   │   │   │   ├── pages
│   │   │   │   │   ├── api
│   │   │   │   │   │   ├── auth
│   │   │   │   │   │   │   ├── [...nextauth]
│   │   │   │   │   │   │   │   └── route.ts
│   │   │   │   │   │   │   ├── users
│   │   │   │   │   │   │   │   ├── [id]
│   │   │   │   │   │   │   │   │   └── route.ts
│   │   │   │   │   │   │   │   └── route.ts
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   ├── (auth)
│   │   │   │   │   │   ├── login
│   │   │   │   │   │   │   └── page.tsx
│   │   │   │   │   │   └── register
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   ├── dashboard
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── profile
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── settings
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── layout.tsx
│   │   │   │   ├── components
│   │   │   │   │   ├── atoms
│   │   │   │   │   │   ├── Button.tsx
│   │   │   │   │   │   ├── Input.tsx
│   │   │   │   │   │   └── Typography.tsx
│   │   │   │   │   ├── molecules
│   │   │   │   │   │   ├── FormField.tsx
│   │   │   │   │   │   └── NavItem.tsx
│   │   │   │   │   ├── organisms
│   │   │   │   │   │   ├── Header.tsx
│   │   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   │   └── Sidebar.tsx
│   │   │   │   │   ├── templates
│   │   │   │   │   │   ├── DashboardLayout.tsx
│   │   │   │   │   │   └── AuthLayout.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── hooks
│   │   │   │   │   ├── useAuth.ts
│   │   │   │   │   ├── useForm.ts
│   │   │   │   │   ├── useGoals.ts
│   │   │   │   │   ├── usePosts.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── services
│   │   │   │   │   ├── api.ts
│   │   │   │   │   ├── auth.ts
│   │   │   │   │   ├── goal.ts
│   │   │   │   │   ├── post.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── styles
│   │   │   │   │   ├── globals.css
│   │   │   │   │   └── theme.ts
│   │   │   │   ├── types
│   │   │   │   │   ├── user.ts
│   │   │   │   │   ├── goal.ts
│   │   │   │   │   ├── post.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── utils
│   │   │   │   │   ├── formatters.ts
│   │   │   │   │   ├── validators.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   ├── next.config.js
│   │   │   ├── tsconfig.json
│   │   │   ├── package.json
│   │   │   └── index.ts
│   │   ├── public
│   │   │   ├── favicon.ico
│   │   │   ├── logo.svg
│   │   │   └── index.ts
│   │   ├── tests
│   │   │   ├── e2e
│   │   │   │   ├── login.spec.ts
│   │   │   │   ├── dashboard.spec.ts
│   │   │   │   ├── profile.spec.ts
│   │   │   │   └── index.ts
│   │   │   ├── unit
│   │   │   │   ├── components
│   │   │   │   │   ├── Button.test.tsx
│   │   │   │   │   ├── Input.test.tsx
│   │   │   │   │   ├── Typography.test.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── hooks
│   │   │   │   │   ├── useAuth.test.ts
│   │   │   │   │   ├── useForm.test.ts
│   │   │   │   │   ├── useGoals.test.ts
│   │   │   │   │   ├── usePosts.test.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── services
│   │   │   │   │   ├── api.test.ts
│   │   │   │   │   ├── auth.test.ts
│   │   │   │   │   ├── goal.test.ts
│   │   │   │   │   ├── post.test.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── utils
│   │   │   │   │   ├── formatters.test.ts
│   │   │   │   │   ├── validators.test.ts
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   └── backend
│       ├── src
│       │   ├── controllers
│       │   │   ├── authController.ts
│       │   │   ├── userController.ts
│       │   │   ├── goalController.ts
│       │   │   ├── postController.ts
│       │   │   └── index.ts
│       │   ├── middlewares
│       │   │   ├── errorHandler.ts
│       │   │   ├── authMiddleware.ts
│       │   │   └── index.ts
│       │   ├── models
│       │   │   ├── User.ts
│       │   │   ├── Goal.ts
│       │   │   ├── Post.ts
│       │   │   └── index.ts
│       │   ├── routes
│       │   │   ├── authRoutes.ts
│       │   │   ├── userRoutes.ts
│       │   │   ├── goalRoutes.ts
│       │   │   ├── postRoutes.ts
│       │   │   └── index.ts
│       │   ├── services
│       │   │   ├── authService.ts
│       │   │   ├── userService.ts
│       │   │   ├── goalService.ts
│       │   │   ├── postService.ts
│       │   │   └── index.ts
│       │   ├── utils
│       │   │   ├── logger.ts
│       │   │   ├── encryption.ts
│       │   │   └── index.ts
│       │   └── index.ts
│       ├── tests
│       │   ├── integration
│       │   │   ├── auth.test.ts
│       │   │   ├── user.test.ts
│       │   │   ├── goal.test.ts
│       │   │   ├── post.test.ts
│       │   │   └── index.ts
│       │   ├── unit
│       │   │   ├── services
│       │   │   │   ├── authService.test.ts
│       │   │   │   ├── userService.test.ts
│       │   │   │   ├── goalService.test.ts
│       │   │   │   ├── postService.test.ts
│       │   │   │   └── index.ts
│       │   │   ├── utils
│       │   │   │   ├── logger.test.ts
│       │   │   │   ├── encryption.test.ts
│       │   │   │   └── index.ts
│       │   │   └── index.ts
│       │   └── index.ts
│       ├── .env
│       ├── next.config.js
│       ├── tsconfig.json
│       ├── package.json
│       └── index.ts
├── .github
│   └── workflows
│       ├── ci.yml
│       └── deploy.yml
├── .husky
│   ├── pre-commit
│   └── pre-push
├── docs
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── CONTRIBUTING.md
│   └── index.ts
├── scripts
│   ├── build.sh
│   └── deploy.sh
└── .eslintrc.js

```

## 💻 Installation

### 🔧 Prerequisites
- Node.js v18+
- npm 8+
- PostgreSQL 14+
- Docker 20.10+

### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/coslynx/Fitness-Goal-Tracker-Social-Hub.git
   cd Fitness-Goal-Tracker-Social-Hub
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - **Using Docker (Recommended):**
      ```bash
      docker-compose up -d
      ```
      This will start a PostgreSQL database container. 
   - **Manual setup:** 
      - Install PostgreSQL on your system.
      - Create a new database named `fitness_tracker_db`.
      - Set up the database user and password according to your preferences.
      - Update the `.env.local` file with your database credentials.

4. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
   - **Fill in the following environment variables in `.env.local`:**
     ```
     DATABASE_HOST=localhost
     DATABASE_PORT=5432
     DATABASE_USER=your_db_user
     DATABASE_PASSWORD=your_db_password
     DATABASE_NAME=fitness_tracker_db
     
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret

     SENTRY_DSN=your_sentry_dsn  
     ```
   - **Important:** Replace placeholders with your own values.

5. Run database migrations:
    ```bash
    npx prisma db push
    ```

## 🏗️ Usage

### 🏃‍♂️ Running the MVP
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Access the application:
   - Web interface: [http://localhost:3000](http://localhost:3000)
   - API endpoint: [http://localhost:3000/api](http://localhost:3000/api)

### ⚙️ Configuration
- **`next.config.js`**:  Contains configurations for Next.js, including environment variables, image optimization, and other settings.
- **`tsconfig.json`**: Configures the TypeScript compiler, specifying type checking rules, module resolution, and other compilation options.
- **`.env.local`**: Stores environment variables, including database credentials, API keys, and other sensitive information.
- **`prisma/schema.prisma`**: Defines the database schema and data models for PostgreSQL.

### 📚 Examples

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username": "fitnessuser", "email": "user@example.com", "password": "securepass123"}'

# Response
{
  "id": "user123",
  "username": "fitnessuser",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
}

# Set a new fitness goal
curl -X POST http://localhost:3000/api/goals \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"type": "weight_loss", "target": 10, "deadline": "2023-12-31"}'

# Response
{
  "id": "goal123",
  "type": "weight_loss",
  "target": 10,
  "deadline": "2023-12-31",
  "progress": 0
}
```

## 🌐 Hosting

### 🚀 Deployment Instructions

#### Deploying to Vercel

1. **Create a Vercel Account:**
   - Sign up for a Vercel account at [https://vercel.com](https://vercel.com).
2. **Install the Vercel CLI:**
   - Run the following command in your terminal:
     ```bash
     npm install -g vercel
     ```
3. **Initialize Vercel Project:**
   - Navigate to your project directory and run:
     ```bash
     vercel init
     ```
   - Follow the prompts to connect your project to Vercel.
4. **Deploy to Vercel:**
   - Run the following command:
     ```bash
     vercel deploy
     ```
5. **Set up environment variables:**
   - Navigate to your Vercel project settings and add the following environment variables:
     - `DATABASE_URL`: Connection string for your PostgreSQL database.
     - `GOOGLE_CLIENT_ID`: Your Google Client ID.
     - `GOOGLE_CLIENT_SECRET`: Your Google Client Secret.
     - `SENTRY_DSN`: Your Sentry DSN.

### 🔑 Environment Variables

- `DATABASE_URL`: Connection string for the PostgreSQL database.
  Example: `postgresql://user:password@host:port/database`
- `JWT_SECRET`: Secret key for JWT token generation.
  Example: `your-256-bit-secret`
- `GOOGLE_CLIENT_ID`: Your Google Client ID (if using Google login).
  Example: `1234567890-abcdef1234567890.apps.googleusercontent.com`
- `GOOGLE_CLIENT_SECRET`: Your Google Client Secret (if using Google login).
  Example: `your-google-client-secret`
- `SENTRY_DSN`: Your Sentry DSN (if using Sentry for error tracking).
  Example: `https://your-sentry-id@sentry.io/your-sentry-project-id`

## 📜 API Documentation

### 🔍 Endpoints

- **POST /api/auth/register**
  - Description: Register a new user.
  - Body: `{ "username": string, "email": string, "password": string }`
  - Response: `{ "id": string, "username": string, "email": string, "token": string }`

- **POST /api/auth/login**
  - Description: Login an existing user.
  - Body: `{ "email": string, "password": string }`
  - Response: `{ "token": string }`

- **POST /api/goals**
  - Description: Create a new fitness goal.
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "type": string, "target": number, "deadline": date }`
  - Response: `{ "id": string, "type": string, "target": number, "deadline": date, "progress": number }`

- **GET /api/goals**
  - Description: Get all goals for the current user.
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `[ { "id": string, "type": string, "target": number, "deadline": date, "progress": number }, ... ]`

- **POST /api/posts**
  - Description: Create a new post on the social feed.
  - Headers: `Authorization: Bearer TOKEN`
  - Body: `{ "content": string }`
  - Response: `{ "id": string, "content": string, "createdAt": date, "likes": number, "comments": number }`

- **GET /api/posts**
  - Description: Get all posts on the social feed.
  - Headers: `Authorization: Bearer TOKEN`
  - Response: `[ { "id": string, "content": string, "createdAt": date, "likes": number, "comments": number }, ... ]`

### 🔒 Authentication

1. **Register a new user or login to receive a JWT token.**
2. **Include the token in the Authorization header for all protected routes:**
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```

### 📝 Examples

```bash
# Register a new user
curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username": "fitnessuser", "email": "user@example.com", "password": "securepass123"}'

# Response
{
  "id": "user123",
  "username": "fitnessuser",
  "email": "user@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
}

# Login an existing user
curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "user@example.com", "password": "securepass123"}'

# Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
}

# Create a new goal
curl -X POST http://localhost:3000/api/goals \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"type": "weight_loss", "target": 10, "deadline": "2023-12-31"}'

# Response
{
  "id": "goal123",
  "type": "weight_loss",
  "target": 10,
  "deadline": "2023-12-31",
  "progress": 0
}

# Get all goals for the current user
curl -X GET http://localhost:3000/api/goals \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Response
[
  {
    "id": "goal123",
    "type": "weight_loss",
    "target": 10,
    "deadline": "2023-12-31",
    "progress": 0
  },
  ...
]
```

## 📜 License & Attribution

### 📄 License
This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.

### 🤖 AI-Generated MVP
This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).

No human was directly involved in the coding process of the repository: Fitness-Goal-Tracker-Social-Hub

### 📞 Contact
For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
- Website: [CosLynx.com](https://coslynx.com)
- Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
  <img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
  <img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
  <img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>