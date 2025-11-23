# 🛠️ Tech Stack - Verita Truth Navigator

Dokumentasi lengkap teknologi, framework, dan library yang digunakan dalam project ini.

---

## 📱 Frontend

### Core Framework

- **React** `^18.3.1` - UI library untuk building user interface
- **TypeScript** `^5.8.3` - Type-safe JavaScript untuk better development experience
- **Vite** `^5.4.19` - Build tool dan development server yang cepat

### Routing

- **React Router DOM** `^6.30.1` - Client-side routing untuk Single Page Application (SPA)

### State Management & Data Fetching

- **TanStack Query (React Query)** `^5.83.0` - Powerful data synchronization untuk React
  - Server state management
  - Caching, background updates, pagination
  - Optimistic updates
- **Native Fetch API** - Built-in browser API untuk HTTP requests
  - No additional dependencies needed
  - Custom API client wrapper (`src/lib/api.ts`)
  - Automatic JWT token injection
  - Error handling & type safety

### UI Components & Styling

- **Tailwind CSS** `^3.4.17` - Utility-first CSS framework
- **Shadcn/ui** - High-quality component library built on Radix UI
- **Radix UI** - Unstyled, accessible component primitives
  - `@radix-ui/react-accordion` - Accordion component
  - `@radix-ui/react-alert-dialog` - Alert dialog
  - `@radix-ui/react-avatar` - Avatar component
  - `@radix-ui/react-checkbox` - Checkbox
  - `@radix-ui/react-dialog` - Dialog/Modal
  - `@radix-ui/react-dropdown-menu` - Dropdown menu
  - `@radix-ui/react-label` - Label component
  - `@radix-ui/react-popover` - Popover
  - `@radix-ui/react-select` - Select dropdown
  - `@radix-ui/react-separator` - Separator
  - `@radix-ui/react-slot` - Slot component
  - `@radix-ui/react-tabs` - Tabs component
  - `@radix-ui/react-toast` - Toast notifications
  - `@radix-ui/react-tooltip` - Tooltip
- **Lucide React** `^0.462.0` - Beautiful & consistent icon library

### Form Handling

- **React Hook Form** `^7.61.1` - Performant forms dengan easy validation
- **Zod** `^3.25.76` - TypeScript-first schema validation
- **@hookform/resolvers** `^3.10.0` - Validation resolvers untuk React Hook Form

### Utilities

- **clsx** `^2.1.1` - Utility for constructing className strings
- **tailwind-merge** `^2.6.0` - Merge Tailwind CSS classes without style conflicts
- **class-variance-authority** `^0.7.1` - Variant-based styling utility
- **date-fns** `^3.6.0` - Modern JavaScript date utility library

### Charts & Data Visualization

- **Recharts** `^2.15.4` - Composable charting library untuk React

### Additional UI Components

- **cmdk** `^1.1.1` - Command menu component
- **embla-carousel-react** `^8.6.0` - Carousel/slider component
- **input-otp** `^1.4.2` - OTP input component
- **react-day-picker** `^8.10.1` - Date picker component
- **react-resizable-panels** `^2.1.9` - Resizable panel layouts
- **sonner** `^1.7.4` - Toast notifications (alternative)
- **vaul** `^0.9.9` - Drawer component

### Theme

- **next-themes** `^0.3.0` - Theme provider untuk dark/light mode

### Development Tools

- **ESLint** `^9.32.0` - JavaScript/TypeScript linter
- **TypeScript ESLint** `^8.38.0` - ESLint plugin untuk TypeScript
- **Autoprefixer** `^10.4.21` - CSS vendor prefixer
- **PostCSS** `^8.5.6` - CSS post-processor

---

## 🔧 Backend

### Core Framework

- **Node.js** - JavaScript runtime
- **Express.js** `^4.21.1` - Web application framework untuk Node.js
- **TypeScript** `^5.8.3` - Type-safe JavaScript

### Database & Data Access

- **Supabase** - Backend-as-a-Service (BaaS)
  - PostgreSQL database
  - Real-time subscriptions
  - Row Level Security (RLS)
- **@supabase/supabase-js** `^2.47.10` - Supabase JavaScript client
  - **Query Builder** - Chain-based query API (bukan ORM tradisional)
  - Type-safe queries dengan TypeScript interfaces
  - Direct SQL-like operations (`.from()`, `.select()`, `.eq()`, `.insert()`, `.update()`)
  - No ORM library (Prisma, TypeORM, Sequelize) - menggunakan Supabase query builder

### Authentication & Security

- **jsonwebtoken** `^9.0.2` - JWT (JSON Web Token) implementation
- **bcryptjs** `^2.4.3` - Password hashing library
- **cors** `^2.8.5` - Cross-Origin Resource Sharing middleware

### Validation

- **Zod** `^3.25.76` - TypeScript-first schema validation
  - Runtime type checking
  - Input validation untuk API endpoints

### Environment & Configuration

- **dotenv** `^16.4.7` - Load environment variables dari `.env` file

### Development Tools

- **tsx** `^4.19.2` - TypeScript execution untuk development
- **ESLint** `^9.32.0` - Code linting

### Type Definitions

- `@types/express` `^5.0.0` - TypeScript types untuk Express
- `@types/cors` `^2.8.17` - TypeScript types untuk CORS
- `@types/bcryptjs` `^2.4.6` - TypeScript types untuk bcryptjs
- `@types/jsonwebtoken` `^9.0.7` - TypeScript types untuk JWT
- `@types/node` `^22.16.5` - TypeScript types untuk Node.js

---

## 🗄️ Database (Supabase/PostgreSQL)

### Tables

- `users` - User accounts dengan authentication
- `dashboard_data_categories` - Kategori data untuk dashboard
- `dashboard_data_items` - Item data per kategori
- `reports` - User-submitted content untuk verification
- `education_modules` - Education modules untuk literacy
- `module_progress` - User progress tracking
- `achievements` - Achievement definitions
- `user_achievements` - User-earned achievements

---

## 🚀 Deployment & Infrastructure

### Frontend Hosting

- **Vercel** - Frontend deployment platform
  - Automatic deployments dari GitHub
  - CDN distribution
  - Serverless functions support

### Backend Hosting

- **Railway** / **Render** - Backend deployment platform
  - Node.js runtime support
  - Environment variables management
  - Auto-scaling

### Database Hosting

- **Supabase** - Managed PostgreSQL database
  - Automatic backups
  - Real-time capabilities
  - Row Level Security

---

## 📦 Package Management

- **npm** - Node Package Manager
- **package-lock.json** - Lock file untuk dependency versions

---

## 🔐 Security

- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing (bcrypt algorithm)
- **CORS** - Cross-origin resource sharing protection
- **Zod** - Input validation & sanitization
- **Row Level Security (RLS)** - Database-level security di Supabase

---

## 🛠️ Development Tools

### Code Quality

- **ESLint** - Linting untuk JavaScript/TypeScript
- **TypeScript** - Static type checking
- **Prettier** (implied) - Code formatting

### Build Tools

- **Vite** - Frontend build tool
- **TypeScript Compiler (tsc)** - Backend compilation

### Version Control

- **Git** - Version control system
- **GitHub** - Code repository hosting

---

## 📊 Architecture Pattern

### Frontend

- **Component-Based Architecture** - React components
- **Custom Hooks** - Reusable logic (`useAuth`, `useToast`)
- **Context API** - Global state management (Authentication)
- **React Query** - Server state management

### Backend

- **RESTful API** - REST architecture
- **MVC Pattern** - Model-View-Controller
  - Routes (Controllers)
  - Middleware (Authentication, Error handling)
  - Services (Supabase client)

### Project Structure

- **Monorepo** - Frontend dan backend dalam satu repository
- **Separate Deployments** - Frontend dan backend di-deploy terpisah

---

## 🔄 API Communication

- **Native Fetch API** - Built-in browser API untuk HTTP requests
  - No external HTTP client library (no axios, no superagent)
  - Custom wrapper class untuk type safety dan error handling
  - Automatic JWT token injection dari localStorage
- **REST API** - HTTP methods (GET, POST, PUT, DELETE)
- **JSON** - Data exchange format
- **JWT Bearer Token** - Authentication header (`Authorization: Bearer <token>`)

---

## 📝 Summary

### Frontend Stack

```
React + TypeScript + Vite
├── UI: Tailwind CSS + Shadcn/ui + Radix UI
├── Routing: React Router DOM
├── State: React Query + Context API
├── Forms: React Hook Form + Zod
└── Icons: Lucide React
```

### Backend Stack

```
Node.js + Express + TypeScript
├── Database: Supabase (PostgreSQL)
│   └── Query Builder: Supabase Client (no ORM)
├── Auth: JWT + bcryptjs
├── Validation: Zod
└── Deployment: Railway/Render
```

### Full Stack

```
Frontend (Vercel) ↔ REST API ↔ Backend (Railway) ↔ Supabase (PostgreSQL)
```

---

## 📚 Documentation

- **API Documentation** - `backend/API_DOCUMENTATION.md`
- **Deployment Guide** - `DEPLOYMENT_STEPS.md`
- **Supabase Setup** - `backend/SUPABASE_SETUP.md`
- **Admin Setup** - `backend/ADMIN_SETUP.md`

---

## 🎯 Key Features Enabled by Tech Stack

1. **Type Safety** - TypeScript di frontend & backend
2. **Real-time Updates** - React Query untuk automatic refetching
3. **Accessible UI** - Radix UI components
4. **Fast Development** - Vite HMR (Hot Module Replacement)
5. **Scalable Backend** - Express.js dengan TypeScript
6. **Secure Authentication** - JWT + bcryptjs
7. **Database Security** - Supabase RLS
8. **Easy Deployment** - Vercel + Railway/Render

---

_Last updated: 2024_
