import { render } from "@testing-library/react";
import CategoryItem from "../category-item.component";

describe("Cart item component tests", () => {
  test("Should match snapshot", () => {
    const category = {
      title: "Name",
      imageUrl: "The Title",
    };
    const output = render(
      <CategoryItem category={category}>test</CategoryItem>
    );
    expect(output).toMatchSnapshot();
  });
});
