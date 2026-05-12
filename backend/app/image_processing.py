import cv2
import numpy as np
import io

def bytes_to_numpy(image_bytes):
    nparr = np.frombuffer(image_bytes, np.uint8)
    '''
    image_bytes => raw bytes (0 and 1s) e.g. "255, 0, 127, 50"
    np.uint8 => unsigned integer 8-bit (0-255) 
    
    nparr => numpy array 
    nparr = np.array([255, 0, 127, 50]) => [11111111 00000000 01111111 00110010] 255 = 11111111 in binary , 0 = 00000000 in binary , 127 = 01111111 in binary , 50 = 00110010 in binary
    '''
    img = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)
    '''
    cv2.imdecode() is used to decode an image from a byte array to another array format, 
    in this case it is decoded to a grayscale image (image matrix) (pixels)
    
    cv2.IMREAD_GRAYSCALE : Reads the image in grayscale mode (1 channel) in our case the input is chest xray which is grayscale
    cv2.IMREAD_COLOR : Reads the image in BGR mode (3 channels)
    cv2.IMREAD_UNCHANGED : Reads the image in its original format (including alpha channel if present)
    
    '''
    return img

def numpy_to_bytes(img):
    _, buffer = cv2.imencode('.png', img)
    '''
    cv2.imencode() is used to encode an image from a numpy array to another array format, 
    in this case it is encoded to a PNG bytes array
    
    cv2.imencode() function used here is for encoding numpy arrays as image
    it returns 2 things : 
    1. A boolean value indicating success or failure
    2. The encoded image data as a numpy array (buffer)
    
    .png : Lossless compression, good for images with sharp edges and text, larger file size
    .jpg : Lossy compression, good for photographs, smaller file size
    .jpeg : Lossy compression, good for photographs, smaller file size
    .bmp : Uncompressed, good for simple images, larger file size
    .tiff : Lossless compression, good for images with sharp edges and text, larger file size
    .webp : Lossless or lossy compression, good for web images, smaller file size
    '''
    return io.BytesIO(buffer) # io.BytesIO() creates a file-like object in memory from the byte array

def average_images(images: list[np.ndarray]) -> np.ndarray:
    if not images:
        return None
    
    sum_img = np.zeros_like(images[0], dtype=np.float64) # np.zeros_like() creates a numpy array filled with zeros with the same shape and data type as the input array, in this case it is a grayscale image (1 channel)
    # np.float64 is used to store the sum of the images to prevent overflow (when adding images)
    
    for img in images:
        if img.shape != images[0].shape:
            img = cv2.resize(img, (images[0].shape[1], images[0].shape[0])) # cv2.resize() is used to resize an image to a specific size (all images should be the same size before averaging to avoid errors)
            # shape is (height, width) or (h,w,c)
            # note numpy shape is different from cv2 shape
            # numpy shape is (h,w) or (h,w,c) but cv2 shape is (w,h) or (w,h,c) 
        sum_img += img # Adding the images together
    
    avg_img = sum_img / len(images) # Dividing the sum of the images by the number of images to get the average
    return avg_img.astype(np.uint8) # Converting the average image to uint8 data type (0-255) as image pixel should be between 0 to 255

def subtract_images(img1: np.ndarray, img2: np.ndarray) -> np.ndarray:
    if img1.shape != img2.shape:
        img2 = cv2.resize(img2, (img1.shape[1], img1.shape[0]))
    
    diff = cv2.absdiff(img1, img2) # cv2.absdiff() is used to find the absolute difference between two images (all images should be the same size before subtraction to avoid errors)
    return diff

def correct_shading(img: np.ndarray, shading: np.ndarray) -> np.ndarray:
    if img.shape != shading.shape:
        shading = cv2.resize(shading, (img.shape[1], img.shape[0]))
    
    img_f = img.astype(np.float64)
    shading_f = shading.astype(np.float64)

    shading_f[shading_f == 0] = 1.0 # Avoid division by zero

    '''
       f(x, y) = I(x, y) * r(x, y)
       
       removing shading means remove the un-uniform lighting (noise) caused 
       by different intensity distribution in the X-ray tube.

       so the output will be r(x,y) means the reflected light intensity
       
       then we need to add illumination but uniform one so we will smooth the 
       shading image (by using mean that returns single value) and multiply it with the corrected image

       the mean express the illumination of the X-ray tube (low -> dark , high -> bright)
    '''
    # Remove Shading (Noise)
    corrected = img_f / shading_f 
    # Correct Intensity Variations
    corrected *= np.mean(shading_f) # Normalize to original intensity range (Scaling)
    
    return np.clip(corrected, 0, 255).astype(np.uint8) # Clipping to 0-255 range and converting to uint8

def mask_image(img: np.ndarray, mask: np.ndarray) -> np.ndarray:
    if img.shape != mask.shape:
        mask = cv2.resize(mask, (img.shape[1], img.shape[0]))
    
    _, binary_mask = cv2.threshold(mask, 127, 1, cv2.THRESH_BINARY) # cv2.threshold() is used to convert a grayscale image to a binary image
    
    masked = img * binary_mask # Multiplying the image by the binary mask to get the masked image
    return masked.astype(np.uint8)

def normalize_image(img: np.ndarray) -> np.ndarray:
    '''
        After mathematical operations on the image (like shading correction, etc), 
        the image pixels will not be in the range of 0-255 may be greater or smaller or in specific range, 
        so we need to normalize it to 0-255 range to be displayed correctly as an image
        
        Min-Max Normalization: 
         Formula: (x - min) / (max - min) * 255
         
        this is called linear stretching also (Histogram Stretching)

        x - min -> it makes the minimum value 0 (shift the image to start from 0)

        (x - min) / (max - min) -> it makes the maximum value 1 (scale the image to 0-1 range)

        (x - min) / (max - min) * 255 -> it makes the maximum value 255 (scale the image to 0-255 range)
    '''
    img_f = img.astype(np.float64)
    min_val = np.min(img_f)
    max_val = np.max(img_f)
    
    if max_val == min_val: # if max_val equals min_val, it means the image pixels are all the same value, so it's already normalized, and max_val - min_val will be 0
        return img
    
    normalized = (img_f - min_val) * (255.0 / (max_val - min_val)) # Min-Max Normalization to scale the image to 0-255 range
    return normalized.astype(np.uint8)

def add_noise(img: np.ndarray, noise_type: str = "gaussian", amount: float = 0.05, sigma: float = 25) -> np.ndarray:
    '''
        Noise is any unwanted variation in brightness or color that obscures the original image.
        It is usually introduced during image acquisition (e.g., camera sensor noise, poor lighting) or transmission.

        amount: it is the ratio of noise to the image (0 to 1)
        sigma: it is the standard deviation of the noise (for gaussian noise) (if sigma increases the noise increases)

        in our case:
           amount = 0.05  => 5% of the image pixels will be noise
           sigma = 25 => standard deviation of the noise (range of noise) 
        
        Types of Noise:
        1. Gaussian Noise: Random noise that follows a normal distribution (bell curve). (mean = 0, std = sigma)
                           It appears as random fluctuations in brightness.
                           
        2. Salt and Pepper Noise: Random pixels are set to either maximum (white - salt) or minimum (black - pepper) intensity.
                                   It typically occurs due to faulty memory locations or digital transmission errors.

        3. Speckle Noise: Multiplicative noise that appears as random variations in brightness.
                           It is similar to Gaussian noise but it is multiplicative instead of additive.
                           It typically occurs due to random interference during image acquisition.
                           It depends on pixel intensity of original image (the darker the pixel, the more noise it will have)
                           
    '''
    img_f = img.astype(np.float64)
    
    if noise_type == "gaussian":
        gauss = np.random.normal(0, sigma, img.shape) # creates a random noise with the same shape as the image (h,w) and mean = 0 and std = sigma
        noisy = img_f + gauss # adds the noise to the image
        return np.clip(noisy, 0, 255).astype(np.uint8) # clips the noise to 0-255 range and converts to uint8 (0-255)
    
    elif noise_type == "salt_and_pepper":
        noisy = np.copy(img) # creates a copy of the image

        '''
            amount = 0.05 
            image size = 10000
            amount * image size = 0.05 * 10000 = 500
            amount * image size * 0.5 = 500 * 0.5 = 250
            so we have 250 salt pixels and 250 pepper pixels
        '''
        # Salt
        num_salt = np.ceil(amount * img.size * 0.5) # calculates the number of salt pixels
        coords = [np.random.randint(0, i, int(num_salt)) for i in img.shape] # generates random coordinates for salt pixels
        '''
           e.g. if imae is 512 x 512
           shape = (512, 512)
           num_salt = 5
           so np.random.randint(0, i, int(num_salt)) for i in img.shape 
           means:
              first generate random numbers between 0 and 511 for num_salt(5) times (first for rows)
              second generate random numbers between 0 and 511 for num_salt(5) times (then for columns)
              [
                [100, 200, 300, 400, 500]  -> 5 random numbers for rows (row-coordinates)
                [5, 150, 250, 350, 450]  -> 5 random numbers for columns (column-coordinates)
              ]
              which means (100,5), (200,150), (300,250), (400,350), (500,450) are the coordinates of salt pixels
        '''
        noisy[tuple(coords)] = 255 # adds salt pixels to the image
        # Pepper
        num_pepper = np.ceil(amount * img.size * 0.5)
        coords = [np.random.randint(0, i, int(num_pepper)) for i in img.shape]
        noisy[tuple(coords)] = 0
        return noisy
    
    elif noise_type == "speckle":
        gauss = np.random.randn(*img.shape) # creates a random noise with the same shape as the image (h,w) and mean = 0 and std = 1 (default)
        # * : is unpacking operator (img.shape = (512, 512) -> *img.shape = 512, 512)
        noisy = img_f + img_f * gauss * amount # multiplies the noise by the image and adds it to the image
        return np.clip(noisy, 0, 255).astype(np.uint8) # clips the noise to 0-255 range and converts to uint8 (0-255)
    
    return img

def smooth_image(img: np.ndarray, method: str = "gaussian", kernel_size: int = 5) -> np.ndarray: #kernel is the window (mask) size usually odd like 3,5,7 (3x3, 5x5, 7x7)
    # With increasing kernel size, the image becomes smoother but details are lost (Blurrier)
    
    if method == "gaussian":
        return cv2.GaussianBlur(img, (kernel_size, kernel_size), 0)
        # G(x,y) = sum (w(i,j)*f(x+i,y+j))
        '''
            |w(-1,-1) w(0,-1) w(1,-1)|        | 1  2  1 |
            |w(-1, 0) w(0, 0) w(1, 0)|   ->   | 2  4  2 |
            |w(-1, 1) w(0, 1) w(1, 1)|        | 1  2  1 |
            
            f(x, y) is the original image pixel value
            w(i,j) is the kernel weights
            G(x,y) is the output image pixel value

            borderType: 0 -> constant (default = 0) -> fills with 0
                       1 -> replicate       -> replicate the border pixels
                       2 -> reflect         -> reflect the image
                       3 -> wrap            -> wrap the image
                    if kernel goes out of bound it fills with borderType value
        '''
    elif method == "median":
        return cv2.medianBlur(img, kernel_size)
        # it is not a convolution operation, it is a spatial filter that replaces the center pixel value with the median of the pixel values in the kernel window
        # it is used to remove salt and pepper noise
        # it is also used to preserve edges (unlike gaussian filter that blurs the edges)
        '''
            |1 1 1|
            |1 1 1| -> |1 1 1 2 2 2 3 3 3| sorted -> 2
            |1 1 1|
        '''
    elif method == "bilateral":
        return cv2.bilateralFilter(img, 9, 75, 75) # (image, diameter of pixel neighborhood, sigma value for pixel color, sigma value for pixel space)
        # it is a non-linear filter that preserves edges while smoothing the image
        # it is used to remove noise while preserving edges
        '''
            A) Spatial Distance:
                w_s = exp(-d^2 / (2 * sigma_s^2))
                d = Euclidean distance between pixels
                sigma_s (space) = Determine the effect of neighboring pixels
                
            B) Intensity Difference:
                w_r = exp(-|I(i) - I(j)|^2 / (2 * sigma_c^2))
                I(i) and I(j) are the intensity values of the two pixels
                sigma_c (color) = Determine if the color is near or far
            
            The overall weight (W) for a pixel q relative to p is the product of the spatial and range weights:
                W(p, q) = w_s(p, q) * w_r(p, q)
        '''
    return img

def sharpen_image(img: np.ndarray) -> np.ndarray:
    '''
        Unsharp Masking:
            1) Create a smoothed/blurred copy of the original image
            2) Subtract the smoothed copy from the original image (this creates a "mask" of the fine details/edges)
            3) Add the mask back to the original image (scaled by a factor > 1) to enhance the edges
    '''
    gaussian_3 = cv2.GaussianBlur(img, (0, 0), 3) # Copy of the original image (Smoothed)
    '''
        (0, 0) -> kernel size is automatically calculated based on the sigma value (3)
    '''
    unsharp_image = cv2.addWeighted(img, 1.5, gaussian_3, -0.5, 0) # Add the mask back to the original image (scaled by a factor > 1) to enhance the edges
    '''
        Mathematically:
            Original (I) - Blurred (B) = Mask (M)
            Enhanced (E) = Original (I) + k * Mask (M)  ; k is scaling factor
            Enhanced (E) = Original (I) + k * (Original (I) - Blurred (B)) = (1 + k) * Original(I) - k * Blurred(B) ; in our case k = 0.5

            The mask contains only the high-frequency components (edges, noise, fine details).
            Adding it back amplifies these components.
        OpenCV:
            Output = alpha * I + beta * B + gamma
            I: Original Image
            B: Blurred Image
            alpha: Weight of original image
            beta: Weight of blurred image
            gamma: Constant added after scaling (in our case, it's 0)
            
            In our case:
                alpha = 1.5 (boosts original image)
                beta = -0.5 (subtracts 50% of blurred image)
                gamma = 0 (no constant added)
            
            This formula effectively emphasizes edges (where the original differs from blurred)
            while reducing overall brightness (due to the negative beta).
    '''
    return unsharp_image

def enhance_contrast(img: np.ndarray, method: str = "clahe") -> np.ndarray:
    '''
        Contrast: is the difference between the darkest and lightest parts of an image.
        Equalization: redistributes the most common intensity values into the entire
        range so that the intensities can be more evenly distributed.
        CLAHE: Contrast Limited Adaptive Histogram Equalization

        Histogram Equalization: is using cumulative distribution function (CDF) to map the pixel values to a new range. (Globally)
        
        CLAHE: Rather than looking at the whole image, it applies histogram 
        equalization to small regions of the image called tiles. 
        Then it interpolates the results to produce a smooth, artifact-free result. (Locally)
             tileGridSize: The size of the grid (window size) that is used to divide the image into smaller regions. 
                          (height, width) in our case it is (8, 8)
             clipLimit: Threshold for contrast limiting. 
                        It limits the contrast in the local histogram to prevent noise amplification. 
                        If the clipLimit is too high, the contrast will be too high and the image will be too bright.
                        If the clipLimit is too low, the contrast will be too low and the image will be too dark.
                        In our case it is 2.0, so it will limit the contrast to 2 times of the original contrast
    '''
    if method == "equalize":
        return cv2.equalizeHist(img)
    elif method == "clahe":
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        return clahe.apply(img)
    return img

def detect_edges(img: np.ndarray, low_threshold: int = 50, high_threshold: int = 150) -> np.ndarray:
    '''
        Canny Edge Detection: is a multi-stage algorithm that detects a wide range of edges in images. 
                              It uses a combination of filtering, gradient calculation, and hysteresis thresholding to produce accurate edge maps.
                              1) Gaussian Blur: to remove noise
                              2) Gradient Calculation: to find the direction and magnitude of the gradient
                                 Sobel operator is used to find the gradient 
                                 G(x,y) = sqrt((Gx)^2 + (Gy)^2)
                                 
                              3) Non-maximum Suppression: to thin the edges
                              4) Hysteresis Thresholding: to remove weak edges
                                 There are 3 types of edges:
                                    1. Weak edges: edges that are between the low and high threshold (e.g. between 50 -> 150)
                                    2. Strong edges: edges that are above the high threshold (e.g. above 150) -> they are edges for sure
                                    3. Not Edges: edges that are below the low threshold (e.g. below 50) -> they are not edges for sure
                                    
                                 if weak edge is connected to strong edge, it is considered as an edge (hysteresis)
                                 if weak edge is not connected to strong edge, it is considered as not an edge
                            if we increase the low_threshold and high_threshold, the edges and noise will be decreased
                            if we decrease the low_threshold and high_threshold, the edges and noise will be increased
    '''
    return cv2.Canny(img, low_threshold, high_threshold)

def morphological_op(img: np.ndarray, op: str = "dilation", kernel_size: int = 3) -> np.ndarray:
    '''
        Morphological Operations: 
         is a set of non-linear operations that process images based on shapes.
         it uses a kernel (structuring element) to probe the image and modify it based on the kernel's shape and size.
         
         1) Dilation:  thicken or enlarge the white regions in an image.
            e.g. 
             | 0 0 0 |      | 1 1 1 |
             | 0 1 0 |  ->  | 1 1 1 |
             | 0 0 0 |      | 1 1 1 |
             
         2) Erosion:   Shrink or reduce the white regions in an image.
            e.g. 
             | 1 1 1 |      | 0 0 0 | 
             | 1 1 1 |  ->  | 0 1 0 |
             | 1 1 1 |      | 0 0 0 | 
            iterations: is the number of times the operation is applied (if 2 it will do it 2 times)
            
         3) Opening:   Erosion followed by dilation (remove small white regions and noise)
         4) Closing:   Dilation followed by erosion (fill in the black gaps and holes)
    '''
    kernel = np.ones((kernel_size, kernel_size), np.uint8) # Kernel is a matrix of ones with size (kernel_size, kernel_size)
    if op == "dilation":
        return cv2.dilate(img, kernel, iterations=1)
    elif op == "erosion":
        return cv2.erode(img, kernel, iterations=1)
    elif op == "opening":
        return cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)
    elif op == "closing":
        return cv2.morphologyEx(img, cv2.MORPH_CLOSE, kernel)
    return img
 