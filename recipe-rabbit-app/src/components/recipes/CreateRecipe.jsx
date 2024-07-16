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
    title: "",
    body: "",
    cooking_time: "",
    ingredients: "",
    instructions: "",
  });

  const [recipe_pic, setRecipe_pic] = useState();

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
  
    const formData = new FormData();
    formData.append("author", user.id);
    formData.append("title", form.title);
    formData.append("body", form.body);
    
    const cookingTimeWithSeconds = form.cooking_time + ":00";
    formData.append("cooking_time", cookingTimeWithSeconds);
    
    formData.append("ingredients", form.ingredients);
    formData.append("instructions", form.instructions);
    if (recipe_pic) {
      formData.append("recipe_pic", recipe_pic);
    }
  
    // Debugging: Log form data
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  
    axiosService
      .post("/recipe/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
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
                name="title"
                data-testid="recipe-title-field"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                as="textarea"
                rows={3}
                placeholder="Recipe Title"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Recipe Image</Form.Label>
              <Form.Control
                onChange={(e) => setRecipe_pic(e.target.files[0])}
                type="file"
                accept="image/*"
              />
            </Form.Group>
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
                placeholder="Cooking Time (hh:mm)"
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
