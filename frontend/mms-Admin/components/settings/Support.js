import React, { useEffect, useState } from "react";
import { Col, Row, Space, Upload } from "antd";
import { CustomInput, CustomTextArea, Label } from "../formInputs/CustomInput";
import { Icon } from "components/Icon/Icon";
import { Button } from "components/Button";
import styles from "../componentStyles/support.module.css";
import { validateInputs } from "utils/validateInputs";
import SuccessMessage from "components/SuccessMessage";
import { createSupportRequest } from "pages/api/support";

function Support() {
  const [token, setToken] = useState("");
  const [supportData, setSupportData] = useState({
    title: "",
    body: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");

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

  const props = {
    onRemove: (file) => {
      setFile("");
    },
    beforeUpload: (file) => {
      setFile(file);
      setImageUrl(URL.createObjectURL(file));

      return false;
    },
    file,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!supportData.title || !supportData.body) {
      return;
    }

    const valid = validateInputs(supportData);
    if (valid) {
      setMessage("");
      const formData = new FormData();

      try {
        if (file) {
          formData.append("imageUrl", file);
        }
        if (supportData.email) {
          formData.append("email", supportData.email);
        }

        formData.append("title", supportData?.title);

        formData.append("body", supportData?.body);

        setLoading(true);
        const response = await createSupportRequest(formData);

        if (response.status === 200 || response.status === 201) {
          setMessage("");
          setLoading(false);
          setSupportData({})
          setFile("")
          setIsSuccess(true);
        }

        if (response.status === 401 || response.status === 400) {
          setLoading(false);
          setMessage("Could not send Request");

          throw response;
        }
      } catch (e) {
        console.log(e);
        setMessage("Could not send Request");

        setLoading(false);
      }
    }
  };

  return (
    <Row className={styles.row_width} justify="center">
      <Space className={styles.row_width} size="middle" direction="vertical">
        <Label weight={"bold"} title="How can we help you?" />
        <CustomInput
          // onChange={handleOnchange}
          // value={supportData.name}
          name="name"
          placeholder="Name"
        />
        <CustomInput
          type="email"
          // onChange={handleOnchange}
          // value={supportData.email}
          name="email"
          placeholder="Email"
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
        <Label weight={"bold"} title={message} />

        <Row className={styles.space_container}>
          <Upload {...props}>
            <Icon name="Pin" />
          </Upload>
          <Button
            loading={loading}
            type="primary"
            size="large"
            onClick={handleSubmit}>
            Send
          </Button>
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
