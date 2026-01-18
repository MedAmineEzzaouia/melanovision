# MelanoVision - AI-Powered Melanoma Detection Platform

<div align="center">
  <h3>🔬 Early Detection Saves Lives</h3>
  <p>Advanced AI technology for melanoma detection with instant analysis and expert guidance</p>
</div>

## 🌟 Features

- **🤖 AI-Powered Analysis**: Deep learning model for melanoma detection
- **⚡ Instant Results**: Get analysis in less than 30 seconds
- **🏥 Find Specialists**: Connect with certified dermatologists in Tunis
- **💬 Skincare Advisor**: AI chatbot for personalized skincare recommendations
- **📊 Detailed Reports**: Comprehensive analysis with risk assessment
- **🔒 Secure & Private**: Your data is protected and confidential

## 🏗️ Project Structure

```
Melanoma_SIC/
├── melano-vision-app-build/    # Next.js Frontend
│   ├── app/                     # App routes and pages
│   ├── components/              # Reusable UI components
│   ├── lib/                     # Utilities and configs
│   └── public/                  # Static assets
│
└── melanoma-backend-main/       # Django Backend
    ├── core/                    # Django project settings
    ├── detection/               # ML model for melanoma detection
    ├── dermatologist_bot/       # Dermatologist finder chatbot
    └── skincare_bot/            # Skincare advisor chatbot
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Python 3.8+
- Git

### Frontend Setup

```bash
cd melano-vision-app-build

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

```bash
cd melanoma-backend-main/melanoma-backend-main

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
.\venv\Scripts\Activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start Django server
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

## 📱 Features Overview

### 1. Skin Analysis
Upload a clear image of the skin area and get instant AI-powered analysis:
- Melanoma detection
- Risk assessment
- Detailed ABCD scoring
- Confidence levels

### 2. Dermatologist Finder
Connect with certified dermatologists in Tunis:
- AI-powered search
- Specialty-based filtering
- Contact information
- Location details

### 3. Skincare Advisor
Get personalized skincare recommendations:
- Skin type analysis
- Product recommendations
- Daily routines
- Sun protection tips

## 🔒 Security & Privacy

- All data is encrypted in transit
- Images are processed securely
- No personal data is stored without consent
- HIPAA-compliant practices

## 📄 License

This project is for educational and research purposes.

## ⚠️ Medical Disclaimer

MelanoVision is an AI-powered screening tool and should not replace professional medical advice. Always consult with a certified dermatologist for proper diagnosis and treatment.

## 👥 Contact

For questions or support, please open an issue on GitHub.

---

<div align="center">
  <p>Built with ❤️ for early melanoma detection</p>
  <p>© 2025 MelanoVision. Early detection saves lives.</p>
</div>
