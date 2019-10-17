from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, get_user_model
from accounts.models import User
from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer


# User Serializer
class UserSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email',
                  'date_of_birth', 'first_name', 'last_name')


# Register Serializer
class ProfileSerializer (serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    date_of_birth = serializers.DateField(required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email',
                  'first_name', 'last_name', 'date_of_birth')

    def create(self, validated_data):
        self.user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            date_of_birth=validated_data['date_of_birth']
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


class UserRegistrationSerializer(BaseUserRegistrationSerializer):
    class Meta(BaseUserRegistrationSerializer.Meta):
        fields = ('username', 'password', 'email',
                  'date_of_birth', 'first_name', 'last_name',)

        def create(self, validated_data):
            return User.objects.create_user(
                username=validated_data['username'],
                password=validated_data['password'],
                email=validated_data['email'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'],
                date_of_birth=validated_data['date_of_birth']
            )
