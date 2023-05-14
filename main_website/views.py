from django.shortcuts import render, redirect
from .models import Student

def home(request):

    return render(request, 'main_website/home.html', {})

def registered_courses(request):
    student = Student.objects.get(stud_id='20210031')

    print(student.name)
    print(student.department)

    print(student.courses.all())
    for course in student.courses.all():
        print(course.name)
    context = {
        'courses' : student.courses.all()
    }
    return render(request, 'main_website/registered_courses.html', context)