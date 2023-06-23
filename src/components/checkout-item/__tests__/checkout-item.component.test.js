import CheckoutItem from "../../checkout-item/checkout-item.component";
import { renderWithProviders } from "../../../utils/test/test.utils";
import { fireEvent } from "@testing-library/react";

describe("Checkout Item component test", () => {
  const cartItem = {
    name: "the name",
    imageUrl: "theImageUrl",
    price: 1,
    quantity: 1,
  };

  const removeItemHandler = jest.fn();
  test("Should match snapshot", () => {
    const res = renderWithProviders(<CheckoutItem cartItem={cartItem} />);
    expect(res).toMatchSnapshot();
  });

  // Not working.. not able to see if this function has been triggered
  // test("removeItemHandler to be clicked once", () => {
  //   const { container } = renderWithProviders(
  //     <CheckoutItem cartItem={cartItem} />
  //   );
  //   fireEvent.click(container.querySelector(".sigurd-test"));
  //   expect(removeItemHandler).toBeCalledTimes(1);
  // });
});
