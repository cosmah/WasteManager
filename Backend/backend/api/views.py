from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView  # Add this import
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer
from .serializers import BookingSerializer
from .models import Booking
from rest_framework import viewsets
from .models import Booking


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
            return []
        return super().get_permissions()

    def get_serializer(self, *args, **kwargs):
        if self.action == 'create':
            kwargs['context'] = {'request': self.request}
        return super().get_serializer(*args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
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
