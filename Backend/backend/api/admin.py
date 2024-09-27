# admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import Profile, Booking

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False

class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,)

    # Add the is_supervisor field to the list display
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_supervisor')

    def is_supervisor(self, obj):
        return obj.profile.is_supervisor
    is_supervisor.short_description = 'Is Supervisor'
    is_supervisor.boolean = True

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'is_supervisor')

admin.site.register(Profile, ProfileAdmin)

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'phone', 'address', 'service_type', 'service_frequency', 'pickup_date', 'pickup_time', 'waste_type', 'waste_volume', 'emergency_contact')
    search_fields = ('phone', 'address', 'service_type', 'waste_type')
    list_filter = ('service_type', 'service_frequency', 'pickup_date', 'pickup_time')