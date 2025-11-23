# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/71d38d0f-b794-4617-99f6-1b43102ff58d

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/71d38d0f-b794-4617-99f6-1b43102ff58d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

**Frontend:**
- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

**Backend:**
- Express.js
- TypeScript
- JWT Authentication
- Zod Validation

## 📁 Project Structure (Monorepo)

```
verita-truth-navigator/
├── src/              # Frontend (React + Vite)
├── backend/          # Backend API (Express + TypeScript)
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── index.ts
│   └── package.json
└── package.json      # Frontend dependencies
```

## 🚀 Development Setup

### Frontend

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:8080)
npm run dev
```

### Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env and set your JWT_SECRET

# Start development server (runs on http://localhost:3000)
npm run dev
```

### Running Both

Buka 2 terminal:
- Terminal 1: `npm run dev` (frontend)
- Terminal 2: `cd backend && npm run dev` (backend)

## 🚢 Deployment

**Tidak perlu repo terpisah!** Frontend dan backend bisa di-deploy terpisah dari satu repo ini.

Lihat [DEPLOYMENT.md](./DEPLOYMENT.md) untuk panduan lengkap deployment.

**Quick Deploy:**
- **Frontend** → Vercel/Netlify (deploy dari root, build command: `npm run build`)
- **Backend** → Railway/Render (deploy dari `backend/` folder)

## 📚 Documentation

- [Backend API Documentation](./backend/README.md)
- [Deployment Guide](./DEPLOYMENT.md)

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
