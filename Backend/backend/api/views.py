# views.py
from django.contrib.auth.models import User
from rest_framework import generics, status, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer, BookingSerializer
from .models import Booking
from django.db.models import Sum
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib import messages

class SupervisorDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        
        # Fetch bookings for the supervisor
        bookings = Booking.objects.filter(user=user)
        
        # Serialize the bookings
        serialized_bookings = BookingSerializer(bookings, many=True).data
        
        # Calculate waste statistics
        total_collected = sum(b.waste_volume for b in bookings)
        total_recycled = sum(b.waste_volume for b in bookings if b.service_type == 'recycling')
        organic_waste = sum(b.waste_volume for b in bookings if b.waste_type == 'organic')
        synthetic_waste = sum(b.waste_volume for b in bookings if b.waste_type == 'synthetic')
        
        # Prepare the response
        data = {
            "bookings": serialized_bookings,
            "total_collected": total_collected,
            "total_recycled": total_recycled,
            "organic_waste": organic_waste,
            "synthetic_waste": synthetic_waste,
        }
        
        return Response(data)

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

    def list(self, request):
        queryset = self.queryset.filter(user=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

# New view for waste data
class WasteDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Calculate total waste collected
        total_collected = Booking.objects.filter(user=user).aggregate(Sum('waste_volume'))['waste_volume__sum'] or 0

        # Calculate total waste recycled (assuming 'recycling' service type means recycled)
        total_recycled = Booking.objects.filter(user=user, service_type='recycling').aggregate(Sum('waste_volume'))['waste_volume__sum'] or 0

        # Calculate organic waste
        organic_waste = Booking.objects.filter(user=user, waste_type='organic').aggregate(Sum('waste_volume'))['waste_volume__sum'] or 0

        # Calculate synthetic waste
        synthetic_waste = Booking.objects.filter(user=user, waste_type='synthetic').aggregate(Sum('waste_volume'))['waste_volume__sum'] or 0

        data = {
            "totalCollected": total_collected,
            "totalRecycled": total_recycled,
            "organicWaste": organic_waste,
            "syntheticWaste": synthetic_waste,
        }
        return Response(data)

# New view for supervisor login
def supervisor_login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return render(request, 'supervisor_dashboard.html')
        else:
            messages.error(request, 'Invalid username or password')
    return render(request, 'login.html')