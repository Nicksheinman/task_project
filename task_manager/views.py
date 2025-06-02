from rest_framework import generics, viewsets, permissions, status
from rest_framework.views import APIView
from django.forms import model_to_dict
from rest_framework.response import Response
from django.shortcuts import render
from .models import Task
from .serializers import TaskSerializer
from .permissions import IsUserOrStaff
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.conf import settings


class CookieTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response=super().post(request, *args, **kwargs)
        if response.status_code== 200:
            access=response.data.get('access')
            refresh=response.data.get('refresh')
            
            response.set_cookie(
                key=settings.SIMPLE_JWT["AUTH_COOKIE"],
                value=access,
                httponly=True,
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
                max_age=60 *  15, 

            )
            response.set_cookie(
                key=settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"],
                value=refresh,
                httponly=True,
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
                max_age=60 *  60 * 24 * 7, 
            )
            response.data.pop('access', None)
            response.data.pop('refresh', None)
            
        return response

class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token=request.COOKIES.get(settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"])
        if not refresh_token:
            return Response({'error': 'refresh token not found in cookies'})
        
        request.data['refresh']= refresh_token
        try :
            response=super().post(request, *args, **kwargs)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        
        if response.status_code==200:
            access=response.data.get('access')
            response.data.pop('access', None)
            
            response.set_cookie(
                key=settings.SIMPLE_JWT["AUTH_COOKIE"],
                value=access,
                httponly=True,
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
                max_age=60 * 15,
            )
        return response

class TaskAPI(viewsets.ModelViewSet):
    queryset= Task.objects.all()
    serializer_class=TaskSerializer
    permission_classes=[permissions.IsAuthenticated, IsUserOrStaff]
    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AuthCheck(APIView):
    def post(self, request):
        print(request.user.is_authenticated)
        print('test')
        if not request.user.is_authenticated:
            return Response({"isAuthenticated":False}, status=200)
        return Response({"isAuthenticated":True})