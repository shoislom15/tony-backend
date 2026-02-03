# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Tony is an AI-powered productivity hub backend built with NestJS. It provides a unified API for tasks, notes, calendar, and finance management, accessible via Telegram bot, web app, mobile app, and MCP integration for Claude Desktop.

**Current State**: Fresh NestJS starter - architecture is documented but features are not yet implemented.

## Documentation

- `docs/project-overview.md` - Project vision, features, target users, and roadmap
- `docs/arcitecture.md` - Complete system architecture diagrams and NestJS project structure

## Development Commands

```bash
# Development
npm run start:dev          # Run with watch mode
npm run start:debug        # Run with debug mode

# Build & Production
npm run build              # Compile TypeScript
npm run start:prod         # Run compiled production build

# Testing
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Run tests with coverage
npm run test:e2e           # Run end-to-end tests

# Code Quality
npm run lint               # ESLint with auto-fix
npm run format             # Prettier formatting
```

## Architecture

### Planned Module Structure

```
src/
├── main.ts                    # Entry point (port: process.env.PORT || 3000)
├── app.module.ts              # Root module
├── config/                    # Configuration files
├── common/                    # Shared utilities
│   ├── decorators/            # @CurrentUser, @Public, @Roles
│   ├── guards/                # JWT, API Key, Throttler
│   ├── interceptors/          # Logging, Transform, Timeout
│   ├── pipes/                 # Validation
│   └── filters/               # Exception handling
├── database/                  # MongoDB schemas
│   └── schemas/               # User, Task, Note, CalendarEvent, Transaction, Budget
├── cache/                     # Optional Redis or in-memory caching
└── modules/
    ├── auth/                  # JWT authentication
    ├── users/                 # User profiles
    ├── tasks/                 # Task CRUD
    ├── notes/                 # Notes with markdown
    ├── calendar/              # Events management
    ├── finance/               # Transactions & budgets
    ├── ai/                    # Claude API, Whisper, intent recognition
    └── websocket/             # Real-time updates (port 3001)
```

### API Routes

All routes are versioned under `/api/v1/`:
- `/api/v1/auth` - Authentication & registration
- `/api/v1/users` - User profiles & settings
- `/api/v1/tasks` - Task operations
- `/api/v1/notes` - Note operations
- `/api/v1/calendar` - Calendar events
- `/api/v1/finance` - Transactions & budgets
- `/api/v1/ai` - AI processing & voice input

### Tech Stack

- **Runtime**: Node.js with TypeScript (ES2023 target)
- **Framework**: NestJS 11 with Express
- **Database**: MongoDB with Mongoose
- **Cache**: Redis (optional) or in-memory
- **Auth**: JWT-based authentication
- **Real-time**: Socket.io WebSocket gateway
- **External APIs**: Claude API, Whisper API

### Module Pattern

Each feature module follows this structure:
```
module/
├── module.module.ts      # Module definition
├── module.controller.ts  # HTTP endpoints
├── module.service.ts     # Business logic
├── module.repository.ts  # Data access
└── dto/                  # Request/response DTOs
```

## Configuration

TypeScript is configured with:
- Strict null checks enabled
- Decorator metadata for NestJS DI
- Incremental compilation
- Source maps for debugging

ESLint allows `any` types but warns on floating promises and unsafe arguments.
