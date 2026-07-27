# EGL307 Cloud Application Project

## Project Overview

This project demonstrates how a React web application can be developed, tested and deployed using Git, GitHub, Docker and Docker Compose.

The application supports both a development environment with live reloading and a production environment served through Nginx.

## Group Members

- Hadi Zan
- [Group Member Name]

## Technologies Used

- React
- Node.js
- Git and GitHub
- Docker
- Docker Compose
- Nginx
- Jest / React Testing Library

## Project Features

- GitHub version control
- React web application
- Docker Compose development deployment
- Volume mapping for live code updates
- Port publishing through Docker
- Automated React testing in a separate container
- Multi-stage production Docker build
- Nginx production web server

## Project Structure

```text
egl307-cloud-app-project/
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