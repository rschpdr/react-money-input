"use strict";

require("core-js/modules/es.promise.js");

var _react = _interopRequireDefault(require("react"));

var _material = require("@mui/material");

var _react2 = require("@testing-library/react");

var _userEvent = _interopRequireDefault(require("@testing-library/user-event"));

require("@testing-library/jest-dom/extend-expect");

var _CurrencyInput = _interopRequireDefault(require("./CurrencyInput"));

var _CurrencyInputTestWrapper = _interopRequireDefault(require("./CurrencyInputTestWrapper"));

var _FormikTestWrapper = _interopRequireDefault(require("./FormikTestWrapper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// I know tests are testing implementation details as they are now, but I wanna make sure that the value you see is the value you get from the change event, to avoid unsynced behavior between the presentation and data
test("Displays the formatted currency value when user types a number, and returns the numeric value to onChange handler", () => {
  let state = 0;

  function handleChange(e) {
    state = e;
  }

  const {
    getByTestId
  } = (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_CurrencyInputTestWrapper.default, {
    setAmount: handleChange
  })); // Since this is a ATM style input that writes right-to-left, we should simulate each keystroke to make sure that the result value is correct

  _react2.fireEvent.keyDown(getByTestId("currency-input"), {
    key: "1",
    keyCode: 49,
    charCode: 49
  });

  _react2.fireEvent.keyDown(getByTestId("currency-input"), {
    key: "2",
    keyCode: 50,
    charCode: 50
  });

  _react2.fireEvent.keyDown(getByTestId("currency-input"), {
    key: "3",
    keyCode: 51,
    charCode: 51
  });

  expect(getByTestId("currency-input").value).toBe("$1.23");
  expect(state).toBe(1.23);
});
test("Performs a left-to-right deletion of values when backspace key is pressed", () => {
  let state = 0;

  function handleChange(e) {
    state = e;
  }

  const {
    getByTestId
  } = (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_CurrencyInputTestWrapper.default, {
    setAmount: handleChange
  }));

  _react2.fireEvent.keyDown(getByTestId("currency-input"), {
    key: "1",
    keyCode: 49
  });

  _react2.fireEvent.keyDown(getByTestId("currency-input"), {
    key: "2",
    keyCode: 50
  });

  _react2.fireEvent.keyDown(getByTestId("currency-input"), {
    key: "3",
    keyCode: 51
  });

  _react2.fireEvent.keyDown(getByTestId("currency-input"), {
    key: "Backspace",
    keyCode: 8
  }); // Deletion should be in "ATM style"


  expect(getByTestId("currency-input").value).toBe("$0.12");
  expect(state).toBe(0.12);
});
test("Does nothing if input is not a number", () => {
  let state = 0;

  function handleChange(e) {
    state = e;
  }

  const {
    getByTestId
  } = (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_CurrencyInputTestWrapper.default, {
    setAmount: handleChange
  }));

  _react2.fireEvent.keyDown(getByTestId("currency-input"), {
    key: "a",
    keyCode: 65
  });

  _react2.fireEvent.keyDown(getByTestId("currency-input"), {
    key: "b",
    keyCode: 66
  });

  _react2.fireEvent.keyDown(getByTestId("currency-input"), {
    key: "c",
    keyCode: 67
  });

  expect(getByTestId("currency-input").value).toBe("$0.00");
  expect(state).toBe(0);
});
test("Renders a Material UI TextField", () => {
  const {
    getByTestId
  } = (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_CurrencyInput.default, {
    customInput: _material.TextField,
    value: 0
  }));
  expect(getByTestId("currency-input")).toHaveClass("MuiFormControl-root");
});
test("Works with Formik", async () => {
  let state = 0;

  function handleSubmit(e) {
    state = e;
  } // This wrapper is a form, we have to submit it to access the input values


  (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_FormikTestWrapper.default, {
    setAmount: handleSubmit
  }));
  const {
    getByTestId
  } = _react2.screen;

  const user = _userEvent.default.setup();

  await user.type(getByTestId("currency-input"), "1");
  await user.type(getByTestId("currency-input"), "2");
  await user.type(getByTestId("currency-input"), "3");
  await user.click(getByTestId("formik-test-wrapper-submit"));
  expect(state).toBe(1.23);
});
test("Renders different currency formats", () => {
  const {
    getByTestId
  } = (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_CurrencyInput.default, {
    value: 0,
    currencyConfig: {
      locale: "pt-BR",
      currencyCode: "BRL"
    }
  }));
  expect(getByTestId("currency-input").value).toBe("R$\xa00,00");
});