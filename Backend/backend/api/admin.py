from django.contrib import admin
from .models import Booking

from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'phone', 'address', 'service_type', 'service_frequency', 'pickup_date', 'pickup_time', 'waste_type', 'waste_volume', 'emergency_contact')
    search_fields = ('phone', 'address', 'service_type', 'waste_type')
    list_filter = ('service_type', 'service_frequency', 'pickup_date', 'pickup_time')