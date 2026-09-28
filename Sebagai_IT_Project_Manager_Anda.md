Sebagai IT Project Manager Anda, saya setuju dengan pendekatan ini. Memecah eksekusi ke dalam beberapa fase (*Phased Rollout*) dengan strategi *Vertical Slicing* adalah cara paling empiris untuk memitigasi risiko. Kita tidak akan membangun seluruh *backend* lalu kebingungan saat menyambungkannya ke *frontend*. Kita akan membangun fondasi yang kokoh terlebih dahulu, memastikan logika datanya tidak cacat, lalu secara bertahap naik ke *polish* antarmuka.

Berikut adalah **Product Requirements Document (PRD)** resmi kita, disusun dalam format Markdown. Silakan jadikan ini sebagai acuan *backlog* di Jira atau Trello Anda.

---

# PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Project Name:** FitBento (Code Name) - Automated Meal Prep & Macro Tracker

**Document Version:** 1.0

**Methodology:** Agile (Vertical Slicing per Phase)

**Core Tech Stack:** FastAPI (Python), PostgreSQL, Valkey/Redis, Cloudflare R2, Vue.js + Tailwind CSS.

## 1. Executive Summary

FitBento adalah platform *closed-loop* yang menggabungkan perencanaan nutrisi terpersonalisasi, pengiriman katering diet, dan pelacakan makro otomatis. Sistem memecahkan masalah gesekan (*friction*) pengguna dalam menghitung kalori manual dengan mengotomasikan perhitungan berbasis pengiriman logistik fisik.

**Pendekatan Arsitektural Utama:**
Sistem menggunakan **Ledger/Credit-based FSM (Finite State Machine)** untuk manajemen langganan guna mencegah anomali pencatatan waktu (*date-shifting anomaly*) dan memastikan integritas data dapur.

---

## 2. Phased Development Plan

Pengembangan dibagi menjadi 4 Fase. Tidak ada fase yang boleh dimulai sebelum *acceptance criteria* (kriteria penerimaan) fase sebelumnya dinyatakan *Passed*.

### PHASE 1: The Foundation (Data Layer, Auth & Algoritma Inti)

*Fokus: Mengamankan struktur database, manajemen sesi, dan teori perhitungan nutrisi medis.*

* **1.1. Database Schema & Migration:**
* Setup PostgreSQL *database* menggunakan sistem migrasi (misal: Alembic).
* Terapkan 5 tabel inti: `users`, `user_metrics`, `subscriptions`, `menus`, `daily_deliveries`, `daily_logs`.


* **1.2. Role-Based Auth (JWT):**
* Implementasi autentikasi JWT di FastAPI.
* Buat 3 *roles* dengan *permission* ketat: `Customer` (Read/Swap menu sendiri), `Admin Dapur` (Read manifest agregasi), `Kurir` (Update status logistik).


* **1.3. Onboarding & TDEE Engine (Feature 1):**
* Buat *endpoint* API untuk menerima data tubuh pengguna.
* **Teori Dasar:** Implementasikan algoritma **Mifflin-St Jeor** di *backend* untuk menghitung BMR dan TDEE.
* *Logic:* Jika target = *Fat Loss* (-500 kcal dari TDEE). Jika *Muscle Gain* (+300 kcal).


* **Acceptance Criteria:** API Auth berjalan, *database* bisa menyimpan relasi *user* dan *subscription*, kalkulator kalori memberikan *output* akurat sesuai rumus medis dengan deviasi 0%.

### PHASE 2: Core Business Logic (Subscription, Cut-Off & Menu Management)

*Fokus: Memastikan dapur tidak pernah salah masak, dan mutasi pesanan terkunci secara absolut.*

* **2.1. Credit-Based Subscription System:**
* Buat logika *deduction* (pengurangan) kredit. 1 Hari = 1 Kredit.
* API *Pause/Skip* (Feature 2): Jika pengguna mem-pause, status langganan menjadi `paused`, kredit tidak hangus, dan jadwal `daily_deliveries` untuk besok tidak di-*generate*.


* **2.2. Master Menu & Katalog Harian:**
* API CRUD untuk `menus`.
* Gunakan Valkey/Redis untuk melakukan *caching* katalog menu mingguan (karena data ini akan sering di-GET oleh pengguna namun jarang berubah).


* **2.3. Swap Menu & Time-Lock Enforcement (Feature 2):**
* API Swap Menu.
* **Teori Dasar:** Implementasikan **Time-Bounded Validation**. Mutasi ditolak secara *hard-coded* di *backend* jika *server time* > 18:00 WIB (H-1).
* Sistem men-generate Manifest Dapur (jumlah per menu yang harus dimasak) pada pukul 18.05 WIB.


* **Acceptance Criteria:** Pengguna tidak bisa mengubah menu lewat dari jam 6 sore H-1. Kredit berkurang dengan benar.

### PHASE 3: Logistics & Event-Driven Automation (Delivery & Auto-Logger)

*Fokus: Integrasi fisik ke digital, mencegah UI blocking, dan sinkronisasi tracker harian.*

* **3.1. Milestone Delivery Status (Feature 3):**
* API untuk Kurir memperbarui FSM State: `diproses_dapur` -> `dalam_pengantaran` -> `tiba`.
* Integrasikan **Cloudflare R2** untuk *upload multipart/form-data* (Bukti Foto Tanda Terima). *Endpoint* merespons dengan *Presigned URL*.


* **3.2. Auto-Logger Event Pub/Sub (Feature 4):**
* **Teori Dasar:** Menggunakan *Event-Driven Architecture*.
* Saat API menerima status `tiba`, FastAPI tidak boleh langsung menulis ke `daily_logs` di *thread* yang sama (bisa memblokir API).
* API menerbitkan (*publish*) *event* `DELIVERY_COMPLETED` ke Valkey/Redis. *Background worker* (misal: Celery/Python Worker) menangkap *event* ini, lalu secara asinkron menulis kalori bento ke tabel `daily_logs` pengguna.


* **3.3. Webhook / Push Notification Trigger:**
* *Worker* yang sama juga memicu *push notification* ke *device* pengguna: *"Makan siangmu sudah di lobi!"*.


* **Acceptance Criteria:** Update status kurir < 1 detik. Foto tersimpan aman di R2. Kalori bertambah ke *database* pengguna di *background* tanpa ada ras *condition*.

### PHASE 4: Frontend Integration & UI/UX Polish

*Fokus: Estetika, feedback visual, error handling di klien, dan kecepatan render.*

* **4.1. UI Onboarding & Menu Cards (Vue.js + Tailwind):**
* Integrasikan form 3-langkah dengan animasi transisi yang mulus.
* Render kartu menu mingguan. Tampilkan *badge* Makro (Protein/Karbo/Lemak).
* *Error boundary:* Jika mencoba *swap* menu lewat dari pukul 18.00, *frontend* wajib menampilkan *Toast Error* yang informatif, bukan sekadar halaman *crash*.


* **4.2. Delivery Tracking UI:**
* Buat komponen *Stepper* vertikal/horizontal (seperti *tracker e-commerce*) untuk 3 status logistik.
* Tampilkan foto bukti pengiriman jika status sudah `tiba`.


* **4.3. Tracker Calorie Ring & Quick Add:**
* Implementasikan SVG *Circular Progress Bar* untuk kalori harian.
* Gunakan *WebSocket* atau *Optimistic UI Updates*: Saat *Push Notification* masuk, cincin progres kalori otomatis terisi penuh dengan animasi *smooth* tanpa pengguna perlu me-*refresh* halaman.
* Buat form minimalis untuk "Quick Add" (Snack/Kopi di luar katering).


* **Acceptance Criteria:** UI responsif, status kurir ter-update secara visual, animasi cincin kalori berfungsi baik.

---

## 3. Matriks Risiko & Mitigasi (Risk Assessment)

| Risiko | Dampak | Mitigasi PM & Tech |
| --- | --- | --- |
| **Zona Waktu Klien Dimanipulasi** | Pengguna mengubah jam HP untuk membobol batas 18:00 WIB. | **Backend Source of Truth:** Validasi waktu *cut-off* menggunakan jam UTC/WITA dari *server*, bukan *payload* dari Klien. |
| **Latensi Upload Foto Kurir** | Koneksi kurir buruk di *basement/lobby*, API *timeout*. | Integrasikan *background sync* (Service Worker) di aplikasi kurir. Foto di-cache di *local storage* dan di-upload ketika sinyal pulih. |
| **Over-consumption Redis** | Valkey/Redis kehabisan memori karena *queue* menumpuk. | Set TTL (*Time to Live*) pada data *cache* menu (misal 24 jam) dan gunakan *Acknowledgement* pada sistem Pub/Sub. |

---

Sebagai PM, saya sangat menyarankan kita mengunci arsitektur ini. Jika Anda setuju, kita bisa mulai melakukan inisialisasi repositori untuk **Phase 1** hari ini. Ada parameter bisnis atau *tech stack* dari fase tertentu yang ingin Anda tantang atau modifikasi sebelum kita *kick-off*?
