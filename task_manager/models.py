from django.db import models
from django.contrib.auth.models import User
import uuid, os
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
    
class EmailVerification(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE, related_name='email_vertification')
    token=models.CharField(max_length=64)
    is_verificated=models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


def avatar_upload(instance, filename):
    ext= os.path.splitext(filename)[1].lower()
    return f"avatars/user_{instance.user_id}/{uuid.uuid4()}/{ext}"

class ProfileAvatar(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile_avatar')
    avatar=models.ImageField(upload_to=avatar_upload,blank=True, null=True)