from django.contrib.auth.models import BaseUserManager


class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, username, password, email, first_name, last_name, is_active, is_staff, is_superuser):
        user = self.model(
            username=username,
            password=password,
            email=email,
            first_name=first_name,
            last_name=last_name,
            is_active=is_active,
            is_staff=is_staff,
            is_superuser=is_superuser
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, password, email, first_name, last_name):
        return self._create_user(
            username,
            password,
            email,
            first_name,
            last_name,
            True,
            False,
            False
        )

    # STAFF USER
    def create_staffuser(self, username, password, email, first_name, last_name):
        return self._create_user(
            username,
            password,
            email,
            first_name,
            last_name,
            True,
            True,
            False
        )

    def create_superuser(self, username, password, email, first_name, last_name):
        return self._create_user(
            username,
            password,
            email,
            first_name,
            last_name,
            True,
            True,
            True
        )
