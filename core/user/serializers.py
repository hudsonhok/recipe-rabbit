from rest_framework import serializers
from django.conf import settings
import os
from core.abstract.serializers import AbstractSerializer
from core.user.models import User


class UserSerializer(AbstractSerializer):
    recipes_count = serializers.SerializerMethodField()

    def get_recipes_count(self, instance):
        return instance.recipe_set.all().count()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if not representation['avatar']:
            representation['avatar'] = settings.DEFAULT_AVATAR_URL
        else:
            representation['avatar'] = os.path.join(settings.MEDIA_URL, representation['avatar'])
        return representation

    class Meta:
        model = User
        # List of all the fields that can be included in a request or a response
        fields = ['id', 'username', 'name', 'first_name', 'last_name', 'bio', 'avatar', 'email', 'is_active',
                  'created', 'updated', 'recipes_count']
        # List of all the fields that can only be read by the user
        read_only_field = ['is_active']
