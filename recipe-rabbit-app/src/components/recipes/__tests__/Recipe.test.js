import { render, screen } from "../../../helpers/test-utils";
import Recipe from "../Recipe";
import { setUserData } from "../../../hooks/user.actions";
import userFixtures from "../../../helpers/fixtures/user";
import recipeFixtures from "../../../helpers/fixtures/recipe";

const userData = userFixtures();

const recipeData = recipeFixtures(true, false, userData);

beforeEach(() => {
  // to fully reset the state between __tests__, clear the storage
  localStorage.clear();
  // and reset all mocks
  jest.clearAllMocks();

  setUserData({
    user: userData,
    access: null,
    refresh: null,
  });
});

test("render Recipe component", () => {
  render(<Recipe recipe={recipeData} />);

  const recipeElement = screen.getByTestId("recipe-test");

  expect(recipeElement).toBeInTheDocument();
});
