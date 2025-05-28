## 📚 *Laporan Agile Sprint ( SignEase)*  
**Judul Proyek:** SignEase – Platform Web Pembelajaran Bahasa Isyarat Berbasis Web dan AI  
**Pendekatan:** Agile Development 
**Fokus Fitur:** Kuis – Klasifikasi Gesture Menggunakan YOLO  
**Total Sprint:** 5 Sprint  
**Stack yang Digunakan:**  

### 🔧 Tech Stack:

| Kategori              | Teknologi                                                                 |
|-----------------------|---------------------------------------------------------------------------|
| **Machine Learning**  | Python, TensorFlow, YOLOv5, Google Colab                                  |
| **Frontend**          | Figma (UI Design), React, TailwindCSS, Axios, Tanstack Query, Redux       |
| **Backend & API**     | Flask (API YOLO), NestJS (Main App Backend), MongoDB Atlas, Docker        |
| **Deployment**        | Vercel (Frontend), Google Cloud Run (Backend API)                         |

---

## 🔁 Sprint Breakdown (Final Version)

### 🧭 Sprint Plan Overview

| Sprint | Tujuan Utama | Tanggal |
|--------|--------------|---------|
| Sprint 1 | UI/UX Kuis & Upload | 1 – 7 April 2025 |
| Sprint 2 | Training YOLOv5 di Google Colab | 8 – 14 April 2025 |
| Sprint 3 | YOLO API (Flask + Docker + GCR) | 15 – 21 April 2025 |
| Sprint 4 | Integrasi API dengan Frontend | 22 – 28 April 2025 |
| Sprint 5 | Leaderboard + Save Score ke MongoDB | 29 April – 5 Mei 2025 |

---

### ✅ **Sprint 1 – UI/UX Kuis & Upload Gambar**
**Tools:** Figma, React, TailwindCSS  
**Highlight:**
- Desain layout halaman kuis di Figma (mobile-first)
- Komponen React untuk upload file
- Validasi file (format, ukuran)
- Redux: menyimpan state gambar yang diunggah
- Simulasi prediksi (dummy result)

---

### 🤖 **Sprint 2 – Pelatihan Model YOLOv5**
**Tools:** Python, Google Colab, Roboflow, PyTorch  
**Highlight:**
- Dataset gesture: 10 huruf (A–J), format YOLO (.txt + .jpg)
- Roboflow digunakan untuk anotasi dan augmentasi
- Training YOLOv5 di Google Colab
- Export model: `best.pt`
- Evaluasi: mAP 87.4% @ IoU=0.5

---

### ⚙️ **Sprint 3 – Deploy Model YOLOv5 sebagai API**
**Tools:** Flask, Docker, Google Cloud Run  
**Highlight:**
- Flask API menerima POST gambar
- Load model YOLOv5 (PyTorch)
- Output label + confidence
- Dockerized backend → deploy ke GCR
- Tes endpoint pakai Postman + frontend dummy

---

### 🧩 **Sprint 4 – Integrasi Frontend & API**
**Tools:** Axios, Tanstack Query, React  
**Highlight:**
- Kirim file ke Flask API pakai `Axios`
- Loading + feedback state di UI (label + skor)
- Error handler: gagal prediksi, invalid file
- Uji lintas browser & resolusi
- Real-time feedback gesture: "Benar" / "Salah"

---

### 🏆 **Sprint 5 – Leaderboard & Database**
**Tools:** MongoDB Atlas, NestJS  
**Highlight:**
- Simpan hasil kuis ke MongoDB (user ID, jawaban, waktu, skor)
- Endpoint NestJS untuk ambil top skor
- Komponen React leaderboard
- Sorting skor, animasi masuk leaderboard
