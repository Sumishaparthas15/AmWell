from django.urls import path
from . import views
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    
    path('',views.getRoutes),
    path('token/',MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    
   

    #hospital
    path('generate-otp/', GenerateOTPView.as_view(), name='generate_otp'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify_otp'),
    path('hossignup/', views.hospital_registration, name='hospital-registration'),
    path('HospitalAdditional/<str:hospitalEmail>/', HospitalAdditional.as_view(), name='hospital-additional'),
    path('hospital_login/', HospitalLoginView.as_view(), name='hospital_login'),
    path('departments/<str:hospitalEmail>/', DepartmentListView.as_view(), name='department-list'),
    path('departments/<str:hospitalEmail>/create/', DepartmentCreateView.as_view(), name='department-create'),
   
    # path('hospital_logout/', views.hospital_logout, name='hospital_logout'),
    path('departments/', views.department_list),
    
   
    #admin
    path('admin/', AdminLoginView.as_view()),
    path('hospital_requests/', HospitalRequestsView.as_view(), name='hospital_requests'),
    path('approve_hospital/<int:id>/', ApproveHospitalView.as_view(), name='approve_hospital'),
    path('HospitalListView/', HospitalListView.as_view(), name='HospitalListView'),
    path('get_patients/',views.get_patients,name='get_patients'),

    #patients
    path('register/', views.register_patient, name='register_patient'),
    path('patient_login/',PatientLoginView.as_view()),


    path('profile/',TestAuthenticationView.as_view()),
    

  



]    