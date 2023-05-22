import React, { useState } from "react";
import { Button } from "../../components/atoms/Button";
import styles from "../../styles/criteria-setup.module.scss";
import { Icons } from "../../components/atoms/Icons";
import { Inputs } from "../../components/atoms/Inputs";

const inputOptions = [
  { id: 1, name: "Single Input" },
  { id: 2, name: "Multiple Input" },
  { id: 3, name: "Yes/No" },
  { id: 4, name: "File Input" },
  { id: 5, name: "Multi-Choice" },
];

export const CriteriaInputModal = ({ onClose, onConfirm }) => {
  const [selectedInputOption, setSelectedInputOption] = useState("");

  return (
    <div>
      {!selectedInputOption ? (
        <CriteriaInputOptions setSelectedInputOption={setSelectedInputOption} />
      ) : (
        <AddQuestionsScreen selectedInputOption={selectedInputOption} />
      )}

      <div className={`flex flex-justify-between ${styles.action_buttons}`}>
        <Button variant="transparent" size="small" bordered onClick={onClose}>
          Cancel
        </Button>
        {selectedInputOption && (
          <Button variant="normal" size="small" bordered onClick={onClose}>
            Done
          </Button>
        )}
      </div>
    </div>
  );
};

function CriteriaInputOptions({ setSelectedInputOption }) {
  function handleSelect(e) {
    setSelectedInputOption(e.target.value);
  }

  return (
    <>
      <h1 className={`${styles.input_modal_title}`}>Select Input Type</h1>

      <div className={`flex flex-column ${styles.input_type_options}`}>
        {inputOptions.map((item) => {
          return (
            <label htmlFor={item.id} key={item.id}>
              <input
                id={item.id}
                name="input_option"
                type="radio"
                onClick={handleSelect}
                value={item.name}
              />
              <div>{item.name}</div>
            </label>
          );
        })}
      </div>
    </>
  );
}

function AddQuestionsScreen({ selectedInputOption }) {
  if (selectedInputOption === "Single Input")
    return (
      <>
        <h1 className={styles.input_type_title}>Input Single Question</h1>
        <Inputs type="text" placeholder="Input question here" />
      </>
    );

  if (selectedInputOption === "Multiple Input")
    return (
      <>
        <h1 className={styles.input_type_title}>Multiple Input Question</h1>
        <Inputs type="text" placeholder="Input question here" />
        <Inputs
          type="select"
          options={[
            { value: 1, label: "1 Input" },
            { value: 2, label: "2 Inputs" },
          ]}
        />
      </>
    );

  if (selectedInputOption === "Yes/No")
    return (
      <>
        <h1 className={styles.input_type_title}>Input Yes or No Question</h1>
        <Inputs type="text" placeholder="Input question here" />
        <div className={`flex flex-align-center gap-16`}>
          <Icons name="circle-add" /> <span>Add another question</span>
        </div>
      </>
    );

  if (selectedInputOption === "File Input")
    return (
      <>
        <h1 className={styles.input_type_title}>Input File Request</h1>
        <Inputs type="text" placeholder="Input question here" />
        <div className={`flex flex-align-center gap-16`}>
          <Inputs type="text" placeholder="Input question here" />

          <Inputs
            type="select"
            options={[{ value: "0", label: "File type" }]}
          />

          <Inputs type="select" options={[{ value: "0", label: "Qty" }]} />
        </div>

        <div className={`flex flex-align-center gap-16`}>
          <Icons name="circle-add" /> <span>Add field</span>
        </div>
      </>
    );

  if (selectedInputOption === "Multi-Choice")
    return (
      <>
        <h1 className={styles.input_type_title}>
          Input Multiple Select Option
        </h1>

        <Inputs type="text" placeholder="Input question here" />

        <Inputs
          type="text"
          placeholder="Option 1"
          icon={<Icons name="subtract" />}
        />

        <div className={`flex flex-align-center flex-justify-end`}>
          <Icons name="circle-add" />
        </div>
      </>
    );

  return null;
}
