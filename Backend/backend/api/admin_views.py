# admin_views.py
from django.contrib import admin
from django.urls import path
from django.shortcuts import render
from .models import Booking

class BookingByAddressAdminView(admin.ModelAdmin):
    change_list_template = "admin/bookings_by_address.html"

    def changelist_view(self, request, extra_context=None):
        # Group bookings by address
        bookings_by_address = Booking.objects.values('address').distinct()
        addresses = [booking['address'] for booking in bookings_by_address]

        context = {
            'addresses': addresses,
            'bookings_by_address': {address: Booking.objects.filter(address=address) for address in addresses},
        }

        return render(request, self.change_list_template, context)

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('bookings_by_address/', self.admin_site.admin_view(self.changelist_view), name='bookings_by_address'),
        ]
        return custom_urls + urls