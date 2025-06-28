Askhajaya CMS

<p> Sistem Manajemen Konten (CMS) intuitif dan kaya fitur yang dibangun dengan Next.js App Router, dirancang untuk mengelola konten digital Askhajaya secara efisien. </p>
Daftar Isi
Tentang Proyek

Fitur Utama

Dibangun Dengan

Memulai

Prasyarat

Instalasi

Menjalankan Aplikasi

Arsitektur Proyek

Mode Hibrida (Online/Offline)

Lisensi

Tentang Proyek
Askhajaya CMS adalah aplikasi frontend yang kuat untuk mengelola produk, pengguna, dan konten media. Dengan antarmuka modern yang bersih dan responsif, CMS ini menyederhanakan pengelolaan konten digital.

Proyek ini dibangun menggunakan teknologi web terbaru, menekankan kinerja, pengalaman pengembang, dan skalabilitas dengan Next.js App Router dan Server Components.

Fitur Utama
✨ Dasbor Modern: Pusat navigasi dengan statistik cepat.

📦 Manajemen Produk: Fungsi CRUD (Create, Read, Update, Delete) lengkap untuk katalog produk.

🖼️ Perpustakaan Media: Unggah, lihat, edit, dan hapus aset media dengan mudah.

📊 Halaman Analitik: Visualisasi distribusi konten dan data pengguna simulasi.

👤 Manajemen Profil Pengguna: Perbarui informasi pengguna dengan mulus.

🌓 Mode Terang & Gelap: Beralih tema untuk kenyamanan tampilan.

📱 Sepenuhnya Responsif: Dioptimalkan untuk perangkat desktop dan seluler.

🌐 Mode Online/Offline Hibrida: Berfungsi lancar dengan atau tanpa koneksi backend, menggunakan data simulasi sebagai cadangan.

Dibangun Dengan
Proyek ini menggunakan teknologi modern untuk memberikan pengalaman pengguna berkualitas tinggi:

Next.js - Kerangka React untuk Web.

React - Pustaka JavaScript untuk membangun antarmuka pengguna.

TypeScript - Bahasa pemrograman tipe kuat berbasis JavaScript.

Tailwind CSS - Framework CSS berbasis utilitas.

ShadCN UI - Komponen yang dapat digunakan kembali dengan Radix UI dan Tailwind CSS.

Lucide React - Ikon yang indah dan konsisten.

Memulai
Ikuti langkah-langkah berikut untuk menjalankan proyek ini secara lokal:

Prasyarat
Pastikan Anda memiliki perangkat lunak berikut di komputer Anda:

Node.js (disarankan versi 18.x atau lebih baru)

npm, yarn, atau pnpm

Instalasi
Klon Repository:

sh
Salin
Edit
git clone https://your-repository-url.git  
cd cms  
Pasang Paket NPM:

sh
Salin
Edit
npm install  
Variabel Lingkungan:
Buat file .env di direktori root jika Anda memiliki backend yang aktif.
Default backend: http://localhost:3001.

Menjalankan Aplikasi
Untuk menjalankan server pengembangan, gunakan perintah berikut:

bash
Salin
Edit
npm run dev  
Aplikasi akan tersedia di http://localhost:3000.

Arsitektur Proyek
Proyek mengikuti struktur standar Next.js App Router dengan pembagian tanggung jawab yang jelas.

src/app/ - Berisi semua rute, halaman, dan tata letak.

src/app/dashboard/ - Rute yang dilindungi untuk antarmuka CMS utama.

src/app/actions/ - Aksi server untuk menangani pengiriman formulir dan mutasi data.

src/app/login/ - Halaman login utama.

src/components/ - Berisi semua komponen UI yang diorganisasi berdasarkan fitur.

src/components/ui/ - Komponen inti yang dapat digunakan ulang dari ShadCN.

src/components/dashboard/ - Komponen spesifik untuk halaman dasbor.

src/contexts/ - Penyedia React Context seperti AuthContext.

src/types/ - Definisi tipe TypeScript untuk aplikasi.

Mode Hibrida (Online/Offline)
Fitur arsitektur utama aplikasi ini adalah kemampuan untuk beroperasi dalam dua mode:

Mode Online: Saat backend API di http://localhost:3001 aktif, aplikasi mengambil dan menampilkan data langsung. Semua operasi create, update, dan delete dikirim ke backend.

Mode Offline: Jika backend tidak tersedia, aplikasi secara otomatis menggunakan lapisan data simulasi. Hal ini memungkinkan pengembangan UI yang tidak terputus tanpa koneksi basis data.

Lisensi
Didistribusikan di bawah Lisensi MIT. Lihat file LICENSE untuk informasi lebih lanjut.