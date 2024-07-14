from .models import *
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from rest_framework.exceptions import AuthenticationFailed



class HospitalRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Hide password field from response

    class Meta:
        model = Hospital
        fields = ['id','hospital_name', 'email', 'phone_number', 'address', 'city', 'district', 'pin_code', 'photo', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        hospital = Hospital.objects.create(**validated_data)
        hospital.set_password(password)  # Set and hash the password
        hospital.save()
        return hospital
    
class HospitalLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(email=email, password=password)

            if user:
                if not user.is_active:
                    raise serializers.ValidationError("User account is disabled.")
                return user
            else:
                raise serializers.ValidationError("Unable to log in with provided credentials.")
        else:
            raise serializers.ValidationError("Must include 'email' and 'password'.")
        
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Hide password field from response

    class Meta:
        model = User
        fields = '__all__' 

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create(**validated_data)
        user.set_password(password)  # Set and hash the password
        user.save()
        return user



User = get_user_model()

class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    password = serializers.CharField(
        label="Password",
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(email=email, password=password)

            if not user:
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg, code='authorization')

        else:
            msg = 'Must include "email" and "password".'
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs
    
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name', 'image', 'hospital']
        read_only_fields = ['id', 'hospital']  # Ensure hospital is read-only during creation

    def create(self, validated_data):
        hospital = self.context['request'].user.hospital  # Access hospital from request user
        department = Department.objects.create(hospital=hospital, **validated_data)
        return department