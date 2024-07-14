from django.db import models

from core.abstract.models import AbstractModel, AbstractManager


class RecipeManager(AbstractManager):
    pass


class Recipe(AbstractModel):
    author = models.ForeignKey(to="core_user.User", on_delete=models.CASCADE)
    body = models.TextField()
    edited = models.BooleanField(default=False)

    objects = RecipeManager()

    def __str__(self):
        return f"{self.author.name}"
