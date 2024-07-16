import React, { useContext } from "react";
import { useLocation } from 'react-router-dom';
import { format } from "timeago.js";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Image, Card, Dropdown } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import UpdateRecipe from "./UpdateRecipe";
import { Context } from "../Layout";
import MoreToggleIcon from "../MoreToggleIcon";
import "../../App.css"

function Recipe(props) {
  const { recipe, refresh, isSingleRecipe } = props;
  const { setToaster } = useContext(Context);

  const user = getUser();
  const location = useLocation();

  const handleFavoriteClick = (action) => {
    axiosService
      .post(`/recipe/${recipe.id}/${action}/`)
      .then(() => {
        refresh();
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = () => {
    axiosService
      .delete(`/recipe/${recipe.id}/`)
      .then(() => {
        setToaster({
          type: "warning",
          message: "Recipe deleted 🚀",
          show: true,
          title: "Post Deleted",
        });
        refresh();
      })
      .catch(() => {
        setToaster({
          type: "danger",
          message: "An error occurred.",
          show: true,
          title: "Post Error",
        });
      });
  };

  return (
    <>
      <Card className="rounded-3 my-4" data-testid="recipe-test">
        <Card.Body>
          <Card.Title className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row">
              <Image
                src={recipe.author.avatar}
                roundedCircle
                width={48}
                height={48}
                className="me-2 border border-primary border-2"
              />
              <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                <p className="fs-6 m-0">{recipe.author.name}</p>
                <p className="fs-6 fw-lighter">
                  <small>{format(recipe.created)}</small>
                </p>
              </div>
            </div>
            {user.name === recipe.author.name && (
              <div>
                
                <Dropdown>
                  {location.pathname !== `/recipe/${recipe.id}/` && (
                    <Link to={`/recipe/${recipe.id}/`}>
                      <button className="btn btn-link text-decoration-none me-2">
                        View Recipe
                      </button>
                    </Link>
                  )}
                  <Dropdown.Toggle as={MoreToggleIcon}></Dropdown.Toggle>
                  <Dropdown.Menu>
                    <UpdateRecipe recipe={recipe} refresh={refresh} />
                    <Dropdown.Item
                      onClick={handleDelete}
                      className="text-danger"
                    >
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </Card.Title>
          <Card.Text className="recipe-title">{recipe.title}</Card.Text>
          {recipe.recipe_pic && (
            <Card.Img
              variant="top"
              src={recipe.recipe_pic}
              alt="Recipe Image"
              className="mt-3 scaled-img"
            />
          )}
          <Card.Text><div className="mt-3">{recipe.body}</div></Card.Text>
          <Card.Text>
            <strong>Cooking Time:</strong> {recipe.formatted_cooking_time}
          </Card.Text>
          <Card.Text>
            <strong>Ingredients:</strong> {recipe.ingredients}
          </Card.Text>
          <Card.Text>
            <strong>Instructions:</strong> {recipe.instructions}
          </Card.Text>
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row">
              <HeartFilled
                style={{
                  color: "#fff",
                  backgroundColor: "#0D6EFD",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "75%",
                  padding: "2px",
                  margin: "3px",
                }}
              />
              <p className="ms-1 fs-6">
                <small>{recipe.favorites_count} favorite</small>
              </p>
            </div>
            {!isSingleRecipe && (
              <p className="ms-1 fs-6">
                <small>
                  <Link to={`/recipe/${recipe.id}/`}>
                    {recipe.comments_count} comments
                  </Link>
                </small>
              </p>
            )}
          </div>
        </Card.Body>
        <Card.Footer className="d-flex bg-white w-50 justify-content-between border-0">
          <div className="d-flex flex-row">
            <HeartOutlined
              style={{
                width: "24px",
                height: "24px",
                padding: "2px",
                fontSize: "20px",
                color: recipe.favorited ? "#0D6EFD" : "#C4C4C4",
              }}
              onClick={() => {
                if (recipe.favorited) {
                  handleFavoriteClick("remove_favorite");
                } else {
                  handleFavoriteClick("favorite");
                }
              }}
            />
            <p className="ms-1">
              <small>Favorite</small>
            </p>
          </div>
        </Card.Footer>
      </Card>
    </>
  );
}

export default Recipe;
