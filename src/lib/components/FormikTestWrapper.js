import React from "react";
import { Formik } from "formik";
import CurrencyInput from "./CurrencyInput";

function formikTestWrapper(props) {
  return (
    <Formik
      initialValues={{ amount: 0 }}
      validate={values => {
        const errors = {};
        if (typeof values.amount !== "number") {
          errors.amount = "Amount should be a number!";
        }
        return errors;
      }}
      onSubmit={values => {
        props.setAmount(values.amount);
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <CurrencyInput
            name="amount"
            onChange={handleChange}
            value={values.amount}
          />
          <button data-testid="formik-test-wrapper-submit" type="submit">
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
}

export default formikTestWrapper;
