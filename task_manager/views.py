from rest_framework import generics, viewsets, permissions, status
from rest_framework.views import APIView
from django.forms import model_to_dict
from rest_framework.response import Response
from django.shortcuts import render
from .models import Task, EmailVerification
from .serializers import TaskSerializer, RegisterSerializer, ConfirmSerializer
from .permissions import IsUserOrStaff
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.conf import settings
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .services.email import send_email

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

@method_decorator(csrf_protect, name='dispatch')
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
        if not request.user.is_authenticated:
            return Response({"isAuthenticated":False}, status=200)
        return Response({"isAuthenticated":True})
    
@ensure_csrf_cookie
def Get_csrf(request):
    return JsonResponse({"detail": "CSRF cookie set"})


class Logout_view(APIView):
    def get(self, request):
        response = Response({"detail": "Successfully logged out"})
        response.delete_cookie("refresh_token")
        response.delete_cookie("access_token")
        return response
    
class Register_view(APIView):
    def post(self, request):
        serializer=RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user=serializer.save()
            user.is_active = False
            user.save()
            send_email(user=user)
            return Response({"message": "User created, please vertify your email"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Register_vertify_view(APIView):
    def post(self, request):
        print(request.data)
        serializer=ConfirmSerializer(data=request.data)
        if serializer.is_valid():
            token=serializer.validated_data['token']
            try:
                vertification=EmailVerification.objects.get(token=token)
            except EmailVerification.DoesNotExist:
                return Response({'message':'token doesnt exist'}, status=status.HTTP_404_NOT_FOUND)
            vertification.is_verificated=True
            vertification.save()
        
            user=vertification.user
            user.is_active=True
            user.save()
            response=Response({"message": "Email successfully verified"}, status=status.HTTP_200_OK)
            refresh=RefreshToken.for_user(user)
            response.set_cookie(
                key=settings.SIMPLE_JWT["AUTH_COOKIE"],
                value=str(refresh.access_token),
                httponly=True,
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
                max_age=60 *  15, 

            )
            response.set_cookie(
                key=settings.SIMPLE_JWT["AUTH_COOKIE_REFRESH"],
                value=str(refresh),
                httponly=True,
                secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
                samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
                max_age=60 *  60 * 24 * 7, 
            )
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)