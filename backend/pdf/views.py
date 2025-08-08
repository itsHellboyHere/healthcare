from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import serializers
from django.http import FileResponse
from .serializers import MedicalDocumentSerializer
from django.shortcuts import get_object_or_404
from .models import MedicalDocument


class DocumentListCreateView(generics.ListCreateAPIView):
    serializer_class = MedicalDocumentSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser]

    def get_queryset(self):
        return MedicalDocument.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        file = self.request.FILES['file']
        if not file.name.endswith('.pdf'):
            raise serializers.ValidationError("Only PDF files allowed.")
        serializer.save(user=self.request.user, file_size=file.size)

class DocumentDownloadView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        doc = get_object_or_404(MedicalDocument, pk=pk, user=request.user)
        return FileResponse(doc.file.open('rb'), as_attachment=False, filename=doc.file.name.split('/')[-1])

class DocumentDeleteView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return MedicalDocument.objects.filter(user=self.request.user)
