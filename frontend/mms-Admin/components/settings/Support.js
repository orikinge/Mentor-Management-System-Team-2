import React, { useEffect, useState } from "react";
import { Col, Row, Space } from "antd";
import {
  CustomInput,
  CustomTextArea,
  Label,
} from "../formInputs/CustomInput";
import { Icon } from "components/Icon/Icon";
import { Button } from "components/Button";
import styles from "../componentStyles/support.module.css";
import { supportRequest } from "utils/http";
import { validateInputs } from "utils/validateInputs";
import SuccessMessage from "components/SuccessMessage";

function Support() {
  const [token, setToken] = useState("");
  const [supportData, setSupportData] = useState({
    email: "",
    title: "",
    body: "",
    name: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      setToken(JSON.parse(localStorage.getItem("token")));
    }
  }, []);

  const handleOnchange = (e) => {
    e.preventDefault();
    setSupportData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const valid = validateInputs(supportData);
    if (valid) {
      try {
        const response = await supportRequest(token, supportData);

        if (response.status === 200 || response.status === 201) {
          setIsSuccess(true);
        }

        if (response.status === 401 || response.status === 400) {
          throw response;
        }
      } catch (e) {}
    }
  };

  return (
    <Row className={styles.row_width} justify="center">
      <Space className={styles.row_width} size="middle" direction="vertical">
        <Label weight={"bold"} title="How can we help you?" />
        <CustomInput
          onChange={handleOnchange}
          value={supportData.name}
          name="name"
          placeholder="Name"
          required
        />
        <CustomInput
          type="email"
          onChange={handleOnchange}
          value={supportData.email}
          name="email"
          placeholder="Email"
          required
        />
        <CustomInput
          onChange={handleOnchange}
          value={supportData.title}
          name="title"
          placeholder="Title"
          required
        />
        <CustomTextArea
          onChange={handleOnchange}
          value={supportData.body}
          name="body"
          rows={6}
          placeholder="body"
          required
        />
        <Row className={styles.space_container}>
          <Icon name="Pin" />
          <Button type="primary" size="large" onClick={handleSubmit}>Send</Button>
        </Row>
      </Space>

      {isSuccess && (
        <SuccessMessage
          image={"/assets/images/success.png"}
          message={"Ticket Successfully Created"}
          isModalOpen={isSuccess}
          setIsModalOpen={setIsSuccess}
        />
      )}
    </Row>
  );
}

export default Support;
