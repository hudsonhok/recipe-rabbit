import React, { useContext, useState } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { Context } from "../Layout";

function UpdateRecipe(props) {
  const { recipe, refresh } = props;
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    author: recipe.author.id,
    body: recipe.body,
    cooking_time: recipe.cooking_time,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
  });

  const { setToaster } = useContext(Context);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateRecipeForm = event.currentTarget;

    if (updateRecipeForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      author: form.author,
      body: form.body,
      cooking_time: form.cooking_time,
      ingredients: form.ingredients,
      instructions: form.instructions,
    };

    axiosService
      .put(`/recipe/${recipe.id}/`, data)
      .then(() => {
        handleClose();
        setToaster({
          type: "success",
          message: "Recipe updated 🚀",
          show: true,
          title: "Success!",
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
      <Dropdown.Item data-testid="show-modal-form" onClick={handleShow}>
        Modify
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Update Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            data-testid="update-recipe-form"
          >
            <Form.Group className="mb-3">
              <Form.Control
                name="body"
                value={form.body}
                data-testid="recipe-body-field"
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                as="textarea"
                rows={3}
                placeholder="Recipe Description"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                name="cooking_time"
                value={form.cooking_time}
                data-testid="recipe-cooking-time-field"
                onChange={(e) =>
                  setForm({ ...form, cooking_time: e.target.value })
                }
                type="text"
                placeholder="Cooking Time"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                name="ingredients"
                value={form.ingredients}
                data-testid="recipe-ingredients-field"
                onChange={(e) =>
                  setForm({ ...form, ingredients: e.target.value })
                }
                as="textarea"
                rows={3}
                placeholder="Ingredients"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                name="instructions"
                value={form.instructions}
                data-testid="recipe-instructions-field"
                onChange={(e) =>
                  setForm({ ...form, instructions: e.target.value })
                }
                as="textarea"
                rows={3}
                placeholder="Instructions"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            data-testid="update-recipe-submit"
            variant="primary"
            onClick={handleSubmit}
          >
            Modify
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateRecipe;
