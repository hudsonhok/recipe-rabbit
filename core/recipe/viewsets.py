from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError

from core.abstract.viewsets import AbstractViewSet
from core.recipe.models import Recipe
from core.recipe.serializers import RecipeSerializer
from core.auth.permissions import UserPermission

class RecipeViewSet(AbstractViewSet):
    http_method_names = ('post', 'get', 'put', 'delete')
    permission_classes = (UserPermission,)
    serializer_class = RecipeSerializer
    filterset_fields = ['author__public_id']

    def get_queryset(self):
        return Recipe.objects.all()

    def get_object(self):
        obj = Recipe.objects.get_object_by_public_id(self.kwargs['pk'])

        self.check_object_permissions(self.request, obj)

        return obj

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except ValidationError as e:
            # Debugging: Log the validation error
            print(f"Validation error: {e}")
            raise e
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=['post'], detail=True)
    def favorite(self, request, *args, **kwargs):
        recipe = self.get_object()
        user = self.request.user

        user.favorite_recipe(recipe)

        serializer = self.serializer_class(recipe, context={'request': request})

        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True)
    def remove_favorite(self, request, *args, **kwargs):
        recipe = self.get_object()
        user = self.request.user

        user.remove_favorite_recipe(recipe)

        serializer = self.serializer_class(recipe, context={'request': request})

        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], url_path='search')
    def search(self, request):
        query = request.GET.get('q', '')
        if query:
            recipes = Recipe.objects.filter(title__istartswith=query)
        else:
            recipes = Recipe.objects.none()
        serializer = RecipeSerializer(recipes, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='favorites')
    def get_favorites(self, request):
        user = request.user
        favorites = user.recipes_favorited.all()
        serializer = RecipeSerializer(favorites, many=True, context={'request': request})
        return Response(serializer.data)