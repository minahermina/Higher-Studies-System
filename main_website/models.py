from django.db import models, DatabaseError
from django.contrib.auth.models import AbstractUser

class Student(AbstractUser):
    name = models.CharField(max_length=50)
    id = models.CharField(max_length=8, unique=True)
    USERNAME_FIELD = 'id'
    date_of_birth = models.DateField()
    # university = models.
    # is_active (bool)
    department = models.ForeignKey('Department', on_delete=models.PROTECT)
    course = models.ForeignKey('Course')


# class Department
# class Course
#