# GymFlow

GymFlow is a gym check-in management API built with Node.js, Fastify, and Prisma. It allows users to find nearby gyms, perform check-ins, and track their fitness history, while providing administrative tools for check-in validation and gym management.

## Technologies

- [Bun](https://bun.sh/) - JavaScript runtime and package manager
- [Fastify](https://www.fastify.io/) - Fast and low overhead web framework
- [Prisma](https://www.prisma.io/) - Next-generation Node.js and TypeScript ORM
- [PostgreSQL](https://www.postgresql.org/) - Open source relational database
- [OpenTelemetry](https://opentelemetry.io/) - Observability framework for cloud-native software
- [Scalar](https://scalar.com/) - Modern interactive API documentation (Swagger/OpenAPI)
- [Vitest](https://vitest.dev/) - Blazing fast unit and E2E testing framework
- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [Docker](https://www.docker.com/) - Containerization for local development

## Features

### User Features
- [x] User registration and authentication (JWT)
- [x] User profile retrieval
- [x] Check-in history and metrics
- [x] Search for gyms by title
- [x] Find nearby gyms (within 10km)
- [x] Perform check-ins at a gym (requires being within 100m)

### Admin Features
- [x] Create new gyms
- [x] Validate user check-ins (within 20 minutes of creation)

### Observability and Documentation
- [x] API documentation with Scalar and Swagger
- [x] Distributed tracing with OpenTelemetry (Fastify and Prisma)
- [x] Structured logging with Pino

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) installed
- [Docker](https://www.docker.com/) installed

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-user/gymflow.git
   cd gymflow
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Update .env with your PostgreSQL credentials
   ```

4. Spin up the database:
   ```bash
   docker-compose up -d
   ```

5. Run migrations:
   ```bash
   bun db:migrate
   ```

6. Generate Prisma client:
   ```bash
   bun db:generate
   ```

7. Start the development server:
   ```bash
   bun dev
   ```

## Scripts

The following scripts are available in the project:

- `bun dev`: Starts the development server with hot-reload.
- `bun lint`: Runs oxlint for static analysis.
- `bun fmt`: Runs oxfmt for code formatting.
- `bun test`: Runs all tests.
- `bun test:unit`: Runs only unit tests.
- `bun test:e2e`: Runs only E2E tests.
- `bun test:coverage`: Runs tests and generates a coverage report.
- `bun db:migrate`: Runs database migrations.
- `bun db:generate`: Generates the Prisma client.
- `bun db:studio`: Opens Prisma Studio to visualize your data.

## Documentation

The API documentation is available at the `/docs` endpoint when the server is running. It provides an interactive interface powered by Scalar to explore and test the API endpoints.

Detailed requirements can be found in [docs/requirements.md](./docs/requirements.md).
Visual architecture and flows are available in [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).

---
Built for fitness and clean code.
