from django.urls import path,include, re_path
from .views import TaskAPI
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView, 
)

router=DefaultRouter()
router.register(r"task", TaskAPI, basename='task')

urlpatterns = [
   path('v1/', include(router.urls)),
   path('v1/drf-auth/', include('rest_framework.urls')),
   path('v1/auth/', include('djoser.urls.authtoken')),
   re_path(r'^auth/', include('djoser.urls')),
   path('v1/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
   path('v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
   path('v1/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
