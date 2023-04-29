import { useState } from "react";
import {  CustomInput, Label } from "../formInputs/CustomInput.js";
import styles from "../componentStyles/password.module.css";
import { Col, Row, Button } from "antd";

function Password() {
  const [loading, setLoading] = useState(false);
  return (
    <div className={styles.container}>
      <Row className={styles.sub_container}>
        <Col sm={6}>
          <Label title={"Current Password"} />
        </Col>
        <Col xs={18} sm={17}>
          <CustomInput
            type={"password"}
            placeholder="Must be at least 8 characters"
            size={"small"}
          />
        </Col>
      </Row>

      <Row className={styles.sub_container}>
        <Col sm={6}>
          <Label title={"New Password"} />
        </Col>
        <Col xs={18} sm={17}>
          <CustomInput
            type={"password"}
            placeholder="Must be at least 8 characters"
            size={"small"}
          />
        </Col>
      </Row>
      <Row className={styles.sub_container}>
        <Col sm={6}>
          <Label title={"Confirm New Password"} />
        </Col>
        <Col xs={18} sm={17}>
          <CustomInput
            type={"password"}
            placeholder="Must be at least 8 characters"
            size={"small"}
          />
        </Col>
      </Row>

      <Row className={styles.btn_container}>
        <Col sm={22} className={styles.btn_sub}>
          <Button className={styles.button} loading={loading}>
            Save New Password
          </Button>
        </Col>
      </Row>

      <div className={styles.forgot_password_text}>
        <p>Forgot Password?</p>
      </div>
    </div>
  );
}

export default Password;
