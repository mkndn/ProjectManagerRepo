from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI
from djoser import views as djoser_views


urlpatterns = [
    path('api/auth', include('djoser.urls')),
    path('api/auth', include('djoser.urls.authtoken')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', djoser_views.TokenDestroyView.as_view(), name="logout")
]
