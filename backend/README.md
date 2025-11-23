# Verita Backend API

Backend API untuk Verita Truth Navigator menggunakan Express.js dan TypeScript.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Supabase Database

Ikuti panduan lengkap di [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) untuk:

- Membuat project Supabase
- Setup database schema
- Mendapatkan credentials

### 3. Setup Environment Variables

Buat file `.env` di folder `backend/`:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:8080

# Supabase Configuration
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Penting:** Dapatkan `SUPABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY` dari Supabase Dashboard → Settings → API

### 4. Run Development Server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   ├── middleware/      # Express middleware
│   ├── routes/          # API routes
│   ├── lib/             # Utilities (Supabase client)
│   └── index.ts         # Entry point
├── supabase/
│   └── migrations/      # Database migrations
├── dist/                # Compiled JavaScript (generated)
├── .env                 # Environment variables (not in git)
├── package.json
└── tsconfig.json
```

## 🔌 API Endpoints

Lihat [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) untuk dokumentasi lengkap.

### Health Check

- `GET /api/health` - Check server status

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Dashboard Data

- `GET /api/dashboard/categories` - Get all categories
- `GET /api/dashboard/categories/:categoryId` - Get category data
- `POST /api/dashboard/categories/:categoryId/items` - Create/update data item (admin)

### Reports (User)

- `POST /api/reports` - Submit content for verification
- `GET /api/reports` - Get user's reports
- `GET /api/reports/:id` - Get specific report

### Admin (Verification Management)

- `GET /api/admin/reports` - Get all reports with pagination
- `PUT /api/admin/reports/:id/status` - Update report status
- `GET /api/admin/reports/stats` - Get report statistics

### Education Modules

- `GET /api/education/modules` - Get all modules
- `GET /api/education/modules/:id` - Get specific module
- `GET /api/education/progress` - Get user progress
- `PUT /api/education/modules/:moduleId/progress` - Update progress
- `GET /api/education/achievements` - Get user achievements

## 🚢 Deployment

### Option 1: Deploy sebagai Service Terpisah

Backend bisa di-deploy ke:

- **Vercel** (serverless functions)
- **Railway** (container-based)
- **Render** (container-based)
- **Heroku** (container-based)
- **DigitalOcean App Platform**
- **AWS EC2 / ECS**
- **Google Cloud Run**

### Option 2: Deploy dengan Frontend (Full-stack)

Jika menggunakan platform seperti:

- **Vercel** - bisa deploy frontend + backend dalam satu project
- **Netlify** - dengan serverless functions
- **Railway** - bisa deploy multiple services

## 📝 Environment Variables untuk Production

Pastikan set environment variables di platform deployment:

```env
PORT=3000
NODE_ENV=production
JWT_SECRET=<generate-random-secret>
FRONTEND_URL=https://your-frontend-domain.com
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
```

## 🔒 Security Notes

- [x] Generate strong JWT_SECRET untuk production
- [x] Setup CORS dengan domain frontend yang tepat
- [x] Add input validation (Zod)
- [x] Setup database (Supabase PostgreSQL)
- [ ] Add rate limiting
- [ ] Add logging dan monitoring
- [ ] Setup HTTPS (otomatis di platform deployment)

## 🗄️ Database

Project menggunakan **Supabase** (PostgreSQL) sebagai database.

**Setup:**

- Lihat [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) untuk panduan lengkap
- Database schema ada di `supabase/migrations/`

**Features:**

- ✅ PostgreSQL database
- ✅ Real-time capabilities (bisa ditambahkan)
- ✅ Row Level Security (RLS)
- ✅ Auto-generated REST API
- ✅ Built-in authentication (optional)

## 📚 API Documentation

Lihat [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) untuk dokumentasi lengkap semua endpoints.

## 🎯 MVP Features Implementation

Backend ini mengimplementasikan semua fitur MVP:

1. ✅ **User Authentication** - Login & Registration dengan JWT
2. ✅ **Data Dashboard** - API untuk 5 kategori data (Health, Politics, Finance, Environment, Education)
3. ✅ **Reporting System** - User bisa submit content untuk verification
4. ✅ **Verification Management** - Admin dashboard untuk process & update report status
5. ✅ **Education Modules** - API untuk 3 Interactive Literacy Modules dengan progress tracking

## 🗄️ Database Schema

Database menggunakan Supabase (PostgreSQL) dengan tabel:

- `users` - User accounts
- `dashboard_data_categories` - 5 data categories
- `dashboard_data_items` - Data items per category
- `reports` - User submissions for verification
- `education_modules` - 3 literacy modules
- `module_progress` - User progress tracking
- `achievements` - Achievement system
- `user_achievements` - User earned achievements

Jalankan semua migrations di `supabase/migrations/` untuk setup database.

## 👨‍💼 Admin Setup

Untuk mengakses admin endpoints, user perlu di-set sebagai admin:

```bash
# Set user sebagai admin
npm run set-admin <email>

# Contoh
npm run set-admin admin@example.com
```

Lihat [ADMIN_SETUP.md](./ADMIN_SETUP.md) untuk panduan lengkap.
