import React, { useCallback } from "react";
import currency from "currency.js";

const VALID_FIRST = /^[1-9]{1}$/;
const VALID_NEXT = /^[0-9]{1}$/;
const DELETE_KEY_CODE = 8;

const CurrencyInput = props => {
  const {
    className = "",
    style = {},
    currencyConfig = {
      locale: "en-US",
      currencyCode: "USD",
      currencyDisplay: "symbol",
      useGrouping: true,
      minimumFractionDigits: undefined
    },
    customInput,
    name,
    id,
    max = Number.MAX_SAFE_INTEGER,
    onChange,
    value
  } = props;

  const fakeChangeEvent = {
    target: {
      type: "number",
      name,
      id
    }
  };

  const valueInCents = currency(value).intValue;
  const valueAbsTrunc = Math.trunc(Math.abs(valueInCents));
  if (
    valueInCents !== valueAbsTrunc ||
    !Number.isFinite(valueInCents) ||
    Number.isNaN(valueInCents)
  ) {
    throw new Error(`invalid value property`);
  }
  const handleKeyDown = useCallback(
    e => {
      const { key, keyCode } = e;
      if (
        (valueInCents === 0 && !VALID_FIRST.test(key)) ||
        (valueInCents !== 0 &&
          !VALID_NEXT.test(key) &&
          keyCode !== DELETE_KEY_CODE)
      ) {
        return;
      }
      const valueString = valueInCents.toString();
      let nextValue;
      if (keyCode !== DELETE_KEY_CODE) {
        const nextValueString =
          valueInCents === 0 ? key : `${valueString}${key}`;
        nextValue = Number.parseInt(nextValueString, 10);
      } else {
        const nextValueString = valueString.slice(0, -1);
        nextValue =
          nextValueString === "" ? 0 : Number.parseInt(nextValueString, 10);
      }
      if (nextValue > max) {
        return;
      }
      // Enforce our division with currency to prevent rounding errors
      fakeChangeEvent.target.value = currency(nextValue / 100).value;
      onChange(fakeChangeEvent);
    },
    [max, onChange, valueInCents]
  );
  const handleChange = useCallback(() => {
    // DUMMY TO AVOID REACT WARNING
  }, []);

  const {
    locale,
    currencyCode,
    currencyDisplay,
    useGrouping,
    minimumFractionDigits
  } = currencyConfig;

  const valueDisplay = currency(valueInCents / 100).value.toLocaleString(
    locale,
    {
      style: "currency",
      currency: currencyCode,
      currencyDisplay,
      useGrouping,
      minimumFractionDigits
    }
  );

  const inputProps = {
    "data-testid": "currency-input",
    className: className,
    inputMode: "numeric",
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    style: style,
    value: valueDisplay
  };

  if (customInput) {
    const customProps = { ...props, ...inputProps };
    delete customProps.customInput;
    const CustomInput = customInput;
    return <CustomInput {...customProps} />;
  }

  return <input {...inputProps} />;
};

export default CurrencyInput;
