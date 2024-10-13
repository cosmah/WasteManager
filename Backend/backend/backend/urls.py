# urls.py
from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, CustomTokenObtainPairView, CurrentUserView, BookingViewSet, WasteDataView
from rest_framework_simplejwt.views import TokenRefreshView
from api.views import request_password_reset


urlpatterns = [
    path('admin/', admin.site.urls),  # Move admin to /admin/
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path('api/user/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/user/current/', CurrentUserView.as_view(), name='current_user'),
    
    # Booking URLs
    path('api/bookings/', BookingViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('api/bookings/<int:pk>/', BookingViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})),

    # Waste Data URL
    path('api/waste-data/', WasteDataView.as_view(), name='waste_data'),

    path('api/request-password-reset/', request_password_reset, name='request_password_reset'),

]