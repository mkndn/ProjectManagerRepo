from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from accounts.usermanager import UserManager
from django.utils.translation import ugettext_lazy as _


class User(AbstractBaseUser):
    objects = UserManager()

    username = models.CharField(
        _('username'), unique=True, null=False, max_length=50)
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=150)
    last_name = models.CharField(_('last name'), max_length=150)
    date_of_birth = models.DateField(_('date of birth'), blank=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'first_name', 'last_name', 'date_of_birth']

    def __str__(self):
        return self.username
