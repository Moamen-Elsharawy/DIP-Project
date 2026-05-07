Build a modern, professional, production-ready frontend web application inspired by the design language, layout structure, card system, spacing, interactions, and user experience of iLoveIMG (especially its Arabic version), but do NOT copy branding, icons, text, colors exactly, or assets. Create an original SaaS product for medical X-ray image processing and AI analysis.

Tech Stack:
- React.js
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React Router
- i18next + react-i18next for localization
- Axios for API calls

Core Requirements:

1. Localization (i18n)
Implement full multilingual support:
- English (LTR)
- Arabic (RTL)

Requirements:
- Use i18next with JSON translation files
- Dynamic language switcher in navbar
- Automatically switch direction (dir="rtl" / dir="ltr")
- Translate all UI text
- Persist selected language in localStorage

2. Theme System
Implement:
- Light mode
- Dark mode

Requirements:
- Theme toggle in navbar
- Persist theme in localStorage
- Smooth animated theme transitions

3. Responsive Design
Must support:
- Desktop
- Tablet
- Mobile

Design Style:
The website should feel similar to iLoveIMG:
- Clean SaaS layout
- Large hero section
- Tool cards with icons
- Rounded corners
- Soft shadows
- Excellent whitespace
- Smooth animations
- Premium product feel
- Medical + AI branding style

Brand Name:
X-Ray Vision AI

Tagline:
Advanced Digital Image Processing for Medical X-rays

Pages Structure:

1. Home Page
Include:
- Navbar with logo, language switcher, theme toggle
- Hero section
- Drag & drop upload section
- Tools grid
- Feature highlights
- Workflow section
- FAQ section
- Footer

2. Tools Page
Display all image processing tools as cards like iLoveIMG.

Each tool opens its own processing page.

API Base URL:
http://localhost:8000

Use multipart/form-data.

Implement reusable API service architecture.

Supported Tools:

AI Prediction:
POST /predict

Input:
- file

Output:
- gender
- confidence
- class_index

UI:
- Upload area
- Image preview
- Animated confidence meter
- Result card

Multi-Image Processing:

1. Average Images
POST /process/average

Input:
- files[]

2. Image Subtraction
POST /process/subtract

Input:
- img1
- img2

3. Shading Correction
POST /process/shading-correction

Input:
- original
- shading

4. Masking
POST /process/mask

Input:
- original
- mask

Single Image Processing:

1. Normalize
POST /process/normalize

2. Add Noise
POST /process/add-noise

Controls:
- noise_type dropdown
- amount slider
- sigma slider

3. Smooth
POST /process/smooth

Controls:
- method dropdown
- kernel slider

4. Sharpen
POST /process/sharpen

5. Enhance Contrast
POST /process/enhance-contrast

Controls:
- method dropdown

6. Edge Detection
POST /process/detect-edges

Controls:
- low threshold slider
- high threshold slider

7. Morphology
POST /process/morphology

Controls:
- operation dropdown
- kernel slider

UX Features:
Add:
- Drag and drop upload
- File previews
- Loading animations
- Skeleton loaders
- Toast notifications
- Error handling
- Download processed image
- Before/After image comparison
- Zoom controls
- Reset button
- Processing history

Code Quality:
Generate:
- Clean scalable folder structure
- Reusable components
- Reusable hooks
- Type-safe interfaces
- API abstraction layer
- Accessibility support

The final product should feel like a premium SaaS platform similar to iLoveIMG but specialized for medical X-ray AI and digital image processing.