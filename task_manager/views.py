from rest_framework import generics, viewsets, permissions
from django.forms import model_to_dict
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render
from .models import Task
from .serializers import TaskSerializer
from .permissions import IsUserOrStaff



# class TaskAPI(APIView):
#     def get(self, request):
#         data= Task.objects.all().values()
#         return Response({'title': list(data)})
#     def post(self, request):
#         post_new=Task.objects.create(
#             title=request.data['title'],
#             description=request.data['description'],
#         )
#         return Response({"post": model_to_dict(post_new)})

class TaskAPI(viewsets.ModelViewSet):
    queryset= Task.objects.all()
    serializer_class=TaskSerializer
    permission_classes=[permissions.IsAuthenticated, IsUserOrStaff]
    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)