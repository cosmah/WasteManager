from django.urls import path
from . import views
from .views import current_user

urlpatterns = [
    path("notes/", views.BookingListCreate.as_view(), name="bookings-list"),
    path("notes/delete/<int:pk>/", views.BookingDelete.as_view(), name="delete-booking"),
    path("current/", current_user, name="current_user"),
]