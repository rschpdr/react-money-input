import React, { useState, useEffect } from 'react';
import CurrencyInput from './CurrencyInput';

function TestWrapper(props) {
  const [amount, setAmount] = useState(0);

  function handleChange(e) {
    setAmount(e.target.value);
  }

  useEffect(() => {
    props.setAmount(amount);
  }, [amount]);

  return <CurrencyInput onChange={handleChange} value={amount} />;
}

export default TestWrapper;
