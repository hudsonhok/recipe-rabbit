from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from core.auth.serializers import RegisterSerializer

class RegisterViewSet(ViewSet):
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)
    http_method_names = ['post']

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        # Validate the provided data with the serializer, raising an exception if validation fails
        serializer.is_valid(raise_exception=True)
        # Save the user instance after validating the data
        user = serializer.save()
        # Generate a new refresh and access token for the newly created user
        refresh = RefreshToken.for_user(user)
        # Create a dict containing the refresh and access tokens as strings
        res = {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

        return Response({
            "user": serializer.data,
            "refresh": res["refresh"],
            "token": res["access"]
        }, status=status.HTTP_201_CREATED)