from django.urls import path,include, re_path
from .views import TaskAPI, CookieTokenObtainPairView,CookieTokenRefreshView, AuthCheck,Get_csrf
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenVerifyView, 
)

router=DefaultRouter()
router.register(r"task", TaskAPI, basename='task')

urlpatterns = [
   path('v1/', include(router.urls)),
   re_path(r'^auth/', include('djoser.urls')),
   path('v1/token/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
   path("v1/csrf/", Get_csrf),
   path('v1/token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
   path('v1/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
   path('v1/token/check/', AuthCheck.as_view(), name='token_check'),
]
