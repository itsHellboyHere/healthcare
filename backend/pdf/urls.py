from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView


from django.urls import path
from .views import (DocumentListCreateView, DocumentDownloadView, 
                    DocumentDeleteView)

urlpatterns = [
    path('', DocumentListCreateView.as_view()),
    path('<int:pk>/download/', DocumentDownloadView.as_view()),
    path('<int:pk>/delete/', DocumentDeleteView.as_view()),
]
