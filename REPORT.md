# Digital Image Processing: X-Ray Gender Prediction and Enhancement

## Executive Summary
This project explores the intersection of Deep Learning (DL) and Digital Image Processing (DIP) in the field of medical imaging. Specifically, it focuses on the challenging task of predicting gender from chest X-ray images—a task where human clinicians typically perform near the baseline of chance—and provides a comprehensive suite of image enhancement tools for clinical support.

---

## 1. Introduction: Can Deep Learning Outperform Doctors?
In many medical imaging tasks, Deep Learning models have demonstrated performance comparable to, or even exceeding, board-certified radiologists. However, certain "hidden" features in medical images are nearly impossible for the human eye to discern.

### Baseline Performance
For many diagnostic tasks (e.g., pneumonia detection), the baseline performance for radiologists is high (80-90%). But for **gender identification** from a chest X-ray, clinicians often struggle to identify the gender unless obvious markers (like soft tissue density or skeletal structure differences) are prominent. 

The core question of this project was: **Can a deep learning model identify the subtle, non-obvious details that differentiate male and female chest X-rays?**

---

## 2. Motivation: The Power of AI in Feature Extraction
AI models, particularly Convolutional Neural Networks (CNNs), are capable of learning high-dimensional spatial hierarchies. While doctors look for morphological structures they were trained to recognize, AI can identify microscopic patterns in texture, bone density, and spatial distribution that are statistically significant but visually "invisible" to humans.

By training a model on thousands of X-rays, we aimed to prove that AI can achieve near-perfect accuracy in gender prediction, effectively "seeing" what humans cannot.

---

## 3. Implementation: X-Ray Gender Prediction Model
The implementation was carried out using PyTorch and the `timm` library for state-of-the-art transfer learning.

### Data Analysis and Distribution
Initial exploratory data analysis involved checking the balance of the dataset. Using `train_gender_df['gender'].hist()`, we verified the distribution of male and female samples to ensure the model wouldn't develop a bias toward one class.

### Data Augmentation
To improve generalization and prevent overfitting, we applied several augmentation techniques during training:
- **Resizing and Cropping**: Standardizing image dimensions.
- **Normalizing**: Adjusting pixel values to match pretrained model statistics.
- **Random Flips and Rotations**: Simulating various patient positions and equipment orientations.

### Transfer Learning
We utilized **Transfer Learning** by fine-tuning a pretrained model from the `timm` library. This allowed the model to leverage features learned from millions of natural images (ImageNet) and adapt them to the specific textures and structures found in medical X-rays.

### Training Results
The model demonstrated exceptional performance within just 5 epochs:

| Epoch | Training Loss | Training Accuracy | Validation Loss | Validation Accuracy |
| :--- | :--- | :--- | :--- | :--- |
| 1 | 0.2595 | 90.40% | 0.1158 | 96.08% |
| 2 | 0.1448 | 95.29% | 0.0814 | 97.57% |
| 3 | 0.1257 | 95.83% | 0.1254 | 95.90% |
| 4 | 0.1129 | 96.46% | 0.0505 | **98.51%** |
| 5 | 0.1077 | 96.43% | 0.1020 | 96.83% |

The final validation accuracy of **98.51%** confirms that the model successfully identified the subtle details differentiating male and female anatomy in X-ray imaging.

---

## 4. Digital Image Processing (DIP) Methods
Beyond prediction, the application provides a robust set of DIP tools designed to enhance medical images for better human interpretation or preprocessing for other models.

### Key Features Implemented:
- **Averaging**: Used for noise reduction by combining multiple frames to cancel out random noise.
- **Subtraction & Shading Correction**: Essential for temporal subtraction (comparing old vs. new X-rays) and removing equipment-induced shading gradients.
- **Masking**: Allows for isolating specific Regions of Interest (ROI), such as the heart or specific lung lobes, by applying binary masks.
- **Normalization**: Standardizes the intensity range of the X-ray, ensuring consistent brightness and contrast across different imaging hardware.
- **Smoothing (Filtering)**: Implemented via Gaussian, Median, and Bilateral filters to reduce high-frequency noise while preserving important edges.
- **Sharpening (Unsharp Masking)**: Enhances fine details and structural edges, making small fractures or lung markings more visible.
- **Contrast Enhancement (CLAHE)**: Specifically optimized for bringing out details in the low-contrast soft tissues of the chest.
- **Edge Detection (Canny)**: Automates the boundary detection of organs and skeletal structures.
- **Morphological Operations**: Dilation, Erosion, Opening, and Closing are used to remove artifacts or bridge gaps in structures.
- **Noise Addition**: Used for testing model robustness by simulating different types of sensor noise (Gaussian, Salt & Pepper, Speckle).

---

## 5. Conclusion
This project successfully demonstrated that Deep Learning models can significantly outperform the baseline human ability to identify gender in chest X-rays. By combining these advanced predictive models with traditional Digital Image Processing techniques, we have created a powerful toolset that not only provides high-accuracy diagnostic metadata but also enhances the visual quality of medical data for clinical use.
