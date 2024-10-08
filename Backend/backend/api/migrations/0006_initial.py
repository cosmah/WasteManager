# Generated by Django 5.1 on 2024-08-25 17:16

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('api', '0005_delete_booking'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('phone', models.CharField(max_length=20)),
                ('address', models.TextField()),
                ('service_type', models.CharField(choices=[('regular_pickup', 'Regular Waste Pickup'), ('bulk_collection', 'Bulk Item Collection'), ('hazardous_disposal', 'Hazardous Waste Disposal'), ('recycling', 'Recycling Services')], max_length=50)),
                ('service_frequency', models.CharField(choices=[('one_time', 'One-time'), ('daily', 'Daily'), ('weekly', 'Weekly'), ('monthly', 'Monthly')], max_length=15)),
                ('pickup_date', models.DateField()),
                ('pickup_time', models.TimeField()),
                ('waste_type', models.CharField(choices=[('organic', 'Organic Waste'), ('synthetic', 'Synthetic Waste')], max_length=15)),
                ('waste_volume', models.DecimalField(decimal_places=2, max_digits=10)),
                ('emergency_contact', models.CharField(max_length=255)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
