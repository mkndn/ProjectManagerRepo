from rest_framework import serializers
from django.contrib.auth.models import User
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

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        user = User.objects.create(**validated_data)
        Profile.objects.create(user=user, **profile_data)

        return user

# Login Serializer
