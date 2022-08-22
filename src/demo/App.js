import React, { useState } from "react";
import { TextField } from "@mui/material";
import CurrencyInput from "../lib";

const App = (props) => {
  const [amount, setAmount] = useState(0);

  function handleChange(e) {
    setAmount(e.target.value);
  }

  return (
    <>
      <div style={{ padding: "1rem" }}>
        <CurrencyInput onChange={handleChange} value={amount} />
      </div>
      <div style={{ padding: "1rem" }}>
        <CurrencyInput
          onChange={handleChange}
          value={amount}
          customInput={TextField}
        />
      </div>
    </>
  );
};

export default App;
