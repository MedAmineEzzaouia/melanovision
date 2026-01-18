from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .ml_model import predict_skin_from_file

class SkinPredictionAPI(APIView):
    def post(self, request):
        if 'image' not in request.FILES:
            return Response({"error": "Please send an image file"}, status=status.HTTP_400_BAD_REQUEST)

        image_file = request.FILES['image']

        try:
            result = predict_skin_from_file(image_file)
            return Response(result)
        except Exception as e:
            return Response({"error": f"Error processing image: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request):
        # Show API information
        info = {
            "message": "🩺 Melanoma Detection API",
            "usage": "POST an image file to check for melanoma",
            "supported_formats": ["JPEG", "JPG", "PNG"],
            "note": "Currently using simulated AI - will connect real model later"
        }
        return Response(info)
