# views.py
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.template.loader import render_to_string
from rest_framework import generics, status, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer, BookingSerializer
from .models import Booking
from django.db.models import Sum
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.crypto import get_random_string
import json


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
    

    class PasswordResetRequestView(APIView):
        permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            link = f"http://your-frontend-url/reset-password/{uid}/{token}/"  # Update with your frontend URL

            # Send email (customize as needed)
            subject = "Password Reset Requested"
            message = render_to_string('registration/password_reset_email.html', {
                'user': user,
                'domain': 'your-domain.com',
                'uid': uid,
                'token': token,
            })
            send_mail(subject, message, 'your-email@example.com', [email])  # Update with your email

            return Response({"success": "Password reset link sent."}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User with this email does not exist."}, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
def request_password_reset(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            if not email:
                return JsonResponse({'error': 'Email is required'}, status=400)
            
            try:
                user = User.objects.get(email=email)
                token = get_random_string(length=32)
                # Save the token in a way that you can validate it later
                user.profile.reset_token = token
                user.profile.save()
                
                reset_link = f"http://192.168.150.177:8081/reset-password?token={token}"
                send_mail(
                    'Password Reset Request',
                    f'Click the link to reset your password: {reset_link}',
                    'from@example.com',
                    [email],
                    fail_silently=False,
                )
                return JsonResponse({'message': 'Password reset link sent to your email'}, status=200)
            except User.DoesNotExist:
                return JsonResponse({'error': 'Email not found'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'error': 'Invalid request'}, status=400)