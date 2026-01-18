from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
import json
from .model import SkincareAdvisor


class SkincareChatbotAPI(APIView):
    def __init__(self):
        super().__init__()
        self.bot = SkincareAdvisor()

    def post(self, request):
        user_message = request.data.get('message', '').strip()

        if not user_message:
            return Response({"answer": "⚠️ Please enter a valid message."}, status=400)

        # --------------------------
        # Try Gemini Response First
        # --------------------------
        prompt = (
            "You are an intelligent skincare assistant. "
            "Provide responses in simple and helpful language. "
            "Focus on skin types, skin concerns, routines, products and dermatology facts. "
            "If the question is related to melanoma or cancer, provide a serious educational answer. "
            "If the message is not skincare-related, politely redirect the user.\n\n"
            f"User message: {user_message}"
        )

        data = {
            "contents": [
                {"parts": [{"text": prompt}]}
            ]
        }

        url = (
            "https://generativelanguage.googleapis.com/v1beta/models/"
            "gemini-2.0-flash:generateContent"
            "?key=AIzaSyBWSwBzxgd0FpXT7XdC6wjIK3s1_8-ZbRQ"
        )

        try:
            response = requests.post(url, headers={"Content-Type": "application/json"}, json=data)

            if response.status_code == 200:
                content = response.json()
                ai_reply = content["candidates"][0]["content"]["parts"][0]["text"]

                # If AI refuses or generic output, use fallback static advisor
                if "not related" in ai_reply.lower() or len(ai_reply.strip()) < 5:
                    static = self.bot.process_message(user_message)
                    return Response({"answer": ai_reply, "extra": static})

                return Response({"answer": ai_reply})
        except:
            pass  # fallback to static model

        # --------------------------
        # Static processing fallback
        # --------------------------
        fallback_response = self.bot.process_message(user_message)
        return Response({"answer": "\n".join(fallback_response["advice"])})

