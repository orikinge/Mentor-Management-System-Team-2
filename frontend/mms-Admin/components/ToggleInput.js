import { Row, Switch } from "antd";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

import styles from "./componentStyles/privacy.module.scss"

const ToggleInput = ({ label, checked, handleChange }) => {
  return (
    <Row justify={"space-between"}>
      <span className={styles.label}>{label}</span>
      <span>
        <Switch
          checkedChildren={
            <AiOutlineCheck size={10} style={{ marginTop: "6px" }} />
          }
          unCheckedChildren={
            <AiOutlineClose size={10} style={{ marginTop: "6px" }} />
          }
          style={{ backgroundColor: checked ? "#058B94" : "#B3B3B3" }}
          checked={checked}
          onChange={handleChange}
        />
      </span>
    </Row>
  );
};

export default ToggleInput;
