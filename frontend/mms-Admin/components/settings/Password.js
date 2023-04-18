import React, { useState } from "react";
import Icon from "../Icon";
import { CustomInput, CustomButton, Label } from "../formInputs/CustomInput.js";
import styles from "../componentStyles/password.module.css";
import { Row, Col } from "antd";

function Password() {
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
          <CustomButton className={styles.button}>
            Save New Password
          </CustomButton>
        </Col>
      </Row>

      <div className={styles.forgot_password_text}>
        <p>Forgot Password?</p>
      </div>
    </div>
  );
}

export default Password;
