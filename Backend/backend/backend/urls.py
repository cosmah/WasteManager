from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, CustomTokenObtainPairView, CurrentUserView, BookingViewSet, NotificationViewSet
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter



urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path('api/user/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/user/current/', CurrentUserView.as_view(), name='current_user'),
    
    # Booking URLs
     path('bookings/', BookingViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('bookings/<int:pk>/', BookingViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})),

    path('notifications/', NotificationViewSet.as_view({'get': 'list', 'post': 'create'})),
]



