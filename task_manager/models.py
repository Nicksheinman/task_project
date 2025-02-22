from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Task(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE, related_name='task')
    title=models.CharField(max_length=256)
    description =models.TextField(blank=True, null=True)
    status= models.BooleanField(default=False)
    time_create=models.DateTimeField(auto_now_add=True)
    time_update=models.DateTimeField(auto_now=True)
    def __str__(self):
        return self.name  