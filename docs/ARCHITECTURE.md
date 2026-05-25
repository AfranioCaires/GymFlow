# Architecture and Diagrams

This document contains visual representations of the system architecture, database schema, and business flows.

## Database Schema (ER Diagram)

Relationships between Users, Gyms, and Check-ins.

```mermaid
erDiagram
    USER ||--o{ CHECK_IN : makes
    GYM ||--o{ CHECK_IN : has

    USER {
        string id PK
        string name
        string email
        string password_hash
        string role "ADMIN | MEMBER"
        datetime created_at
        datetime updated_at
    }

    GYM {
        string id PK
        string title
        string description
        string phone
        float latitude
        float longitude
    }

    CHECK_IN {
        string id PK
        string user_id FK
        string gym_id FK
        datetime created_at
        datetime validated_at
    }
```

## Core Flows

### Check-in Process

The check-in flow includes several business rules like distance verification and "one check-in per day" limit.

```mermaid
sequenceDiagram
    autonumber
    participant U as User
    participant A as API (CheckInUseCase)
    participant R as Repositories

    U->>A: Create Check-in (gymId, userCoords)
    A->>R: Find Gym by ID
    A->>R: Find User Check-in today

    alt Already checked in today
        A-->>U: Error: Max number of check-ins reached
    else Is far from gym (> 100m)
        A-->>U: Error: Max distance reached
    else Success
        A->>R: Save Check-in
        A-->>U: Return Check-in data
    end
```

### Check-in Validation

Validation can only be performed by administrators and within a specific timeframe.

```mermaid
flowchart TD
    Start([Admin requests validation]) --> IsAdmin{Is User Admin?}
    IsAdmin -- No --> Error403[Return Forbidden Error]
    IsAdmin -- Yes --> FindCheckIn[Find Check-in by ID]

    FindCheckIn --> Exists{Check-in exists?}
    Exists -- No --> Error404[Return Not Found]
    Exists -- Yes --> CheckTime{Created < 20 min ago?}

    CheckTime -- No --> ErrorTime[Return Timeout Error]
    CheckTime -- Yes --> Save[Mark as Validated & Save]

    Save --> End([Success: 204 No Content])
```

## Project Structure

The project follows a modular structure inspired by Clean Architecture:

- `src/domain`: Business entities and repository interfaces.
- `src/application`: Use cases and business logic.
- `src/infra`: External concerns like Database (Prisma), HTTP (Fastify), and Factories.
- `src/util`: Pure utility functions.
- `test`: E2E integration tests.

## Observability

The project implements tracing and logging.

- **OpenTelemetry**: Integrated with Fastify and Prisma to export traces.
- **Pino**: Used for logging.

## API Documentation

We use **Swagger (OpenAPI)** and **Scalar** for the documentation interface.

- **Endpoint**: `/docs`
- **Features**: Schema generation from Zod types, request testing, and route representation.
