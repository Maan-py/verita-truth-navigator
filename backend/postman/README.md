# 📮 Postman Collection - Verita API

Postman collection dan environment untuk testing semua API endpoints.

## 🚀 Quick Start

### 1. Import Collection

1. Buka Postman
2. Klik **Import** di kiri atas
3. Pilih file `Verita-API.postman_collection.json`
4. Collection akan muncul di sidebar

### 2. Import Environment

1. Klik **Import** lagi
2. Pilih file `Verita-API-Environment.postman_environment.json` (untuk local)
   - Atau `Verita-API-Environment-Production.postman_environment.json` (untuk production)
3. Environment akan muncul di dropdown kanan atas

### 3. Setup Environment

1. Pilih environment **"Verita API - Local"** di dropdown kanan atas
2. Klik icon mata untuk edit environment
3. Pastikan `base_url` sudah benar:
   - Local: `http://localhost:3000`
   - Production: `https://your-backend-url.com`

## 📋 Collection Structure

### Authentication
- **Register** - Register new user
- **Login** - Login user (auto-save token ke environment)
- **Get Profile** - Get authenticated user profile

### Dashboard
- **Get All Categories** - Get all 5 data categories
- **Get [Category] Data** - Get data for specific category (health, politics, finance, environment, education)
- **Create/Update Dashboard Item** - Admin only

### Reports
- **Create Report** - Submit content for verification
- **Get User Reports** - Get all reports by authenticated user
- **Get Report by ID** - Get specific report

### Admin
- **Get All Reports** - Get all reports with pagination (Admin only)
- **Update Report Status** - Update verification status (Admin only)
- **Get Report Statistics** - Get report stats (Admin only)

### Education
- **Get All Modules** - Get all education modules
- **Get Module by ID** - Get specific module
- **Get User Progress** - Get user's progress for all modules
- **Update Module Progress** - Update progress for a module
- **Get User Achievements** - Get user's achievements

### Health Check
- **Health Check** - Check if API is running

## 🔑 Auto Token Management

Login endpoint sudah dikonfigurasi untuk auto-save token:
- Setelah login berhasil, token akan otomatis disimpan ke `auth_token` variable
- Semua protected endpoints akan otomatis menggunakan token ini

## 📝 Usage Tips

### Testing Flow

1. **Start dengan Health Check**
   ```
   GET /api/health
   ```
   Pastikan server running

2. **Register User**
   ```
   POST /api/auth/register
   ```
   Atau gunakan user yang sudah ada

3. **Login**
   ```
   POST /api/auth/login
   ```
   Token akan otomatis disimpan

4. **Test Protected Endpoints**
   - Semua endpoint yang butuh auth akan otomatis pakai token
   - Tidak perlu manual set Authorization header

5. **Test Admin Endpoints**
   - Pastikan user yang login punya role `admin` di database
   - Update di Supabase: `UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com'`

### Manual Token Setup

Jika perlu set token manual:
1. Login dulu untuk dapat token
2. Copy token dari response
3. Edit environment variable `auth_token`
4. Paste token

### Testing Reports

1. **Create Report** - Run `POST /api/reports`
   - Script akan otomatis set `report_id` ke report yang baru dibuat
   - Atau copy `id` dari response

2. **Get User Reports** - Run `GET /api/reports`
   - Script akan otomatis set `report_id` ke report pertama
   - Atau copy `id` dari report yang ingin di-test

3. **Get All Reports (Admin)** - Run `GET /api/admin/reports`
   - Script akan otomatis set `report_id` ke report pertama
   - Berguna untuk admin testing

4. **Update Report Status** - Run `PUT /api/admin/reports/:id/status`
   - Pastikan `report_id` sudah di-set (auto-set setelah Get All Reports atau Create Report)
   - Pre-request script akan warning jika `report_id` kosong

### Testing Education Modules

1. **Get All Modules** - Run `GET /api/education/modules`
   - Script akan otomatis set `module_id` ke module pertama
   - Atau copy `id` dari module yang ingin di-test

2. **Set module_id manually** (optional):
   - Edit environment variable `module_id`
   - Paste module ID dari response

3. **Update Progress** - Run `PUT /api/education/modules/:moduleId/progress`
   - Pastikan `module_id` sudah di-set (auto-set setelah Get All Modules)
   - Pre-request script akan warning jika `module_id` kosong

## 🔧 Environment Variables

### Local Environment
- `base_url`: `http://localhost:3000`
- `auth_token`: Auto-filled setelah login
- `user_id`: Auto-filled setelah login
- `report_id`: Set manual setelah create report
- `module_id`: Set manual setelah get modules

### Production Environment
- `base_url`: `https://your-backend-url.com`
- Variables lainnya sama dengan local

## 🐛 Troubleshooting

### "Unauthorized" Error
- Pastikan sudah login dan token tersimpan
- Check apakah token masih valid (tidak expired)
- Login ulang jika perlu

### "Admin access required" Error
- Pastikan user yang login punya role `admin`
- Set admin menggunakan script: `npm run set-admin your-email@example.com`
- Atau via Supabase Dashboard: Edit user → Set role = 'admin'
- Check di database: `SELECT role FROM users WHERE email = 'your-email'`
- Lihat [ADMIN_SETUP.md](../ADMIN_SETUP.md) untuk panduan lengkap

### Connection Error
- Pastikan backend server running
- Check `base_url` di environment sudah benar
- Check CORS settings di backend

### 404 Not Found
- Pastikan endpoint path benar
- Check apakah route sudah terdaftar di backend
- Pastikan server sudah restart setelah perubahan

### Route Error dengan Double Slash (//)
- **Error:** `Route PUT /api/education/modules//progress not found` atau `Route PUT /api/admin/reports//status not found`
- **Penyebab:** Variable ID (`module_id` atau `report_id`) kosong di environment
- **Solusi:**
  
  **Untuk Education:**
  1. Run `GET /api/education/modules` dulu (akan auto-set `module_id`)
  2. Atau set manual: Edit environment → Set `module_id` dengan module ID dari response
  
  **Untuk Reports/Admin:**
  1. Run `POST /api/reports` (Create Report) - akan auto-set `report_id`
  2. Atau run `GET /api/reports` (Get User Reports) - akan auto-set `report_id` ke report pertama
  3. Atau run `GET /api/admin/reports` (Get All Reports) - akan auto-set `report_id` ke report pertama
  4. Atau set manual: Edit environment → Set `report_id` dengan report ID dari response
  
  **General:**
  - Pastikan variable tidak kosong sebelum call endpoint yang butuh ID
  - Pre-request scripts akan warning di console jika variable kosong

## 📚 Related Documentation

- [API Documentation](../API_DOCUMENTATION.md)
- [Backend README](../README.md)
- [Supabase Setup](../SUPABASE_SETUP.md)

## 💡 Tips

1. **Use Collection Runner** untuk test semua endpoints sekaligus
2. **Save Responses** sebagai examples untuk dokumentasi
3. **Use Pre-request Scripts** untuk dynamic values
4. **Use Tests** untuk auto-validate responses
5. **Export Collection** secara berkala untuk backup

## 🔄 Update Collection

Jika ada perubahan API:
1. Update collection di Postman
2. Export collection baru
3. Replace file `Verita-API.postman_collection.json`
4. Commit ke git

