import torch
import torch.nn as nn
from torchvision import transforms
from PIL import Image
import timm
import os
import io

class XrayGenderClassifier:
    def __init__(self, model_path=None):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        
        if model_path is None:
            # Construct path relative to this file: ../models/XrayGenderPrediction.pth
            current_dir = os.path.dirname(os.path.abspath(__file__))
            model_path = os.path.join(current_dir, '..', 'models', 'XrayGenderPrediction.pth')
            
        self.model = self._load_model(model_path)
        self.transform = transforms.Compose([
            transforms.Resize((384, 384)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
        ])
        self.classes = {0: "Male", 1: "Female"}

    def _load_model(self, model_path):
        model = timm.create_model('efficientnet_b4', pretrained=False, num_classes=2)
        
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model weights not found at {model_path}")
            
        state_dict = torch.load(model_path, map_location=self.device)
        model.load_state_dict(state_dict)
        model.to(self.device)
        model.eval()
        return model

    def predict(self, image_bytes):
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        input_tensor = self.transform(image).unsqueeze(0).to(self.device)
        
        with torch.no_grad():
            output = self.model(input_tensor)
            probabilities = torch.softmax(output, dim=1)
            confidence, predicted_idx = torch.max(probabilities, 1)
            
        class_idx = predicted_idx.item()
        return {
            "gender": self.classes[class_idx],
            "confidence": round(confidence.item(), 4),
            "class_index": class_idx
        }

classifier = None

def get_classifier():
    global classifier
    if classifier is None:
        classifier = XrayGenderClassifier()
    return classifier
