# AuthTest Project

This project is a full-stack authentication application demonstrating user signup, login, and protected routes using a Node.js/Express backend with MongoDB and a Next.js (React) frontend.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Deployment to Vercel](#deployment-to-vercel)
- [API Endpoints](#api-endpoints)

## Features

- User registration (Signup)
- User authentication (Login)
- JWT-based authentication
- Password hashing (bcrypt)
- Protected routes (backend & frontend)
- Authentication state management in frontend (React Context)
- Responsive UI for authentication forms

## Technologies Used

### Backend

- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling for Node.js
- **bcrypt**: For password hashing
- **jsonwebtoken**: For generating and verifying JWTs
- **cors**: For Cross-Origin Resource Sharing
- **dotenv**: For loading environment variables

### Frontend

- **Next.js**: React framework for production
- **React**: JavaScript library for building user interfaces
- **TypeScript**: Typed superset of JavaScript
- **Tailwind CSS**: Utility-first CSS framework for styling
- **js-cookie**: For managing cookies

## Project Structure

```
AuthTest/
├── BackEnd/
│   ├── Controllers/
│   │   └── Auth.js         # Authentication middleware
│   ├── Models/
│   │   └── User.js         # Mongoose User model
│   ├── Routes/
│   │   ├── auth.js         # Authentication routes (signup, login, me)
│   │   ├── ProductRouter.js  # Example protected route (can be cleaned up/removed)
│   │   └── ...
│   ├── .env                # Environment variables (local)
│   ├── index.js            # Main backend server file
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── dashboard/page.tsx # Protected dashboard page
│   │   │   ├── login/page.tsx     # Login page
│   │   │   ├── signup/page.tsx    # Signup page
│   │   │   ├── layout.tsx         # Root layout with AuthProvider
│   │   │   └── page.tsx           # Home page (redirects)
│   │   ├── components/
│   │   │   └── AuthForm.tsx       # Reusable login/signup form UI
│   │   ├── context/
│   │   │   └── AuthContext.tsx    # React Context for auth state
│   │   └── services/
│   │       └── api.ts             # API service for backend communication
│   ├── middleware.ts     # Next.js middleware for route protection
│   ├── .env.local          # Environment variables (local frontend)
│   ├── package.json
│   └── ...
├── .gitignore
└── README.md             # This file
```

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or Yarn
- MongoDB (local instance or MongoDB Atlas account)
- Git

### Backend Setup

1.  **Navigate to the `BackEnd` directory:**

    ```bash
    cd BackEnd
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    Create a file named `.env` in the `BackEnd` directory with the following content:

    ```
    PORT=8080
    MONGODB_URI=mongodb+srv://<YOUR_USER_NAME>:<YOUR_USER_PASSWORD>@test.go07blf.mongodb.net/<YOUR_DATABASE_NAME>?retryWrites=true&w=majority&appName=Test
    JWT_SECRET=your_super_secret_jwt_key
    FRONTEND_URL=http://localhost:3000
    NODE_ENV=development
    ```

    - Replace `your_super_secret_jwt_key` with a strong, random string.
    - `MONGODB_URI`: If you're using a local MongoDB, change this to `mongodb://localhost:27017/auth_test`. Otherwise, ensure it's your correct MongoDB Atlas connection string.

4.  **Start the backend server:**
    ```bash
    npm start
    ```
    The backend server will run on `http://localhost:8080` (or the PORT specified in your `.env`).

### Frontend Setup

1.  **Navigate to the `frontend` directory:**

    ```bash
    cd frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env.local` file:**
    Create a file named `.env.local` in the `frontend` directory with the following content:

    ```
    NEXT_PUBLIC_API_URL=http://localhost:8080/api
    ```

4.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The frontend application will run on `http://localhost:3000`.

## Deployment to Vercel

Deploying this project to Vercel requires deploying the backend and frontend as separate projects.

### 1. Deploy the Backend to Vercel

1.  **Create a Git repository** for your `BackEnd` folder (e.g., `AuthTest-Backend`). Push your `BackEnd` code to it.
2.  Go to [Vercel](https://vercel.com/) and create a new project.
3.  Import your backend repository.
4.  **Configure Project Settings:**
    - **Framework Preset:** `Other`
    - **Build Command:** `npm install`
    - **Output Directory:** `.`
    - **Install Command:** `npm install`
5.  **Add Environment Variables** (in Vercel project settings):
    - `MONGODB_URI`: Your MongoDB Atlas connection string (e.g., `mongodb+srv://<YOUR_USER_NAME>:<YOUR_USER_PASSWORD>@test.go07blf.mongodb.net/<YOUR_DATABASE_NAME>?retryWrites=true&w=majority&appName=Test`)
    - `JWT_SECRET`: A strong, random secret key.
    - `PORT`: `8080` (or desired port)
    - `FRONTEND_URL`: Your deployed frontend URL (e.g., `https://auth-test-ui-eight.vercel.app` - **you will get this after deploying the frontend first**).
6.  **Deploy**. Note the deployed URL for your backend (e.g., `https://auth-test-api-test.vercel.app`).

### 2. Deploy the Frontend to Vercel

1.  **Create a Git repository** for your `frontend` folder (e.g., `AuthTest-Frontend`). Push your `frontend` code to it.
2.  Go to [Vercel](https://vercel.com/) and create a new project.
3.  Import your frontend repository.
4.  **Configure Project Settings:**
    - **Framework Preset:** `Next.js` (Vercel usually detects this automatically)
    - **Build Command:** `npm run build`
    - **Install Command:** `npm install`
5.  **Add Environment Variables** (in Vercel project settings):
    - `NEXT_PUBLIC_API_URL`: The URL of your **deployed backend**, including the `/api` prefix (e.g., `https://auth-test-api-test.vercel.app/api`).
6.  **Deploy**. Note the deployed URL for your frontend (e.g., `https://auth-test-ui-eight.vercel.app`).

### Important Deployment Considerations:

- **CORS**: Ensure your backend's `FRONTEND_URL` environment variable is set to the correct URL of your _deployed_ frontend. This is crucial for cross-origin requests to work.
- **MongoDB Atlas IP Whitelist**: Make sure your MongoDB Atlas cluster allows connections from Vercel's IP addresses (or whitelist `0.0.0.0/0` temporarily for testing, but restrict it in production).
- **Secrets**: Always use strong, unique secrets for `JWT_SECRET`.

## API Endpoints

All backend authentication API endpoints are under `/api/auth`.

- **`POST /api/auth/signup`**

  - Registers a new user.
  - Request Body: `{ "email": "string", "password": "string", "name"?: "string" }`
  - Success Response: `201 Created` with user email and JWT.

- **`POST /api/auth/login`**

  - Authenticates an existing user.
  - Request Body: `{ "email": "string", "password": "string" }`
  - Success Response: `200 OK` with user email and JWT.

- **`GET /api/auth/me`**
  - (Protected Route) Retrieves details of the authenticated user.
  - Requires `Authorization: Bearer <JWT>` header.
  - Success Response: `200 OK` with user email.
