import CategoryPreview from "../category-preview.component";
import { renderWithProviders } from "../../../utils/test/test.utils";

jest.mock("../../product-card/product-card.component", () => () => {
  return <div>ProductCard</div>;
});

describe("Category Preview component tests", () => {
  test("Should match snapshot", () => {
    const title = "My Title";
    const products = [
      { id: 1, name: "test", price: 1, imageUrl: "urlHere" },
      { id: 2, name: "test", price: 1, imageUrl: "urlHere" },
    ];
    // Sigurd - Working but it is rendering the Product Card component which we don't want..
    const res = renderWithProviders(
      <CategoryPreview title={title} products={products} />,
      {
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
      }
    );
    expect(res).toMatchSnapshot();
  });
});
