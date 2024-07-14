from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login

from core.user.serializers import UserSerializer

class LoginSerializer(TokenObtainPairSerializer):
    """
    Login serializer for validating user credentials and return access token, refresh token, and user data
    """
    def validate(self, attrs):
        data = super().validate(attrs)

        # Get the refresh token for the user
        refresh = self.get_token(self.user)

        # Add the user data and access token to the response data
        data['user'] = UserSerializer(self.user).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        # Update the last login for the user if this setting is enabled
        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data


