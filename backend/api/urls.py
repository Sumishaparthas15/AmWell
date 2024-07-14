from django.urls import path
from . import views
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    
    path('',views.getRoutes),
    path('token/',MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    
   

    #hospital
    path('hossignup/', views.hospital_registration, name='hospital-registration'),
    path('hospital_login/', HospitalLoginView.as_view(), name='hospital_login'),
    # path('departments/', views.create_department, name='create_department'),
    path('hospital_logout/', views.hospital_logout, name='hospital_logout'),
    # path('departments/', views.department_list, name='department_list'),

    path('departments/', views.department_list, name='department_list'),
    path('departments/<int:pk>/', views.department_detail, name='department_detail'),
    
   
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