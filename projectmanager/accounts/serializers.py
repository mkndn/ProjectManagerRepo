from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .serializers import Profile


# User Serializer
class UserSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')


# Register Serializer
class ProfileSerializer (serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"
        exra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create(**validated_data)
        Profile.objects.create(user=user, **profile_data)

        return user

# Login Serializer


class LoginSerializer (serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
