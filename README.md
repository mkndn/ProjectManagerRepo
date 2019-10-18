# PyProjectManager
An enhanced version of project manager app using Python, React, SQlite and Redux

This app has the following features,

1) Authentication and Authorization
2) Manage Projects - Add/Edit/Delete

Checkout Proces:
---------------

Pre-Requisite:
Make sure you have Python, Node, pip, pipenv installed

Steps:
1) Clone the repo https://github.com/mani0608/ProjectManagerRepo.git
2) cd ProjectManagerRepo
3) pipenv shell
4) pipenv install (This will install Django, djangorestframework)
5) npm install (installing modules for react frontend)
6) cd projectmanager (into django project)
7) py manage.py makemigrations projects
8) py manage.py migrate
9) py manage.py makemigrations accounts
10) py manage.py migrate --fake (fake migration since we are using the existing auth_user table)

This completes the checkout and setup process.

Running the app:
----------------

Make sure you are inside projectmanager folder

Execute py manage.py runserver

This will start the server. You're now ready to access the application at https://127.0.0.1:8000
