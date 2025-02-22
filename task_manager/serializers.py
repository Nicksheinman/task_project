
from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model= Task
        fields=['id', 'user', 'title', 'description', 'status', 'time_create', 'time_update']
        read_only_fields = ['id', 'user', 'time_create', 'time_update']
