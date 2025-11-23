# 👨‍💼 Admin Setup Guide

Panduan untuk setup user sebagai admin agar bisa mengakses admin endpoints.

## 🚀 Quick Setup

### Method 1: Menggunakan Script (Recommended)

1. **Pastikan user sudah terdaftar:**
   ```bash
   # Register user dulu via API atau frontend
   POST /api/auth/register
   ```

2. **Set user sebagai admin:**
   ```bash
   cd backend
   npm run set-admin <email>
   ```

   Contoh:
   ```bash
   npm run set-admin admin@example.com
   ```

3. **Verifikasi:**
   Script akan menampilkan status user setelah update.

### Method 2: Via Supabase Dashboard

1. Buka Supabase Dashboard
2. Buka **Table Editor** → **users**
3. Cari user yang ingin dijadikan admin
4. Edit row tersebut
5. Set kolom `role` menjadi `admin`
6. Save

### Method 3: Via SQL Query

1. Buka Supabase Dashboard
2. Buka **SQL Editor**
3. Jalankan query:

```sql
-- Set user sebagai admin berdasarkan email
UPDATE users 
SET role = 'admin' 
WHERE email = 'admin@example.com';

-- Verifikasi
SELECT id, name, email, role 
FROM users 
WHERE email = 'admin@example.com';
```

## ✅ Verifikasi Admin Access

Setelah set admin, test dengan:

```bash
# Login dulu untuk dapat token
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your-password"
  }'

# Test admin endpoint (gunakan token dari response di atas)
curl -X GET http://localhost:3000/api/admin/reports \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Jika berhasil, akan return data reports. Jika masih error "Admin access required", pastikan:
- User sudah di-update role-nya ke `admin`
- Token yang digunakan adalah dari user yang sudah di-set sebagai admin
- Database migration `005_create_admin_users_table.sql` sudah dijalankan

## 🔍 Check User Role

### Via Script
```bash
# Script akan menampilkan current role
npm run set-admin <email>
```

### Via SQL
```sql
SELECT id, name, email, role 
FROM users 
WHERE email = 'your-email@example.com';
```

### Via API (setelah login)
```bash
GET /api/auth/profile
# Response akan include role jika ditambahkan di controller
```

## 🛠️ Troubleshooting

### Error: "Admin access required"
- ✅ Pastikan user sudah di-set role = 'admin' di database
- ✅ Pastikan menggunakan token dari user yang sudah admin
- ✅ Pastikan migration `005_create_admin_users_table.sql` sudah dijalankan
- ✅ Check di database: `SELECT role FROM users WHERE email = 'your-email'`

### Error: "User not found" saat run script
- ✅ Pastikan user sudah terdaftar (register via API)
- ✅ Pastikan email yang di-input benar
- ✅ Check di Supabase Table Editor apakah user ada

### Script tidak jalan
- ✅ Pastikan environment variables sudah di-set (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
- ✅ Pastikan dependencies sudah ter-install: `npm install`
- ✅ Pastikan format command benar: `npm run set-admin <email>`

## 📝 Notes

- Default role untuk user baru adalah `user`
- Hanya user dengan role `admin` yang bisa akses `/api/admin/*` endpoints
- Role bisa diubah kapan saja via script atau database
- Untuk production, pastikan hanya set admin untuk user yang trusted

## 🔐 Security

- Jangan expose script set-admin ke public
- Hanya set admin untuk user yang benar-benar perlu
- Rotate admin access secara berkala jika perlu
- Monitor admin activities di production

