import { render, screen, fireEvent } from "../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import CreateRecipe from "../CreateRecipe";
import { faker } from "@faker-js/faker";

test("Renders CreateRecipe component", async () => {
  const user = userEvent.setup();
  render(<CreateRecipe />);

  const showModalForm = screen.getByTestId("show-modal-form");
  expect(showModalForm).toBeInTheDocument();

  // Clicking to show the modal

  fireEvent.click(showModalForm);

  const createFormElement = screen.getByTestId("create-recipe-form");
  expect(createFormElement).toBeInTheDocument();

  const recipeBodyField = screen.getByTestId("recipe-body-field");
  expect(recipeBodyField).toBeInTheDocument();

  const submitButton = screen.getByTestId("create-recipe-submit");
  expect(submitButton).toBeInTheDocument();

  expect(submitButton.disabled).toBeTruthy();

  const recipeBody = faker.lorem.sentence(10);

  await user.type(recipeBodyField, recipeBody);

  // Checking if field has the text and button is not disabled

  expect(recipeBodyField.value).toBe(recipeBody);
  expect(submitButton.disabled).toBeFalsy();
});
