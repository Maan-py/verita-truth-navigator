# 📋 Urutan Deployment yang Disarankan

## 🎯 Opsi 1: Deploy Backend Dulu (Recommended)

### Step 1: Deploy Backend
1. Deploy backend ke Railway/Render
2. Set environment variables:
   ```
   PORT=3000
   NODE_ENV=production
   JWT_SECRET=<your-secret>
   FRONTEND_URL=http://localhost:8080  # Temporary, akan di-update nanti
   SUPABASE_URL=https://xxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=xxx
   ```
3. Copy **Backend URL** → `https://your-backend.railway.app`

### Step 2: Deploy Frontend
1. Deploy frontend ke Vercel
2. Set environment variable:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```
3. Copy **Frontend URL** → `https://your-frontend.vercel.app`

### Step 3: Update Backend CORS
1. Kembali ke Railway/Render
2. Update `FRONTEND_URL`:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
3. Redeploy backend (auto-redeploy di Railway, manual di Render)

**✅ Done!**

---

## 🎯 Opsi 2: Deploy Frontend Dulu

### Step 1: Deploy Frontend
1. Deploy frontend ke Vercel
2. Set environment variable:
   ```
   VITE_API_URL=http://localhost:3000  # Temporary
   ```
3. Copy **Frontend URL** → `https://your-frontend.vercel.app`

### Step 2: Deploy Backend
1. Deploy backend ke Railway/Render
2. Set environment variables:
   ```
   PORT=3000
   NODE_ENV=production
   JWT_SECRET=<your-secret>
   FRONTEND_URL=https://your-frontend.vercel.app  # Langsung pakai URL frontend
   SUPABASE_URL=https://xxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=xxx
   ```
3. Copy **Backend URL** → `https://your-backend.railway.app`

### Step 3: Update Frontend API URL
1. Kembali ke Vercel
2. Update `VITE_API_URL`:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```
3. Redeploy frontend (auto-redeploy)

**✅ Done!**

---

## 💡 Rekomendasi

**Saya sarankan Opsi 1** karena:
- ✅ Backend lebih stabil (tidak perlu update setelah deploy)
- ✅ Frontend bisa langsung connect ke backend production
- ✅ Hanya perlu update 1 environment variable di backend

---

## ⚠️ Catatan Penting

1. **FRONTEND_URL di backend** harus sama persis dengan URL frontend yang di-deploy
2. **Jangan pakai trailing slash** (`/`) di akhir URL
3. **Pastikan pakai HTTPS** untuk production
4. **Setelah update environment variable**, backend perlu **redeploy** untuk apply perubahan

---

## 🔄 Workflow Lengkap (Opsi 1)

```
1. Deploy Backend
   └─ FRONTEND_URL=http://localhost:8080 (temporary)
   └─ Dapat URL: https://backend.railway.app

2. Deploy Frontend
   └─ VITE_API_URL=https://backend.railway.app
   └─ Dapat URL: https://frontend.vercel.app

3. Update Backend
   └─ FRONTEND_URL=https://frontend.vercel.app
   └─ Redeploy backend

4. Test
   └─ Buka https://frontend.vercel.app
   └─ Test semua fitur
```

---

## 🐛 Troubleshooting

**CORS Error setelah update FRONTEND_URL?**
- Pastikan URL benar (tanpa trailing slash)
- Pastikan backend sudah di-redeploy setelah update environment variable
- Check browser console untuk error detail

**Frontend tidak bisa connect ke backend?**
- Pastikan `VITE_API_URL` di Vercel = URL backend yang benar
- Pastikan backend sudah running (test dengan `/api/health`)
- Check Network tab di browser untuk melihat request

