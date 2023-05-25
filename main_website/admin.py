from django.contrib import admin
from .models import Department, Course, Student, Grades, User

admin.site.register(Department)
admin.site.register(Course)
admin.site.register(Student)
admin.site.register(Grades)
admin.site.register(User)
