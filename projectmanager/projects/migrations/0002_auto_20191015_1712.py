# Generated by Django 2.2.6 on 2019-10-15 11:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='project',
            old_name='startDate',
            new_name='start_date',
        ),
    ]