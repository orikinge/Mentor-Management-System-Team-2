import React, { useState } from "react";
import styles from "../componentStyles/privacy.module.scss"
import ToggleInput from "components/ToggleInput";

const inputFields = [
  {
    name: "contact",
    label: "Show contact info",
  },
  {
    name: "github",
    label: "Show GitHub",
  },
  {
    name: "instagram",
    label: "Show Instagram",
  },
  {
    name: "linkedin",
    label: "Show LinkedIn",
  },
  {
    name: "twitter",
    label: "Show Twitter",
  }
];
const Privacy = () => {
  const [state, setState] = useState(() => Object.fromEntries(inputFields.map(input => [input.name, false])))
  
  const handleChange = (name) => {
    setState((prevState) => {
      return {
        ...prevState, [name]: !prevState[name]
      }
    });
  };

  return (
    <div className={styles.main}>
      {inputFields.map((field) => (
        <ToggleInput
          key={field.name}
          label={field.label}
          checked={state[field.name]}
          handleChange={() => handleChange(field.name)} />
      ))}
    </div>
  );
}

export default Privacy;

