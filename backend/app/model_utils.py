import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image
import timm
import os
import io

class XrayGenderClassifier:
    def __init__(self, model_path=None):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu') # cuda is for GPU, cpu is for CPU, torch.cuda.is_available() checks if GPU is available
        # pytorch deals with system drivers 
        # 'cuda' is for Nividia 
        if model_path is None:
            # Construct path relative to this file: ../models/XrayGenderPrediction.pth
            current_dir = os.path.dirname(os.path.abspath(__file__)) # Returns the absolute path of the directory containing this file
            model_path = os.path.join(current_dir, '..', 'models', 'XrayGenderPrediction.pth') # os.path.join() joins the path
            
        self.model = self._load_model(model_path) # Loads the model
        '''
           I(2 x 2) = 
           |(255, 0, 0) (0, 255, 0)|      = 2x2 matrix of R G B values
           |(0, 0, 255) (255, 255, 255)|

           -> Resize to (384, 384) matrix using interpolation (nearest-neighbor , bilinear: 4-neighbor pixels weights, bicubic: 16-neighbor pixels weights) and antialiasing: smooth transitions between pixels before shrinking to smaller size
           e.g. image 4x4 -> 2x2, pixel(0,0) = avg of 4 pixels
           |10 20 30 40|           
           |50 60 70 80|        -> |35 55|
           |90 100 110 120|        |115 135|
           |130 140 150 160|       

           -> ToTensor() = Convert from drawing coords (H, W, C) to matrix coords (C, H, W) and scale from 0 to 255 to 0 to 1
           Color channel C: R G B
           
           e.g. pixel RGB = (255, 128, 0)-> (1, 0.502, 0)

           -> Normalize: Centered the data around 0 from [0, 1] to [-1, 1] using formula: (pixel_value - mean) / std
           
           
        '''
        self.transform = transforms.Compose([ # compose means do group of transforms one after another 
            transforms.Resize((384, 384)), # Resize the image to 384x384, tuple means (height, width)
            transforms.ToTensor(), # Convert the reized image to a tensor from 0 to 255 to 0 to 1, changes dimensions from (h, w, c) to (c: color, h, w). Convert from drawing coords to matrix coords
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]) # Normalize the tensor image, subtract mean from current pixel value and divide by std (standard deviation) to make it -1 to 1
            # We have 3 channels for R, G, B, that's why we have 3 values for mean and std
        ])
        self.classes = {0: "Male", 1: "Female"}

    def _load_model(self, model_path):
        model = timm.create_model('efficientnet_b4', pretrained=False, num_classes=2) # Create model, efficientnet_b4 is a type of neural network, pretrained=False means we are not using pre-trained weights, num_classes=2 means we have 2 classes (Male or Female)
        
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model weights not found at {model_path}")
            
        state_dict = torch.load(model_path, map_location=self.device) # if model was trained on GPU, it will be loaded on GPU, map_location=self.device will load it on CPU or GPU depending on the device
        model.load_state_dict(state_dict) # load the weights (weights = values that the model learns during training)
        model.to(self.device) # move model to device
        model.eval() # set model to evaluation mode (the model won't learn anymore, weights will be frozen)
        return model

    def predict(self, image_bytes):
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB') # Open image from bytes and convert to RGB(3 channels) in RAM
        # Convert('RGB') is used to convert image to RGB format (3 channels: Red, Green, Blue)
        # If the image is in grayscale format (1 channel), it will be converted to RGB format
        # e.g. (384x384x1) -> (384x384x3)
        input_tensor = self.transform(image).unsqueeze(0).to(self.device)
        # unsqueeze(0) adds a dimension to the tensor in the first position (0) (makes it 4D: (batch_size, channels, height, width))
        # e.g. if I have one image (384x384x3) -> (1x3x384x384), if I have three images (384x384x3) -> (3x3x384x384)
        # .to(self.device) moves the tensor to the device (GPU or CPU)
        
        with torch.no_grad(): # Disables gradient calculation, reduces memory usage and speeds up computation
            # Gradient calculation is used during training to update weights, not needed for prediction
            output = self.model(input_tensor) # Pass input tensor through model
            # Output is raw values (logits) e.g. [2.7, 1.1]
            probabilities = torch.softmax(output, dim=1) # Softmax converts raw output to probabilities
            # dim(dimension) is Axis in data (rows, columns) e.g. [1,2,3] -> dim 0 , [[1,2],[3,4]] -> dim 0 are rows, dim 1 are columns
            # dim = 0 means sum of probabilities across the first dimension (rows) (for batch number of images)
            # dim = 1 means sum of probabilities across the second dimension (columns) (for number of classes)
            # e.g. if output is (1x2) (Batch size x num classes) and we have 2 classes so it will sum probabilities across the second dimension (columns)
            # softmax(x_i) = e^x_i / sum(e^x_j for all j)
            # e.g. [0.75, 0.25] => Male: 0.75, Female: 0.25 (0.75+0.25=1)
            '''
               [ [2.5 1.2]
                 [0.8 3.1] ]
                 is 2x2 matrix, 2 rows, 2 columns
                 dim = 0 => will calculate sum of Males across the rows (dim 0) and sum of Females across the rows (dim 0) e.g. [2.5+0.8, 1.2+3.1] = [3.3, 4.3]
                 dim = 1 => will calculate for each image (row) Male probability and Female probability e.g. [[2.5, 1.2], [0.8, 3.1]] => for first imageMale:2.5 Female:1.2 for second image Male:0.8 Female:3.1
            '''
            confidence, predicted_idx = torch.max(probabilities, dim=1) # Get the index of the highest probability
            # e.g. (0.75, 0) => confidence: 0.75, predicted_idx: 0 (male)
        class_idx = predicted_idx.item() # Convert tensor to python scalar (single value)
        # item() is used to extract the value from a tensor to a python scalar 
        # tensor([0]) -> 0
        # confidence.item() -> 0.75
        
        return {
            "gender": self.classes[class_idx], # Get the class name from the class index
            "confidence": round(confidence.item(), 4), # Round the confidence to 4 decimal places
            "class_index": class_idx # Get the class index
        }

classifier = None

def get_classifier():
    global classifier
    if classifier is None:
        classifier = XrayGenderClassifier()
    return classifier
