# Generated by Django 5.1 on 2024-08-18 17:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_booking_author_delete_customuser'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Booking',
        ),
    ]
