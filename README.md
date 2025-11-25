# Verita Truth Navigator 🛡️

Verita Truth Navigator is a comprehensive digital literacy platform designed to combat misinformation. It empowers users to verify news, report hoaxes, and access educational modules to improve their critical thinking skills.

## ✨ Key Features

- **🔍 Hoax Verification**: Submit content to be verified by our system and community.
- **📊 Data Dashboard**: Visualize trends in misinformation across various categories (Health, Politics, Finance, etc.).
- **📝 Reporting System**: Report suspicious content and track the status of your reports.
- **🎓 Education Modules**: Interactive literacy modules to enhance your digital media skills.
- **👑 Admin Dashboard**: Dedicated portal for administrators to manage reports and verify content.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [TanStack Query](https://tanstack.com/query/latest)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Authentication**: JWT & Supabase Auth

## 📁 Project Structure

This project is a monorepo containing both the frontend and backend:

```
verita-truth-navigator/
├── src/              # Frontend Application (React)
├── backend/          # Backend API (Express)
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── index.ts
│   └── package.json
└── package.json      # Frontend dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd verita-truth-navigator
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Configure your environment variables
   ```

3. **Setup Frontend**
   ```bash
   cd ..  # Return to root
   npm install
   ```

### Running the Application

To run the full stack locally, you need two terminal windows:

**Terminal 1 (Frontend):**
```bash
npm run dev
```
Runs on `http://localhost:8080`

**Terminal 2 (Backend):**
```bash
cd backend
npm run dev
```
Runs on `http://localhost:3000`

## 🚢 Deployment

### Frontend
Deploy the root directory to Vercel or Netlify.
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Backend
Deploy the `backend/` directory to Railway, Render, or Heroku.
- **Build Command**: `npm run build`
- **Start Command**: `npm start`

## 📚 Documentation

- [Backend API Documentation](./backend/API_DOCUMENTATION.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [MVP Implementation Status](./MVP_IMPLEMENTATION.md)
