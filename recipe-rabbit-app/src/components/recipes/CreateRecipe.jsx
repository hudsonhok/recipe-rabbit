import React, { useState, useContext } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import { Context } from "../Layout";

function CreateRecipe(props) {
  const { refresh } = props;
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    author: "",
    body: "",
    cooking_time: "",
    ingredients: "",
    instructions: "",
  });

  const { setToaster } = useContext(Context);

  const user = getUser();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const createRecipeForm = event.currentTarget;

    if (createRecipeForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      author: user.id,
      body: form.body,
      cooking_time: form.cooking_time,
      ingredients: form.ingredients,
      instructions: form.instructions,
    };

    axiosService
      .post("/recipe/", data)
      .then(() => {
        handleClose();
        setToaster({
          type: "success",
          message: "Recipe created 🚀",
          show: true,
          title: "Post Success",
        });
        setForm({});
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
      <Form.Group className="my-3 w-75">
        <Form.Control
          className="py-2 rounded-pill border-primary text-primary"
          data-testid="show-modal-form"
          type="text"
          placeholder="Write a recipe"
          onClick={handleShow}
        />
      </Form.Group>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Create Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            data-testid="create-recipe-form"
          >
            <Form.Group className="mb-3">
              <Form.Control
                name="body"
                data-testid="recipe-body-field"
                value={form.body}
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
                data-testid="recipe-cooking-time-field"
                value={form.cooking_time}
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
                data-testid="recipe-ingredients-field"
                value={form.ingredients}
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
                data-testid="recipe-instructions-field"
                value={form.instructions}
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
            variant="primary"
            onClick={handleSubmit}
            disabled={!form.body || !form.cooking_time || !form.ingredients || !form.instructions}
            data-testid="create-recipe-submit"
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateRecipe;
