from django.contrib.auth import admin
from django.shortcuts import render, redirect
from .models import Student, Grades
from django.contrib.auth.decorators import user_passes_test
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib import admin
from django.contrib.auth.decorators import user_passes_test, login_required
from django.contrib.admin.views.decorators import staff_member_required


def home(request):
    return render(request, 'main_website/home.html', {})


def about(request):
    return render(request, 'main_website/about.html', {})

def loginStudent(request):
    return render(request, 'main_website/login_student.html', {})


def loginAdmin(request):
    return render(request, 'main_website/login_admin.html', {})


@user_passes_test(lambda user: user.is_authenticated and not user.is_staff)
def registered_courses(request):
    grades = Grades.objects.filter(student_id='20210031')

    context = {
        'grades': Grades.objects.filter
    }
    return render(request, 'main_website/registered_courses.html', context)


# @login_required(login_url='login_admin')
# @staff_member_required
def search_students(request):
    students = Student.objects.all()
    context = {
        'students': students
    }
    return render(request, 'main_website/search.html', context)


# @login_required(login_url='login_admin')
# @staff_member_required
def add_course(request):
    return render(request, 'main_website/add_course.html', {})


@login_required(login_url='login_admin')
@staff_member_required
def edit_student(request):
    id = request.GET.get('student_id')

    student = Student.objects.filter(stud_id=id)

    if request.method == 'POST':
        print(request.POST)
    context = {
        'student': student
    }
    return render(request, 'main_website/edit_student.html', context)


def error_404(request, exception):
    return render(request, 'main_website/404.html', status=404)
