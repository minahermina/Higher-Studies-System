from django.contrib.auth import admin
from django.shortcuts import render, redirect
from .models import Student, Grades, Course, User
from django.contrib.auth.decorators import user_passes_test
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib import admin, messages
from django.contrib.auth.decorators import user_passes_test, login_required
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth import authenticate, login, logout
from django.db.models import Q

import time

from django.contrib.auth.decorators import user_passes_test


def admin_required(view_func):
    def check_admin(user):
        return user.is_authenticated and user.role == User.Role.ADMIN

    def decorator(request, *args, **kwargs):
        if check_admin(request.user):
            return view_func(request, *args, **kwargs)
        else:
            return redirect('home')  # Redirect to the home page

    return decorator


def student_required(view_func):
    def check_admin(user):
        return user.is_authenticated and user.role == User.Role.STUDENT

    def decorator(request, *args, **kwargs):
        if check_admin(request.user):
            return view_func(request, *args, **kwargs)
        else:
            return redirect('home')  # Redirect to the home page

    return decorator


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
    if request.user.is_authenticated:
        return redirect('home')

    if request.method == 'POST':
        id = request.POST.get('id')
        password = request.POST.get('pass')

        print(id + ' ' + password)
        student = Student.objects.get(stud_id=id)

        print(student.username + ' ' + student.stud_id)
        user = authenticate(request, username=student.username, password=password)
        # print(student.user.check_password(password))
        print(user)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            messages.error(request, 'Credentials are not valid')
            return redirect('login_student')

    context = {}
    return render(request, 'main_website/login_student.html', context)


def loginAdmin(request):
    message = None
    if request.user.is_authenticated:
        return redirect('home')

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


@login_required(login_url='login_student')
@student_required
def registered_courses(request):
    grades = Grades.objects.filter(student_id='20210031')

    context = {
        'grades': Grades.objects.filter
    }
    return render(request, 'main_website/registered_courses.html', context)


@login_required(login_url='login_admin')
@admin_required
def search_students(request):
    students = Student.objects.all()
    name = ''
    if request.method == 'POST':
        priority = request.POST.get('priority')
        name = request.POST.get('keyword')

        if name:
            students = students.filter(name__icontains=name)
        if priority == 'name':
            students = students.order_by('name')
        elif priority == 'stud_id':
            students = students.order_by('stud_id')

    context = {
        'students': students,
        'search': name,
    }
    return render(request, 'main_website/search.html', context)


@login_required(login_url='login_admin')
@admin_required
def add_course(request):
    return render(request, 'main_website/add_course.html', {})


@login_required(login_url='login_admin')
@admin_required
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

@login_required(login_url='login_student')
@student_required
def register_in_courses(request):
    # when clicking on the save button
    if request.method == 'POST':
        student_id = '20210031'
        course1_id = request.POST.get('course1')
        course2_id = request.POST.get('course2')
        course3_id = request.POST.get('course3')

        # retrieve the student

        student = Student.objects.get(stud_id=student_id)

        # retrieve the selected courses
        course1 = Course.objects.get(course_id=course1_id)
        course2 = Course.objects.get(course_id=course2_id)
        course3 = Course.objects.get(course_id=course3_id)

        Grades.objects.create(student=student, course=course1)
        Grades.objects.create(student=student, course=course2)
        Grades.objects.create(student=student, course=course3)

        return render(request, 'main_website/home.html')

    else:
        student_id = '20210031'
        student = Student.objects.get(stud_id=student_id)
        department_courses = Course.objects.filter(department=student.department)

        context = {
            'student': student,
            'department_courses': department_courses,
        }
    return render(request, 'main_website/register_in_courses.html', context)


@login_required(login_url='login_admin')
@admin_required
def add_student(request):
    return render(request, 'main_website/add_student.html')
