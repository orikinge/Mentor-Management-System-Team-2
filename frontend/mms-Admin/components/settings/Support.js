import React from "react";
import { Col, Row, Space } from "antd";
import { CustomButton, CustomInput, CustomTextArea, Label } from "../formInputs/CustomInput";
import {Icon} from "components/Icon/Icon";
import styles from "../componentStyles/support.module.css"

function Support() {
  return (
    <Row className={styles.row_width} justify="center">
      <Space className={styles.row_width} size="middle" direction="vertical">
        <Label weight={"bold"} title="How can we help you?" />
        <CustomInput placeholder="Name" />
        <CustomInput type="email" placeholder="Email" />
        <CustomInput placeholder="Title" />
        <CustomTextArea rows={6} placeholder="body" />
        <Row
        className={styles.space_container}>  
          <Icon name="Pin" />
          <CustomButton>
            Send 
          </CustomButton>
        </Row>
      </Space>
    </Row>
  );
}

export default Support;
