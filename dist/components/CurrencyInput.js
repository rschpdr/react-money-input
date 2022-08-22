"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.test.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.number.parse-int.js");

var _react = _interopRequireWildcard(require("react"));

var _currency = _interopRequireDefault(require("currency.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  const valueInCents = (0, _currency.default)(value).intValue;
  const valueAbsTrunc = Math.trunc(Math.abs(valueInCents));

  if (valueInCents !== valueAbsTrunc || !Number.isFinite(valueInCents) || Number.isNaN(valueInCents)) {
    throw new Error("invalid value property");
  }

  const handleKeyDown = (0, _react.useCallback)(e => {
    const {
      key,
      keyCode
    } = e;

    if (valueInCents === 0 && !VALID_FIRST.test(key) || valueInCents !== 0 && !VALID_NEXT.test(key) && keyCode !== DELETE_KEY_CODE) {
      return;
    }

    const valueString = valueInCents.toString();
    let nextValue;

    if (keyCode !== DELETE_KEY_CODE) {
      const nextValueString = valueInCents === 0 ? key : "".concat(valueString).concat(key);
      nextValue = Number.parseInt(nextValueString, 10);
    } else {
      const nextValueString = valueString.slice(0, -1);
      nextValue = nextValueString === "" ? 0 : Number.parseInt(nextValueString, 10);
    }

    if (nextValue > max) {
      return;
    } // Enforce our division with currency to prevent rounding errors


    fakeChangeEvent.target.value = (0, _currency.default)(nextValue / 100).value;
    onChange(fakeChangeEvent);
  }, [max, onChange, valueInCents, fakeChangeEvent]);
  const handleChange = (0, _react.useCallback)(() => {// DUMMY TO AVOID REACT WARNING
  }, []);
  const {
    locale,
    currencyCode,
    currencyDisplay,
    useGrouping,
    minimumFractionDigits
  } = currencyConfig;
  const valueDisplay = (0, _currency.default)(valueInCents / 100).value.toLocaleString(locale, {
    style: "currency",
    currency: currencyCode,
    currencyDisplay,
    useGrouping,
    minimumFractionDigits
  });
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
    const customProps = _objectSpread(_objectSpread({}, props), inputProps);

    delete customProps.customInput;
    delete customProps.currencyConfig;
    const CustomInput = customInput;
    return /*#__PURE__*/_react.default.createElement(CustomInput, customProps);
  }

  return /*#__PURE__*/_react.default.createElement("input", inputProps);
};

var _default = CurrencyInput;
exports.default = _default;