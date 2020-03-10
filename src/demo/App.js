import React, { useState } from "react";
import CurrencyInput from "../lib";

const App = props => {
  const [amount, setAmount] = useState(0);

  function handleChange(e) {
    setAmount(e.target.value);
  }

  return (
    <>
      <div style={{ padding: "1rem" }}>
        <CurrencyInput onChange={handleChange} value={amount} />
      </div>
    </>
  );
};

export default App;
