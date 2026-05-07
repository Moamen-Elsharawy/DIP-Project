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
├── FRONTEND_INTEGRATION.md # API documentation for frontend developers
├── LICENSE                 # Project license
└── README.md               # Main project documentation
```

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
