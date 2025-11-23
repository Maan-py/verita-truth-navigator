# 🗄️ Supabase Setup Guide

Panduan lengkap untuk setup Supabase sebagai database untuk backend.

## 📋 Langkah-langkah Setup

### 1. Buat Project di Supabase

1. Buka [Supabase](https://supabase.com)
2. Sign up / Login
3. Klik "New Project"
4. Isi:
   - **Name**: verita-truth-navigator (atau nama lain)
   - **Database Password**: Buat password yang kuat (simpan baik-baik!)
   - **Region**: Pilih yang terdekat (Singapore untuk Indonesia)
5. Tunggu project selesai dibuat (~2 menit)

### 2. Dapatkan Credentials

Setelah project dibuat, buka **Settings** → **API**:

1. **Project URL** → Copy `SUPABASE_URL`
2. **Service Role Key** → Copy `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Jangan share key ini!)

### 3. Setup Database Schema

#### Option A: Via Supabase Dashboard (Recommended)

1. Buka **SQL Editor** di dashboard Supabase
2. Copy isi file `supabase/migrations/001_create_users_table.sql`
3. Paste dan jalankan di SQL Editor
4. Klik "Run"

#### Option B: Via Supabase CLI

```bash
# Install Supabase CLI (jika belum)
npm install -g supabase

# Login
supabase login

# Link ke project
supabase link --project-ref your-project-ref

# Run migration
supabase db push
```

### 4. Setup Environment Variables

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

**⚠️ Penting:**

- Jangan commit file `.env` ke Git
- `SUPABASE_SERVICE_ROLE_KEY` memiliki akses penuh ke database
- Gunakan Service Role Key hanya di backend, jangan di frontend!

### 5. Install Dependencies

```bash
cd backend
npm install
```

### 6. Test Connection

```bash
npm run dev
```

Jika tidak ada error, berarti koneksi ke Supabase berhasil!

## 🔍 Verifikasi Setup

### Check Table di Supabase

1. Buka Supabase Dashboard
2. Buka **Table Editor**
3. Pastikan tabel `users` sudah ada dengan kolom:
   - `id` (UUID)
   - `name` (text)
   - `email` (text, unique)
   - `password` (text)
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

### Test API

```bash
# Register user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 🔐 Security Best Practices

1. **Service Role Key:**

   - Hanya gunakan di backend
   - Jangan commit ke Git
   - Jangan share dengan siapa pun
   - Rotate secara berkala

2. **Row Level Security (RLS):**

   - Supabase memiliki RLS built-in
   - Untuk backend dengan Service Role Key, RLS di-bypass
   - Pertimbangkan untuk menambahkan RLS policies jika perlu

3. **Password Hashing:**
   - Password sudah di-hash dengan bcrypt
   - Jangan simpan password plain text

## 🚀 Production Setup

Untuk production, set environment variables di platform deployment:

**Railway/Render:**

- `SUPABASE_URL` → Project URL
- `SUPABASE_SERVICE_ROLE_KEY` → Service Role Key

**Vercel:**

- Tambahkan di Settings → Environment Variables

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Security](https://supabase.com/docs/guides/auth/row-level-security)

## 🆘 Troubleshooting

### Error: "Missing Supabase environment variables"

- Pastikan `.env` sudah dibuat
- Pastikan `SUPABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY` sudah di-set

### Error: "relation 'users' does not exist"

- Jalankan migration SQL di Supabase Dashboard
- Pastikan tabel `users` sudah dibuat

### Error: "Invalid API key"

- Pastikan Service Role Key sudah benar
- Jangan gunakan Anon Key untuk backend

### Connection timeout

- Check internet connection
- Pastikan Supabase project masih aktif
- Check firewall settings
