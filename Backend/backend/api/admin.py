from django.contrib import admin
from django.shortcuts import render
from .models import Booking

class BookingByAddressAdmin(admin.ModelAdmin):
    change_list_template = "admin/bookings_by_address.html"

    def changelist_view(self, request, extra_context=None):
        # Group bookings by address
        bookings_by_address = {}
        for booking in Booking.objects.all():
            if booking.address not in bookings_by_address:
                bookings_by_address[booking.address] = []
            bookings_by_address[booking.address].append(booking)

        addresses = list(bookings_by_address.keys())

        context = {
            'addresses': addresses,
            'bookings_by_address': bookings_by_address,
        }
        return super().changelist_view(request, extra_context=context)

admin.site.register(Booking, BookingByAddressAdmin)