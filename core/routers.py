from rest_framework_nested import routers
from django.urls import path
from core.recipe.viewsets import RecipeViewSet
from core.user.viewsets import UserViewSet
from core.auth.viewsets import RegisterViewSet, LoginViewSet, RefreshViewSet
from core.comment.viewsets import CommentViewSet

router = routers.SimpleRouter()

# AUTH
router.register(r'auth/register', RegisterViewSet, basename='auth-register')
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')


# USER
router.register(r'user', UserViewSet, basename='user')

# RECIPE
router.register(r'recipe', RecipeViewSet, basename='recipe')

recipes_router = routers.NestedSimpleRouter(router, r'recipe', lookup='recipe')
recipes_router.register(r'comment', CommentViewSet, basename='recipe-comment')


urlpatterns = [
    *router.urls,
    *recipes_router.urls,
    path('recipe/search/', RecipeViewSet.as_view({'get': 'search'}), name='recipe-search')
]