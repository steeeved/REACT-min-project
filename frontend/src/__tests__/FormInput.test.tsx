import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FormInput from "../components/FormInput";
// import { AlertCircle } from "lucide-react";

describe("FormInput Component", () => {
  const mockHandleInputChange = vi.fn();
  const props = {
    label: "Test Input",
    name: "testInput",
    value: "",
    error: "",
    handleInputChange: mockHandleInputChange,
    type: "text",
  };

  it("renders correctly with default props", () => {
    render(<FormInput {...props} />);

    const label = screen.getByText("Test Input *");
    expect(label).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("name", "testInput");
    expect(input).toHaveValue("");
  });

  it("displays the correct value", () => {
    render(<FormInput {...props} value="Test Value" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("Test Value");
  });

  it("calls handleInputChange when input changes", () => {
    render(<FormInput {...props} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "new value" } });

    expect(mockHandleInputChange).toHaveBeenCalledTimes(1);
  });

  it("displays error message when errored", () => {
    render(<FormInput {...props} error="Test error message" />);

    const errorMessage = screen.getByText("Test error message");
    expect(errorMessage).toBeInTheDocument();

    const errorIcon = screen.getByTestId("error-icon");
    expect(errorIcon).toBeInTheDocument();
  });

  it("applies correct maxLength from schema for different fields", () => {
    const { rerender } = render(
      <FormInput {...props} name="firstName" value="John" />
    );
    let input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("maxlength", "60");

    rerender(<FormInput {...props} name="lastName" value="Doe" />);
    input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("maxlength", "60");

    rerender(<FormInput {...props} name="email" value="test@example.com" />);
    input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("maxlength", "150");

    rerender(<FormInput {...props} name="title" value="Mr" />);
    input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("maxlength", "255");
  });

  it("displays correct character count based on schema maxLength", () => {
    const { rerender } = render(
      <FormInput {...props} name="firstName" value="John" />
    );

    const charCount = screen.getByText("4/60");
    expect(charCount).toBeInTheDocument();

    rerender(<FormInput {...props} name="firstName" value="Jonathan" />);
    expect(screen.getByText("8/60")).toBeInTheDocument();
  });
});
