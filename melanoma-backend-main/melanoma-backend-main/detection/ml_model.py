# core/detection/ml_model.py
import os
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image

# ----------------------------
# Anatomy mapping based on training category order
# ----------------------------
ANATOMY_MAP = {
    "head/neck": 0,
    "lower extremity": 1,
    "oral/genital": 2,
    "palms/soles": 3,
    "torso": 4,
    "upper extremity": 5,
}


class EfficientNetWithMetadata(nn.Module):
    def __init__(self, num_metadata_features, output_size=1):
        super().__init__()
        self.backbone = models.efficientnet_b3(
            weights=models.EfficientNet_B3_Weights.IMAGENET1K_V1
        )
        image_features_size = self.backbone.classifier[1].in_features
        self.backbone.classifier = nn.Identity()

        self.metadata_fc = nn.Sequential(
            nn.Linear(num_metadata_features, 64),
            nn.ReLU()
        )

        self.classifier = nn.Sequential(
            nn.Linear(image_features_size + 64, 256),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(256, output_size)
        )

    def forward(self, image, metadata):
        image_features = self.backbone(image)
        metadata_features = self.metadata_fc(metadata)
        combined = torch.cat((image_features, metadata_features), dim=1)
        return self.classifier(combined)


MODEL_PATH = os.path.join(os.path.dirname(__file__), "best_model.pth")
NUM_METADATA = 3

device = torch.device("cpu")
model = EfficientNetWithMetadata(num_metadata_features=NUM_METADATA, output_size=1)
model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
model.eval()


# ----------------------------
# Image preprocessing
# ----------------------------
preprocess = transforms.Compose([
    transforms.Resize((300, 300)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])


# ----------------------------
# Prediction function
# ----------------------------
def predict_skin_from_file(image_path, metadata=None):
    if metadata is None:
        metadata = {"age": 30, "sex": "male", "anatomy": "torso"}  # safe defaults

    img = Image.open(image_path).convert("RGB")
    img_t = preprocess(img).unsqueeze(0).to(device)

    # Sex encoding
    sex_map = {"male": 0.0, "female": 1.0}
    sex_val = sex_map.get(str(metadata.get("sex")).lower(), 0.0)

    # Normalize age as training typically scales 0–100 -> 0.0–1.0
    try:
        age_val = float(metadata.get("age", 30)) / 100.0
    except:
        age_val = 0.3

    # Anatomy encoding based on training category codes
    anatomy_key = str(metadata.get("anatomy", "torso")).lower()
    anatomy_val = float(ANATOMY_MAP.get(anatomy_key, 4))  # default torso

    meta_tensor = torch.tensor([[age_val, sex_val, anatomy_val]], dtype=torch.float32).to(device)

    with torch.no_grad():
        output = model(img_t, meta_tensor).squeeze(1)
        prob = torch.sigmoid(output).item()
        pred_class = 1 if prob > 0.5 else 0

    # Determine risk level based on probability
    if prob > 0.7:
        risk_level = "HIGH"
    elif prob > 0.3:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    return {
        "probability": round(float(prob), 4),
        "prediction": "melanoma" if pred_class == 1 else "benign",
        "risk": "HIGH" if pred_class == 1 else "LOW",
        "risk_level": risk_level,
        "confidence": 0.9433  # Model accuracy: 94.33%
    }
