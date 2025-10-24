# 📝 Todo List Frontend (React + Ant Design)

A responsive and simple Todo List web application built with **React.js**, **Ant Design**, and **Vite**. This project allows users to manage todos and categories efficiently with a clean, card-based UI.

## 🚀 Features

- ✅ Create, edit, and delete todos
- ✅ Assign todos to categories
- ✅ Mark tasks as completed or pending
- ✅ Search todos by title or description
- ✅ Manage categories (add, edit, delete, color picker)
- ✅ Responsive grid layout for all screen sizes
- ✅ Pagination for todos list

## ⚙️ Tech Stack

| Category           | Technology                           |
| ------------------ | ------------------------------------ |
| Frontend Framework | React.js (Vite)                      |
| UI Library         | Ant Design                           |
| State Management   | React Context API                    |
| Data Fetching      | Fetch API                            |
| Routing            | React Router DOM                     |
| Styling            | Ant Design components + inline style |

## 🧭 Project Structure

```
src/
├── components/
│   ├── Layout.jsx          → navbar & page layout
│   ├── TodoList.jsx        → todo cards with responsive grid
│   ├── TodoForm.jsx        → add/edit todo modal
│   ├── CategoryList.jsx    → category table view
│   └── CategoryForm.jsx    → add/edit category modal
├── context/
│   ├── TodoContext.jsx     → manage todos & pagination state
│   └── CategoryContext.jsx → manage categories globally
├── pages/
│   ├── Home.jsx            → main todo list page
│   └── Categories.jsx      → category management page
├── Router.jsx              → route configuration
├── main.jsx                → app entry point
└── index.css / Ant Design  → base styling from Ant Design
```

## ⚡ Installation & Setup

### 1️⃣ Clone repository

```bash
git clone https://github.com/malailiyati/todoList-fe.git
cd todoList-fe
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run development server

```bash
npm run dev
```

Make sure the backend (Go + Gin) runs on port `8080`. The frontend proxies `/api` requests to `http://localhost:8080`.

## 💻 Responsive Design

Layout automatically adjusts using Ant Design's `Grid.useBreakpoint()`:

| Screen Size             | Columns |
| ----------------------- | ------- |
| Mobile (<576px)         | 1       |
| Tablet (≥768px)         | 2       |
| Laptop/Desktop (≥992px) | 3       |

This ensures todos appear in an adaptive grid layout across all devices.

## 🧠 State Management

The app uses **React Context API** for global state:

- `TodoContext` handles todos, pagination, and loading states.
- `CategoryContext` handles categories and color validation.

All API calls use the native **Fetch API**, and local updates (like toggle complete) are reflected instantly before syncing with the backend.

## 🌟 Future Improvements

- Add skeleton or loading UI during fetch
- Add sorting by priority or due date
- Add dark/light mode switch
- Add toast notifications for better UX

## 👩‍💻 Author

**Ma'la Iliyati**  
Full Stack Developer | React.js • Go • PostgreSQL • Docker

- 🔗 [GitHub](https://github.com/malailiyati)
- 🔗 [LinkedIn](https://www.linkedin.com/in/ma-la-iliyati)

**Related Project:**  
🔗 [Todo List Backend (Go + Gin + PostgreSQL)](https://github.com/malailiyati/todoList)

## 📄 License

This project is licensed under the **MIT License**.

## 🧩 Database Design Questions

### 1️⃣ Tabel apa saja yang kamu buat dan mengapa?

Saya membuat dua tabel utama: **`categories`** dan **`todos`**.

---

### 🗂️ Tabel `categories`

Tabel ini digunakan untuk menyimpan daftar kategori yang dapat dipilih saat membuat todo.  
Setiap kategori memiliki **nama unik** dan **warna** yang berfungsi sebagai identitas visual di frontend.

**Kolom:**

- `id` — Primary key
- `name` — Nama kategori (unik)
- `color` — Warna kategori, misalnya `#FF0000` atau `blue`
- `created_at`, `updated_at` — Timestamp otomatis untuk pelacakan perubahan data

---

### ✅ Tabel `todos`

Tabel ini menyimpan daftar tugas utama.  
Setiap todo memiliki atribut seperti **judul**, **deskripsi**, **prioritas**, dan **status selesai**.

**Kolom:**

- `id` — Primary key
- `title`, `description` — Detail tugas
- `completed` — Status selesai (boolean)
- `priority` — Tingkat prioritas (`high`, `medium`, `low`)
- `category_id` — Foreign key mengacu ke `categories(id)`
- `due_date` — Batas waktu (opsional)
- `created_at`, `updated_at` — Timestamp otomatis

---

### 🔗 Relasi antar tabel

Relasi antara tabel adalah **One-to-Many**, di mana satu kategori dapat memiliki banyak todo.  
Relasi ini diatur menggunakan **foreign key `category_id`** pada tabel `todos`.

Saya menambahkan aturan **`ON DELETE SET NULL`**, agar ketika kategori dihapus, todos yang berhubungan tidak ikut terhapus — hanya kolom `category_id`-nya yang diubah menjadi `NULL`.

---

### 💡 Alasan memilih struktur ini

Struktur ini **sederhana namun fleksibel**.  
Dengan memisahkan kategori dan todo:

- Sistem mudah diperluas (misalnya menambahkan filter berdasarkan kategori atau laporan berdasarkan prioritas).
- Relasi opsional memberi fleksibilitas untuk membuat todo tanpa kategori tertentu.
- Cocok untuk skala kecil hingga menengah dengan performa efisien.

---

### 2️⃣ Bagaimana kamu menangani pagination dan filtering di database?

#### 📜 Pagination

Pagination diterapkan di sisi backend dengan parameter **`limit`** dan **`offset`**.

```go
query.Limit(limit).Offset(offset)

```

Backend kemudian mengembalikan data **todo** beserta informasi:

- `total` — jumlah seluruh data
- `current_page` — halaman saat ini
- `total_pages` — jumlah total halaman

Sehingga frontend dapat menampilkan kontrol pagination dengan benar.  
Pendekatan ini efisien karena hanya mengambil data per halaman, bukan seluruh dataset.

---

### 🔍 Filtering dan Sorting

Untuk pencarian, saya menggunakan query seperti berikut:

```sql
WHERE title ILIKE ? OR description ILIKE ?
```

Dengan pendekatan ini, pengguna dapat mencari todo berdasarkan kata kunci tanpa case-sensitive.

### 🔽 Urutan (sorting) data diatur agar:

- Todo yang belum selesai muncul lebih dulu
- Todo dengan prioritas tinggi berada di atas
- Data diurutkan berdasarkan id terbaru

Kombinasi tersebut memberikan hasil yang logis dan nyaman dilihat pengguna.

---

### ⚙️ Indexing

PostgreSQL secara otomatis membuat index pada kolom **id (primary key)**.

Untuk skala besar, bisa ditambahkan index tambahan pada kolom **priority** atau **completed** untuk mempercepat filtering dan sorting.

Namun untuk proyek kecil hingga menengah, index bawaan sudah cukup efisien.

# ⚙️ Technical Decision Questions

## 1️⃣ How did you implement responsive design?

Saya menggunakan kombinasi **Ant Design Grid System** dan **CSS Grid** untuk membuat tampilan yang responsif di berbagai ukuran layar tanpa menggunakan framework tambahan seperti Tailwind CSS.

### 🔹 Breakpoints

Saya mengikuti breakpoint standar dari Ant Design:

- **xs (<576px)** – tampilan mobile, hanya 1 card per baris
- **sm (≥576px)** – tampilan tablet, 2 card per baris
- **lg (≥992px)** – tampilan laptop atau desktop, 3 card per baris

Breakpoints ini dipilih agar tampilan tetap proporsional di semua perangkat dan menjaga jarak antar card tetap nyaman dilihat.

### 🔹 UI Adaptation

Di komponen `TodoList.jsx`, saya menggunakan:

```javascript
const screens = Grid.useBreakpoint();
```

Lalu menyesuaikan jumlah kolom berdasarkan ukuran layar:

- **HP** → 1 kolom
- **Tablet** → 2 kolom
- **Laptop** → 3 kolom

Selain itu, layout halaman menggunakan komponen `Layout` dan `Space` dari Ant Design untuk menjaga jarak antar elemen dan padding agar tetap konsisten di semua resolusi.

### 🔹 Ant Design Components

Komponen Ant Design yang paling membantu untuk responsivitas:

- **Layout dan Grid** — mengatur struktur halaman dan adaptasi layar
- **Card** — menampilkan setiap todo dengan fleksibel
- **Space** — menjaga jarak antar elemen tanpa perlu banyak CSS manual
- **Input.Search, Button, Pagination** — sudah memiliki desain adaptif bawaan

Dengan kombinasi ini, UI dapat menyesuaikan secara otomatis tanpa perlu media query manual tambahan.

---

## 2️⃣ How did you structure your React components?

Struktur komponen saya dibuat modular dan mudah diperluas, dengan pembagian antara komponen UI, halaman utama, dan context untuk pengelolaan state global.

### 📂 Component Hierarchy

```
src/
 ├── components/
 │   ├── TodoList.jsx
 │   ├── TodoForm.jsx
 │   ├── CategoryList.jsx
 │   └── CategoryForm.jsx
 ├── context/
 │   ├── TodoContext.jsx
 │   └── CategoryContext.jsx
 ├── pages/
 │   ├── Home.jsx
 │   └── Categories.jsx
 ├── Router.jsx
 └── main.jsx
```

### 🔹 Penjelasan

- **components/** → berisi komponen presentational untuk tampilan UI (form, list, modal)
- **pages/** → berisi halaman utama yang mengatur logika (Home & Categories)
- **context/** → menggunakan React Context API untuk mengelola state global (todos & categories)
- **Router.jsx** → mengatur navigasi antar halaman menggunakan React Router

### 🔹 State Management

Saya menggunakan **Context API** agar data dapat diakses lintas halaman tanpa prop drilling.

Contohnya:

- `TodoContext` mengatur state `todos`, `pagination`, dan fungsi `fetchTodos()`
- `CategoryContext` mengatur state `categories` dan fungsi `fetchCategories()`

### 🔹 Filtering & Pagination State

- **Filtering** dilakukan dengan `Input.Search`, lalu query dikirim ke backend melalui parameter `?search=...`
- **Pagination** menggunakan komponen `Pagination` dari Ant Design. Data pagination (`current_page`, `total`, `per_page`) dikirim dari backend, sehingga frontend hanya perlu memanggil `fetchTodos(page, search)` saat halaman berubah.

Pendekatan ini menjaga sinkronisasi antara UI dan data dengan cara sederhana tapi efektif.

---

## 3️⃣ What backend architecture did you choose and why?

Saya menggunakan **layered architecture** (berbasis service-repository) agar kode terstruktur dengan jelas dan mudah dikembangkan di masa depan.

### 📁 Folder Structure

```
internals/
 ├── configs/        → inisialisasi database
 ├── models/         → definisi model GORM
 ├── repositories/   → akses ke database (CRUD)
 ├── services/       → business logic & validasi
 ├── handlers/       → HTTP request handler (controller)
 ├── routers/        → setup routing API
 └── utils/          → helper untuk response JSON
```

### 🔹 API Routing

Semua route diatur di `routers/router.go` dengan prefix `/api`:

- `/api/categories` → CRUD kategori
- `/api/todos` → CRUD todo
- `/api/todos/:id/complete` → toggle status selesai

Struktur seperti ini membuat endpoint mudah dibaca dan dikelompokkan sesuai resource.

### 🔹 Code Structure

- **Handler layer** → menerima request dan mengembalikan response JSON
- **Service layer** → mengelola validasi dan logika bisnis
- **Repository layer** → mengatur interaksi langsung ke database menggunakan GORM

Setiap layer hanya bertanggung jawab pada satu hal (single responsibility), sehingga lebih mudah untuk diuji dan dimaintain.

### 🔹 Error Handling

Error handling dilakukan secara manual tanpa middleware tambahan.

Setiap handler menggunakan helper:

```go
utils.Error(c, statusCode, message)
utils.Success(c, statusCode, message, data)
```

Hal ini memastikan format response tetap konsisten (`success`, `message`, `data` atau `error`) di seluruh endpoint, sambil tetap sederhana dan mudah dibaca.

---

## 4️⃣ How did you handle data validation?

Validasi dilakukan di **frontend** dan **backend** untuk menjaga integritas data serta memberikan pengalaman pengguna yang baik.

### 🔹 Lokasi Validasi

**Frontend (Ant Design Form)**

Menggunakan `rules` untuk memastikan input wajib diisi, serta custom validator agar nama kategori tidak duplikat.

Contoh: field `name` dan `color` wajib diisi di `CategoryForm.jsx`.

**Backend (Service Layer)**

Dilakukan di `CategoryService` dan `TodoService` sebelum data disimpan atau diubah.

### 🔹 Aturan Validasi

**Category**

- `name` tidak boleh kosong dan harus unik
- `color` wajib diisi dan harus diawali dengan `#` (contoh: `#FF0000` atau `#ABC`)
- Saat update, `color` juga bisa berupa nama warna seperti `red` atau `blue`

**Todo**

- `title` tidak boleh kosong
- `priority` harus salah satu dari `high`, `medium`, atau `low`
- `category_id` harus valid jika dikirim (dicek ke database melalui `CheckCategoryExists()`)

### 🔹 Alasan Pendekatan Ini

Validasi di frontend mencegah kesalahan input sejak awal, sementara validasi di backend memastikan data yang masuk ke database benar-benar valid, bahkan jika request datang dari luar aplikasi (misalnya Postman atau client lain).

Pendekatan dua sisi ini menjaga keamanan, konsistensi, dan kualitas data.

# ⚙️ Technical Decision Questions

## 1️⃣ How did you implement responsive design?

Saya menggunakan kombinasi **Ant Design Grid System** dan **CSS Grid** untuk membuat tampilan yang responsif di berbagai ukuran layar tanpa menggunakan framework tambahan seperti Tailwind CSS.

### 🔹 Breakpoints

Saya mengikuti breakpoint standar dari Ant Design:

- **xs (<576px)** – tampilan mobile, hanya 1 card per baris
- **sm (≥576px)** – tampilan tablet, 2 card per baris
- **lg (≥992px)** – tampilan laptop atau desktop, 3 card per baris

Breakpoints ini dipilih agar tampilan tetap proporsional di semua perangkat dan menjaga jarak antar card tetap nyaman dilihat.

### 🔹 UI Adaptation

Di komponen `TodoList.jsx`, saya menggunakan:

```javascript
const screens = Grid.useBreakpoint();
```

Lalu menyesuaikan jumlah kolom berdasarkan ukuran layar:

- **HP** → 1 kolom
- **Tablet** → 2 kolom
- **Laptop** → 3 kolom

Selain itu, layout halaman menggunakan komponen `Layout` dan `Space` dari Ant Design untuk menjaga jarak antar elemen dan padding agar tetap konsisten di semua resolusi.

### 🔹 Ant Design Components

Komponen Ant Design yang paling membantu untuk responsivitas:

- **Layout dan Grid** — mengatur struktur halaman dan adaptasi layar
- **Card** — menampilkan setiap todo dengan fleksibel
- **Space** — menjaga jarak antar elemen tanpa perlu banyak CSS manual
- **Input.Search, Button, Pagination** — sudah memiliki desain adaptif bawaan

Dengan kombinasi ini, UI dapat menyesuaikan secara otomatis tanpa perlu media query manual tambahan.

---

## 2️⃣ How did you structure your React components?

Struktur komponen saya dibuat modular dan mudah diperluas, dengan pembagian antara komponen UI, halaman utama, dan context untuk pengelolaan state global.

### 📂 Component Hierarchy

```
src/
 ├── components/
 │   ├── TodoList.jsx
 │   ├── TodoForm.jsx
 │   ├── CategoryList.jsx
 │   └── CategoryForm.jsx
 ├── context/
 │   ├── TodoContext.jsx
 │   └── CategoryContext.jsx
 ├── pages/
 │   ├── Home.jsx
 │   └── Categories.jsx
 ├── Router.jsx
 └── main.jsx
```

### 🔹 Penjelasan

- **components/** → berisi komponen presentational untuk tampilan UI (form, list, modal)
- **pages/** → berisi halaman utama yang mengatur logika (Home & Categories)
- **context/** → menggunakan React Context API untuk mengelola state global (todos & categories)
- **Router.jsx** → mengatur navigasi antar halaman menggunakan React Router

### 🔹 State Management

Saya menggunakan **Context API** agar data dapat diakses lintas halaman tanpa prop drilling.

Contohnya:

- `TodoContext` mengatur state `todos`, `pagination`, dan fungsi `fetchTodos()`
- `CategoryContext` mengatur state `categories` dan fungsi `fetchCategories()`

### 🔹 Filtering & Pagination State

- **Filtering** dilakukan dengan `Input.Search`, lalu query dikirim ke backend melalui parameter `?search=...`
- **Pagination** menggunakan komponen `Pagination` dari Ant Design. Data pagination (`current_page`, `total`, `per_page`) dikirim dari backend, sehingga frontend hanya perlu memanggil `fetchTodos(page, search)` saat halaman berubah.

Pendekatan ini menjaga sinkronisasi antara UI dan data dengan cara sederhana tapi efektif.

---

## 3️⃣ What backend architecture did you choose and why?

Saya menggunakan **layered architecture** (berbasis service-repository) agar kode terstruktur dengan jelas dan mudah dikembangkan di masa depan.

### 📁 Folder Structure

```
internals/
 ├── configs/        → inisialisasi database
 ├── models/         → definisi model GORM
 ├── repositories/   → akses ke database (CRUD)
 ├── services/       → business logic & validasi
 ├── handlers/       → HTTP request handler (controller)
 ├── routers/        → setup routing API
 └── utils/          → helper untuk response JSON
```

### 🔹 API Routing

Semua route diatur di `routers/router.go` dengan prefix `/api`:

- `/api/categories` → CRUD kategori
- `/api/todos` → CRUD todo
- `/api/todos/:id/complete` → toggle status selesai

Struktur seperti ini membuat endpoint mudah dibaca dan dikelompokkan sesuai resource.

### 🔹 Code Structure

- **Handler layer** → menerima request dan mengembalikan response JSON
- **Service layer** → mengelola validasi dan logika bisnis
- **Repository layer** → mengatur interaksi langsung ke database menggunakan GORM

Setiap layer hanya bertanggung jawab pada satu hal (single responsibility), sehingga lebih mudah untuk diuji dan dimaintain.

### 🔹 Error Handling

Error handling dilakukan secara manual tanpa middleware tambahan.

Setiap handler menggunakan helper:

```go
utils.Error(c, statusCode, message)
utils.Success(c, statusCode, message, data)
```

Hal ini memastikan format response tetap konsisten (`success`, `message`, `data` atau `error`) di seluruh endpoint, sambil tetap sederhana dan mudah dibaca.

---

## 4️⃣ How did you handle data validation?

Validasi dilakukan di **frontend** dan **backend** untuk menjaga integritas data serta memberikan pengalaman pengguna yang baik.

### 🔹 Lokasi Validasi

**Frontend (Ant Design Form)**

Menggunakan `rules` untuk memastikan input wajib diisi, serta custom validator agar nama kategori tidak duplikat.

Contoh: field `name` dan `color` wajib diisi di `CategoryForm.jsx`.

**Backend (Service Layer)**

Dilakukan di `CategoryService` dan `TodoService` sebelum data disimpan atau diubah.

### 🔹 Aturan Validasi

**Category**

- `name` tidak boleh kosong dan harus unik
- `color` wajib diisi dan harus diawali dengan `#` (contoh: `#FF0000` atau `#ABC`)
- Saat update, `color` juga bisa berupa nama warna seperti `red` atau `blue`

**Todo**

- `title` tidak boleh kosong
- `priority` harus salah satu dari `high`, `medium`, atau `low`
- `category_id` harus valid jika dikirim (dicek ke database melalui `CheckCategoryExists()`)

### 🔹 Alasan Pendekatan Ini

Validasi di frontend mencegah kesalahan input sejak awal, sementara validasi di backend memastikan data yang masuk ke database benar-benar valid, bahkan jika request datang dari luar aplikasi (misalnya Postman atau client lain).

Pendekatan dua sisi ini menjaga keamanan, konsistensi, dan kualitas data.

---

## 🧪 Testing & Quality Questions

## 1️⃣ What did you choose to unit test and why?

Untuk saat ini, saya belum membuat unit test secara langsung, tapi struktur kode saya sudah disiapkan supaya mudah dites nanti.

Kalau saya sempat menambahkan test, bagian yang paling penting untuk diuji adalah **service layer**, karena di situ ada banyak logika dan validasi utama.

### Contohnya:

- `CategoryService.Validate()` → untuk cek nama kategori tidak kosong dan format warna benar.
- `TodoService.validateCreate()` → untuk pastikan title diisi dan priority valid.
- `TodoService.validateUpdate()` → untuk cek update tidak mengubah data menjadi tidak valid.

Selain itu, **repository layer** juga penting untuk dites supaya query database benar:

- `TodoRepository.GetAll()` → memastikan pagination dan filter bekerja.
- `CategoryRepository.ExistsByName()` → memastikan nama kategori yang sama tidak bisa dibuat dua kali.

### 🧩 Beberapa kondisi yang saya pertimbangkan:

- Input kosong (title, name, atau color kosong).
- Category ID tidak valid saat membuat todo.
- Nama kategori duplikat.
- Searching tidak menemukan data (hasil kosong).
- Pagination di halaman terakhir.

### 📂 Struktur Test

Kalau nanti saya buat test, strukturnya kira-kira seperti ini:

```
tests/
 ├── services/
 │   ├── todo_service_test.go
 │   └── category_service_test.go
 ├── repositories/
 │   ├── todo_repository_test.go
 │   └── category_repository_test.go
```

Setiap test akan menjalankan fungsi dan mengecek apakah hasilnya sesuai dengan yang diharapkan.

---

## 2️⃣ If you had more time, what would you improve or add?

Kalau punya lebih banyak waktu, saya ingin fokus untuk meningkatkan kualitas kode dan menambah fitur supaya aplikasi lebih lengkap dan rapi.

### 💡 Hal yang ingin saya perbaiki (technical debt):

- Menambah **unit test** dan **integration test**, supaya bisa memastikan semua fitur jalan stabil.
- Membuat **middleware untuk error handling**, jadi nggak perlu nulis `utils.Error()` berulang di setiap handler.
- Menambahkan **Redis cache** untuk meningkatkan kecepatan kalau datanya banyak.

### 🚀 Fitur yang ingin saya tambahkan:

- **Filter todo** berdasarkan kategori, prioritas, atau status selesai/belum.
- **Fitur reminder** untuk due date biar pengguna tahu kalau ada tugas yang sudah dekat tenggat waktu.
- **Fitur export data** ke file CSV atau PDF.

### 🧹 Hal yang ingin saya refactor:

- Memisahkan data request/response ke folder `dto/` supaya model database tidak langsung terbuka ke user.
- Menambahkan **middleware logging** agar setiap request bisa dilacak.
- Menambahkan **loading UI** atau **skeleton** di frontend biar pengalaman pengguna lebih halus.
