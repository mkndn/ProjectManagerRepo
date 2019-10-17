from django.contrib import admin
from .models import User


class UserAdmin(admin.ModelAdmin):
    model = User

    fields = ('id', 'username', 'password', 'email',
              'first_name', 'last_name', 'is_superuser', 'is_active', 'is_staff', 'date_joined')


# Register your models here.
admin.site.register(User, UserAdmin)
