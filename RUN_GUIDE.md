# Run Guide

This document provides instructions on how to run the frontend and backend of the DIP project.

## 🚀 Backend (FastAPI)

The backend is built with FastAPI and handles image processing and gender prediction.

### Prerequisites
- Python 3.8+
- Installed dependencies from `backend/requirements.txt`

### Steps to Run
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. (Optional) Create and activate a virtual environment:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate  # On Windows
   # source venv/bin/activate  # On Linux/macOS
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the server:
   ```bash
   python app/main.py
   ```
   Alternatively, you can run using uvicorn directly for hot-reload:
   ```bash
   uvicorn app.main:app --reload
   ```

The backend will be available at `http://localhost:8000`.

---

## 💻 Frontend (React + Vite)

The frontend is a modern React application built with Vite and Tailwind CSS.

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Steps to Run
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` (or the port specified in your terminal).

---

## 🛠️ Combined Setup (Quick Start)

To get everything running quickly, open two terminals:

**Terminal 1 (Backend):**
```bash
cd backend
python app/main.py
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
