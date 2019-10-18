from django.test import TestCase, Client
from projects.models import Project
from django.contrib.auth import get_user_model


class ProjectTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        cls.c = Client()
        User = get_user_model()
        user = User.objects.create_user(username='testuser', password='pass',
                                        email='testuser@xxx.com', first_name='django', last_name='tester')
        user.set_password('pass')
        user.save()

    def test_authenticate(self):
        response = self.c.post(
            "/api/auth/login", {'username': 'testuser', 'password': 'pass',
                                'email': 'testuser@xxx.com', 'first_name': 'django', 'last_name': 'tester'})
        self.assertTrue(response.status_code == 200)
        self.__class__.token = response.data["token"]

    def test_create_project(self):
        print('test_create_project: ' + self.__class__.token)

        response = self.c.post("/api/projects/",
                               {"name": "proj01", "start_date": "2019/10/20", "duration": 4,
                                   "project_model": "Agile", "resource_count": 5},
                               **{"Content-Type": "application/json", "authorization": "token " + self.__class__.token})
        print(response.data)
