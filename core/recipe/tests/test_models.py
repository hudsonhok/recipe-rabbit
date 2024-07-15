import pytest

from core.fixtures.user import user
from core.recipe.models import Recipe

@pytest.mark.django_db
def test_create_recipe(user):
    recipe = Recipe.objects.create(author=user, body="Test Recipe Body")
    assert recipe.body == "Test Recipe Body"
    assert recipe.author == user