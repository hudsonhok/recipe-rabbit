import pytest

from core.fixtures.user import user
from core.recipe.models import Recipe


@pytest.fixture
def recipe(db, user):
    return Recipe.objects.create(author=user, body="Test Recipe Body")