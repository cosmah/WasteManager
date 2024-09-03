from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import NotificationSerializer, UserSerializer, BookingSerializer
from django.utils import timezone
from rest_framework.response import Response
from .models import Booking, Notification



class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
        })

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    def get_permissions(self):
        if self.action in ['create', 'list']:
            return [IsAuthenticated()]
        return super().get_permissions()

    def get_serializer(self, *args, **kwargs):
        if self.action == 'create':
            kwargs['context'] = {'request': self.request}
        return super().get_serializer(*args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)  # Associate the booking with the authenticated user
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def partial_update(self, request, *args, **kwargs):
        kwargs = self.remove_extra_kwargs(kwargs)
        return super().partial_update(request, *args, **kwargs)

    def remove_extra_kwargs(self, kwargs):
        if hasattr(self, 'action'):
            action = self.action
        else:
            action = kwargs.pop('action', None)
        if action in ['partial_update', 'update']:
            kwargs.pop('pk', None)
        return kwargs
    #seralizers
    def list(self, request):
        queryset = self.queryset.filter(user=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        booking = serializer.save(user=request.user)
        
        # Create notification for new booking
        Notification.objects.create(
            user=request.user,
            message=f"Your booking for {booking.service_type} has been created."
        )
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_update(self, serializer):
        booking = serializer.save()
        
        # Check if the booking is due in an hour
        if booking.pickup_date == timezone.now().date() and \
           (booking.pickup_time - timezone.now().time()).total_seconds() <= 3600:
            Notification.objects.create(
                user=booking.user,
                message=f"Your booking for {booking.service_type} is due in an hour."
            )

    def perform_destroy(self, instance):
        Notification.objects.create(
            user=instance.user,
            message=f"Your booking for {instance.service_type} has been completed."
        )
        instance.delete()

class NotificationViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user).order_by('-created_at')