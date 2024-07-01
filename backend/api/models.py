from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password

class User(AbstractUser):
    username=models.CharField(max_length= 250,unique=True)
    email=models.CharField(max_length=250,unique=True)
    password=models.CharField(max_length=250)
    profile_img=models.ImageField(upload_to='profile',blank=True,null=True)
    is_active=models.BooleanField(default=True)

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['username']

class Hospital(models.Model):
    hospital_name = models.CharField(max_length=255,unique=True)
    email = models.CharField(max_length=250,unique=True)
    phone_number = models.CharField(max_length=20)
    address = models.TextField()
    city = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    pin_code = models.CharField(max_length=10)
    photo = models.ImageField(upload_to='hospital_photos/')
    password = models.CharField(max_length=250)
    is_approved = models.BooleanField(default=False)

    def set_password(self, raw_password):
        self.password = make_password(raw_password)