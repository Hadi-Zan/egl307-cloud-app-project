# EGL307 Cloud Application Project

## Project Overview

This project demonstrates the development, testing and deployment of a containerised React web application using Git, GitHub, Docker and Docker Compose.

The application includes:

- React frontend
- Node.js and Express backend API
- Redis in-memory visit counter
- Docker Compose development environment
- Automated React testing
- Nginx production deployment

## Group Members

- Hadi Zan
- Rifqy

## System Architecture

```text
Browser
   |
   v
React Frontend :3000
   |
   | HTTP GET /api/visits
   v
Node.js Backend :5000
   |
   | INCR visit_count
   v
Redis In-Memory Store :6379
```

The React frontend sends a request to the backend whenever the application is opened. The backend uses Redis to increment and retrieve the total visit count.

## Technologies Used

- React
- Node.js
- Express
- Redis
- Git and GitHub
- Docker
- Docker Compose
- Nginx
- Jest
- React Testing Library

## Project Features

- GitHub version control and collaboration
- React single-page web application
- Docker Compose development environment
- Volume mapping and live reloading
- Node.js backend API
- Redis in-memory visit counter
- Published frontend and backend ports
- Automated React testing in a separate container
- Multi-stage production Docker build
- Nginx production web server

## Project Structure

```text
egl307-cloud-app-project/
├── backend/
│   ├── Dockerfile.dev
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── package.json
│   └── package-lock.json
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Docker Compose Services

The `docker-compose.yml` file manages four services:

### Frontend

Runs the React development application on port `3000`.

### Backend

Runs the Node.js and Express API on port `5000`.

### Redis

Stores the visit count in memory using the `visit_count` key.

### Tests

Runs the React test suite inside a separate Docker container.

## Development Deployment

Build and start the frontend, backend and Redis services:

```bash
docker compose up --build frontend
```

The frontend service automatically starts its backend and Redis dependencies.

Open the application at:

```text
http://localhost:3000
```

The backend health endpoint can be accessed at:

```text
http://localhost:5000/api/health
```

The visit-counter endpoint can be accessed at:

```text
http://localhost:5000/api/visits
```

Stop and remove the development containers:

```bash
docker compose down
```

## Volume Mapping and Live Reload

The frontend and backend source folders are mounted into their containers:

```yaml
volumes:
  - ./frontend:/app
  - /app/node_modules
```

```yaml
volumes:
  - ./backend:/app
  - /app/node_modules
```

This allows local source-code changes to be reflected inside the running containers without rebuilding the images.

## Redis Visit Counter

The backend connects to Redis using the Docker Compose service name:

```text
redis://redis:6379
```

Each request to `/api/visits` runs the Redis `INCR` command on the `visit_count` key.

Check the running services:

```bash
docker compose ps
```

Check the value stored in Redis:

```bash
docker compose exec redis redis-cli GET visit_count
```

Example output:

```text
"19"
```

Redis is used as an in-memory data store. The visit count resets when the Redis container is removed because persistent storage is not configured.

## Software Testing

Run the React tests using the Docker Compose test service:

```bash
docker compose up --build tests
```

The test mocks the backend API response and verifies that:

- The project title is displayed
- The visit count is displayed
- The frontend calls the correct backend endpoint

A successful result displays:

```text
PASS src/App.test.js
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
```

Remove the test container and network:

```bash
docker compose down
```

## Production Deployment with Nginx

The production Dockerfile uses a multi-stage build.

The first stage uses Node.js to create an optimised React production build. The second stage copies the build files into an Nginx image.

Build the production image:

```bash
docker build -t egl307-react-prod ./frontend
```

Run the Nginx production container:

```bash
docker run -d --name egl307-react-prod -p 8080:80 egl307-react-prod
```

Open the production frontend at:

```text
http://localhost:8080
```

Check the running container:

```bash
docker ps
```

Stop and remove the production container:

```bash
docker stop egl307-react-prod
docker rm egl307-react-prod
```

The Nginx container demonstrates the production frontend deployment. The Redis visit-counter feature is demonstrated through the Docker Compose development environment.

## Git Workflow

The project uses Git and GitHub for version control and collaboration.

Check project changes:

```bash
git status
```

Stage the changes:

```bash
git add .
```

Create a commit:

```bash
git commit -m "Describe the completed changes"
```

Upload the commit to GitHub:

```bash
git push
```

Download changes made by another group member:

```bash
git pull
```

## API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/health` | GET | Checks whether the backend is running |
| `/api/visits` | GET | Increments and returns the Redis visit count |

Example `/api/visits` response:

```json
{
  "message": "Visit recorded successfully",
  "visits": 19
}
```

## Conclusion

The project successfully demonstrates a complete containerised application workflow.

Docker Compose manages the React frontend, Node.js backend, Redis in-memory data store and automated testing service. Volume mapping supports live development updates, while Redis records the application visit count.

A separate multi-stage Docker image uses Nginx to serve the optimised React production build.