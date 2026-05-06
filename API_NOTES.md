# X-ray Image Processing & Prediction API Documentation

This API provides a comprehensive suite of Digital Image Processing (DIP) tools specifically designed for medical X-ray analysis, alongside a machine learning model for gender prediction.

## Table of Contents
1. [Core Endpoints](#core-endpoints)
2. [Arithmetic Operations](#arithmetic-operations)
3. [Preprocessing & Enhancement](#preprocessing--enhancement)
4. [Advanced DIP Techniques](#advanced-dip-techniques)
5. [Integrated Prediction](#integrated-prediction)

---

## 1. Core Endpoints

### `GET /`
- **Purpose**: Health check to ensure the API is running.
- **Response**: `{"message": "X-ray Image Processing API is running"}`

### `POST /predict`
- **Purpose**: Predict gender from an uploaded X-ray image.
- **Input**: `file` (Image)
- **Logic**: Reads image bytes and passes them directly to the `EfficientNet-B4` classifier.

---

## 2. Arithmetic Operations

### `POST /process/average`
- **Purpose**: Noise reduction by averaging multiple images of the same scene.
- **Input**: Multiple `files` (Images)
- **Concept**: If you have 10 noisy images of the same object, averaging them cancels out random noise, approaching the "true" noise-free image.

### `POST /process/subtract`
- **Purpose**: Highlight differences between two images.
- **Input**: `img1`, `img2` (Images)
- **Concept**: Useful in medical imaging (e.g., Digital Subtraction Angiography) to see changes over time or remove background structures.

### `POST /process/shading-correction`
- **Purpose**: Compensate for uneven sensor lighting/sensitivity.
- **Input**: `original` (Image), `shading` (Flat-field reference image)
- **Logic**: Divides the original image by the shading pattern image to normalize brightness.

---

## 3. Preprocessing & Enhancement

### `POST /process/normalize`
- **Purpose**: Ensure the image uses the full range of intensity (0-255).
- **Input**: `file` (Image)
- **Logic**: Rescales pixel values so the darkest pixel becomes 0 and the brightest becomes 255.

### `POST /process/enhance-contrast`
- **Purpose**: Improve visibility of subtle features.
- **Input**: `file` (Image), `method` ("clahe" or "equalize")
- **Concept**: `CLAHE` (Contrast Limited Adaptive Histogram Equalization) is particularly effective for X-rays as it enhances local contrast without over-amplifying noise.

### `POST /process/sharpen`
- **Purpose**: Make edges and bone structures more distinct.
- **Input**: `file` (Image)
- **Logic**: Uses "Unsharp Masking" (subtracting a blurred version of the image from the original).

---

## 4. Advanced DIP Techniques

### `POST /process/add-noise`
- **Purpose**: Simulate sensor degradation for testing model robustness.
- **Types**: 
  - `gaussian`: Additive white noise.
  - `salt_and_pepper`: Random black and white pixels.
  - `speckle`: Multiplicative noise (common in ultrasound/radar).

### `POST /process/smooth`
- **Purpose**: Reduce high-frequency noise.
- **Methods**: `gaussian`, `median` (excellent for salt & pepper noise), `bilateral` (smooths while preserving edges).

### `POST /process/detect-edges`
- **Purpose**: Isolate boundaries of organs or bones.
- **Logic**: Uses the Canny Edge Detector.

### `POST /process/morphology`
- **Purpose**: Shape-based processing.
- **Operations**: `dilation` (expands white regions), `erosion` (shrinks white regions), `opening` (removes small noise), `closing` (fills small holes).

---

## 5. Integrated Prediction

### `POST /predict-with-dip`
- **Purpose**: Chain processing and prediction in one request.
- **Parameters**: 
  - `apply_clahe`: True/False
  - `apply_sharpen`: True/False
  - `apply_normalize`: True/False
- **Workflow**: 
  1. Upload image.
  2. Apply selected DIP enhancements.
  3. Feed the **enhanced** image to the Gender Classifier.
  4. Return prediction result.

---

## Developer Notes
- **Library Dependencies**: `FastAPI`, `OpenCV (cv2)`, `NumPy`, `PyTorch (timm)`.
- **Image Handling**: All images are converted to Grayscale internally for processing to match standard X-ray formats.
- **Server**: Run using `uvicorn main:app --host 0.0.0.0 --port 8000`.
