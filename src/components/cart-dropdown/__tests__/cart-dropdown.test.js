import { render, screen } from "@testing-library/react";
import { renderWithProviders } from "../../../utils/test/test.utils";
import CartDropdown from "../cart-dropdown.component";

describe("cart dropdown tests", () => {
  test("Should render the cart dropdown", () => {
    renderWithProviders(<CartDropdown />, {
      preloadedState: {
        cart: {
          cartItems: [
            {
              id: 123123,
              name: "test",
              imageUrl: "hello",
              price: 1,
              quantity: 1,
            },
          ],
        },
      },
    });
    const output = screen.getByText(/test/i);
    expect(output).toBeInTheDocument();
  });
});
