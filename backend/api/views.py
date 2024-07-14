from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, status
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

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['is_admin'] = user.is_superuser
        # ...

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
    

def hospital_logout(request):
    if request.user.is_authenticated:
        logout(request)
        request.session.flush()
        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Not logged in"}, status=status.HTTP_400_BAD_REQUEST) 


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
        print(f'ID received in the view: {id}')  # Add this line to debug the id being received
        try:
            hospital = Hospital.objects.get(id=id)
            hospital.is_approved = True
            hospital.save()
            return Response({'message': 'Hospital approved successfully'}, status=status.HTTP_200_OK)
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

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def create_department(request):
    serializer = DepartmentSerializer(data=request.data, context={'request': request})
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
        serializer = DepartmentSerializer(data=request.data, context={'request': request})
        print(',,,,,,,,,,,,,,,,,')
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def department_detail(request, pk):
    try:
        department = Department.objects.get(pk=pk, hospital=request.user.hospital)
    except Department.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = DepartmentSerializer(department)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = DepartmentSerializer(department, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        department.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# class DepartmentListCreateAPIView(generics.ListCreateAPIView):
#     queryset = Department.objects.all()
#     serializer_class = DepartmentSerializer

#     def perform_create(self, serializer):
#         # Associate department with the logged-in hospital user
#         serializer.save(hospital=self.request.user.hospital)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_department(request):
#     serializer = DepartmentSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save(hospital=request.user.hospital)  # Assuming you have a way to associate with the hospital
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    












































































    

    
  
           
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

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def department_detail(request, pk):
    try:
        department = Department.objects.get(pk=pk, hospital=request.user.hospital)
    except Department.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = DepartmentSerializer(department)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = DepartmentSerializer(department, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'DELETE':
        department.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)