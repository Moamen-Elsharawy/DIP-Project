# Frontend Integration Guide for X-ray DIP API

This guide explains how to interact with all available endpoints from a frontend application.

## 1. Base Configuration
- **API URL**: `http://localhost:8000`
- **Content Type**: `multipart/form-data` (handled automatically by `FormData` in browsers).

---

## 2. Prediction Endpoint

### 2.1 Gender Prediction
- **Endpoint Name**: `/predict`
- **Description**: Analyzes an X-ray image using an EfficientNet-B4 model to predict the gender of the patient.
- **Input**: A single `file` (Image).
- **Output**: JSON object containing `gender`, `confidence`, and `class_index`.

---

## 3. Arithmetic & Multi-Image Operations

### 3.1 Image Averaging
- **Endpoint Name**: `/process/average`
- **Description**: Combines multiple images of the same scene to cancel out random noise.
- **Input**: Multiple files with the key `files` (Image List).
- **Output**: A denoised average image `Blob` (PNG).

### 3.2 Image Subtraction
- **Endpoint Name**: `/process/subtract`
- **Description**: Calculates the absolute difference between two images to highlight changes or remove static background.
- **Input**: 
    - `img1`: The base image.
    - `img2`: The image to subtract.
- **Output**: A difference map image `Blob` (PNG).

### 3.3 Shading Correction
- **Endpoint Name**: `/process/shading-correction`
- **Description**: Corrects uneven lighting or sensor sensitivity by dividing the original image by a shading pattern.
- **Input**:
    - `original`: The X-ray image with shading.
    - `shading`: A reference image representing the sensor's shading pattern.
- **Output**: A corrected image `Blob` (PNG).

### 3.4 Image Masking
- **Endpoint Name**: `/process/mask`
- **Description**: Isolates a region of interest by multiplying the image by a binary mask (black and white image).
- **Input**:
    - `original`: The base image.
    - `mask`: A binary image where white (255) areas are kept and black (0) areas are hidden.
- **Output**: A masked image `Blob` (PNG).

---

## 4. Single Image Processing (DIP Techniques)

### 4.1 Normalize Image
- **Endpoint Name**: `/process/normalize`
- **Description**: Rescales the intensity values of the image to cover the full [0, 255] range. This is useful for improving visibility in underexposed X-rays.
- **Input**: A single `file` (Image).
- **Output**: A processed image `Blob` (PNG).

### 4.2 Add Noise
- **Endpoint Name**: `/process/add-noise`
- **Description**: Injects artificial noise into the image for data augmentation or robustness testing.
- **Input**: 
    - `file`: The base image.
    - `noise_type`: (Query string) "gaussian", "salt_and_pepper", or "speckle".
    - `amount`: (Query string) Density of noise. **Range**: `0.0` to `1.0` (0% to 100%). 
    - `sigma`: (Query string) Standard deviation (for gaussian).
- **Output**: A noisy image `Blob` (PNG).

### 4.3 Smooth Image
- **Endpoint Name**: `/process/smooth`
- **Description**: Applies blurring filters to reduce high-frequency noise.
- **Input**:
    - `file`: The base image.
    - `method`: (Query string) "gaussian", "median", or "bilateral".
    - `kernel_size`: (Query string) Size of the filter kernel (must be odd integer). **Range**: `3` to `25`. **Typical**: `5`, `7`, `9`.
- **Output**: A smoothed image `Blob` (PNG).

### 4.4 Sharpen Image
- **Endpoint Name**: `/process/sharpen`
- **Description**: Enhances the edges and fine details of the image using unsharp masking.
- **Input**: A single `file` (Image).
- **Output**: A sharpened image `Blob` (PNG).

### 4.5 Enhance Contrast
- **Endpoint Name**: `/process/enhance-contrast`
- **Description**: Improves the dynamic range and local contrast of the image.
- **Input**:
    - `file`: The base image.
    - `method`: (Query string) "clahe" (recommended for X-rays) or "equalize".
- **Output**: A contrast-enhanced image `Blob` (PNG).

### 4.6 Detect Edges
- **Endpoint Name**: `/process/detect-edges`
- **Description**: Extracts the structural boundaries (edges) from the image.
- **Input**:
    - `file`: The base image.
    - `low`: (Query string) Low threshold for Canny. **Range**: `0` to `255`. **Typical**: `50` to `100`.
    - `high`: (Query string) High threshold for Canny. **Range**: `0` to `255`. **Typical**: `150` to `200`.
- **Output**: A binary edge map `Blob` (PNG).

### 4.7 Morphological Operations
- **Endpoint Name**: `/process/morphology`
- **Description**: Performs shape-based operations to remove noise or bridge gaps in structures.
- **Input**:
    - `file`: The base image.
    - `op`: (Query string) "dilation", "erosion", "opening", or "closing".
    - `kernel_size`: (Query string) Size of the structuring element. **Range**: `3` to `25`. **Typical**: `5`, `7`, `9`.
- **Output**: A morphologically processed image `Blob` (PNG).
