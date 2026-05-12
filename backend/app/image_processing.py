import cv2
import numpy as np
import io

def bytes_to_numpy(image_bytes):
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)
    return img

def numpy_to_bytes(img):
    _, buffer = cv2.imencode('.png', img)
    return io.BytesIO(buffer)

def average_images(images: list[np.ndarray]) -> np.ndarray:
    if not images:
        return None
    
    sum_img = np.zeros_like(images[0], dtype=np.float64)
    for img in images:
        if img.shape != images[0].shape:
            img = cv2.resize(img, (images[0].shape[1], images[0].shape[0]))
        sum_img += img
    
    avg_img = sum_img / len(images)
    return avg_img.astype(np.uint8)

def subtract_images(img1: np.ndarray, img2: np.ndarray) -> np.ndarray:
    if img1.shape != img2.shape:
        img2 = cv2.resize(img2, (img1.shape[1], img1.shape[0]))
    
    diff = cv2.absdiff(img1, img2)

    enhanced_diff = cv2.normalize(diff, None, 0, 255, cv2.NORM_MINMAX)
    return enhanced_diff

def correct_shading(img: np.ndarray, shading: np.ndarray) -> np.ndarray:
    if img.shape != shading.shape:
        shading = cv2.resize(shading, (img.shape[1], img.shape[0]))
    
    img_f = img.astype(np.float64)
    shading_f = shading.astype(np.float64)
    
    shading_f[shading_f == 0] = 1.0
    
    corrected = img_f / shading_f
    
    corrected *= np.mean(shading_f)
    
    return np.clip(corrected, 0, 255).astype(np.uint8)

def mask_image(img: np.ndarray, mask: np.ndarray) -> np.ndarray:
    if img.shape != mask.shape:
        mask = cv2.resize(mask, (img.shape[1], img.shape[0]))
    
    _, binary_mask = cv2.threshold(mask, 127, 1, cv2.THRESH_BINARY)
    
    masked = img * binary_mask
    return masked.astype(np.uint8)

def normalize_image(img: np.ndarray) -> np.ndarray:
    img_f = img.astype(np.float64)
    min_val = np.min(img_f)
    max_val = np.max(img_f)
    
    if max_val == min_val:
        return img
    
    normalized = (img_f - min_val) * (255.0 / (max_val - min_val))
    return normalized.astype(np.uint8)

def add_noise(img: np.ndarray, noise_type: str = "gaussian", amount: float = 0.05, sigma: float = 25) -> np.ndarray:
    img_f = img.astype(np.float64)
    
    if noise_type == "gaussian":
        gauss = np.random.normal(0, sigma, img.shape)
        noisy = img_f + gauss
        return np.clip(noisy, 0, 255).astype(np.uint8)
    
    elif noise_type == "salt_and_pepper":
        noisy = np.copy(img)
        num_salt = np.ceil(amount * img.size * 0.5)
        coords = [np.random.randint(0, i, int(num_salt)) for i in img.shape]
        noisy[tuple(coords)] = 255
        num_pepper = np.ceil(amount * img.size * 0.5)
        coords = [np.random.randint(0, i, int(num_pepper)) for i in img.shape]
        noisy[tuple(coords)] = 0
        return noisy
    
    elif noise_type == "speckle":
        gauss = np.random.randn(*img.shape)
        noisy = img_f + img_f * gauss * amount
        return np.clip(noisy, 0, 255).astype(np.uint8)
    
    return img

def smooth_image(img: np.ndarray, method: str = "gaussian", kernel_size: int = 5) -> np.ndarray:
    if method == "gaussian":
        return cv2.GaussianBlur(img, (kernel_size, kernel_size), 0)
    elif method == "median":
        return cv2.medianBlur(img, kernel_size)
    elif method == "bilateral":
        return cv2.bilateralFilter(img, 9, 75, 75)
    return img

def sharpen_image(img: np.ndarray) -> np.ndarray:
    gaussian_3 = cv2.GaussianBlur(img, (0, 0), 3)
    unsharp_image = cv2.addWeighted(img, 1.5, gaussian_3, -0.5, 0)
    return unsharp_image

def enhance_contrast(img: np.ndarray, method: str = "clahe") -> np.ndarray:
    if method == "equalize":
        return cv2.equalizeHist(img)
    elif method == "clahe":
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        return clahe.apply(img)
    return img

def detect_edges(img: np.ndarray, low_threshold: int = 50, high_threshold: int = 150) -> np.ndarray:
    return cv2.Canny(img, low_threshold, high_threshold)

def morphological_op(img: np.ndarray, op: str = "dilation", kernel_size: int = 3) -> np.ndarray:
    kernel = np.ones((kernel_size, kernel_size), np.uint8)
    if op == "dilation":
        return cv2.dilate(img, kernel, iterations=1)
    elif op == "erosion":
        return cv2.erode(img, kernel, iterations=1)
    elif op == "opening":
        return cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)
    elif op == "closing":
        return cv2.morphologyEx(img, cv2.MORPH_CLOSE, kernel)
    return img
