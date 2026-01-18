from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def home(request):
    return JsonResponse({
        'message': '🩺 MelanoVision Backend API',
        'version': '1.0',
        'status': 'Running',
        'endpoints': {
            'detection': '/api/detection/predict/ (GET for info, POST with image)',
            'dermatologist': '/api/dermatologist/chat/ (POST with message)',
            'skincare': '/api/skincare/chat/ (POST with message)',
            'admin': '/admin/'
        }
    })

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('api/detection/', include('detection.urls')),
    path('api/dermatologist/', include('dermatologist_bot.urls')),
    path('api/skincare/', include('skincare_bot.urls')),
]