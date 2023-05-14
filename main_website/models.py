from django.db import models, DatabaseError
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import Group, Permission, User
class Student(AbstractUser):
    name = models.CharField(max_length=50)
    stud_id = models.CharField(max_length=8, unique=True, primary_key=True)
    USERNAME_FIELD = 'stud_id'
    date_of_birth = models.DateField()
    # university = models.
    # is_active (bool)
    department = models.ForeignKey('Department', on_delete=models.PROTECT)
    groups = models.ManyToManyField(Group, related_name='student_groups')
    user_permissions = models.ManyToManyField(Permission, related_name='student_user_permissions')
    class Meta:
        verbose_name = 'Student'
        verbose_name_plural = 'Students'

    def __str__(self):
        return self.name


class Department(models.Model):
    name = models.CharField(max_length=30)
    def __str__(self):
        return self.name

class Course(models.Model):
    name = models.CharField(max_length=50)
    course_id = models.CharField(max_length=8, unique=True, primary_key=True)
    department = models.ForeignKey('Department', on_delete=models.PROTECT)
    number_of_hours = models.IntegerField()
    lecture_day = models.CharField(max_length=10, choices=[
        ('Saturday', 'Saturday'),
        ('Sunday', 'Sunday'),
        ('Monday', 'Monday'),
        ('Tuesday', 'Tuesday'),
        ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'),
        ('Friday', 'Friday'),
    ])
    hall_number = models.CharField(max_length=8)
    def __str__(self):
        return self.name

class Grades(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    course_grade = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    final_grade = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    def str(self):
        return f"{self.student} - {self.course}"