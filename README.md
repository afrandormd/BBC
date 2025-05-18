# 🧩 Fullstack Monorepo Project (Next.js + Prisma + MySQL + CMS)

Proyek Website ini terdiri dari:

- 🔧 **Backend**: API menggunakan Next.js, Prisma ORM dan MySQL
- 🌐 **Frontend**: Halaman web menggunakan Next.js
- 📝 **CMS**: Halaman admin untuk mengelola konten menggunakan Next.js

---

## 📁 Struktur Folder
```bash
├── 📁 backend/ 
├── 📁 frontend/ 
├── 📁 cms/ 
|__ 📁 Dokumentasi/
└── 📄 README.md
```
---

## ⚙️ Prasyarat

Sebelum memulai, pastikan kamu telah menginstal:

- [Node.js (v18+)](https://nodejs.org/)
- [MySQL Server](https://www.mysql.com/) atau bisa juga Web server lain (XAMPP, Laragon)
- [Yarn](https://classic.yarnpkg.com/lang/en/) atau `npm`
- (Opsional) [PNPM](https://pnpm.io) jika kamu menggunakan pnpm
- `.env` file untuk masing-masing bagian

---

## 🔧 Setup Awal

### 1. Clone Repository

```bash
git clone https://github.com/afrandormd/BBC.git
cd BBC/ 
```

### 2. Install Dependency & Jalankan Program

**Backend**
```bash
cd backend/
npm install # jika menggunakan npm
```
Setup environment backend:
- Salin file `.env.example` lalu ubah menjadi `.env`
- jalankan perintah `npx prisma migrate dev --name init`

| Jalankan Program: `npm run dev`
Backend berjalan di: `localhost:3001`

**Frontend**

```bash
cd frontend/
npm install # jika menggunakan npm
```

| Jalankan Program: `npm run dev`


**CMS**

```bash
cd cms/
npm install # jika menggunakan npm
```

| Jalankan Program: `npm run dev`
