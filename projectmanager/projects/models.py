from django.db import models

# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=100)
    start_date = models.DateField(blank=True)
    duration = models.IntegerField(blank=True)
    project_model = models.CharField(max_length=50)
    resource_count = models.IntegerField(blank=False, default=0)
    