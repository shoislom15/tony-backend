# Complete Architectural Overview - NestJS Backend (Redis Optional)

Here's the complete architecture with NestJS as the backend, where Redis is optional and can be added later for performance optimization.

## 1. System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CLIENTS LAYER                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐              │
│  │  Telegram    │    │   Web App    │    │  Mobile App  │              │
│  │     Bot      │    │   (React/    │    │(React Native)│              │
│  │              │    │   Next.js)   │    │              │              │
│  │  • Commands  │    │  • Dashboard │    │  • Native UI │              │
│  │  • Voice     │    │  • Real-time │    │  • Offline   │              │
│  │  • Keyboards │    │  • Rich UI   │    │  • Push      │              │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘              │
│         │                   │                    │                       │
│         │  REST API         │  REST API          │  REST API            │
│         │  + Webhooks       │  + WebSocket       │  + WebSocket         │
└─────────┼───────────────────┼────────────────────┼───────────────────────┘
          │                   │                    │
          └───────────────────┼────────────────────┘
                              │
                              │ HTTPS
                              │
┌─────────────────────────────▼─────────────────────────────────────────┐
│                     NestJS Backend API Server                          │
│                   (Node.js + TypeScript + MongoDB)                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                    HTTP Server (Express)                           │ │
│  │                    Port: 3000                                      │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                   Middleware & Guards                              │ │
│  │                                                                    │ │
│  │  • Authentication Guard (JWT)                                     │ │
│  │  • API Key Guard (for MCP Server)                                 │ │
│  │  • Rate Limiting Guard                                            │ │
│  │  • Validation Pipe (class-validator)                              │ │
│  │  • Exception Filters                                              │ │
│  │  • Logging Interceptor                                            │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                      API Routes (Controllers)                      │ │
│  │                                                                    │ │
│  │  /api/v1/auth          Authentication & Registration              │ │
│  │  /api/v1/users         User profile & settings                    │ │
│  │  /api/v1/tasks         Task CRUD operations                       │ │
│  │  /api/v1/notes         Notes CRUD operations                      │ │
│  │  /api/v1/calendar      Calendar events management                 │ │
│  │  /api/v1/finance       Financial transactions & budgets           │ │
│  │  /api/v1/ai            AI processing & voice input                │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                       Feature Modules                              │ │
│  │                                                                    │ │
│  │  ┌──────────────────────────────────────────────────────────────┐ │ │
│  │  │  AuthModule                                                   │ │ │
│  │  │  • AuthController  • AuthService  • JWT Strategy             │ │ │
│  │  └──────────────────────────────────────────────────────────────┘ │ │
│  │                                                                    │ │
│  │  ┌──────────────────────────────────────────────────────────────┐ │ │
│  │  │  TasksModule                                                  │ │ │
│  │  │  • TasksController • TasksService • TasksRepository          │ │ │
│  │  └──────────────────────────────────────────────────────────────┘ │ │
│  │                                                                    │ │
│  │  ┌──────────────────────────────────────────────────────────────┐ │ │
│  │  │  NotesModule                                                  │ │ │
│  │  │  • NotesController • NotesService • NotesRepository          │ │ │
│  │  └──────────────────────────────────────────────────────────────┘ │ │
│  │                                                                    │ │
│  │  ┌──────────────────────────────────────────────────────────────┐ │ │
│  │  │  CalendarModule                                               │ │ │
│  │  │  • CalendarController • CalendarService • Repository         │ │ │
│  │  └──────────────────────────────────────────────────────────────┘ │ │
│  │                                                                    │ │
│  │  ┌──────────────────────────────────────────────────────────────┐ │ │
│  │  │  FinanceModule                                                │ │ │
│  │  │  • FinanceController • FinanceService • Repository           │ │ │
│  │  └──────────────────────────────────────────────────────────────┘ │ │
│  │                                                                    │ │
│  │  ┌──────────────────────────────────────────────────────────────┐ │ │
│  │  │  AIModule                                                     │ │ │
│  │  │  • AIController • ClaudeService • WhisperService             │ │ │
│  │  │  • IntentService • NLPService                                │ │ │
│  │  └──────────────────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                  WebSocket Gateway (Socket.io)                     │ │
│  │                        Port: 3001                                  │ │
│  │                                                                    │ │
│  │  • Real-time task updates                                         │ │
│  │  • Calendar event notifications                                   │ │
│  │  • Note synchronization                                           │ │
│  │  • User presence tracking                                         │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │               Shared Services (Global Modules)                     │ │
│  │                                                                    │ │
│  │  • CacheModule (Optional - Redis or In-Memory)                    │ │
│  │  • DatabaseModule (MongoDB + Mongoose)                            │ │
│  │  • ConfigModule (Environment variables)                           │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                           │
└─────────────┬──────────────────────┬────────────────────────────────────┘
              │                      │
              │                      │
      ┌───────▼──────┐      ┌───────▼────────┐
      │   MongoDB    │      │ Redis (Optional)│
      │              │      │                 │
      │  Collections:│      │  • Session Cache│
      │  • users     │      │  • Rate Limits  │
      │  • tasks     │      │  • Query Cache  │
      │  • notes     │      │  • WebSocket    │
      │  • events    │      │    Tracking     │
      │  • txns      │      │                 │
      │  • budgets   │      │  If not used:   │
      │  • api_keys  │      │  Use in-memory  │
      │              │      │  Map/Cache      │
      │ Port: 27017  │      │  Port: 6379     │
      └──────────────┘      └─────────────────┘
              │
              │
      ┌───────▼──────────────────────────┐
      │     External Services             │
      │                                   │
      │  ┌─────────────┐  ┌────────────┐ │
      │  │ Claude API  │  │  Whisper   │ │
      │  │   (AI/NLP)  │  │ (Speech to │ │
      │  │             │  │   Text)    │ │
      │  └─────────────┘  └────────────┘ │
      │                                   │
      │  ┌─────────────┐                 │
      │  │  S3/Local   │                 │
      │  │   Storage   │                 │
      │  │ (Files/Voice)│                │
      │  └─────────────┘                 │
      └───────────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                   MCP SERVER (Separate Service)                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │              MCP Protocol Implementation                           │ │
│  │                                                                    │ │
│  │  • Tool Handlers (create_task, list_tasks, etc.)                  │ │
│  │  • Resource Providers (pending tasks, calendar, etc.)             │ │
│  │  • Prompt Templates                                               │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                           │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │           Backend API Client (HTTP REST Client)                    │ │
│  │                                                                    │ │
│  │  Calls NestJS Backend:                                             │ │
│  │  • POST   https://api.yourapp.com/api/v1/tasks                    │ │
│  │  • GET    https://api.yourapp.com/api/v1/tasks                    │ │
│  │  • POST   https://api.yourapp.com/api/v1/calendar/events          │ │
│  │  • GET    https://api.yourapp.com/api/v1/finance/summary          │ │
│  │  • etc...                                                          │ │
│  │                                                                    │ │
│  │  Authentication: Bearer <USER_API_KEY>                             │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                           │
│                        Port: 3002 (Stdio Protocol)                       │
└───────────────────────────┬─────────────────────────────────────────────┘
                            │
                            │ Stdio/JSON-RPC
                            │
                ┌───────────┴──────────┐
                │                      │
        ┌───────▼────────┐    ┌───────▼────────┐
        │     Claude     │    │    ChatGPT     │
        │    Desktop     │    │   (Future)     │
        │                │    │                │
        │  User can:     │    │  User can:     │
        │  • Create tasks│    │  • Manage data │
        │  • View notes  │    │  • AI commands │
        │  • Get schedule│    │                │
        └────────────────┘    └────────────────┘
```

## 2. Complete NestJS Project Structure

```
productivity-hub/
│
├── backend-api/                        # NestJS Backend Server
│   ├── src/
│   │   ├── main.ts                     # Application entry point
│   │   ├── app.module.ts               # Root module
│   │   ├── app.controller.ts           # Health check
│   │   ├── app.service.ts
│   │   │
│   │   ├── config/                     # Configuration files
│   │   │   ├── database.config.ts      # MongoDB config
│   │   │   ├── jwt.config.ts           # JWT config
│   │   │   ├── cache.config.ts         # Cache config (optional Redis)
│   │   │   └── app.config.ts           # General app config
│   │   │
│   │   ├── common/                     # Shared utilities
│   │   │   ├── decorators/
│   │   │   │   ├── current-user.decorator.ts
│   │   │   │   ├── public.decorator.ts
│   │   │   │   └── roles.decorator.ts
│   │   │   │
│   │   │   ├── guards/
│   │   │   │   ├── jwt-auth.guard.ts
│   │   │   │   ├── api-key.guard.ts
│   │   │   │   └── throttler.guard.ts
│   │   │   │
│   │   │   ├── interceptors/
│   │   │   │   ├── logging.interceptor.ts
│   │   │   │   ├── transform.interceptor.ts
│   │   │   │   └── timeout.interceptor.ts
│   │   │   │
│   │   │   ├── pipes/
│   │   │   │   └── validation.pipe.ts
│   │   │   │
│   │   │   ├── filters/
│   │   │   │   └── http-exception.filter.ts
│   │   │   │
│   │   │   ├── interfaces/
│   │   │   │   ├── user.interface.ts
│   │   │   │   └── index.ts
│   │   │   │
│   │   │   └── utils/
│   │   │       ├── helpers.ts
│   │   │       └── constants.ts
│   │   │
│   │   ├── database/                   # Database schemas
│   │   │   ├── database.module.ts
│   │   │   └── schemas/
│   │   │       ├── user.schema.ts
│   │   │       ├── task.schema.ts
│   │   │       ├── note.schema.ts
│   │   │       ├── calendar-event.schema.ts
│   │   │       ├── transaction.schema.ts
│   │   │       ├── budget.schema.ts
│   │   │       └── api-key.schema.ts
│   │   │
│   │   ├── cache/                      # Cache module (Optional Redis)
│   │   │   ├── cache.module.ts
│   │   │   ├── cache.service.ts        # Supports both Redis & in-memory
│   │   │   ├── providers/
│   │   │   │   ├── redis-cache.provider.ts
│   │   │   │   └── memory-cache.provider.ts
│   │   │   └── interfaces/
│   │   │       └── cache.interface.ts
│   │   │
│   │   ├── modules/                    # Feature modules
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── auth.module.ts
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── strategies/
│   │   │   │   │   ├── jwt.strategy.ts
│   │   │   │   │   └── api-key.strategy.ts
│   │   │   │   └── dto/
│   │   │   │       ├── register.dto.ts
│   │   │   │       ├── login.dto.ts
│   │   │   │       └── auth-response.dto.ts
│   │   │   │
│   │   │   ├── users/
│   │   │   │   ├── users.module.ts
│   │   │   │   ├── users.controller.ts
│   │   │   │   ├── users.service.ts
│   │   │   │   ├── users.repository.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-user.dto.ts
│   │   │   │       ├── update-user.dto.ts
│   │   │   │       └── user-response.dto.ts
│   │   │   │
│   │   │   ├── tasks/
│   │   │   │   ├── tasks.module.ts
│   │   │   │   ├── tasks.controller.ts
│   │   │   │   ├── tasks.service.ts
│   │   │   │   ├── tasks.repository.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-task.dto.ts
│   │   │   │       ├── update-task.dto.ts
│   │   │   │       ├── filter-task.dto.ts
│   │   │   │       └── task-response.dto.ts
│   │   │   │
│   │   │   ├── notes/
│   │   │   │   ├── notes.module.ts
│   │   │   │   ├── notes.controller.ts
│   │   │   │   ├── notes.service.ts
│   │   │   │   ├── notes.repository.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-note.dto.ts
│   │   │   │       ├── update-note.dto.ts
│   │   │   │       ├── search-note.dto.ts
│   │   │   │       └── note-response.dto.ts
│   │   │   │
│   │   │   ├── calendar/
│   │   │   │   ├── calendar.module.ts
│   │   │   │   ├── calendar.controller.ts
│   │   │   │   ├── calendar.service.ts
│   │   │   │   ├── calendar.repository.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-event.dto.ts
│   │   │   │       ├── update-event.dto.ts
│   │   │   │       ├── filter-event.dto.ts
│   │   │   │       └── event-response.dto.ts
│   │   │   │
│   │   │   ├── finance/
│   │   │   │   ├── finance.module.ts
│   │   │   │   ├── finance.controller.ts
│   │   │   │   ├── finance.service.ts
│   │   │   │   ├── finance.repository.ts
│   │   │   │   └── dto/
│   │   │   │       ├── create-transaction.dto.ts
│   │   │   │       ├── filter-transaction.dto.ts
│   │   │   │       ├── create-budget.dto.ts
│   │   │   │       └── summary-response.dto.ts
│   │   │   │
│   │   │   ├── ai/
│   │   │   │   ├── ai.module.ts
│   │   │   │   ├── ai.controller.ts
│   │   │   │   ├── ai.service.ts
│   │   │   │   ├── services/
│   │   │   │   │   ├── claude.service.ts
│   │   │   │   │   ├── whisper.service.ts
│   │   │   │   │   ├── intent.service.ts
│   │   │   │   │   └── nlp.service.ts
│   │   │   │   └── dto/
│   │   │   │       ├── process-voice.dto.ts
│   │   │   │       ├── process-text.dto.ts
│   │   │   │       └── ai-response.dto.ts
│   │   │   │
│   │   │   └── websocket/
│   │   │       ├── websocket.module.ts
│   │   │       ├── websocket.gateway.ts
│   │   │       ├── websocket.service.ts
│   │   │       └── events/
│   │   │           ├── task.events.ts
│   │   │           ├── note.events.ts
│   │   │           └── calendar.events.ts
│   │   │
│   │   └── types/
│   │       └── index.ts
│   │
│   ├── test/
│   │   ├── app.e2e-spec.ts
│   │   └── jest-e2e.json
│   │
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── nest-cli.json
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── mcp-server/                         # MCP Server (Separate)
│   ├── src/
│   │   ├── index.ts
│   │   ├── server.ts
│   │   ├── tools/
│   │   │   ├── tasks/
│   │   │   ├── notes/
│   │   │   ├── calendar/
│   │   │   └── finance/
│   │   ├── resources/
│   │   ├── prompts/
│   │   └── client/
│   │       └── backend-client.ts       # Calls NestJS API
│   ├── package.json
│   └── tsconfig.json
│
├── telegram-bot/                       # Telegram Bot (Separate)
│   ├── src/
│   │   ├── index.ts
│   │   ├── bot.ts
│   │   ├── commands/
│   │   ├── handlers/
│   │   ├── keyboards/
│   │   └── services/
│   │       └── api.service.ts          # Calls NestJS API
│   ├── package.json
│   └── tsconfig.json
│
├── web-app/                            # Web Application
│   ├── src/
│   │   ├── app/                        # Next.js App Router
│   │   ├── components/
│   │   ├── lib/
│   │   │   └── api/
│   │   │       └── client.ts           # Calls NestJS API
│   │   └── types/
│   ├── package.json
│   └── next.config.js
│
├── mobile-app/                         # Mobile App
│   ├── src/
│   │   ├── screens/
│   │   ├── components/
│   │   └── services/
│   │       └── api.ts                  # Calls NestJS API
│   ├── package.json
│   └── tsconfig.json
│
└── docker-compose.yml                  # Development environment
```

## 9. Summary of Architecture

### Core Components:

1. **NestJS Backend API** (Port 3000)
   - REST API endpoints
   - WebSocket server (Port 3001)
   - MongoDB for data persistence
   - Optional Redis or in-memory cache
   - JWT authentication
   - Business logic in services
   - Data access in repositories

2. **MongoDB Database** (Port 27017)
   - Primary data storage
   - Collections: users, tasks, notes, events, transactions, budgets, api_keys
   - Always required

3. **Cache Layer** (Optional Redis on Port 6379)
   - **USE_REDIS=false**: Uses in-memory Map (default, no Redis needed)
   - **USE_REDIS=true**: Uses Redis for better performance
   - Caching strategy works the same regardless of provider

4. **MCP Server** (Port 3002) - Separate service
   - Communicates with NestJS backend via REST API
   - Provides tools for Claude/ChatGPT
   - Uses API key authentication

5. **Clients** (Telegram, Web, Mobile)
   - All communicate with NestJS backend via REST API
   - WebSocket for real-time updates
   - Each client is a separate application

### Key Benefits:

✅ **Start Simple**: Works without Redis using in-memory cache
✅ **Scale Later**: Add Redis when needed for better performance
✅ **Clean Architecture**: NestJS modules, services, repositories
✅ **Type Safety**: Full TypeScript support
✅ **Easy Testing**: Built-in testing utilities
✅ **Flexibility**: Can switch between Redis and in-memory seamlessly

### Migration Path:

**Phase 1** (Start here):

- NestJS backend with MongoDB
- In-memory caching (USE_REDIS=false)
- Build core features

**Phase 2** (When needed):

- Add Redis (USE_REDIS=true)
- Better caching performance
- Session management
- Rate limiting

**Phase 3** (Scale):

- Load balancers
- Multiple backend instances
- Redis cluster
- Microservices if needed
