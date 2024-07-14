import pytest

from core.fixtures.user import user
from core.fixtures.recipe import recipe

from core.comment.models import Comment

@pytest.fixture
def comment(db, user, recipe):
    return Comment.objects.create(author=user, recipe=recipe, body="Test Comment Body")