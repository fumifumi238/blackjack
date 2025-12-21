# Card Game Project: Blackjack

## Overview
This project implements a simple Blackjack card game with a Go backend using Gin and GraphQL, Redis as the database, and a Next.js frontend with TypeScript.

## Game Rules
- Standard Blackjack rules
- Player vs Dealer
- Goal: Get closer to 21 without busting
- Aces count as 1 or 11
- Face cards worth 10

## Architecture
- **Backend**: Go with Gin framework, GraphQL API, Air for hot reloading
- **Database**: Redis (in Docker)
- **Frontend**: Next.js with TypeScript, pnpm, Zod for validation, Zustand for state management, Tailwind CSS for styling
- **Deployment**: Docker Compose for backend and DB, frontend runs locally

## Project Structure
```
card_game/
├── backend/
│   ├── Dockerfile
│   ├── go.mod
│   ├── main.go
│   └── ...
├── frontend/
│   ├── package.json
│   ├── next.config.js
│   └── ...
├── docker-compose.yml
├── .gitignore
└── README.md
```

## Technologies
- Backend: Go, Gin, GraphQL, Air
- DB: Redis
- Frontend: Next.js, TypeScript, pnpm, Zod, Zustand, Tailwind CSS
- Containerization: Docker, Docker Compose

## API Endpoints (GraphQL)
- Start new game
- Hit (draw card)
- Stand
- Get game state

## Frontend Features
- Game board display
- Player actions (Hit/Stand)
- Score display
- Game result notification
