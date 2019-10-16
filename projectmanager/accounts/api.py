from rest_framework import generics, permissions
from rest_framework.response import Response
from .serializers import UserSerializer, ProfileSerializer
from know.models import AuthToken

# Register API


class RegisterAPI(generics.GenericAPIView):
    serializer_class = ProfileSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return ({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })
