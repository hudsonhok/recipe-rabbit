import React, { useState, useEffect } from "react";
import { Navbar, Container, Image, NavDropdown, Nav, FormControl, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import axiosService from "../helpers/axios";
import { getUser, useUserActions } from "../hooks/user.actions";

function NavigationBar() {
  const userActions = useUserActions();
  const user = getUser();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length > 0) {
      axiosService.get(`/recipe/search?q=${query}`)
        .then(response => {
          setSuggestions(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <Navbar className="navbar" variant="dark">
      <Container>
        <img
          src="/images/logo.png"
          width="40"
          height="40"
          className="d-inline-block align-top img-logo-padding"
          alt="Recipe Rabbit Logo"
        />
        <Navbar.Brand className="fw-bold" as={Link} to="/">
          Recipe Rabbit
        </Navbar.Brand>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <FormControl
            type="search"
            placeholder="Search Recipes"
            className="me-2"
            aria-label="Search"
            onChange={(e) => setQuery(e.target.value)}
          />
          {suggestions.length > 0 && (
            <Dropdown.Menu show style={{ position: 'absolute', top: '100%', left: 0, right: 0 }}>
              {suggestions.map((recipe) => (
                <Dropdown.Item as={Link} to={`/recipe/${recipe.id}/`} key={recipe.id}>
                  {recipe.title}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          )}
        </div>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <NavDropdown
              title={
                <Image src={user.avatar} roundedCircle width={36} height={36} />
              }
            >
              <NavDropdown.Item as={Link} to={`/profile/${user.id}/`}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={userActions.logout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
