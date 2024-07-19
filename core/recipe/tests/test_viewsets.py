from rest_framework import status

from core.fixtures.user import user
from core.fixtures.recipe import recipe

class TestRecipeViewSet:
    endpoint = '/api/recipe/'

    def test_list(self, client, user, recipe):
        client.force_authenticate(user=user)
        response = client.get(self.endpoint)
        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == 1

    def test_retrieve(self, client, user, recipe):
        client.force_authenticate(user=user)
        response = client.get(self.endpoint + str(recipe.public_id) + "/")
        assert response.status_code == status.HTTP_200_OK
        assert response.data['id'] == recipe.public_id.hex
        assert response.data['body'] == recipe.body
        assert response.data['author']['id'] == recipe.author.public_id.hex

    def test_create(self, client, user):
        client.force_authenticate(user=user)
        data = {
            "author": user.public_id.hex,
            "title": "Recipe Title",
            "body": "Test Recipe Body",
            "cooking_time": 30,
            "ingredients": "Test ingredients",
            "instructions": "Test instructions"
        }
        response = client.post(self.endpoint, data)
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['body'] == data['body']
        assert response.data['author']['id'] == user.public_id.hex

    def test_update(self, client, user, recipe):
        client.force_authenticate(user=user)
        data = {
            "title": "Updated Recipe Title",
            "body": "Updated Recipe Body",
            "cooking_time": 45,
            "ingredients": "Updated ingredients",
            "instructions": "Updated instructions",
            "author": user.public_id.hex
        }
        response = client.put(self.endpoint + str(recipe.public_id) + "/", data)
        # Print response content for debugging
        print(response.content)
        assert response.status_code == status.HTTP_200_OK
        assert response.data['body'] == data['body']

    def test_delete(self, client, user, recipe):
        client.force_authenticate(user=user)
        response = client.delete(self.endpoint + str(recipe.public_id) + "/")
        assert response.status_code == status.HTTP_204_NO_CONTENT

    def test_list_anonymous(self, client, recipe):
        response = client.get(self.endpoint)
        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == 1

    def test_retrieve_anonymous(self, client, recipe):
        response = client.get(self.endpoint + str(recipe.public_id) + "/")
        assert response.status_code == status.HTTP_200_OK
        assert response.data['id'] == recipe.public_id.hex
        assert response.data['body'] == recipe.body
        assert response.data['author']['id'] == recipe.author.public_id.hex

    def test_create_anonymous(self, client):
        data = {
            "body": "Test Recipe Body",
            "author": "test_user"
        }
        response = client.post(self.endpoint, data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_update_anonymous(self, client, recipe):
        data = {
            "body": "Test Recipe Body",
            "author": "test_user"
        }
        response = client.put(self.endpoint + str(recipe.public_id) + "/", data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_delete_anonymous(self, client, recipe):
        response = client.delete(self.endpoint + str(recipe.public_id) + "/")
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
