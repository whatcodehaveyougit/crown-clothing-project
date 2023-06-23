import { render } from "@testing-library/react";
import FormInput from "../form-input.component";

jest.mock("../../category-item/category-item.component", () => {
  return <div>CategoryItem</div>;
});

describe("Form Input", () => {
  test("should render form input component", () => {
    const output = render(
      <FormInput label="Hello" onChange={jest.fn()} type="required" value="" />
    );
    expect(output).toMatchSnapshot();
  });
});
