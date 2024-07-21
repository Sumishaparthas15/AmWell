from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, status, permissions
from django.http import HttpResponse
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.generics import ListCreateAPIView
from django.contrib.auth import authenticate,login,logout
from rest_framework.filters import SearchFilter,OrderingFilter
from .serializers import *
from .models import User
from .models import *
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import update_last_login
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model
from rest_framework.generics import GenericAPIView
import random
from django.utils import timezone
from django.core.mail import EmailMessage
from django.conf import settings

from django.core.mail import send_mail, BadHeaderError
from rest_framework import viewsets, status
from django.db.models import Q
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import viewsets, mixins
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from rest_framework_jwt.utils import jwt_decode_handler

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['is_admin'] = user.is_superuser
        
        if hasattr(user, 'hospital'):
            token['hospital_id'] = user.hospital.id
            token['hospital_name'] = user.hospital.hospital_name

        return token

        
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer
    


@api_view(['GET'])
def getRoutes(request):

    routes=[
        'api/token',
        'api/token/refresh'
    ]

    return Response(routes)
class TestAuthenticationView(GenericAPIView):
    permission_classes = (IsAuthenticated)

    def get(self,request):
        data = {
            'msg':'its work'
        }
        return Response(data,status=status.HTTP_200_OK)
    
@api_view(['POST'])
def hospital_registration(request):
    if request.method == 'POST':
        serializer = HospitalRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   


class GenerateOTPView(APIView):
    def post(self, request):
        email = request.data.get('email')
        user = User.objects.filter(email=email).first()
        print(user, "user............,")
        if not user:
            hospital = Hospital.objects.filter(email=email).first()
            print(hospital, "...............hospital")

        if user:
            otp = random.randint(100000, 999999)
            expires_at = timezone.now() + timezone.timedelta(minutes=10)
            OTP.objects.create(user=user, otp=otp, expires_at=expires_at)

            try:
                send_mail(
                    'Your OTP Code',
                    f'Your OTP code is {otp}',
                    'sumishasudha392@gmail.com',
                    [email],
                    fail_silently=False,
                )
            except BadHeaderError:
                return Response({"error": "Invalid header found."}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                print(e)
                return Response({"error": "Failed to send email. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({"message": "OTP sent to email"}, status=status.HTTP_200_OK)
        elif hospital:
            print('.................................')
            otp = random.randint(100000, 999999)
            print(otp)
            expires_at = timezone.now() + timezone.timedelta(minutes=10)
            HospitalOTP.objects.create(hospital=hospital, otp=otp, expires_at=expires_at)
            print('mnbvcx........',hospital,otp,expires_at)

            try:
                print("try.........")
                send_mail(
                    'Your OTP Code',
                    f'Your OTP code is {otp}',
                    'sumishasudha392@gmail.com',
                    [email],
                    
                    fail_silently=False,
                )
            except BadHeaderError:
                return Response({"error": "Invalid header found."}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                print(e)
                print(email)
                return Response({"error": "Failed to send email. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({"message": "OTP sent to email"}, status=status.HTTP_200_OK)
        print(hospital, "..................")
        return Response({"error": "User or Hospital not found"}, status=status.HTTP_400_BAD_REQUEST)
    

class VerifyOTPView(APIView):
    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')

        user = User.objects.filter(email=email).first()
        hospital = Hospital.objects.filter(email=email).first()

        if user:
            otp_obj = OTP.objects.filter(user=user, otp=otp, expires_at__gte=timezone.now()).first()
            if otp_obj:
                otp_obj.delete()
                return Response({"message": "OTP verified"}, status=status.HTTP_200_OK)
            return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)
        
        if hospital:
            otp_obj = HospitalOTP.objects.filter(hospital=hospital, otp=otp, expires_at__gte=timezone.now()).first()
            if otp_obj:
                otp_obj.delete()
                return Response({"message": "OTP verified"}, status=status.HTTP_200_OK)
            return Response({"error": "Invalid or expired OTP"}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"error": "User or Hospital not found"}, status=status.HTTP_400_BAD_REQUEST)

class HospitalAdditional(APIView):
    # Specify parsers to handle file uploads
    parser_classes = (MultiPartParser, FormParser)

    def patch(self, request, hospitalEmail):
        try:
            instance = Hospital.objects.get(email=hospitalEmail)  # Query based on email
        except Hospital.DoesNotExist:
            return Response({'error': 'Hospital not found'}, status=status.HTTP_404_NOT_FOUND)

        # Pass the incoming data to the serializer with `partial=True` for partial updates
        serializer = HospitalAdditionalInfoSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
class HospitalLoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        print(email,password)
        hospital = authenticate(request, email=email, password=password)
        print(hospital)

        if hospital is None:
            raise AuthenticationFailed('Invalid credentials')

        if not hospital.is_approved:
            return Response({'error': 'Account not approved'}, status=status.HTTP_403_FORBIDDEN)

        # Generate tokens using the hospital's tokens method
        tokens = hospital.tokens()

        return Response({
            'refresh': tokens['refresh'],
            'access': tokens['access'],
        })
class DepartmentListView(APIView):
    def get(self, request, hospitalEmail):
        try:
            hospital = Hospital.objects.get(email=hospitalEmail)
        except Hospital.DoesNotExist:
            return Response({'error': 'Hospital not found'}, status=status.HTTP_404_NOT_FOUND)

        departments = Department.objects.filter(hospital=hospital)
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DepartmentCreateView(APIView):
    def post(self, request, hospitalEmail):
        try:
            hospital = Hospital.objects.get(email=hospitalEmail)
        except Hospital.DoesNotExist:
            return Response({'error': 'Hospital not found'}, status=status.HTTP_404_NOT_FOUND)

        data = request.data.copy()
        data['hospital'] = hospital.id
        serializer = DepartmentSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def department_list(request):
    if request.method == 'GET':
        departments = Department.objects.filter(hospital=request.user.hospital)
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = DepartmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(hospital=request.user.hospital)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




# admin
class AdminLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None and user.is_superuser:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials or not an admin'}, status=status.HTTP_400_BAD_REQUEST)


class HospitalRequestsView(APIView):
    def get(self, request):
        hospitals = Hospital.objects.filter(is_approved=False)
        serializer = HospitalRegistrationSerializer(hospitals, many=True)
        return Response(serializer.data)

class ApproveHospitalView(APIView):
    def post(self, request, id):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            hospital = Hospital.objects.get(id=id)
            hospital.is_approved = True
            hospital.save()

            try:
                send_mail(
                    'Hospital Registration Approved',
                    'Congratulations! Your hospital registration has been approved.',
                    settings.EMAIL_HOST_USER,
                    [email],
                    fail_silently=False,
                )
            except BadHeaderError:
                return Response({'error': 'Invalid header found.'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'message': 'Hospital approved and notification sent successfully'}, status=status.HTTP_200_OK)
        except Hospital.DoesNotExist:
            return Response({'error': 'Hospital not found'}, status=status.HTTP_404_NOT_FOUND)


class RejectHospitalView(APIView):
    def post(self, request, id):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            hospital = Hospital.objects.get(id=id)
            hospital.delete()  

            try:
                send_mail(
                    'Hospital Registration Rejected',
                    'We regret to inform you that your hospital registration has been rejected.',
                    settings.EMAIL_HOST_USER,
                    [email],
                    fail_silently=False,
                )
            except BadHeaderError:
                return Response({'error': 'Invalid header found.'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'message': 'Hospital rejected and notification sent successfully'}, status=status.HTTP_200_OK)
        except Hospital.DoesNotExist:
            return Response({'error': 'Hospital not found'}, status=status.HTTP_404_NOT_FOUND)

        

class HospitalListView(APIView):
    def get(self, request):
        hospitals = Hospital.objects.filter(is_approved=True)
        serializer = HospitalRegistrationSerializer(hospitals, many=True)
        return Response(serializer.data)        
        
@api_view(['GET'])   
def get_patients(request): 
    if request.method == 'GET':
        patient = User.objects.filter(is_superuser = False)  
        serializer = UserRegistrationSerializer(patient,many=True)
        return Response(serializer.data)
    
class ToggleUserStatusView(APIView):
    def post(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        user.is_active = not user.is_active
        user.save()
        return Response({'status': 'success', 'is_active': user.is_active}, status=status.HTTP_200_OK)
    
class BlockUnblockHospitalView(APIView):
    def post(self, request, hospital_id):
        hospital = get_object_or_404(Hospital, id=hospital_id)
        action = request.data.get('action')

        if action == 'block':
            hospital.is_approved = False
            hospital.is_active = False
        elif action == 'unblock':
            hospital.is_approved = True
            hospital.is_active = True
        else:
            return Response({'error': 'Invalid action'}, status=status.HTTP_400_BAD_REQUEST)

        hospital.save()
        return Response({'status': 'success', 'is_approved': hospital.is_approved}, status=status.HTTP_200_OK)


@csrf_exempt
def get_blocked_patients(request):
    print("mmmmmmmmmmmmmmmmmmmmm")
    if request.method == 'GET':
        blocked_patients = User.objects.filter(is_active=False)
        print(blocked_patients)
        data = list(blocked_patients.values('id', 'username', 'email'))
        return JsonResponse(data, safe=False)
    return JsonResponse({'error': 'Invalid request method'}, status=400)


@csrf_exempt
def get_blocked_hospitals(request):
    if request.method == 'GET':
        blocked_hospitals = Hospital.objects.filter(is_active=False)
        data = list(blocked_hospitals.values('id', 'hospital_name', 'email', 'phone_number', 'address', 'district', 'photo'))
        return JsonResponse(data, safe=False)
    return JsonResponse({'error': 'Invalid request method'}, status=400)

class HospitalDetailView(APIView):
    parser_classes = (MultiPartParser, FormParser)  # Add this line if handling file uploads

    def get(self, request, id):
        print(f'ID received in the view: {id}') 
        print(id)
        try:
            hospital = Hospital.objects.get(id=id)
            serializer = HospitalSerializer(hospital)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Hospital.DoesNotExist:
            return Response({'error': 'Hospital not found'}, status=status.HTTP_404_NOT_FOUND)
       
class HospitalDepartmentsView(APIView):
    def get(self, request, id):
        try:
            hospital = Hospital.objects.get(id=id)
            departments = Department.objects.filter(hospital=hospital)
            serializer = DepartmentSerializer(departments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Hospital.DoesNotExist:
            return Response({'error': 'Hospital not found'}, status=status.HTTP_404_NOT_FOUND)
    


# Patient 
@api_view(['POST'])
def register_patient(request):
    if request.method == 'POST':
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   

class PatientLoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        if email is None or password is None:
            return Response({'error': 'Please provide both email and password'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(email=email, password=password)

        if not user:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)

        return Response({
            'token': str(refresh.access_token),
        }, status=status.HTTP_200_OK)


def get_districts(request):
    print('Fetching approved districts...')
    # Fetch districts from approved hospitals
    districts = Hospital.objects.filter(is_approved=True).values_list('district', flat=True).distinct()
    return JsonResponse({'districts': list(districts)})

def get_hospitals_by_district(request, district):
    hospitals = Hospital.objects.filter(district=district, is_approved=True).values_list('hospital_name', flat=True)
    return JsonResponse({'hospitals': list(hospitals)})



def get_departments_by_hospital(request, hospital_name):
    try:
        # Fetch the hospital based on the name
        hospital = Hospital.objects.get(name=hospital_name)
        departments = Department.objects.filter(hospital=hospital)
        
        # Serialize the department data
        department_list = [{'id': dept.id, 'name': dept.name} for dept in departments]
        
        return JsonResponse({'departments': department_list})
    except Hospital.DoesNotExist:
        return JsonResponse({'error': 'Hospital not found'}, status=404)






    



  
           
