import React from "react";

import Layout from "../components/Layout";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { Recipe } from "../components/recipes";
import CreateComment from "../components/comments/CreateComment";
import Comment from "../components/comments/Comment";

function SingleRecipe() {
  const { recipeId } = useParams();

  const recipe = useSWR(`/recipe/${recipeId}/`, fetcher);

  const comments = useSWR(`/recipe/${recipeId}/comment/`, fetcher);

  return (
    <Layout hasNavigationBack>
      {recipe.data ? (
        <Row className="justify-content-center">
          <Col sm={8}>
            <Recipe recipe={recipe.data} refresh={recipe.mutate} isSingleRecipe />
            <CreateComment recipeId={recipe.data.id} refresh={comments.mutate} />
            {comments.data &&
              comments.data.results.map((comment, index) => (
                <Comment
                  key={index}
                  recipeId={recipe.data.id}
                  comment={comment}
                  refresh={comments.mutate}
                />
              ))}
          </Col>
        </Row>
      ) : (
        <div>Loading...</div>
      )}
    </Layout>
  );
}

export default SingleRecipe;
