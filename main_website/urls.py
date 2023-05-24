"""
URL configuration for main_website project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from main_website import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('registered_courses/', views.registered_courses, name='registered_courses'),
    path('login_student/', views.loginStudent, name='login_student'),
    path('login_admin/', views.loginAdmin, name='login_admin'),
    path('search/', views.search_students, name='search_students'),
    path('add_course/', views.add_course, name='add_course'),
    path('edit_student/', views.edit_student, name='edit_student'),
    path('profile/', views.profile, name='profile'),
    path('logout/', views.logoutPage, name='logout'),
    path('register_in_courses/', views.register_in_courses, name='register_in_courses'),
    path('add_student/', views.add_student, name="add_student"),

]
