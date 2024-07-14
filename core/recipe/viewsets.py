from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action

from core.abstract.viewsets import AbstractViewSet
from core.recipe.models import Recipe
from core.recipe.serializers import RecipeSerializer
from core.auth.permissions import UserPermission

class RecipeViewSet(AbstractViewSet):
    http_method_names = ('post', 'get', 'put', 'delete')
    permission_classes = (UserPermission,)
    serializer_class = RecipeSerializer

    def get_queryset(self):
        return Recipe.objects.all()

    def get_object(self):
        obj = Recipe.objects.get_object_by_public_id(self.kwargs['pk'])

        self.check_object_permissions(self.request, obj)

        return obj

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=['post'], detail=True)
    def favorite(self, request, *args, **kwargs):
        recipe = self.get_object()
        user = self.request.user

        user.favorite(recipe)

        serializer = self.serializer_class(recipe)

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True)
    def remove_favorite(self, request, *args, **kwargs):
        recipe = self.get_object()
        user = self.request.user

        user.remove_favorite(recipe)

        serializer = self.serializer_class(recipe)

        return Response(serializer.data, status=status.HTTP_200_OK)

