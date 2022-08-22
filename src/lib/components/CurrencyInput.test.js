import React from "react";
import { TextField } from "@mui/material";
import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import CurrencyInput from "./CurrencyInput";
import CurrencyInputTestWrapper from "./CurrencyInputTestWrapper";
import FormikTestWrapper from "./FormikTestWrapper";

// I know tests are testing implementation details as they are now, but I wanna make sure that the value you see is the value you get from the change event, to avoid unsynced behavior between the presentation and data

test("Displays the formatted currency value when user types a number, and returns the numeric value to onChange handler", () => {
  let state = 0;

  function handleChange(e) {
    state = e;
  }

  const { getByTestId } = render(
    <CurrencyInputTestWrapper setAmount={handleChange} />
  );

  // Since this is a ATM style input that writes right-to-left, we should simulate each keystroke to make sure that the result value is correct
  fireEvent.keyDown(getByTestId("currency-input"), {
    key: "1",
    keyCode: 49,
    charCode: 49,
  });
  fireEvent.keyDown(getByTestId("currency-input"), {
    key: "2",
    keyCode: 50,
    charCode: 50,
  });
  fireEvent.keyDown(getByTestId("currency-input"), {
    key: "3",
    keyCode: 51,
    charCode: 51,
  });

  expect(getByTestId("currency-input").value).toBe("$1.23");
  expect(state).toBe(1.23);
});

test("Performs a left-to-right deletion of values when backspace key is pressed", () => {
  let state = 0;

  function handleChange(e) {
    state = e;
  }

  const { getByTestId } = render(
    <CurrencyInputTestWrapper setAmount={handleChange} />
  );

  fireEvent.keyDown(getByTestId("currency-input"), { key: "1", keyCode: 49 });
  fireEvent.keyDown(getByTestId("currency-input"), { key: "2", keyCode: 50 });
  fireEvent.keyDown(getByTestId("currency-input"), { key: "3", keyCode: 51 });

  fireEvent.keyDown(getByTestId("currency-input"), {
    key: "Backspace",
    keyCode: 8,
  });

  // Deletion should be in "ATM style"
  expect(getByTestId("currency-input").value).toBe("$0.12");
  expect(state).toBe(0.12);
});

test("Does nothing if input is not a number", () => {
  let state = 0;

  function handleChange(e) {
    state = e;
  }

  const { getByTestId } = render(
    <CurrencyInputTestWrapper setAmount={handleChange} />
  );

  fireEvent.keyDown(getByTestId("currency-input"), { key: "a", keyCode: 65 });
  fireEvent.keyDown(getByTestId("currency-input"), { key: "b", keyCode: 66 });
  fireEvent.keyDown(getByTestId("currency-input"), { key: "c", keyCode: 67 });

  expect(getByTestId("currency-input").value).toBe("$0.00");
  expect(state).toBe(0);
});

test("Renders a Material UI TextField", () => {
  const { getByTestId } = render(
    <CurrencyInput customInput={TextField} value={0} />
  );

  expect(getByTestId("currency-input")).toHaveClass("MuiFormControl-root");
});

test("Works with Formik", async () => {
  let state = 0;

  function handleSubmit(e) {
    state = e;
  }

  // This wrapper is a form, we have to submit it to access the input values
  render(<FormikTestWrapper setAmount={handleSubmit} />);
  const { getByTestId } = screen;
  const user = userEvent.setup();

  await user.type(getByTestId("currency-input"), "1");
  await user.type(getByTestId("currency-input"), "2");
  await user.type(getByTestId("currency-input"), "3");
  await user.click(getByTestId("formik-test-wrapper-submit"));

  expect(state).toBe(1.23);
});

test("Renders different currency formats", () => {
  const { getByTestId } = render(
    <CurrencyInput
      value={0}
      currencyConfig={{ locale: "pt-BR", currencyCode: "BRL" }}
    />
  );

  expect(getByTestId("currency-input").value).toBe("R$\xa00,00");
});
