from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Booking

# Create your models here.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        #accept password when creating new user but dont return it in the in formation
        extra_kwargs = {'password': {'write_only': True}}


    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ["id", "name", "phone", "address", "serviceType", "serviceFrequency", "pickupDate", "pickupTime", "wasteType", "wasteVolume","emergencyContact","author"]
        extra_kwargs = {"author": {"read_only": True }}