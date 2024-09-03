from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Booking
from .models import Notification

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
        }

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

class BookingSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)

    class Meta:
        model = Booking
        fields = ['id', 'user', 'phone', 'address', 'service_type', 'service_frequency',
                  'pickup_date', 'pickup_time', 'waste_type', 'waste_volume', 'emergency_contact']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return Booking.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.user = self.context['request'].user
        instance.service_type = validated_data.get('service_type', instance.service_type)
        instance.service_frequency = validated_data.get('service_frequency', instance.service_frequency)
        instance.pickup_date = validated_data.get('pickup_date', instance.pickup_date)
        instance.pickup_time = validated_data.get('pickup_time', instance.pickup_time)
        instance.waste_type = validated_data.get('waste_type', instance.waste_type)
        instance.waste_volume = validated_data.get('waste_volume', instance.waste_volume)
        instance.emergency_contact = validated_data.get('emergency_contact', instance.emergency_contact)
        instance.save()
        return instance
    
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'message', 'created_at', 'is_read']