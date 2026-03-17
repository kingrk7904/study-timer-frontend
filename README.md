# Study Timer Frontend

React frontend integrated with a deployed Spring Boot backend on Azure.

## Backend Base URL

Default backend URL:

https://backend-app-ewcra3hvbzb9ezfw.southeastasia-01.azurewebsites.net

## Environment Setup

1. Copy `.env.example` to `.env`
2. Set your API URL:

REACT_APP_API_URL=https://backend-app-ewcra3hvbzb9ezfw.southeastasia-01.azurewebsites.net

For Create React App, all client-side environment variables must start with `REACT_APP_`.

## API Endpoints Used

- GET /api/sessions
- GET /api/sessions/{id}
- POST /api/sessions
- PUT /api/sessions/{id}
- DELETE /api/sessions/{id}

## API Service

Centralized API service is in `src/services/api.js`.

It includes:

- Base URL constant from environment variable
- Shared request helper
- JSON request/response handling
- CRUD functions for sessions

## CRUD Usage in UI

`src/App.js` integrates all operations:

- `getAllSessions()` on initial page load
- `getSessionById(id)` when clicking Edit
- `createSession(payload)` on Add
- `updateSession(id, payload)` on Update
- `deleteSession(id)` on Delete

The UI also includes:

- Loading state
- Error messages
- Form reset and list refresh after each mutation

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode at http://localhost:3000

### `npm test`

Runs tests in watch mode.

### `npm run build`

Builds the app for production.
