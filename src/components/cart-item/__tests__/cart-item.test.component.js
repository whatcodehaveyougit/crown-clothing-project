import { render } from "@testing-library/react";
import CartItem from "../cart-item.component";

describe("Cart item component tests", () => {
  test("Should match snapshot", () => {
    const cartItem = {
      name: "Name",
      imageUrl: "The Title",
      price: 1,
      quantity: 1,
    };
    const output = render(<CartItem cartItem={cartItem}>test</CartItem>);
    expect(output).toMatchSnapshot();
  });
});
