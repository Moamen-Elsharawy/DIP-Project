# X-Ray Vision AI - Digital Image Processing Project

This project combines deep learning and digital image processing (DIP) techniques to analyze X-ray images. It features a React-based frontend and a FastAPI-based backend.

## 📂 Project Structure

```text
.
├── assets/                 # Brand assets and images
├── backend/                # Backend Python application
│   ├── app/                # API implementation and core logic
│   │   ├── main.py         # FastAPI entry point
│   │   ├── image_processing.py  # DIP algorithms
│   │   └── model_utils.py  # ML model loading and inference
│   ├── models/             # Trained model weights (.pth)
│   ├── notebooks/          # Research and development notebooks
│   └── requirements.txt    # Python dependencies
├── frontend/               # React + Vite + TypeScript application
│   ├── src/
│   │   ├── components/     # UI and Tool components (Workspace, Settings)
│   │   ├── i18n/           # Localization (en.json, ar.json)
│   │   ├── pages/          # Home, Tools, About, Docs, etc.
│   │   └── utils/          # Central tool configuration (toolConfig.ts)
│   └── tailwind.config.js  # Custom theme and design system
├── FRONTEND_INTEGRATION.md # API documentation for frontend developers
├── LICENSE                 # Project license
└── README.md               # Main project documentation
```

## 🛠️ Key Features

### 💻 Frontend (User Experience)
- **Modular Interface:** Separated components (`ToolWorkspace`, `ToolSettings`, `PredictionResult`) for better code organization.
- **Global Localization (i18n):** Full support for **English** and **Arabic** (RTL) including dynamic tool parameters.
- **Premium Design:** Modern UI with **Tailwind CSS** and **Framer Motion** for a smooth, high-fidelity experience.
- **In-App Documentation:** Integrated detailed API reference and guides for developers and users.
- **Dynamic Parameter Control:** Adaptive sidebars that update based on selected processing techniques.

### 🧠 Backend (Image Processing & AI)
- **AI Prediction:** Gender classification using a fine-tuned **EfficientNet-B4** deep learning model.
- **Advanced DIP Algorithms:** Implementation of Shading Correction, Canny Edge Detection, CLAHE, and Morphological operations.
- **Arithmetic Operations:** Real-time multi-image averaging and subtraction.
- **High Performance:** Built with **FastAPI** for low-latency processing and stateless operations.

## 🧰 Technology Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS, Framer Motion, i18next.
- **Backend:** FastAPI, OpenCV, PyTorch, NumPy.
- **Icons:** Lucide React.

## 🚀 Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the API:
   ```bash
   python app/main.py
   ```
   The API will be available at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 🛠️ Features

- **Gender Prediction:** Uses an EfficientNet-B4 model to predict gender from X-ray images.
- **Image Averaging:** Denoising multiple images by averaging.
- **Image Subtraction:** Highlighting changes between two images.
- **Shading Correction:** Removing non-uniform illumination.
- **Noise Addition:** Simulation of various noise types (Gaussian, Salt & Pepper, etc.).
- **Filtering:** Gaussian smoothing, sharpening, and edge detection (Canny).
- **Morphology:** Dilation and erosion operations.
- **Contrast Enhancement:** Histogram equalization and CLAHE.
