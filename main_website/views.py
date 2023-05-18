from django.shortcuts import render, redirect
from .models import Student, Grades

def home(request):

    return render(request, 'main_website/home.html', {})

def loginStudent(request):

    return render(request, 'main_website/login_student.html', {})

def loginAdmin(request):

    return render(request, 'main_website/login_admin.html', {})
def registered_courses(request):
    grades = Grades.objects.filter(student_id='20210031')

    context = {
        'grades' : Grades.objects.filter
    }
    return render(request, 'main_website/registered_courses.html', context)


def search_students(request):
    students = Student.objects.all()
    context = {
        'students' : students
    }
    return render(request , 'main_website/search.html' , context)

def add_course(request):
    return render(request , 'main_website/add_course.html',{})

def edit_student(request):
    student = Student.objects.filter(stud_id='20210031')
    context = {
        'student': student
    }
    return render(request, 'main_website/edit_student.html', context)

def error_404(request, exception):
    return render(request, 'main_website/404.html', status=404)
