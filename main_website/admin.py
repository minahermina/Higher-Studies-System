from django.contrib import admin
from .models import Department, Course, Student, Grades, User
from django.contrib.auth.admin import UserAdmin

admin.site.register(Department)
admin.site.register(Course)
admin.site.register(Student)
admin.site.register(Grades)
admin.site.register(User)
