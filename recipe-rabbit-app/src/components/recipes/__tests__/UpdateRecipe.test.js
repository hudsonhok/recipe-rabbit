import { render, screen, fireEvent } from "../../../helpers/test-utils";
import userEvent from "@testing-library/user-event";
import UpdateRecipe from "../UpdateRecipe";
import userFixtures from "../../../helpers/fixtures/user";
import recipeFixtures from "../../../helpers/fixtures/recipe";
import { faker } from "@faker-js/faker";

const userData = userFixtures();

const recipeData = recipeFixtures(true, false, userData);

test("Render UpdateRecipe component", async () => {
  const user = userEvent.setup();
  render(<UpdateRecipe recipe={recipeData} />);

  const showModalForm = screen.getByTestId("show-modal-form");
  expect(showModalForm).toBeInTheDocument();

  // Clicking to show the modal

  fireEvent.click(showModalForm);

  const updateFormElement = screen.getByTestId("update-recipe-form");
  expect(updateFormElement).toBeInTheDocument();

  const recipeBodyField = screen.getByTestId("recipe-body-field");
  expect(recipeBodyField).toBeInTheDocument();

  const submitButton = screen.getByTestId("update-recipe-submit");
  expect(submitButton).toBeInTheDocument();

  const recipeBody = faker.lorem.sentence(10);

  await user.type(recipeBodyField, recipeBody);

  // Checking if field has the text and button is not disabled

  expect(recipeBodyField.value).toBe(recipeData.body + recipeBody);
  expect(submitButton.disabled).toBeFalsy();
});
