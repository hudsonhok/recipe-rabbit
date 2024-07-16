import React from "react";
import Layout from "../components/Layout";
import { Row, Col } from "react-bootstrap";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { getUser } from "../hooks/user.actions";
import { Recipe } from "../components/recipes";

function Favorites() {
  const user = getUser();

  const { data: favorites, error, mutate } = useSWR("/recipe/favorites/", fetcher, {
    refreshInterval: 20000,
  });

  if (!user) {
    return <div>Loading!</div>;
  }

  if (error) {
    return <div>Error loading favorites.</div>;
  }

  return (
    <Layout>
      <Row className="justify-content-center">
        <Col sm={8}>
          <h3 className="text-center my-4">Your Favorite Recipes</h3>
          <Row>
            {favorites?.map((recipe, index) => (
              <Recipe key={index} recipe={recipe} refresh={mutate} />
            ))}
          </Row>
        </Col>
      </Row>
    </Layout>
  );
}

export default Favorites;
