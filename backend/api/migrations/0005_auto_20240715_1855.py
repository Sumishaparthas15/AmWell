# Generated by Django 3.2.12 on 2024-07-15 18:55

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_hospitalotp'),
    ]

    operations = [
        migrations.AddField(
            model_name='hospital',
            name='acc_certification',
            field=models.FileField(blank=True, null=True, upload_to='acc_certifications/'),
        ),
        migrations.AddField(
            model_name='hospital',
            name='accreditations',
            field=models.CharField(default='', max_length=255),
        ),
        migrations.AddField(
            model_name='hospital',
            name='admin_contact_person',
            field=models.CharField(default='Unknown', max_length=255),
        ),
        migrations.AddField(
            model_name='hospital',
            name='admin_contact_phone',
            field=models.CharField(default='', max_length=20),
        ),
        migrations.AddField(
            model_name='hospital',
            name='license_expiry_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AddField(
            model_name='hospital',
            name='license_number',
            field=models.CharField(default='0000', max_length=100),
        ),
        migrations.AddField(
            model_name='hospital',
            name='owner_photo',
            field=models.ImageField(default='default_owner_photo.jpg', upload_to='owner_photos/'),
        ),
        migrations.AddField(
            model_name='hospital',
            name='ownership_details',
            field=models.TextField(default='Hospital ownership details'),
        ),
    ]