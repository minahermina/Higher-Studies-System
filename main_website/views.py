from django.contrib.auth import admin
from django.shortcuts import render, redirect
from .models import Student, Grades
from django.contrib.auth.decorators import user_passes_test
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib import admin, messages
from django.contrib.auth.decorators import user_passes_test, login_required
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth import authenticate, login, logout
import time


def home(request):
    return render(request, 'main_website/home.html', {})


def about(request):
    return render(request, 'main_website/about.html', {})


def profile(request):
    return render(request, 'main_website/profile.html', {})


# def logoutPage(request):
#
#     return redirect('home')


def loginStudent(request):
    if request.method == 'POST':
        id = request.POST.get('id')
        password = request.POST.get('pass')
        user = authenticate(request, stud_id=id, password=password)
        print(user)
        # print(remember)
        if user is not None:
            login(request, admin)
            return redirect('home')
        else:
            # if username is not None and password is not None:
            messages.error(request, 'Credentials are not valid')
            return redirect('login_student')

        # request.session.flush()
    # print(messages.warning(request, "Your account expires in three days."))

    context = {}

    return render(request, 'main_website/login_student.html', context)


def loginAdmin(request):
    message = None

    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('pass')
        remember = request.POST.get('remember')
        admin = authenticate(request, username=username, password=password)

        # print(remember)
        if admin is not None:
            login(request, admin)
            print(remember)
            # request.session.set_expiry(0)
            # request.session.flush()
            if remember is not None:
                request.session.set_expiry(None)
            else:
                request.session.set_expiry(0)
            return redirect('home')
        else:
            # if username is not None and password is not None:
            messages.error(request, 'Credentials are not valid')
            return redirect('login_admin')

        # request.session.flush()
    # print(messages.warning(request, "Your account expires in three days."))

    context = {}
    return render(request, 'main_website/login_admin.html', context)


@login_required(login_url='login_admin')
def logoutPage(request):
    logout(request)
    return redirect('home')


# @user_passes_test(lambda user: user.is_authenticated and not user.is_staff)
# @user_passes_test(lambda user: user.groups.filter(name='Administrators').exists(), login_url='login')
def registered_courses(request):
    grades = Grades.objects.filter(student_id='20210031')

    context = {
        'grades': Grades.objects.filter
    }
    return render(request, 'main_website/registered_courses.html', context)


@login_required(login_url='login_admin')
@staff_member_required
def search_students(request):
    students = Student.objects.all()
    context = {
        'students': students
    }
    return render(request, 'main_website/search.html', context)


@login_required(login_url='login_admin')
@staff_member_required
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
