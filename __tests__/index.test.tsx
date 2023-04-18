import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";

jest.mock("next-auth/react", () => {
  const data = {
    user: { email: "test@test.dev" },
  };
  return {
    useSession: jest.fn(() => {
      return { data, status: "authenticated" };
    }),
  };
});

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /Всё в одной ссылке/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

it("renders homepage unchanged", () => {
  const { container } = render(<Home />);
  expect(container).toMatchSnapshot();
});
