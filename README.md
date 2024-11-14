# Geo-Projects Platform

This is a monorepo for the Geo-Projects Platform utilizing Turborepo. It contains backend service and shared packages.

## Requirements

### Local Installation

- [Node.js](https://nodejs.org/en/) >= 22
- [PNPM](https://pnpm.io/) >= 9

### Containerized Installation

> :exclamation: The current implementation doesn't contain a read available containers for each service but just a CLI tool to run the project in a containerized environment

- [Docker](https://www.docker.com/) >= 24
- [Docker Compose](https://docs.docker.com/compose/) >= 2

### Installation

#### Create Container Environment (optional)

> :exclamation: The current implementation doesn't contain a read available containers for each service but just a CLI tool to run the project in a containerized environment

1. Build containers

   ```bash
   docker compose build
   ```

2. Create executable CLI container

   ```bash
   docker compose run --rm cli
   ```

#### Setup Project

1. Install dependencies

   ```bash
   pnpm install
   ```

### Useful Commands

- Starting a web Docker container (optional):

   ```bash
   docker compose run --rm -p 3000:3000 cli
   ```

- Starting all monorepo's services locally:

   ```bash
   pnpm dev
   ```

- Starting a specific service locally:

   ```bash
   pnpm turbo dev --filter=@platform/api
   ```

- Formatting monorepo code:

  ```bash
  pnpm format
  ```

- Linting monorepo code:

  ```bash
  pnpm lint
  ```
