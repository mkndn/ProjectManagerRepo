from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from accounts.models import Profile


# User Serializer
class UserSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email')


# Register Serializer
class ProfileSerializer (serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"
        extra_kwargs = {"password": {"write_only": True},
                        "user": {"required": False}}

    def create(self, validated_data):
        print("validated Data: ", validated_data)
        user = User.objects.create_user(
            validated_data['username'], validated_data['password'], validated_data['email'])
        profile = Profile.objects.create(
            ['first_name'], validated_data['last_name'], user=user)

        return profile

# Login Serializer


class LoginSerializer (serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
