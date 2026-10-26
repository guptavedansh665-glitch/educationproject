# 🌾 PindVidya (ਪਿੰਡ ਵਿੱਦਿਆ)

> **Resilient, Offline-First Multilingual Learning Platform for Rural Punjab Schools**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PSEB Aligned](https://img.shields.io/badge/Curriculum-PSEB_Class_1--10-blue.svg)](#-curriculum--languages)
[![Offline First](https://img.shields.io/badge/Architecture-Offline--First_PWA-green.svg)](#-key-features)

---

## 📌 Overview

**PindVidya** bridges educational gaps in rural Punjab (Firozpur, Fazilka, Tarn Taran, etc.) caused by erratic electricity, intermittent 2G/3G networks, and shared single-phone households. 

It provides an offline-first, Gurmukhi-native digital learning platform aligned with the **Punjab School Education Board (PSEB)** curriculum.

---

## ✨ Key Features

- 📴 **100% Offline-First (PWA):** Service worker caching and IndexedDB store lessons, quizzes, and digital textbooks locally.
- 🗣️ **Native Gurmukhi & Dialect TTS:** Full Punjabi UI with AI4Bharat Indic-TTS voice assistance in regional dialects (*Majhi, Malwai, Doabi*).
- 👨‍👩‍👦 **Multi-Learner Profiles:** Multiple siblings share one device with isolated progress, PIN switching, and streaks.
- 📖 **PSEB Bilingual Curriculum:** Classes 1–10 Math, Science, and Social Studies in Punjabi (ਮਾਤ ਭਾਸ਼ਾ) with English STEM terminology.
- 🍓 **Edge School Kiosk:** Raspberry Pi local Wi-Fi mesh (`hostapd`) allows up to 40 offline student devices to stream content and sync progress.
- 📊 **Parent & Teacher Cockpit:** Multi-grade tracking and automated weekly audio progress summaries over IVR / SMS.

---

## 🌐 Supported Languages

| Language | Script | Role |
| :--- | :--- | :--- |
| **ਪੰਜਾਬੀ (Punjabi)** | Gurmukhi (ਗੁਰਮੁਖੀ) | **Primary Medium** (Full UI, dialect audio, phonetic keypad) |
| **English** | Latin | **STEM Bridge** (Dual toggles, scientific glossary) |
| **हिन्दी (Hindi)** | Devanagari (देवनागरी) | **Tertiary Curriculum** (PSEB Hindi literature & grammar) |

---

## 🛠️ Tech Stack

- **Frontend / PWA:** React 18, Vite / Next.js, Tailwind CSS, Workbox, IndexedDB (Dexie.js)
- **Backend API:** Node.js, Express.js, WebSockets
- **AI & Speech:** Python 3.10, FastAPI, AI4Bharat Indic-TTS, Whisper
- **Database & Cache:** PostgreSQL 15, Redis
- **Edge Deployment:** Raspberry Pi 4 (Debian, hostapd Wi-Fi kiosk), Docker Compose

---

## 🚀 Quick Start

### 1. Clone & Configure
```bash
git clone https://github.com/guptavedansh665-glitch/ASD_Workshop_1.git pindvidya
cd pindvidya
cp .env.example .env
```

### 2. Install & Run (Local Dev)
```bash
# Backend
npm install
npm run server

# Frontend (in another terminal)
cd client
npm install
npm run dev
```

### 3. Run with Docker
```bash
docker-compose up --build -d
```
- **App:** `http://localhost:3000`
- **API:** `http://localhost:5000/api`

---

## 🎒 Raspberry Pi Edge Kiosk

Deploy to a Raspberry Pi 4 to create a zero-data school hotspot:
1. Flash the PindVidya OS image onto the SD card.
2. The Pi broadcasts `PindVidya-School-Net` (no internet required).
3. Up to 40 student devices connect locally to stream lessons and submit assessments.
4. Data batches sync upstream when the teacher connects to cellular data.

---

## 📜 License

Licensed under the [MIT License](LICENSE). Educational content is shared under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

---

<div align="center">

Made with ❤️ for Punjab's students and teachers.  
**"ਵਿੱਦਿਆ ਵੀਚਾਰੀ ਤਾਂ ਪਰਉਪਕਾਰੀ"** *(True learning leads to the welfare of all.)*

</div>
