# 🚀 Panduan Deployment Step-by-Step

Panduan lengkap untuk deploy Verita Truth Navigator ke production.

## 📋 Prerequisites

- ✅ GitHub account
- ✅ Supabase project sudah setup (lihat `backend/SUPABASE_SETUP.md`)
- ✅ Node.js terinstall di local

---

## 🎯 Step 1: Deploy Backend (Railway/Render)

### Option A: Railway (Recommended)

1. **Buka [Railway.app](https://railway.app)** dan login dengan GitHub

2. **Create New Project**

   - Klik "New Project"
   - Pilih "Deploy from GitHub repo"
   - Pilih repository `verita-truth-navigator`

3. **Configure Service**

   - Klik "Add Service" → "GitHub Repo"
   - Set **Root Directory**: `backend`
   - Railway akan auto-detect Node.js

4. **Set Environment Variables**

   - Klik service → "Variables" tab
   - Tambahkan variables berikut:

   ```env
   PORT=3000
   NODE_ENV=production
   JWT_SECRET=<generate-random-string-min-32-chars>
   FRONTEND_URL=https://your-frontend.vercel.app
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

   **Cara generate JWT_SECRET:**

   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

5. **Deploy**

   - Railway akan otomatis build dan deploy
   - Tunggu sampai status "Deployed"
   - Copy **Public URL** (contoh: `https://verita-backend.railway.app`)

6. **Test Backend**
   ```bash
   curl https://your-backend-url.railway.app/api/health
   ```
   Harus return: `{"status":"ok",...}`

### Option B: Render

1. **Buka [Render.com](https://render.com)** dan login

2. **New Web Service**

   - Connect GitHub repo
   - Set:
     - **Name**: `verita-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`

3. **Set Environment Variables** (sama seperti Railway)

4. **Deploy** dan copy Public URL

---

## 🎨 Step 2: Deploy Frontend (Vercel)

1. **Buka [Vercel.com](https://vercel.com)** dan login dengan GitHub

2. **Import Project**

   - Klik "Add New" → "Project"
   - Import repository `verita-truth-navigator`
   - Vercel akan auto-detect Vite

3. **Configure Project**

   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `/` (root project)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)
   - **Install Command**: `npm install` (default)

4. **Set Environment Variables**

   - Klik "Environment Variables"
   - Tambahkan:
     ```
     VITE_API_URL=https://your-backend-url.railway.app
     ```
     ⚠️ **PENTING**: Ganti dengan URL backend yang sudah di-deploy di Step 1

5. **Deploy**
   - Klik "Deploy"
   - Tunggu build selesai
   - Copy **Production URL** (contoh: `https://verita.vercel.app`)

---

## 🔄 Step 3: Update Backend CORS

Setelah frontend di-deploy, update backend environment variable:

1. **Kembali ke Railway/Render**
2. **Update `FRONTEND_URL`**:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
3. **Redeploy** backend (Railway auto-redeploy, Render klik "Manual Deploy")

---

## ✅ Step 4: Setup Admin User

Setelah backend ter-deploy, setup admin user:

1. **Buka terminal lokal**
2. **Set environment variable untuk backend URL**:
   ```bash
   cd backend
   # Edit .env atau set langsung
   export SUPABASE_URL=your-supabase-url
   export SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
3. **Run set-admin script**:
   ```bash
   npm run set-admin your-email@example.com
   ```
   Atau bisa langsung set di Supabase Dashboard → Table Editor → `users` → Edit row → Set `role` = `admin`

---

## 🧪 Step 5: Testing

### Test Backend

```bash
# Health check
curl https://your-backend.railway.app/api/health

# Test register
curl -X POST https://your-backend.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### Test Frontend

1. Buka `https://your-frontend.vercel.app`
2. Test register/login
3. Test dashboard, verify, learn pages
4. Test admin panel (jika sudah set admin)

---

## 🔐 Security Checklist

- [ ] `JWT_SECRET` menggunakan random string yang kuat (min 32 chars)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` tidak di-expose di frontend
- [ ] CORS hanya allow domain frontend yang benar
- [ ] HTTPS enabled (otomatis di Vercel/Railway)
- [ ] Environment variables tidak di-commit ke GitHub
- [ ] `.env` file ada di `.gitignore`

---

## 🐛 Troubleshooting

### Backend tidak bisa connect ke Supabase

- ✅ Pastikan `SUPABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY` benar
- ✅ Check Supabase Dashboard → Settings → API
- ✅ Pastikan menggunakan **Service Role Key** (bukan anon key)

### Frontend tidak bisa connect ke Backend

- ✅ Check `VITE_API_URL` di Vercel environment variables
- ✅ Pastikan URL backend benar (dengan `https://`)
- ✅ Check CORS di backend sudah allow frontend URL
- ✅ Check browser console untuk error

### CORS Error

- ✅ Pastikan `FRONTEND_URL` di backend sama dengan URL frontend yang di-deploy
- ✅ Jangan pakai trailing slash (`/`) di akhir URL
- ✅ Redeploy backend setelah update `FRONTEND_URL`

### Build Error

- ✅ Pastikan semua dependencies ter-install
- ✅ Check build logs di Vercel/Railway
- ✅ Pastikan Node.js version compatible

---

## 📊 Monitoring

### Railway

- Dashboard → View logs
- Metrics → CPU, Memory usage

### Vercel

- Dashboard → Analytics
- Logs → Function logs

---

## 🔄 Update Deployment

### Update Backend

1. Push changes ke GitHub
2. Railway/Render akan auto-deploy
3. Check logs untuk memastikan deploy berhasil

### Update Frontend

1. Push changes ke GitHub
2. Vercel akan auto-deploy
3. Check preview deployment sebelum merge ke production

---

## 💰 Cost Estimation

**Free Tier:**

- **Vercel**: Free untuk personal projects
- **Railway**: $5/month (free trial available)
- **Render**: Free tier available (dengan limitations)

**Total**: ~$5/month untuk production-ready deployment

---

## 📚 Additional Resources

- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)
- [Supabase Setup Guide](./backend/SUPABASE_SETUP.md)

---

## 🎉 Success!

Setelah semua step selesai, aplikasi kamu sudah live di:

- **Frontend**: `https://your-frontend.vercel.app`
- **Backend**: `https://your-backend.railway.app`

Selamat! 🚀
