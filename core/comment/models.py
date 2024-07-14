from django.db import models
from core.abstract.models import AbstractModel, AbstractManager

class CommentManager(AbstractManager):
    pass

class Comment(AbstractModel):
    # A comment is related to a Recipe model instance, and if the Recipe instance is deleted,
    # the Comment instances associated with it will also be deleted (Same case with the User instance)
    recipe = models.ForeignKey("core_recipe.Recipe", on_delete=models.CASCADE)
    author = models.ForeignKey("core_user.User", on_delete=models.CASCADE)

    body = models.TextField()
    edited = models.BooleanField(default=False)

    objects = CommentManager()

    def __str__(self):
        return self.author.name
