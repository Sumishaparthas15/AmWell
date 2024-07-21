from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager,Group, Permission
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=250, unique=True)
    email = models.CharField(max_length=250, unique=True)
    profile_img = models.ImageField(upload_to='profile', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False) 
    is_patient = models.BooleanField(default=False)

    groups = models.ManyToManyField(Group, related_name='user_groups', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='user_permissions', blank=True)
    

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    class Meta:
        db_table = 'api_user'
        managed = True
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
User = get_user_model()
class Hospital(AbstractBaseUser, PermissionsMixin):
    hospital_name = models.CharField(max_length=255, unique=True)
    email = models.CharField(max_length=250, unique=True)
    phone_number = models.CharField(max_length=20)
    address = models.TextField()
    city = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    pin_code = models.CharField(max_length=10)
    photo = models.ImageField(upload_to='hospital_photos/')
    is_approved = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    ownership_details = models.TextField(default='Hospital ownership details') 
    owner_photo = models.ImageField(upload_to='owner_photos/', default='default_owner_photo.jpg') 
    license_number = models.CharField(max_length=100, default='0000')
    license_expiry_date = models.DateField(default=timezone.now) 
    accreditations = models.CharField(max_length=255, default='') 
    acc_certification = models.FileField(upload_to='acc_certifications/', null=True, blank=True)
    admin_contact_person = models.CharField(max_length=255, default='Unknown')
    admin_contact_phone = models.CharField(max_length=20, default='')


    groups = models.ManyToManyField(Group, related_name='hospital_groups', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='hospital_permissions', blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['hospital_name']

    objects = CustomUserManager()

    class Meta:
        db_table = 'api_hospital'
        managed = True
        verbose_name = 'Hospital'
        verbose_name_plural = 'Hospitals'


    def tokens(self):
        refresh = RefreshToken()
        access_token = refresh.access_token
        return {
            'refresh': str(refresh),
            'access': str(access_token),
        }
class OTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

class HospitalOTP(models.Model):
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()    
    
        
class Department(models.Model):
    name = models.CharField(max_length=100,unique=True)
    image = models.ImageField(upload_to='department_images/')
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='departments')

    class Meta:
        db_table = 'api_department'
        managed = True
        verbose_name = 'Department'
        verbose_name_plural = 'Departments'

    def __str__(self):
        return self.name

    