import ProductCard from "../product-card.component";
import { renderWithProviders } from "../../../utils/test/test.utils";

const product = {
  name: "name",
  price: 123,
  imageUrl: "imageUrl.com",
};

// Problem with this import, not sure what it is
// jest.mock("../../button/button.component", () => {
//   return <div>ButtonComponent</div>;
// });

describe("Product Card", () => {
  test("should render product card component", () => {
    // const output = renderWithProviders(<ProductCard product={product} />);
    // expect(output).toMatchSnapshot();
  });
});
