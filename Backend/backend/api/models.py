from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Booking(models.Model):
    name = models.TextField(max_length=250)
    phone = models.TextField()
    address = models.TextField()
    serviceType = models.TextField()
    serviceFrequency = models.TextField()
    pickupDate = models.DateField()
    pickupTime = models.TimeField()
    wasteType = models.TextField()
    wasteVolume = models.FloatField()
    emergencyContact = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="name")

    def __str__(self) -> str:
        return self.name