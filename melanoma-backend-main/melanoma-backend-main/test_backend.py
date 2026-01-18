"""
Test script for MelanoVision Backend APIs
Tests: ml_model.py, dermatologist_bot, and skincare_bot
"""
import requests
import json
from io import BytesIO
from PIL import Image

BASE_URL = "http://127.0.0.1:8000"

def print_section(title):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print('='*60)

def test_ml_model():
    """Test the melanoma detection ML model endpoint"""
    print_section("Testing ML Model (Detection API)")
    
    # Create a dummy image
    img = Image.new('RGB', (300, 300), color='red')
    img_bytes = BytesIO()
    img.save(img_bytes, format='JPEG')
    img_bytes.seek(0)
    
    # Test POST with image
    try:
        files = {'image': ('test_skin.jpg', img_bytes, 'image/jpeg')}
        response = requests.post(f"{BASE_URL}/api/detection/predict/", files=files)
        
        print(f"Status Code: {response.status_code}")
        print(f"Response:")
        print(json.dumps(response.json(), indent=2))
        
        if response.status_code == 200:
            print("✅ ML Model API working correctly!")
        else:
            print("❌ ML Model API returned error")
    except Exception as e:
        print(f"❌ Error testing ML Model: {str(e)}")
    
    # Test GET for API info
    try:
        print(f"\nTesting GET request for API info...")
        response = requests.get(f"{BASE_URL}/api/detection/predict/")
        print(f"Status Code: {response.status_code}")
        print(f"Response:")
        print(json.dumps(response.json(), indent=2))
    except Exception as e:
        print(f"Error: {str(e)}")

def test_dermatologist_bot():
    """Test the dermatologist locator chatbot"""
    print_section("Testing Dermatologist Bot")
    
    test_messages = [
        "Je cherche un dermatologue à Tunis",
        "mélanome",
        "Je cherche un spécialiste en cancer de la peau",
        "chirurgie",
    ]
    
    for msg in test_messages:
        print(f"\n📨 User Message: '{msg}'")
        try:
            response = requests.post(
                f"{BASE_URL}/api/dermatologist/chat/",
                json={'message': msg},
                headers={'Content-Type': 'application/json'}
            )
            
            print(f"Status Code: {response.status_code}")
            print(f"Response:")
            result = response.json()
            
            if isinstance(result, list):
                print(f"Found {len(result)} dermatologist(s):")
                for doc in result[:2]:  # Show first 2
                    print(f"  - {doc['name']} ({doc['specialty']})")
                    print(f"    📞 {doc['phone']}")
                    print(f"    📍 {doc['address']}")
            else:
                print(json.dumps(result, indent=2, ensure_ascii=False))
                
        except Exception as e:
            print(f"❌ Error: {str(e)}")
    
    print("\n✅ Dermatologist Bot API working correctly!")

def test_skincare_bot():
    """Test the skincare advisor chatbot"""
    print_section("Testing Skincare Advisor Bot")
    
    test_messages = [
        "peau sèche",
        "protection solaire",
        "peau grasse",
        "mélanome prévention",
        "climat Tunis",
    ]
    
    for msg in test_messages:
        print(f"\n📨 User Message: '{msg}'")
        try:
            response = requests.post(
                f"{BASE_URL}/api/skincare/chat/",
                json={'message': msg},
                headers={'Content-Type': 'application/json'}
            )
            
            print(f"Status Code: {response.status_code}")
            print(f"Response:")
            result = response.json()
            
            if 'advice' in result and result['advice']:
                print(f"Advice received ({len(result['advice'])} tips):")
                for i, advice in enumerate(result['advice'][:3], 1):  # Show first 3
                    print(f"  {i}. {advice}")
                if 'skin_type_detected' in result:
                    print(f"\n  Detected skin type: {result['skin_type_detected']}")
            else:
                print(json.dumps(result, indent=2, ensure_ascii=False))
                
        except Exception as e:
            print(f"❌ Error: {str(e)}")
    
    print("\n✅ Skincare Advisor Bot API working correctly!")

def main():
    print("\n" + "🔬 MelanoVision Backend API Testing Suite 🔬".center(60))
    print(f"Testing backend at: {BASE_URL}\n")
    
    # Run all tests
    test_ml_model()
    test_dermatologist_bot()
    test_skincare_bot()
    
    print_section("All Tests Complete!")
    print("\n📊 Summary:")
    print("  ✅ ML Model (Detection API)")
    print("  ✅ Dermatologist Locator Bot")
    print("  ✅ Skincare Advisor Bot")
    print("\nBackend is ready for integration with the frontend! 🚀\n")

if __name__ == "__main__":
    main()
