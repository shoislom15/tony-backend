# Tony Backend - Implementation Plan

> **Project**: AI-powered productivity hub backend
> **Status**: Phase 1 MVP - In Progress
> **Last Updated**: 2026-02-03

---

## Overview

Tony is an all-in-one productivity platform that consolidates tasks, notes, calendar, and finances into a single intelligent system. This document tracks the backend implementation progress.

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Completed |
| 🚧 | In Progress |
| ⬜ | Not Started |
| 🔮 | Future Phase |

---

## Phase 1: Core Infrastructure

### 1.1 Project Setup

| Task | Status | Notes |
|------|--------|-------|
| NestJS project initialization | ✅ | Fresh NestJS 11 starter |
| TypeScript configuration | ✅ | Strict mode enabled |
| ESLint + Prettier | ✅ | Code quality tools |
| Environment configuration | ✅ | ConfigModule with .env |
| Docker Compose (MongoDB) | ✅ | MongoDB 7.0 + mongo-express |

### 1.2 Dependencies

| Package | Status | Purpose |
|---------|--------|---------|
| @nestjs/mongoose + mongoose | ✅ | MongoDB ODM |
| @nestjs/jwt + @nestjs/passport | ✅ | Authentication |
| passport + passport-jwt + passport-local | ✅ | Auth strategies |
| bcrypt | ✅ | Password hashing |
| class-validator + class-transformer | ✅ | DTO validation |
| @nestjs/websockets + socket.io | ⬜ | Real-time updates |
| @nestjs/throttler | ⬜ | Rate limiting |

### 1.3 Common Utilities

| Utility | Status | Location |
|---------|--------|----------|
| @CurrentUser decorator | ✅ | `src/common/decorators/` |
| @Public decorator | ✅ | `src/common/decorators/` |
| JwtAuthGuard | ✅ | `src/common/guards/` |
| ApiKeyGuard | ⬜ | `src/common/guards/` |
| ThrottlerGuard | ⬜ | `src/common/guards/` |
| ValidationPipe | ✅ | `src/common/pipes/` |
| HttpExceptionFilter | ✅ | `src/common/filters/` |
| TransformInterceptor | ✅ | `src/common/interceptors/` |
| LoggingInterceptor | ⬜ | `src/common/interceptors/` |
| TimeoutInterceptor | ⬜ | `src/common/interceptors/` |

---

## Phase 2: Database Layer

### 2.1 Database Module

| Task | Status | Notes |
|------|--------|-------|
| DatabaseModule setup | ✅ | Mongoose async config |
| MongoDB connection | ✅ | Via MONGODB_URI env |

### 2.2 Schemas

| Schema | Status | Location | Fields |
|--------|--------|----------|--------|
| User | ✅ | `src/database/schemas/user.schema.ts` | email, password, telegramId, name, settings |
| Task | ✅ | `src/database/schemas/task.schema.ts` | title, description, status, priority, dueDate, tags, subtasks, recurring |
| Note | ✅ | `src/database/schemas/note.schema.ts` | title, content, folder, tags, isPinned |
| CalendarEvent | ⬜ | `src/database/schemas/calendar-event.schema.ts` | title, description, startTime, endTime, location, attendees, reminders |
| Transaction | ⬜ | `src/database/schemas/transaction.schema.ts` | amount, type, category, date, description, tags |
| Budget | ⬜ | `src/database/schemas/budget.schema.ts` | category, amount, period, startDate |
| ApiKey | ⬜ | `src/database/schemas/api-key.schema.ts` | key, userId, name, permissions, expiresAt |

---

## Phase 3: Feature Modules

### 3.1 Auth Module ✅

| Component | Status | Endpoints |
|-----------|--------|-----------|
| AuthModule | ✅ | - |
| AuthController | ✅ | - |
| AuthService | ✅ | - |
| JwtStrategy | ✅ | - |
| LocalStrategy | ✅ | - |

**Endpoints:**

| Method | Route | Status | Description |
|--------|-------|--------|-------------|
| POST | `/api/v1/auth/register` | ✅ | Email/password registration |
| POST | `/api/v1/auth/login` | ✅ | Email/password login |
| POST | `/api/v1/auth/telegram` | ✅ | Telegram ID authentication |
| GET | `/api/v1/auth/me` | ✅ | Get current user |
| POST | `/api/v1/auth/refresh` | ⬜ | Refresh access token |
| POST | `/api/v1/auth/logout` | ⬜ | Logout (invalidate token) |

### 3.2 Users Module ✅

| Component | Status |
|-----------|--------|
| UsersModule | ✅ |
| UsersController | ✅ |
| UsersService | ✅ |
| UsersRepository | ✅ |

**Endpoints:**

| Method | Route | Status | Description |
|--------|-------|--------|-------------|
| GET | `/api/v1/users/profile` | ✅ | Get user profile |
| PATCH | `/api/v1/users/profile` | ✅ | Update user profile |
| DELETE | `/api/v1/users/account` | ✅ | Delete account |
| POST | `/api/v1/users/api-keys` | ⬜ | Generate API key |
| GET | `/api/v1/users/api-keys` | ⬜ | List API keys |
| DELETE | `/api/v1/users/api-keys/:id` | ⬜ | Revoke API key |

### 3.3 Tasks Module ✅

| Component | Status |
|-----------|--------|
| TasksModule | ✅ |
| TasksController | ✅ |
| TasksService | ✅ |
| TasksRepository | ✅ |

**Endpoints:**

| Method | Route | Status | Description |
|--------|-------|--------|-------------|
| POST | `/api/v1/tasks` | ✅ | Create task |
| GET | `/api/v1/tasks` | ✅ | List tasks (with filters) |
| GET | `/api/v1/tasks/:id` | ✅ | Get single task |
| PATCH | `/api/v1/tasks/:id` | ✅ | Update task |
| PATCH | `/api/v1/tasks/:id/status` | ✅ | Quick status update |
| DELETE | `/api/v1/tasks/:id` | ✅ | Delete task |
| GET | `/api/v1/tasks/stats` | ⬜ | Task statistics |
| POST | `/api/v1/tasks/:id/subtasks` | ⬜ | Add subtask |

### 3.4 Notes Module ✅

| Component | Status |
|-----------|--------|
| NotesModule | ✅ |
| NotesController | ✅ |
| NotesService | ✅ |
| NotesRepository | ✅ |

**Endpoints:**

| Method | Route | Status | Description |
|--------|-------|--------|-------------|
| POST | `/api/v1/notes` | ✅ | Create note |
| GET | `/api/v1/notes` | ✅ | List notes (with search/filters) |
| GET | `/api/v1/notes/:id` | ✅ | Get single note |
| PATCH | `/api/v1/notes/:id` | ✅ | Update note |
| DELETE | `/api/v1/notes/:id` | ✅ | Delete note |
| GET | `/api/v1/notes/folders` | ⬜ | List all folders |
| GET | `/api/v1/notes/tags` | ⬜ | List all tags |

### 3.5 Calendar Module ⬜

| Component | Status |
|-----------|--------|
| CalendarModule | ⬜ |
| CalendarController | ⬜ |
| CalendarService | ⬜ |
| CalendarRepository | ⬜ |

**Planned Endpoints:**

| Method | Route | Status | Description |
|--------|-------|--------|-------------|
| POST | `/api/v1/calendar/events` | ⬜ | Create event |
| GET | `/api/v1/calendar/events` | ⬜ | List events (date range) |
| GET | `/api/v1/calendar/events/:id` | ⬜ | Get single event |
| PATCH | `/api/v1/calendar/events/:id` | ⬜ | Update event |
| DELETE | `/api/v1/calendar/events/:id` | ⬜ | Delete event |
| GET | `/api/v1/calendar/today` | ⬜ | Today's schedule |
| GET | `/api/v1/calendar/week` | ⬜ | This week's schedule |

### 3.6 Finance Module ⬜

| Component | Status |
|-----------|--------|
| FinanceModule | ⬜ |
| FinanceController | ⬜ |
| FinanceService | ⬜ |
| FinanceRepository | ⬜ |

**Planned Endpoints:**

| Method | Route | Status | Description |
|--------|-------|--------|-------------|
| POST | `/api/v1/finance/transactions` | ⬜ | Create transaction |
| GET | `/api/v1/finance/transactions` | ⬜ | List transactions |
| GET | `/api/v1/finance/transactions/:id` | ⬜ | Get single transaction |
| PATCH | `/api/v1/finance/transactions/:id` | ⬜ | Update transaction |
| DELETE | `/api/v1/finance/transactions/:id` | ⬜ | Delete transaction |
| POST | `/api/v1/finance/budgets` | ⬜ | Create budget |
| GET | `/api/v1/finance/budgets` | ⬜ | List budgets |
| GET | `/api/v1/finance/summary` | ⬜ | Financial summary |
| GET | `/api/v1/finance/categories` | ⬜ | Spending by category |

### 3.7 AI Module ⬜

| Component | Status |
|-----------|--------|
| AIModule | ⬜ |
| AIController | ⬜ |
| AIService | ⬜ |
| ClaudeService | ⬜ |
| WhisperService | ⬜ |
| IntentService | ⬜ |

**Planned Endpoints:**

| Method | Route | Status | Description |
|--------|-------|--------|-------------|
| POST | `/api/v1/ai/process` | ⬜ | Process natural language command |
| POST | `/api/v1/ai/voice` | ⬜ | Process voice input (Whisper) |
| POST | `/api/v1/ai/intent` | ⬜ | Detect intent from text |

### 3.8 WebSocket Module ⬜

| Component | Status |
|-----------|--------|
| WebSocketModule | ⬜ |
| WebSocketGateway | ⬜ |
| WebSocketService | ⬜ |

**Planned Events:**

| Event | Status | Description |
|-------|--------|-------------|
| `task:created` | ⬜ | Broadcast new task |
| `task:updated` | ⬜ | Broadcast task update |
| `task:deleted` | ⬜ | Broadcast task deletion |
| `note:created` | ⬜ | Broadcast new note |
| `note:updated` | ⬜ | Broadcast note update |
| `calendar:reminder` | ⬜ | Push event reminder |

---

## Phase 4: Cache Layer (Optional)

| Task | Status | Notes |
|------|--------|-------|
| CacheModule | ⬜ | Abstraction layer |
| MemoryCacheProvider | ⬜ | Default, no Redis needed |
| RedisCacheProvider | ⬜ | Optional, for scaling |
| Query caching | ⬜ | Frequently accessed data |
| Session caching | ⬜ | User sessions |

---

## Phase 5: External Integrations

### 5.1 Clients (Separate Repositories)

| Client | Status | Notes |
|--------|--------|-------|
| Telegram Bot | 🔮 | Future - separate repo |
| Web App (Next.js) | 🔮 | Future - separate repo |
| Mobile App (React Native) | 🔮 | Future - separate repo |
| MCP Server | 🔮 | Future - separate repo |

### 5.2 External APIs

| Integration | Status | Notes |
|-------------|--------|-------|
| Claude API | ⬜ | AI processing |
| Whisper API | ⬜ | Voice-to-text |
| S3/Local Storage | ⬜ | File uploads |
| Google Calendar | 🔮 | Phase 3 |
| Email (SMTP) | 🔮 | Notifications |

---

## Phase 6: Production Readiness

| Task | Status | Notes |
|------|--------|-------|
| Unit tests | ⬜ | Jest |
| E2E tests | ⬜ | Supertest |
| API documentation | ✅ | Swagger/OpenAPI at /api/docs |
| Rate limiting | ⬜ | @nestjs/throttler |
| Request logging | ⬜ | Morgan/custom |
| Error tracking | ⬜ | Sentry |
| Health checks | ⬜ | /health endpoint |
| Docker production build | ⬜ | Multi-stage Dockerfile |
| CI/CD pipeline | ⬜ | GitHub Actions |
| Environment configs | ⬜ | dev/staging/prod |

---

## Implementation Progress Summary

### Completed (✅)

```
src/
├── main.ts                              ✅ Global config, CORS, prefix
├── app.module.ts                        ✅ All modules imported
├── database/
│   ├── database.module.ts               ✅
│   └── schemas/
│       ├── user.schema.ts               ✅
│       ├── task.schema.ts               ✅
│       └── note.schema.ts               ✅
├── common/
│   ├── decorators/                      ✅ current-user, public
│   ├── guards/                          ✅ jwt-auth
│   ├── pipes/                           ✅ validation
│   ├── filters/                         ✅ http-exception
│   └── interceptors/                    ✅ transform
└── modules/
    ├── auth/                            ✅ Full module
    ├── users/                           ✅ Full module
    ├── tasks/                           ✅ Full module
    └── notes/                           ✅ Full module
```

### Not Started (⬜)

```
src/
├── database/schemas/
│   ├── calendar-event.schema.ts         ⬜
│   ├── transaction.schema.ts            ⬜
│   ├── budget.schema.ts                 ⬜
│   └── api-key.schema.ts                ⬜
├── common/
│   ├── guards/
│   │   ├── api-key.guard.ts             ⬜
│   │   └── throttler.guard.ts           ⬜
│   └── interceptors/
│       ├── logging.interceptor.ts       ⬜
│       └── timeout.interceptor.ts       ⬜
├── cache/                               ⬜ Entire module
└── modules/
    ├── calendar/                        ⬜ Entire module
    ├── finance/                         ⬜ Entire module
    ├── ai/                              ⬜ Entire module
    └── websocket/                       ⬜ Entire module
```

---

## Quick Start Commands

```bash
# Start MongoDB
docker compose up -d mongodb

# Start development server
npm run start:dev

# Run tests
npm run test

# Build for production
npm run build
```

---

## Next Steps (Recommended Order)

1. **Calendar Module** - Event scheduling and reminders
2. **Finance Module** - Transaction and budget tracking
3. **WebSocket Module** - Real-time updates
4. **AI Module** - Natural language processing
5. **Cache Module** - Performance optimization
6. **Testing** - Unit and E2E tests
7. **Documentation** - Swagger API docs

---

## API Base URL

- **Development**: `http://localhost:3010/api/v1`
- **Production**: TBD

---

## Environment Variables

```env
# Required
PORT=3010
MONGODB_URI=mongodb://admin:password@localhost:27017/tony?authSource=admin
JWT_SECRET=your-secret-key

# Optional
JWT_EXPIRY=7d
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=password
```
