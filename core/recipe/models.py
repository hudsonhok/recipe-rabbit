from django.db import models
from datetime import timedelta
from core.abstract.models import AbstractModel, AbstractManager

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.public_id, filename)

class RecipeManager(AbstractManager):
    pass

class Recipe(AbstractModel):
    author = models.ForeignKey(to="core_user.User", on_delete=models.CASCADE)
    recipe_pic = models.ImageField(null=True, blank=True, upload_to=user_directory_path)
    body = models.TextField()
    edited = models.BooleanField(default=False)
    cooking_time = models.DurationField(default=timedelta(minutes=0))
    ingredients = models.TextField()
    instructions = models.TextField()
    
    
    objects = RecipeManager()

    def __str__(self):
        return f"{self.author.name}"
