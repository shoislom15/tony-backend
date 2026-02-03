# Tony API Reference

> **For LLM/Claude Code**: This document provides a complete API reference for building client applications.
> **OpenAPI JSON**: Available at `http://localhost:3010/api/docs-json` when server is running.

## Base URL

```
http://localhost:3010/api/v1
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Response Format

All responses follow this format:

```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## Auth Endpoints

### POST /auth/register

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secretPassword123",
  "name": "John Doe",
  "telegramId": "123456789"  // optional
}
```

**Response (201):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe",
    "telegramId": "123456789"
  }
}
```

### POST /auth/login

Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "secretPassword123"
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### POST /auth/telegram

Authenticate via Telegram ID.

**Request Body:**
```json
{
  "telegramId": "123456789",
  "name": "John Doe"  // optional
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

### GET /auth/me

Get current authenticated user. **Requires auth.**

**Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "name": "John Doe"
}
```

---

## Users Endpoints

All endpoints require authentication.

### GET /users/profile

Get user profile with settings.

**Response (200):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "name": "John Doe",
  "telegramId": "123456789",
  "settings": {
    "language": "en",
    "timezone": "UTC",
    "emailNotifications": true,
    "telegramNotifications": true
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### PATCH /users/profile

Update user profile.

**Request Body (all fields optional):**
```json
{
  "email": "newemail@example.com",
  "password": "newPassword123",
  "name": "Jane Doe",
  "telegramId": "987654321",
  "settings": {
    "language": "es",
    "timezone": "America/New_York",
    "emailNotifications": false,
    "telegramNotifications": true
  }
}
```

### DELETE /users/account

Permanently delete user account.

**Response (200):**
```json
{
  "message": "Account deleted successfully"
}
```

---

## Tasks Endpoints

All endpoints require authentication.

### POST /tasks

Create a new task.

**Request Body:**
```json
{
  "title": "Complete project documentation",
  "description": "Write API docs",  // optional
  "priority": "medium",  // optional: "low" | "medium" | "high"
  "dueDate": "2024-06-15",  // optional, ISO 8601
  "tags": ["work", "urgent"],  // optional
  "subtasks": [  // optional
    { "title": "Write overview", "completed": false }
  ],
  "isRecurring": false,  // optional
  "recurringPattern": {  // optional
    "frequency": "weekly",  // "daily" | "weekly" | "monthly" | "yearly"
    "interval": 1,
    "endDate": "2024-12-31"
  }
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439012",
  "title": "Complete project documentation",
  "description": "Write API docs",
  "status": "pending",
  "priority": "medium",
  "dueDate": "2024-06-15T00:00:00.000Z",
  "tags": ["work", "urgent"],
  "subtasks": [
    { "title": "Write overview", "completed": false }
  ],
  "isRecurring": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### GET /tasks

List tasks with optional filters.

**Query Parameters (all optional):**
| Parameter | Type | Description |
|-----------|------|-------------|
| status | string | "pending" \| "in_progress" \| "completed" |
| priority | string | "low" \| "medium" \| "high" |
| tag | string | Filter by tag |
| dueDateFrom | string | ISO date, tasks due on/after |
| dueDateTo | string | ISO date, tasks due on/before |
| search | string | Search in title/description |
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 20) |

**Example:** `GET /tasks?status=pending&priority=high&page=1&limit=10`

**Response (200):**
```json
{
  "items": [ ... ],
  "total": 50,
  "page": 1,
  "limit": 10,
  "totalPages": 5
}
```

### GET /tasks/:id

Get a single task by ID.

### PATCH /tasks/:id

Update a task.

**Request Body (all fields optional):**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "in_progress",
  "priority": "high",
  "dueDate": "2024-06-30",
  "tags": ["work", "priority"],
  "subtasks": [
    { "title": "Updated subtask", "completed": true }
  ]
}
```

### PATCH /tasks/:id/status

Quick status update.

**Request Body:**
```json
{
  "status": "completed"  // "pending" | "in_progress" | "completed"
}
```

### DELETE /tasks/:id

Delete a task.

**Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

---

## Notes Endpoints

All endpoints require authentication.

### POST /notes

Create a new note.

**Request Body:**
```json
{
  "title": "Meeting Notes",
  "content": "# Meeting Agenda\n\n- Item 1\n- Item 2",  // optional, markdown
  "folder": "Work/Meetings",  // optional
  "tags": ["meeting", "project-x"],  // optional
  "isPinned": false  // optional
}
```

**Response (201):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439012",
  "title": "Meeting Notes",
  "content": "# Meeting Agenda\n\n- Item 1\n- Item 2",
  "folder": "Work/Meetings",
  "tags": ["meeting", "project-x"],
  "isPinned": false,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### GET /notes

List notes with optional filters.

**Query Parameters (all optional):**
| Parameter | Type | Description |
|-----------|------|-------------|
| search | string | Search in title/content |
| folder | string | Filter by folder |
| tag | string | Filter by tag |
| isPinned | boolean | Filter pinned notes |
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 20) |

**Example:** `GET /notes?folder=Work&isPinned=true&page=1`

### GET /notes/:id

Get a single note by ID.

### PATCH /notes/:id

Update a note.

**Request Body (all fields optional):**
```json
{
  "title": "Updated Title",
  "content": "Updated content",
  "folder": "Archive",
  "tags": ["archived"],
  "isPinned": true
}
```

### DELETE /notes/:id

Delete a note.

**Response (200):**
```json
{
  "message": "Note deleted successfully"
}
```

---

## Enums Reference

### TaskStatus
- `pending` - Task not started
- `in_progress` - Task being worked on
- `completed` - Task finished

### TaskPriority
- `low` - Low priority
- `medium` - Normal priority (default)
- `high` - High priority

### RecurringFrequency
- `daily` - Repeats every day
- `weekly` - Repeats every week
- `monthly` - Repeats every month
- `yearly` - Repeats every year

---

## Error Codes

| Status | Description |
|--------|-------------|
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Missing or invalid token |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Internal Server Error |

---

## TypeScript Types

For client development, here are the main types:

```typescript
// Auth
interface RegisterDto {
  email: string;
  password: string;
  name: string;
  telegramId?: string;
}

interface LoginDto {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  user: {
    id: string;
    email: string;
    name: string;
    telegramId?: string;
  };
}

// Tasks
interface CreateTaskDto {
  title: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
  tags?: string[];
  subtasks?: { title: string; completed?: boolean }[];
  isRecurring?: boolean;
  recurringPattern?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval?: number;
    endDate?: string;
  };
}

interface Task {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  tags: string[];
  subtasks: { title: string; completed: boolean }[];
  isRecurring: boolean;
  recurringPattern?: RecurringPattern;
  createdAt: string;
  updatedAt: string;
}

// Notes
interface CreateNoteDto {
  title: string;
  content?: string;
  folder?: string;
  tags?: string[];
  isPinned?: boolean;
}

interface Note {
  _id: string;
  userId: string;
  title: string;
  content: string;
  folder?: string;
  tags: string[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

// User
interface User {
  id: string;
  email: string;
  name: string;
  telegramId?: string;
  settings: {
    language: string;
    timezone: string;
    emailNotifications: boolean;
    telegramNotifications: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

// Pagination
interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```
