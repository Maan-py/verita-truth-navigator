# 📚 API Documentation - Verita Truth Navigator

Dokumentasi lengkap untuk semua API endpoints sesuai dengan MVP scope.

## 🔐 Authentication

Semua endpoint yang memerlukan authentication menggunakan JWT Bearer token.

**Header:**
```
Authorization: Bearer <token>
```

## 📊 Dashboard Data API

### GET `/api/dashboard/categories`
Get all dashboard data categories (Health, Politics, Finance, Environment, Education).

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "category_id": "health",
      "name": "Health",
      "icon": "Heart",
      "color": "text-red-500",
      "bg_color": "bg-red-50 dark:bg-red-950/20"
    }
  ]
}
```

### GET `/api/dashboard/categories/:categoryId`
Get dashboard data for a specific category.

**Parameters:**
- `categoryId`: health, politics, finance, environment, education

**Response:**
```json
{
  "status": "success",
  "data": {
    "category": { ... },
    "items": [
      {
        "id": "uuid",
        "label": "Vaccination Rate",
        "value": "87%",
        "trend": "+5%",
        "source_url": "https://...",
        "last_updated": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

### POST `/api/dashboard/categories/:categoryId/items` (Admin Only)
Create or update dashboard data item.

**Body:**
```json
{
  "label": "Vaccination Rate",
  "value": "87%",
  "trend": "+5%",
  "source_url": "https://..."
}
```

## 📝 Reports API

### POST `/api/reports`
Submit content for verification.

**Body:**
```json
{
  "content": "Text content to verify...",
  "image_url": "https://..." (optional),
  "category": "health" (optional)
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Report submitted successfully",
  "data": {
    "id": "uuid",
    "user_id": "uuid",
    "content": "...",
    "status": "PENDING",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

### GET `/api/reports`
Get all reports submitted by the authenticated user.

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "content": "...",
      "status": "PENDING",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### GET `/api/reports/:id`
Get a specific report by ID.

## 👨‍💼 Admin API (Verification Management)

### GET `/api/admin/reports`
Get all reports with pagination (Admin only).

**Query Parameters:**
- `status`: Filter by status (PENDING, FACT, HOAX, UNVERIFIED)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)

**Response:**
```json
{
  "status": "success",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### PUT `/api/admin/reports/:id/status`
Update report verification status (Admin only).

**Body:**
```json
{
  "status": "FACT", // PENDING, FACT, HOAX, UNVERIFIED
  "verification_notes": "Verified against official sources",
  "category": "health" (optional)
}
```

### GET `/api/admin/reports/stats`
Get report statistics (Admin only).

**Response:**
```json
{
  "status": "success",
  "data": {
    "total": 100,
    "pending": 25,
    "fact": 40,
    "hoax": 30,
    "unverified": 5
  }
}
```

## 📚 Education API

### GET `/api/education/modules`
Get all education modules.

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "title": "Identifying Misinformation Basics",
      "description": "...",
      "difficulty": "Beginner",
      "duration_minutes": 15,
      "lessons_count": 5,
      "badge_name": "Fact Checker"
    }
  ]
}
```

### GET `/api/education/modules/:id`
Get a specific module by ID.

### GET `/api/education/progress`
Get user's progress for all modules (Authenticated).

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "progress_percentage": 60,
      "completed": false,
      "education_modules": {
        "id": "uuid",
        "title": "...",
        "badge_name": "..."
      }
    }
  ]
}
```

### PUT `/api/education/modules/:moduleId/progress`
Update user's progress for a module (Authenticated).

**Body:**
```json
{
  "progress_percentage": 75,
  "completed": false
}
```

### GET `/api/education/achievements`
Get user's achievements (Authenticated).

## 🔑 Authentication API

### POST `/api/auth/register`
Register a new user.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### POST `/api/auth/login`
Login user.

**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### GET `/api/auth/profile`
Get authenticated user's profile.

## 📋 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden (Admin only)
- `404` - Not Found
- `409` - Conflict (e.g., email already exists)
- `500` - Internal Server Error

## 🚨 Error Response Format

```json
{
  "status": "error",
  "message": "Error message here"
}
```

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- All UUIDs are in standard UUID v4 format
- Pagination is 1-indexed (page 1 is the first page)
- Admin endpoints require user role to be set to 'admin' in database

