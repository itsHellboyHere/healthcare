from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings
User = get_user_model()

class MedicalDocument(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    file = models.FileField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file_size = models.PositiveIntegerField()
