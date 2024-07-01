from django.urls import path
from . import views
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    
    path('',views.getRoutes),
    path('token/',MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/',RegisterView.as_view()),

    path('hossignup/', HospitalRegisterView.as_view()),
    path('hospital_login/', views.hospital_login, name='hospital_login'),
    path('hospital_logout/', views.hospital_logout, name='hospital_logout'),
   

    path('admin/', AdminLoginView.as_view()),
    path('hospital_requests/', views.hospital_requests, name='hospital_requests'),
    path('approve_hospital/<int:pk>/', views.approve_hospital, name='approve_hospital'),
    path('approved_hospital/', views.approved_hospital,name='approved_hospital'),
    path('get_patients/',views.get_patients,name='get_patients')



]    