# GymFlow

GymFlow is an API for gym check-ins and management. It provides features for gym discovery based on location, user check-in history, and administrative tools for validation.

The platform implements business rules for proximity-based check-ins and time-restricted validations.

## Technologies

- [Bun](https://bun.sh/) - JavaScript runtime and package manager
- [Fastify](https://www.fastify.io/) - Web framework
- [Prisma](https://www.prisma.io/) - ORM for Node.js and TypeScript
- [PostgreSQL](https://www.postgresql.org/) - Relational database
- [OpenTelemetry](https://opentelemetry.io/) - Observability framework
- [Scalar](https://scalar.com/) - API documentation interface
- [Vitest](https://vitest.dev/) - Testing framework
- [Zod](https://zod.dev/) - Schema validation
- [Docker](https://www.docker.com/) - Containerization

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
   git clone https://github.com/afraniocaires/gymflow.git
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

### Docker

You can also run the application using Docker:

1. Build the image:

   ```bash
   docker build -t gymflow .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env gymflow
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

## CI/CD

This project uses GitHub Actions to ensure code quality. A workflow is configured to run the E2E test suite automatically on every Pull Request targeting the `main` branch.

The pipeline includes:

- PostgreSQL service setup
- Dependency installation with Bun
- Database migration deployment
- E2E test execution

## Documentation

The API documentation is available at the `/docs` endpoint when the server is running. It provides an interactive interface powered by Scalar to explore and test the API endpoints.

Detailed requirements can be found in [docs/requirements.md](./docs/requirements.md).
Visual architecture and flows are available in [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md).
