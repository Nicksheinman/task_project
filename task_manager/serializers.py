from django.core.exceptions import ValidationError
from rest_framework import serializers
from .models import Task, EmailVerification, ProfileAvatar
from django.contrib.auth.models import User
import os, io
from PIL import Image, ImageOps, UnidentifiedImageError
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model= Task
        fields=['id', 'user', 'title', 'description', 'status', 'time_create', 'time_update']
        read_only_fields = ['id', 'user', 'time_create', 'time_update']

class RegisterSerializer(serializers.Serializer):
    username=serializers.CharField()
    email=serializers.EmailField()
    password=serializers.CharField(write_only=True)
    password2=serializers.CharField(write_only=True)
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('username exist')
        for v in ['admin','administrator','root','superuser','staff','support','test','owner','moderator']:
            if v==value:
                raise serializers.ValidationError('cannot use that name')
            if v.capitalize()==value:
                raise serializers.ValidationError('cannot use that name')
        return value
    def validate(self, data):
        if data['password']!=data['password2']:
            raise serializers.ValidationError('password do not match')
        return data
    def create(self, validated_data):
        validated_data.pop('password2')
        user=User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class ConfirmSerializer(serializers.Serializer):
    token=serializers.CharField()
    
class ProfileSerializer(serializers.ModelSerializer):
    avatar_url=serializers.SerializerMethodField()
    class Meta:
        model=ProfileAvatar
        fields=['avatar_url']
    def avatar_url(self, obj):
        return obj.avatar.url if obj.avatar else None
    
ALLOWED_EXTS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_BYTES = 5 * 1024 * 1024  
MAX_MEGA_PIXELS = 20 
MAX_WIDTH, MAX_HEIGHT = 2048, 2048

class AvatarUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model=ProfileAvatar
        fields=['avatar']
    def validate_avatar(self, file):
        if file.size>MAX_BYTES:
            raise ValidationError('file too big (limit 5 MB)')
        ext=os.path.splitext(file.name)[1].lower()
        if ext not in ALLOWED_EXTS:
            raise ValidationError('this type of file isnt supported (JPG/PNG/WebP)')
        try: 
            file.seek(0)
            img=Image.open(file)
            img.vertify()
        except UnidentifiedImageError:
            raise ValidationError("file is not a picture")
        finally:
            file.seek(0)
        img=Image.open(file)
        w, h=img.size
        if w*h/ 1_000_000>MAX_MEGA_PIXELS:
            raise ValidationError("too much pixels in file")       
        img = ImageOps.exif_transpose(img)
        if w> MAX_WIDTH or h>MAX_HEIGHT:
            img.thumbnail((MAX_WIDTH, MAX_HEIGHT))
        buf=io.BytesIO()
        if img.mode not in ("RGB", 'RGBA'):
            img=img.convert("RGB")
        img.save(buf, format="JPEG", quality=90, optimize=True)
        buf.seek(0)
        file.file = buf
        file.size = buf.getbuffer().nbytes
        file.seek(0)
        return file
    def update(self, instance, validated_data):
        old=instance.avatar
        instance = super().update(instance, validated_data)
        if old and old.name and old.name != instance.avatar.name:
            old.storage.delete(old.name)
        return instance