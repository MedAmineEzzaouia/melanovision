from django.urls import path
from .views import DermatologistChatbotAPI

urlpatterns = [
    path('chat/', DermatologistChatbotAPI.as_view(), name='dermatologist_chat'),
]