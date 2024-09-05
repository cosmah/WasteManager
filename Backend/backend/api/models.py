from django.db import models
from django.contrib.auth.models import User

class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    service_type = models.CharField(max_length=50, choices=[
        ('regular_pickup', 'Regular Waste Pickup'),
        ('bulk_collection', 'Bulk Item Collection'),
        ('hazardous_disposal', 'Hazardous Waste Disposal'),
        ('recycling', 'Recycling Services')
    ])
    service_frequency = models.CharField(max_length=15, choices=[
        ('one_time', 'One-time'),
        ('daily', 'Daily'),
        ('weekly', 'Weekly'),
        ('monthly', 'Monthly')
    ])
    pickup_date = models.DateField()
    pickup_time = models.TimeField()
    waste_type = models.CharField(max_length=15, choices=[
        ('organic', 'Organic Waste'),
        ('synthetic', 'Synthetic Waste')
    ])
    waste_volume = models.DecimalField(max_digits=10, decimal_places=2)
    emergency_contact = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name}'s Booking"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Add any post-save logic here if needed



