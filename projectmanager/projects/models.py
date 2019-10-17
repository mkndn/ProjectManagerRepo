from django.db import models
from accounts.models import User


# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=100)
    start_date = models.DateField(blank=True)
    duration = models.IntegerField(blank=True)
    project_model = models.CharField(max_length=50)
    resource_count = models.IntegerField(blank=False, default=0)
    owner = models.ForeignKey(
        User, related_name="projects", on_delete=models.CASCADE, null=True)
