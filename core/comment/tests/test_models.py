import pytest

from core.fixtures.user import user
from core.fixtures.recipe import recipe
from core.comment.models import Comment

@pytest.mark.django_db
def test_create_comment(user, recipe):
    comment = Comment.objects.create(author=user, recipe=recipe, body="Test Comment Body")
    assert comment.author == user
    assert comment.recipe == recipe
    assert comment.body == "Test Comment Body"