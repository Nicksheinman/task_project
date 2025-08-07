
from rest_framework import serializers
from .models import Task, EmailVerification
from django.contrib.auth.models import User

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