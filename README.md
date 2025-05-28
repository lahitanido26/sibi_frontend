## 📚 *Laporan Agile Sprint (SIBI)*  
**Judul Proyek:** SIBI – Sistem Pembelajaran Bahasa Isyarat SIBI Menggunakan Algoritma YOLOv8 Berbasis Web  
**Pendekatan:** Agile Development  
**Fokus Fitur:** Klasifikasi Gesture – Kuis Interaktif – Leaderboard  
**Total Sprint:** 5 Sprint  
**Stack yang Digunakan:**  

### 🔧 Tech Stack:

| Kategori              | Teknologi                                                                 |
|-----------------------|---------------------------------------------------------------------------|
| **Machine Learning**  | Python, YOLOv8, Ultralytics, Google Colab                                 |
| **Frontend**          | Figma (UI Design), React, TailwindCSS, Axios, Tanstack Query, Redux       |
| **Backend & API**     | Flask (API YOLO), NestJS (Main App Backend), MongoDB Atlas, Docker        |
| **Deployment**        | Vercel (Frontend), Google Cloud Run (Backend API), Railway (NestJS API)   |

---

## 🔁 Sprint Breakdown (Final Version)

### 🧭 Sprint Plan Overview

| Sprint | Tujuan Utama                            | Tanggal              |
|--------|-----------------------------------------|----------------------|
| Sprint 1 | UI/UX Kuis & Halaman Latihan           | 1 – 7 April 2025     |
| Sprint 2 | Pelatihan Model YOLOv8 di Google Colab | 8 – 14 April 2025    |
| Sprint 3 | Deploy YOLOv8 API (Flask + Docker)     | 15 – 21 April 2025   |
| Sprint 4 | Integrasi Frontend – Flask & NestJS    | 22 – 28 April 2025   |
| Sprint 5 | Leaderboard + Skor Kuis ke Database    | 29 April – 5 Mei 2025|

---

### ✅ **Sprint 1 – UI/UX Kuis & Latihan Gesture**
**Tools:** Figma, React, TailwindCSS  
**Highlight:**
- Desain layout halaman latihan dan kuis
- Komponen upload & kamera gesture di React
- Validasi file atau tangkapan kamera
- Redux untuk state pengenalan gesture
- Dummy prediksi untuk simulasi awal

---

### 🤖 **Sprint 2 – Pelatihan Model YOLOv8**
**Tools:** Python, Google Colab, Roboflow, Ultralytics  
**Highlight:**
- Dataset gesture SIBI: 10 huruf awal (A–J)
- Roboflow: anotasi, augmentasi, ekspor format YOLOv8
- Pelatihan YOLOv8 di Google Colab
- Export model: `best.pt`
- Evaluasi model: akurasi mAP 89.2% @ IoU=0.5

---

### ⚙️ **Sprint 3 – Deploy YOLOv8 sebagai API**
**Tools:** Flask, Docker, Google Cloud Run  
**Highlight:**
- API Flask menerima gambar dan melakukan inferensi
- Load model YOLOv8 dari file `.pt`
- Output label gesture + confidence score
- Build docker image dan deploy ke GCR
- Tes integrasi API menggunakan Postman

---

### 🧩 **Sprint 4 – Integrasi Frontend, Flask API & NestJS**
**Tools:** React, Axios, NestJS  
**Highlight:**
- Kirim gambar ke Flask API untuk klasifikasi
- Integrasi frontend dengan backend NestJS
- Manajemen autentikasi, user, dan kuis dari backend
- Penanganan error saat upload dan prediksi
- Real-time feedback gesture untuk user

---

### 🏆 **Sprint 5 – Leaderboard & Skor Kuis**
**Tools:** MongoDB Atlas, NestJS  
**Highlight:**
- Simpan skor kuis pengguna ke database MongoDB
- Endpoint NestJS untuk ambil data leaderboard
- Komponen leaderboard React dengan sorting & animasi
- Validasi skor dan identifikasi user via JWT
