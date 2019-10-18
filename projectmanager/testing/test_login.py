from django.test import TestCase, Client
from accounts.models import User
from django.contrib.auth import get_user_model


class LoginTest(TestCase):

    @classmethod
    def setUpTestData(cls):
        User = get_user_model()
        user = User.objects.create_user(username='testuser', password='pass',
                                        email='testuser@xxx.com', first_name='django', last_name='tester')
        user.set_password('pass')
        user.save()
        cls.c = Client()

    def test_success_login(self):
        response = self.c.post(
            "/api/auth/login", {'username': 'testuser', 'password': 'pass',
                                'email': 'testuser@xxx.com', 'first_name': 'django', 'last_name': 'tester'})
        self.assertTrue(response.status_code == 200)

    def test_invalid_credentials(self):
        response = self.c.post(
            "/api/auth/login", {'username': 'testuser', 'password': 'password',
                                'email': 'testuser@xxx.com', 'first_name': 'django', 'last_name': 'tester'})
        self.assertTrue(response.status_code == 400)
