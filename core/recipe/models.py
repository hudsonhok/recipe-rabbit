from django.db import models
from datetime import timedelta
from core.abstract.models import AbstractModel, AbstractManager

class RecipeManager(AbstractManager):
    pass

class Recipe(AbstractModel):
    author = models.ForeignKey(to="core_user.User", on_delete=models.CASCADE)
    body = models.TextField()
    edited = models.BooleanField(default=False)
    cooking_time = models.DurationField(default=timedelta(minutes=0))
    ingredients = models.JSONField(default=list)
    instructions = models.JSONField(default=list)
    objects = RecipeManager()

    def __str__(self):
        return f"{self.author.name}"
