from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import uvicorn
from typing import List
from model_utils import get_classifier
import image_processing as dip

app = FastAPI(title="X-ray Image Processing & Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # anyone can access the API, should be restricted in production(e.g., ["http://localhost:3000", "http://[IP_ADDRESS]", "https://your-production-site.com"])
    allow_credentials=True, # allow cookies and auth headers to be sent
    allow_methods=["*"], # allow any HTTP method (POST, GET, etc.)
    allow_headers=["*"], # allow any headers (Content-Type, Authorization, etc.)
)

@app.get("/")
async def root():
    return {"message": "X-ray Image Processing API is running"}

@app.post("/predict")
async def predict_gender(file: UploadFile = File(...)): # The '...' means the file is required in the request, File() is a function that returns a File object which is a subclass of UploadFile
    if not file.content_type.startswith("image/"): # file.content_type returns the MIME type of the file, e.g., "image/jpeg", startswith() checks if the MIME type starts with "image/"
        raise HTTPException(status_code=400, detail="File uploaded is not an image.") # 400 = Bad Request, 500 = Internal Server Error, 404 = Not Found, 200 = OK, etc.
    
    try:
        image_bytes = await file.read() # file.read() reads the content of the file
        
        classifier = get_classifier() # get_classifier() returns the classifier object, if it's already loaded then return it, else load it first and then return it
        prediction = classifier.predict(image_bytes) # predict() returns the prediction, it's a dictionary with keys "gender" and "confidence"
        
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.post("/process/average")
async def average_images(files: List[UploadFile] = File(...)):
    if not files:
        raise HTTPException(status_code=400, detail="No files uploaded.")
    
    try:
        images = []
        for file in files:
            content = await file.read()
            images.append(dip.bytes_to_numpy(content))
        
        result = dip.average_images(images)
        return StreamingResponse(dip.numpy_to_bytes(result), media_type="image/png")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Averaging failed: {str(e)}")

@app.post("/process/subtract")
async def subtract_images(img1: UploadFile = File(...), img2: UploadFile = File(...)):
    try:
        content1 = await img1.read()
        content2 = await img2.read()
        
        arr1 = dip.bytes_to_numpy(content1)
        arr2 = dip.bytes_to_numpy(content2)
        
        result = dip.subtract_images(arr1, arr2)
        return StreamingResponse(dip.numpy_to_bytes(result), media_type="image/png")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Subtraction failed: {str(e)}")

@app.post("/process/shading-correction")
async def shading_correction(original: UploadFile = File(...), shading: UploadFile = File(...)):
    try:
        content_orig = await original.read()
        content_shad = await shading.read()
        
        arr_orig = dip.bytes_to_numpy(content_orig)
        arr_shad = dip.bytes_to_numpy(content_shad)
        
        result = dip.correct_shading(arr_orig, arr_shad)
        return StreamingResponse(dip.numpy_to_bytes(result), media_type="image/png")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Shading correction failed: {str(e)}")

@app.post("/process/mask")
async def mask_image(original: UploadFile = File(...), mask: UploadFile = File(...)):
    try:
        content_orig = await original.read()
        content_mask = await mask.read()
        
        arr_orig = dip.bytes_to_numpy(content_orig)
        arr_mask = dip.bytes_to_numpy(content_mask)
        
        result = dip.mask_image(arr_orig, arr_mask)
        return StreamingResponse(dip.numpy_to_bytes(result), media_type="image/png")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Masking failed: {str(e)}")

@app.post("/process/normalize")
async def normalize_image(file: UploadFile = File(...)):
    try:
        content = await file.read()
        arr = dip.bytes_to_numpy(content)
        
        result = dip.normalize_image(arr)
        return StreamingResponse(dip.numpy_to_bytes(result), media_type="image/png")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Normalization failed: {str(e)}")

@app.post("/process/add-noise")
async def add_noise(file: UploadFile = File(...), noise_type: str = "gaussian", amount: float = 0.05, sigma: float = 25):
    try:
        content = await file.read()
        arr = dip.bytes_to_numpy(content)
        result = dip.add_noise(arr, noise_type, amount, sigma)
        return StreamingResponse(dip.numpy_to_bytes(result), media_type="image/png")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Noise addition failed: {str(e)}")

@app.post("/process/smooth")
async def smooth_image(file: UploadFile = File(...), method: str = "gaussian", kernel_size: int = 5):
    try:
        content = await file.read()
        arr = dip.bytes_to_numpy(content)
        result = dip.smooth_image(arr, method, kernel_size)
        return StreamingResponse(dip.numpy_to_bytes(result), media_type="image/png")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Smoothing failed: {str(e)}")

@app.post("/process/sharpen")
async def sharpen_image(file: UploadFile = File(...)):
    try:
        content = await file.read()
        arr = dip.bytes_to_numpy(content)
        result = dip.sharpen_image(arr)
        return StreamingResponse(dip.numpy_to_bytes(result), media_type="image/png")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Sharpening failed: {str(e)}")

@app.post("/process/enhance-contrast")
async def enhance_contrast(file: UploadFile = File(...), method: str = "clahe"):
    try:
        content = await file.read()
        arr = dip.bytes_to_numpy(content)
        result = dip.enhance_contrast(arr, method)
        return StreamingResponse(dip.numpy_to_bytes(result), media_type="image/png")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Contrast enhancement failed: {str(e)}")

@app.post("/process/detect-edges")
async def detect_edges(file: UploadFile = File(...), low: int = 50, high: int = 150):
    try:
        content = await file.read()
        arr = dip.bytes_to_numpy(content)
        result = dip.detect_edges(arr, low, high)
        return StreamingResponse(dip.numpy_to_bytes(result), media_type="image/png")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Edge detection failed: {str(e)}")

@app.post("/process/morphology")
async def morphological_op(file: UploadFile = File(...), op: str = "dilation", kernel_size: int = 3):
    try:
        content = await file.read()
        arr = dip.bytes_to_numpy(content)
        result = dip.morphological_op(arr, op, kernel_size)
        return StreamingResponse(dip.numpy_to_bytes(result), media_type="image/png")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Morphological operation failed: {str(e)}")



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
