from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, get_user_model
from accounts.models import User
from datetime import datetime


# User Serializer
class UserSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email',
                  'first_name', 'last_name', 'is_superuser', 'is_active', 'is_staff', 'date_joined')


# Register Serializer
class ProfileSerializer (serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    is_superuser = serializers.BooleanField(default=False)
    is_active = serializers.BooleanField(default=True)
    is_staff = serializers.BooleanField(default=False)
    last_login = serializers.DateField(required=False)
    date_joined = serializers.DateField(default=datetime.now)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email',
                  'first_name', 'last_name', 'is_superuser', 'is_active', 'is_staff', 'last_login', 'date_joined')

    def create(self, validated_data):
        self.user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        return self.user

# Login Serializer


class LoginSerializer (serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField()

    class Meta:
        model = User
        fields = ('username', 'password')

    def validate(self, data):
        self.user = authenticate(**data)
        if self.user and self.user.is_active:
            return self.user
        raise serializers.ValidationError("Incorrect Credentials")
