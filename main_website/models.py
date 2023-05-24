from django.db import models, DatabaseError
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import Group, Permission, User, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver


class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = "ADMIN", 'Admin'
        STUDENT = "STUDENT", 'Student'

    groups = models.ManyToManyField(Group, related_name='auth_users')
    user_permissions = models.ManyToManyField(Permission, related_name='auth_users')

    base_role = Role.ADMIN

    #  Common fields ------------------------------------------
    role = models.CharField(max_length=50, choices=Role.choices, default=Role.ADMIN)
    name = models.CharField(max_length=50, null=True)
    # email

    # USERNAME_FIELD = 'username'

    def save(self, *args, **kwargs):
        if not self.pk:
            self.role = self.base_role
        return super().save(*args, **kwargs)

    def __str__(self):
        return str(self.name)


class StudentManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        results = super().get_queryset(*args, **kwargs)
        return results.filter(role=User.Role.STUDENT)

    def get_by_natural_key(self, username):
        return self.get(**{self.model.USERNAME_FIELD: username})



class Student(User):
    user = models.OneToOneField(
        User, on_delete=models.CASCADE,
        parent_link=True,
        related_name='student',
        null=True,
        default=None
    )
    stud_id = models.CharField(max_length=8, unique=True, primary_key=True)
    base_role = User.Role.STUDENT
    role = User.Role.STUDENT
    # university = models.
    # is_active (bool)
    department = models.ForeignKey('Department', on_delete=models.PROTECT)

    # is_staff = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Student'
        verbose_name_plural = 'Students'

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        self.role = self.Role.STUDENT # Set the role to 'STUDENT'
        return super().save(*args, **kwargs)




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
    course_grade = models.IntegerField(null=True, blank=True)
    final_grade = models.IntegerField(null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['student', 'course'], name='composite_pk')
        ]

    def __str__(self):
        return f"{self.student} - {self.course}"