# Geo-Projects Platform

This is a fictional project designed for studying and practicing the implementation of various technologies, exploring different approaches and possibilities. The project focuses on the following technologies:

- Turborepo
- TypeScript
- Fastify
- Drizzle ORM
- PostgreSQL
- PostGIS
- Neon
- Docker
- Fly.io
- GitHub Actions

## Requirements

### Local Installation

- [Node.js](https://nodejs.org/en/) >= 22
- [PNPM](https://pnpm.io/) >= 9

### Containerized Installation

- [Docker](https://www.docker.com/) >= 24
- [Docker Compose](https://docs.docker.com/compose/) >= 2

## Installation

### Setup Environment (Optional)

1. Initiate .env file

```bash
cp -n .env.example .env
```

2. Build containers

```bash
docker compose build
```

### Setup Project

1. Initiate .env file

```bash
cp -n .env.example .env
```

2. Install dependencies

```bash
pnpm install
```

3. Build monorepo

```bash
pnpm build
```

### Run Project

- Start all monorepo's services

```bash
pnpm start
```

- Start and watch all monorepo's services

```bash
pnpm dev
```

- Run specific monorepo's service

```bash
pnpm --filter @platform/api start
```

### Useful Commands

- Test all monorepo's packages and services:

```bash
pnpm test
```

- Format all monorepo's packages and services:

```bash
pnpm format
```

- Lint all monorepo's packages and services:

```bash
pnpm lint
```

- Initialize a executable CLI container

```bash
docker compose run --rm cli
```
