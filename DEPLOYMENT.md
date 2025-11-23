# 🚀 Deployment Guide - Verita Truth Navigator

Panduan lengkap untuk deploy frontend dan backend secara terpisah.

## 📦 Struktur Project (Monorepo)

```
verita-truth-navigator/
├── src/              # Frontend (React + Vite)
├── backend/          # Backend API (Express + TypeScript)
├── package.json      # Frontend dependencies
└── README.md
```

**Kelebihan Monorepo:**

- ✅ Satu repo untuk maintain
- ✅ Share types/code antara frontend & backend
- ✅ Deploy terpisah tetap bisa dilakukan
- ✅ Mudah untuk development lokal

## 🎯 Opsi Deployment

### Option 1: Deploy Terpisah (Recommended untuk Production)

#### Frontend → Vercel/Netlify

#### Backend → Railway/Render/DigitalOcean

**Kelebihan:**

- ✅ Scale frontend & backend secara independen
- ✅ Pilih platform terbaik untuk masing-masing
- ✅ Frontend bisa CDN (lebih cepat)
- ✅ Backend bisa di-optimize untuk API

**Cara Deploy:**

**Frontend (Vercel):**

1. Push code ke GitHub
2. Import project di Vercel
3. Set root directory: `/` (root project)
4. Build command: `npm run build`
5. Output directory: `dist`

**Backend (Railway):**

1. Push code ke GitHub
2. Create new project di Railway
3. Deploy dari GitHub repo
4. Set root directory: `backend`
5. Build command: `npm install && npm run build`
6. Start command: `npm start`
7. Set environment variables:
   - `PORT=3000`
   - `JWT_SECRET=<your-secret>`
   - `FRONTEND_URL=https://your-frontend.vercel.app`

### Option 2: Separate Repos (Jika Prefer)

Jika ingin repo terpisah:

1. **Buat repo baru untuk backend:**

   ```bash
   # Di folder baru
   git init
   git remote add origin <backend-repo-url>
   # Copy semua file dari backend/ ke root
   git add .
   git commit -m "Initial backend"
   git push -u origin main
   ```

2. **Frontend tetap di repo ini**

**Kelebihan:**

- ✅ Separation of concerns
- ✅ Independent versioning
- ✅ Team bisa fokus per repo

**Kekurangan:**

- ❌ Harus maintain 2 repo
- ❌ Share code lebih sulit

### Option 3: Full-Stack Deploy (Vercel)

Vercel bisa handle frontend + backend API routes:

1. Buat folder `api/` di root
2. Convert backend ke Vercel serverless functions
3. Deploy sekali untuk semua

**Kelebihan:**

- ✅ Satu deployment
- ✅ Gratis untuk starter

**Kekurangan:**

- ❌ Function timeout (10s free tier)
- ❌ Kurang cocok untuk long-running tasks

## 🔧 Setup untuk Deployment Terpisah

### 1. Update Frontend untuk Connect ke Backend

Buat file `src/lib/api.ts`:

```typescript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const api = {
  baseURL: API_URL,
  async request(endpoint: string, options?: RequestInit) {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Request failed");
    }

    return response.json();
  },
};
```

Update `.env` di frontend:

```env
VITE_API_URL=https://your-backend.railway.app
```

### 2. Update Backend CORS

Pastikan `backend/src/index.ts` sudah set CORS dengan benar:

```typescript
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:8080",
    credentials: true,
  })
);
```

### 3. Environment Variables

**Frontend (.env.production):**

```env
VITE_API_URL=https://your-backend-url.com
```

**Backend (.env di platform):**

```env
PORT=3000
NODE_ENV=production
JWT_SECRET=<generate-strong-secret>
FRONTEND_URL=https://your-frontend-url.com
```

## 📋 Checklist Deployment

### Frontend

- [ ] Build berhasil (`npm run build`)
- [ ] Environment variables sudah di-set
- [ ] API URL sudah benar
- [ ] CORS sudah di-configure di backend

### Backend

- [ ] Dependencies ter-install
- [ ] Build berhasil (`npm run build`)
- [ ] Environment variables sudah di-set
- [ ] Database sudah setup (jika pakai)
- [ ] Health check endpoint working (`/api/health`)

## 🧪 Testing Deployment

1. **Test Backend:**

   ```bash
   curl https://your-backend-url.com/api/health
   ```

2. **Test Frontend:**
   - Buka di browser
   - Check network tab untuk API calls
   - Test login/register

## 🔐 Security Checklist

- [ ] JWT_SECRET menggunakan random string yang kuat
- [ ] CORS hanya allow domain frontend
- [ ] HTTPS enabled (otomatis di Vercel/Railway)
- [ ] Environment variables tidak di-commit
- [ ] Rate limiting (tambahkan jika perlu)
- [ ] Input validation sudah ada

## 💡 Rekomendasi Platform

**Frontend:**

- **Vercel** (Recommended) - CDN, auto HTTPS, gratis
- **Netlify** - Similar dengan Vercel
- **Cloudflare Pages** - CDN global

**Backend:**

- **Railway** (Recommended) - Easy setup, $5/month
- **Render** - Free tier available
- **DigitalOcean App Platform** - $5/month
- **Fly.io** - Global edge deployment
- **AWS/Google Cloud** - Untuk scale besar

## 📚 Resources

- [Vercel Deployment](https://vercel.com/docs)
- [Railway Deployment](https://docs.railway.app)
- [Render Deployment](https://render.com/docs)
