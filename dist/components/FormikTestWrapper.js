"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireDefault(require("react"));

var _formik = require("formik");

var _CurrencyInput = _interopRequireDefault(require("./CurrencyInput"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formikTestWrapper(props) {
  return /*#__PURE__*/_react.default.createElement(_formik.Formik, {
    initialValues: {
      amount: 0
    },
    validate: values => {
      const errors = {};

      if (typeof values.amount !== "number") {
        errors.amount = "Amount should be a number!";
      }

      return errors;
    },
    onSubmit: values => {
      props.setAmount(values.amount);
    }
  }, _ref => {
    let {
      values,
      handleChange,
      handleSubmit
    } = _ref;
    return /*#__PURE__*/_react.default.createElement("form", {
      onSubmit: handleSubmit
    }, /*#__PURE__*/_react.default.createElement(_CurrencyInput.default, {
      name: "amount",
      onChange: handleChange,
      value: values.amount
    }), /*#__PURE__*/_react.default.createElement("button", {
      "data-testid": "formik-test-wrapper-submit",
      type: "submit"
    }, "Submit"));
  });
}

var _default = formikTestWrapper;
exports.default = _default;