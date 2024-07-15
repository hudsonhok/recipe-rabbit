import { render, screen } from "./helpers/test-utils";
import App from "./App";

test("renders Welcome to Recipe Rabbit text", () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to Recipe Rabbit!/i);
  expect(linkElement).toBeInTheDocument();
});
