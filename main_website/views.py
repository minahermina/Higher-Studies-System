from django.shortcuts import render, redirect, HttpResponse
from .models import Student, Grades, Course, Department, User
from django.contrib import admin, messages
from django.contrib.auth.decorators import user_passes_test, login_required
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from datetime import timedelta


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
    return render(request, 'main_website/home.html')


def about(request):
    return render(request, 'main_website/about.html')


@login_required(login_url='home')
def profile(request):
    return render(request, 'main_website/profile.html')


def loginStudent(request):
    if request.user.is_authenticated:
        return redirect('home')

    if request.method == 'POST':
        # messages.clear(request)
        id = request.POST.get('id')
        password = request.POST.get('pass')
        remember = request.POST.get('remember')

        try:
            student = Student.objects.get(stud_id=id)
        except:
            messages.error(request, 'Credentials are not valid')
            return redirect('login_student')

        user = authenticate(request, username=student.username, password=password)

        if user is not None:
            login(request, user)

            if remember == 'on':
                request.session.set_expiry(timedelta(days=365).total_seconds())
            else:
                request.session.set_expiry(0)

            return redirect('home')
        else:
            messages.error(request, 'Credentials are not valid')
            return redirect('login_student')

    return render(request, 'main_website/login.html')


def loginAdmin(request):
    login_type = 'admin'
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

            if remember == 'on':
                request.session.set_expiry(timedelta(days=365).total_seconds())
            else:
                request.session.set_expiry(0)

            return redirect('home')
        else:
            # if username is not None and password is not None:
            messages.error(request, 'Credentials are not valid')
            return redirect('login_admin')

    context = {'login_type': login_type}
    return render(request, 'main_website/login.html', context)


def logoutPage(request):
    if not request.user.is_authenticated:
        pass
    else:
        logout(request)
    return redirect('home')


@login_required(login_url='login_student')
@student_required
def registered_courses(request):
    grades = Grades.objects.filter(student_id=request.user.student.stud_id)

    context = {
        'grades': grades
    }
    return render(request, 'main_website/registered_courses.html', context)


@login_required(login_url='login_admin')
@admin_required
def search_students(request):
    if request.method == 'POST':
        form_type = request.POST.get('form_type')
        if form_type == 'delete-form':
            delete_id = request.POST.get('delete')
            try:
                student = Student.objects.get(stud_id=delete_id)
                student.delete()
            except Student.DoesNotExist:
                pass
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
    if request.method == 'POST':
        name = request.POST.get('name')
        print(name)
        course_id = request.POST.get('Course ID')
        number_of_hours = request.POST.get('course Hours')
        lecture_day = request.POST.get('lDay')
        hall_number = request.POST.get('hallNumber')
        department_id = request.POST.get('department')
        department = Department.objects.get(id=department_id)
        course = Course.objects.create(name=name, course_id=course_id, department=department,
                                       number_of_hours=number_of_hours, lecture_day=lecture_day,
                                       hall_number=hall_number)
    departments = Department.objects.all()
    context = {
        'departments': departments
    }

    return render(request, 'main_website/add_course.html', context)



@login_required(login_url='login_admin')
@admin_required
def edit_student(request):
    id = request.POST.get('edit')
    student = Student.objects.get(stud_id=id)
    # old_password = student.pass
    takenCourses = Grades.objects.filter(student_id=id, final_grade__isnull=True)
    allCourses = Course.objects.filter(department=student.department)

    if request.method == 'POST':
        form_type = request.POST.get('form_type')

        if form_type == 'update':
            print("REST")
            sID = request.POST.get('student id')
            # sID hasnot changed
            name = request.POST.get('student_name')
            username = request.POST.get('username')
            email = request.POST.get('email')
            # print(name)
            password = request.POST.get('password')
            date_of_birth = request.POST.get('dateOfBirth')
            status = request.POST.get('status')
            # print(status + "-------------------")
            university = request.POST.get('university')
            gender = request.POST.get('gender')
            department_id = request.POST.get('department')
            print(department_id)
            department = Department.objects.get(id=department_id)
            course1_ID = request.POST.get('course1')
            course2_ID = request.POST.get('course2')
            course3_ID = request.POST.get('course3')


            course1 = Course.objects.get(course_id=course1_ID)
            course2 = Course.objects.get(course_id=course2_ID)
            course3 = Course.objects.get(course_id=course3_ID)
            if id == sID:

                student = Student.objects.get(stud_id=sID)

                student.name = name
                student.username = username
                student.email = email
                student.date_of_birth = date_of_birth
                student.is_active = status
                student.university = university
                student.gender = gender

                # print(student)
                student.save()
                if takenCourses.count() > 0:
                    if takenCourses[0].course.course_id != course1_ID:
                        print("Error 1")
                        c1 = Grades.objects.get(student_id=id, course_id=takenCourses[0].course.course_id)
                        c1.delete()
                        Grades.objects.create(student_id=sID, course_id=course1_ID)
                else:
                    Grades.objects.create(student_id=sID,course_id=course1_ID)
                if takenCourses.count() > 1 :
                    if takenCourses[1].course.course_id != course2_ID:
                        c1 = Grades.objects.get(student_id=id, course_id=takenCourses[1].course.course_id)
                        c1.delete()
                        Grades.objects.create(student_id=sID, course_id=course2_ID)
                else:
                    Grades.objects.create(student_id=sID,course_id=course2_ID)
                if takenCourses.count() > 2:
                    if takenCourses[2].course.course_id != course2_ID:
                        c1 = Grades.objects.get(student_id=id, course_id=takenCourses[2].course.course_id)
                        c1.delete()
                        Grades.objects.create(student_id=sID,course_id=course3_ID)
                else:
                    Grades.objects.create(student_id=sID, course_id=course3_ID)
                return redirect('search_students')
            else:
                student = Student.objects.get(stud_id=id)
                student.delete()
                print(sID)
                student = Student.objects.create_user(name=name, username=username, email=email, stud_id=sID,
                                                      password=password,
                                                      date_of_birth=date_of_birth, department=department,
                                                      is_active=status, university=university, gender=gender)

                Grades.objects.create(student_id=sID, course_id=course1.course_id)
                Grades.objects.create(student_id=sID, course_id=course2.course_id)
                Grades.objects.create(student_id=sID, course_id=course3.course_id)
                return redirect('search_students')
    context = {
        'student': student,
        'takenCourses': takenCourses,
        'courses': allCourses,
    }
    return render(request, 'main_website/edit_student.html', context)


def error_404(request, exception):
    return render(request, 'main_website/404.html', status=404)


@login_required(login_url='login_student')
@student_required
def register_in_courses(request):
    # when clicking on the save button
    if request.method == 'POST':
        student_id = request.POST.get('student_id')
        course1_id = request.POST.get('course1')
        course2_id = request.POST.get('course2')
        course3_id = request.POST.get('course3')
        # retrieve the student

        student = Student.objects.get(user=request.user)
        Grades.objects.filter(student=student).delete()

        # retrieve the selected courses
        course1 = Course.objects.get(course_id=course1_id)
        course2 = Course.objects.get(course_id=course2_id)
        course3 = Course.objects.get(course_id=course3_id)

        Grades.objects.create(student=student, course=course1)
        Grades.objects.create(student=student, course=course2)
        Grades.objects.create(student=student, course=course3)

        return redirect('home')

    else:
        student_id = request.POST.get('student_id')
        student = Student.objects.get(user=request.user)
        department_courses = Course.objects.filter(department=student.department)

        context = {
            'student': student,
            'department_courses': department_courses,
        }
    return render(request, 'main_website/register_in_courses.html', context)


@login_required(login_url='login_admin')
@staff_member_required
def add_student(request):
    if request.method == 'POST':
        name = request.POST.get('student name')
        username = request.POST.get('username')
        email = request.POST.get('email')
        stud_id = request.POST.get('student id')
        password = request.POST.get('password')
        date_of_birth = request.POST.get('dateOfBirth')
        department_id = request.POST.get('department')
        status = request.POST.get('status')
        course1_ID = request.POST.get('course1')
        course2_ID = request.POST.get('course2')
        course3_ID = request.POST.get('course3')
        university = request.POST.get('university')
        gender = request.POST.get('gender')

        if department_id is not None and course1_ID is not None and course2_ID is not None and course3_ID is not None:
            department_id = int(department_id)
            course1 = Course.objects.get(course_id=course1_ID)
            course2 = Course.objects.get(course_id=course2_ID)
            course3 = Course.objects.get(course_id=course3_ID)

            department = Department.objects.get(id=department_id)

            student = Student.objects.create_user(name=name, username=username, email=email, stud_id=stud_id,
                                                  password=password,
                                                  date_of_birth=date_of_birth, department=department,
                                                  is_active=status, university=university, gender=gender)

            Grades.objects.create(student=student, course=course1)
            Grades.objects.create(student=student, course=course2)
            Grades.objects.create(student=student, course=course3)

        return render(request, 'main_website/home.html')

    else:
        courses = Course.objects.all()
        departments = Department.objects.all()
        context = {
            'courses': courses,
            'departments': departments
        }
        return render(request, 'main_website/add_student.html', context)


def get_courses_by_department(request):
    department_id = request.GET.get('department')
    courses = Course.objects.filter(department_id=department_id).values('course_id', 'name')

    return JsonResponse(list(courses), safe=False)
