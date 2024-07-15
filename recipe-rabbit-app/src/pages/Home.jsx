import React from "react";
import Layout from "../components/Layout";
import { Row, Col, Image } from "react-bootstrap";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import { getUser } from "../hooks/user.actions";
import { Recipe } from "../components/recipes";
import CreateRecipe from "../components/recipes/CreateRecipe";
import ProfileCard from "../components/profile/ProfileCard";

function Home() {
  const recipes = useSWR("/recipe/", fetcher, {
    refreshInterval: 20000,
  });
  const profiles = useSWR("/user/?limit=5", fetcher);

  const user = getUser();

  if (!user) {
    return <div>Loading!</div>;
  }

  // Sort recipes in reverse chronological order
  const sortedRecipes = recipes.data?.results.sort((a, b) => 
    new Date(b.created) - new Date(a.created)
  );

  return (
    <Layout>
      <Row className="justify-content-evenly">
        <Col sm={7}>
          <Row className="border rounded  align-items-center">
            <Col className="flex-shrink-1">
              <Image
                src={user.avatar}
                roundedCircle
                width={52}
                height={52}
                className="my-2"
              />
            </Col>
            <Col sm={10} className="flex-grow-1">
              <CreateRecipe refresh={recipes.mutate} />
            </Col>
          </Row>
          <Row className="my-4">
            {sortedRecipes?.map((recipe, index) => (
              <Recipe key={index} recipe={recipe} refresh={recipes.mutate} />
            ))}
          </Row>
        </Col>
        <Col sm={3} className="border rounded py-4 h-50">
          <h4 className="font-weight-bold text-center">Suggested people</h4>
          <div className="d-flex flex-column">
            {profiles.data &&
              profiles.data.results.map((profile, index) => (
                <ProfileCard key={index} user={profile} />
              ))}
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default Home;
