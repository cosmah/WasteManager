# Generated by Django 5.1 on 2024-08-27 21:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='booking',
            name='email',
        ),
        migrations.RemoveField(
            model_name='booking',
            name='name',
        ),
    ]
