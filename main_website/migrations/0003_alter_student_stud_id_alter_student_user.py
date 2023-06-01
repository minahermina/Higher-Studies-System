# Generated by Django 4.2 on 2023-06-01 03:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main_website', '0002_student_university_user_date_of_birth_user_gender'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='stud_id',
            field=models.CharField(max_length=8, unique=True),
        ),
        migrations.AlterField(
            model_name='student',
            name='user',
            field=models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, related_name='student', serialize=False, to=settings.AUTH_USER_MODEL),
        ),
    ]