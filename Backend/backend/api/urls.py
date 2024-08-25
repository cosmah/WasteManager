from django.urls import path
from .views import BookingViewSet

urlpatterns = [
    path('bookings/', BookingViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('bookings/<int:pk>/', BookingViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'})),
]
