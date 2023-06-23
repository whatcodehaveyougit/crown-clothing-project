import { render } from "@testing-library/react";
import Directory from "../directory.component";

jest.mock("../../category-item/category-item.component", () => () => {
  return <div>CategoryItem</div>;
});

const categories = [
  {
    id: "123",
    category: "123",
  },
  {
    id: "234",
    category: "234",
  },
];

describe("Directory tests", () => {
  test("should render directory component", () => {
    const output = render(<Directory categories={categories} />);
    expect(output).toMatchSnapshot();
  });
});
