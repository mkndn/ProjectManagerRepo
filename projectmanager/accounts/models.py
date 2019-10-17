from django.db import models
from django.contrib.auth.models import AbstractUser
from accounts.usermanager import CustomUserManager
from django.utils.translation import ugettext_lazy as _
from datetime import datetime


class User(AbstractUser):
    username = models.CharField(
        _('username'), unique=True, null=False, max_length=50)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True)
    date_joined = models.DateTimeField(default=datetime.now)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name',
                       'is_staff', 'is_active', 'is_superuser', 'date_joined']

    class Meta:
        db_table = 'auth_user'
