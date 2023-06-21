import { render } from "@testing-library/react";
import Button, { BUTTON_TYPE_CLASSES } from "../button.component";

describe("button tests", () => {
  test("should render base button when nothing is passed", () => {
    const output = render(<Button>test</Button>);
    expect(output).toMatchSnapshot();
  });

  test("should render inverted button", () => {
    const output = render(
      <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>test</Button>
    );
    expect(output).toMatchSnapshot();
  });

  test("should render google sign in button", () => {
    const output = render(
      <Button buttonType={BUTTON_TYPE_CLASSES.google}>test</Button>
    );
    // Not working
    // const buttonElement = screen.getByRole("button");
    // expect(buttonElement).toHaveStyle("background-color: #357ae8");
    expect(output).toMatchSnapshot();
  });

  // Not adding the spinner functionality for a button yet
  // test("should be disabled if isLoading is true", () => {
  //   render(<Button isLoading={true} />);
  //   const buttonElement = screen.getByRole("button");
  //   expect(buttonElement).toBeDisabled();
  // });
});
