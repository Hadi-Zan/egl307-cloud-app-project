import { render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ visits: 19 }),
    })
  );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders the project title and Redis visit count", async () => {
  render(<App />);

  expect(
    screen.getByRole("heading", {
      name: /EGL307 Cloud Application Project/i,
    })
  ).toBeInTheDocument();

  expect(await screen.findByText(/Total visits:/i)).toBeInTheDocument();

  expect(global.fetch).toHaveBeenCalledWith(
    "http://localhost:5000/api/visits"
  );
});