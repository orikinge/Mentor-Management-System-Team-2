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

function processInputType(type) {
  switch (type) {
    case "Single Input":
      return "text";
    case "Multiple Input":
      return "select";
    case "Yes/No":
      return "boolean";
    case "File Input":
      return "upload";
    case "Multi-Choice":
      return "checkbox";
    default:
      return "text";
  }
}

export const CriteriaInputModal = ({
  setCriteriaConfig,
  criteriaConfig,
  onClose,
}) => {
  const [selectedInputOption, setSelectedInputOption] = useState("");

  return (
    <div>
      {!selectedInputOption ? (
        <CriteriaInputOptions
          setSelectedInputOption={setSelectedInputOption}
          setCriteriaConfig={setCriteriaConfig}
          criteriaConfig={criteriaConfig}
          onClose={onClose}
        />
      ) : (
        <AddQuestionsScreen
          selectedInputOption={selectedInputOption}
          setCriteriaConfig={setCriteriaConfig}
          onClose={onClose}
          setSelectedInputOption={setSelectedInputOption}
        />
      )}
    </div>
  );
};

function CriteriaInputOptions({
  selectedInputOption,
  setSelectedInputOption,
  setCriteriaConfig,
  onClose,
  criteriaConfig,
}) {
  function handleSelect(e) {
    setSelectedInputOption(e.target.value);
  }

  return (
    <>
      <div>
        <>
          <h1 className={styles.input_type_title}>Criteria Title</h1>
          <Inputs
            type="text"
            placeholder="Enter title for criteria"
            onChange={(e) =>
              setCriteriaConfig((prev) => ({ ...prev, title: e.target.value }))
            }
            value={criteriaConfig.title}
          />
        </>
      </div>

      <div>
        <>
          <h1 className={styles.input_type_title}>Description</h1>
          <Inputs
            type="text"
            placeholder="Provide an optional description for the criteria"
            onChange={(e) =>
              setCriteriaConfig((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            value={criteriaConfig.description}
          />
        </>
      </div>

      <div>
        <h1 className={styles.input_type_title}>Select Input Type</h1>

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
      </div>

      <Footer
        onClose={onClose}
        selectedInputOption={selectedInputOption}
        setSelectedInputOption={setSelectedInputOption}
      />
    </>
  );
}

const initalQuestionData = {
  label: "",
  type: "",
};

function AddQuestionsScreen({
  selectedInputOption,
  onClose,
  setSelectedInputOption,
  setCriteriaConfig,
}) {
  const [question, setQuestion] = useState(initalQuestionData);

  function handleQuestionInput(e) {
    setQuestion({
      label: e.target.value,
      type: processInputType(selectedInputOption),
    });
  }

  function submitEntry(data) {
    setCriteriaConfig((prev) => ({
      ...prev,
      formFields: [...prev.formFields, data],
    }));
    setQuestion(initalQuestionData);
    onClose();
  }

  if (selectedInputOption === "Single Input")
    return (
      <>
        <h1 className={styles.input_type_title}>Input Single Question</h1>
        <Inputs
          type="text"
          placeholder="Input question here"
          value={question.label}
          onChange={handleQuestionInput}
        />
        <Footer
          onClose={onClose}
          done={() => submitEntry(question)}
          selectedInputOption={selectedInputOption}
          setSelectedInputOption={setSelectedInputOption}
        />
      </>
    );

  if (selectedInputOption === "Multiple Input")
    return (
      <>
        <h1 className={styles.input_type_title}>Multiple Input Question</h1>
        <Inputs
          type="text"
          placeholder="Input question here"
          value={question.title}
          onChange={handleQuestionInput}
        />
        <Inputs
          type="select"
          options={[
            { value: 1, label: "1 Input" },
            { value: 2, label: "2 Inputs" },
          ]}
        />
        <Footer
          onClose={onClose}
          done={() => submitEntry(question)}
          selectedInputOption={selectedInputOption}
          setSelectedInputOption={setSelectedInputOption}
        />
      </>
    );

  if (selectedInputOption === "Yes/No")
    return (
      <>
        <h1 className={styles.input_type_title}>Input Yes or No Question</h1>
        <Inputs
          type="text"
          placeholder="Input question here"
          value={question.title}
          onChange={handleQuestionInput}
        />
        <div className={`flex flex-align-center gap-16`}>
          <Icons name="circle-add" /> <span>Add another question</span>
        </div>
        <Footer
          onClose={onClose}
          done={() => submitEntry(question)}
          selectedInputOption={selectedInputOption}
          setSelectedInputOption={setSelectedInputOption}
        />
      </>
    );

  if (selectedInputOption === "File Input")
    return (
      <>
        <h1 className={styles.input_type_title}>Input File Request</h1>
        <Inputs
          type="text"
          placeholder="Input question here"
          value={question.title}
          onChange={handleQuestionInput}
        />
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

        <Footer
          onClose={onClose}
          done={() => submitEntry(question)}
          selectedInputOption={selectedInputOption}
          setSelectedInputOption={setSelectedInputOption}
        />
      </>
    );

  if (selectedInputOption === "Multi-Choice")
    return (
      <>
        <h1 className={styles.input_type_title}>
          Input Multiple Select Option
        </h1>

        <Inputs
          type="text"
          placeholder="Input question here"
          value={question.title}
          onChange={handleQuestionInput}
        />

        <Inputs
          type="text"
          placeholder="Option 1"
          icon={<Icons name="subtract" />}
        />

        <div className={`flex flex-align-center flex-justify-end`}>
          <Icons name="circle-add" />
        </div>

        <Footer
          onClose={onClose}
          done={() => submitEntry(question)}
          selectedInputOption={selectedInputOption}
          setSelectedInputOption={setSelectedInputOption}
        />
      </>
    );

  return null;
}

function Footer({
  selectedInputOption,
  setSelectedInputOption,
  onClose,
  done,
}) {
  return (
    <>
      <div className={`flex flex-justify-between ${styles.action_buttons}`}>
        {selectedInputOption ? (
          <Button
            variant="transparent"
            size="small"
            bordered
            onClick={() => setSelectedInputOption("")}>
            Back
          </Button>
        ) : (
          <Button variant="transparent" size="small" bordered onClick={onClose}>
            Cancel
          </Button>
        )}
        {selectedInputOption && (
          <Button variant="normal" size="small" bordered onClick={done}>
            Done
          </Button>
        )}
      </div>
    </>
  );
}
