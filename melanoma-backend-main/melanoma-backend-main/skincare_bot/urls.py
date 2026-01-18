# skincare_bot/urls.py
from django.urls import path
from .views import SkincareChatbotAPI

urlpatterns = [
    path("chat/", SkincareChatbotAPI.as_view(), name="skincare_chat"),
]
