from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .model import DermatologistLocator

class DermatologistChatbotAPI(APIView):
    def __init__(self):
        super().__init__()
        self.bot = DermatologistLocator()
    
    def post(self, request):
        user_message = request.data.get("message", "").strip()
        
        if not user_message:
            return Response({"error": "Message is required"}, status=400)
        
        result = self.bot.process_message(user_message)

        # If result is a list of dermatologists
        if isinstance(result, list):
            return Response({
                "type": "results",
                "message": f"Voici {len(result)} dermatologues spécialisés à Tunis :",
                "dermatologists": result
            })

        # If response is general suggestion
        return Response({
            "type": "info",
            **result
        })
