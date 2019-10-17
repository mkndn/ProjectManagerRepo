from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import UserSerializer, ProfileSerializer, LoginSerializer
from djoser import utils
from djoser.conf import settings


# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = ProfileSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        profile = serializer.save()
        token = utils.login_user(self.request, profile.user)
        token_serializer_class = settings.SERIALIZERS.token
        return ({
            "user": UserSerializer(profile.user, context=self.get_serializer_context()).data,
            "token": token_serializer_class(token).data["auth_token"]
        })


# Login API
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token = utils.login_user(self.request, serializer.user)
        token_serializer_class = settings.SERIALIZERS.token
        return ({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token_serializer_class(token).data["auth_token"]
        })


# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.users
