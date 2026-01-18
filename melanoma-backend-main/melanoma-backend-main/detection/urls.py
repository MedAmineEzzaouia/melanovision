from django.urls import path
from .views import SkinPredictionAPI

urlpatterns = [
    path('predict/', SkinPredictionAPI.as_view(), name='skin_prediction'),
]