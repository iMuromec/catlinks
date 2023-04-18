import { render, screen } from "@testing-library/react";
import EditPage from "../pages/edit";
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

it("renders edit page unchanged", () => {
  const { container } = render(<EditPage />);
  expect(container).toMatchSnapshot();
});
