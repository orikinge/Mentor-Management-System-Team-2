import { Button, Modal, Row, Input, message, Upload } from "antd";
import { useState, useReducer } from "react";
import SuccessMessage from "./SuccessMessage";
import {
  CustomButton,
  CustomInput,
  CustomTextArea,
  Label,
} from "./formInputs/CustomInput";
import styles from "../styles/admin/discussionForum.module.css";
import { Icon } from "./Icon/Icon";

export const CustomFormModal = ({
  newTopic,
  setNewTopic,
  formData,
  setFormData,
  posts,
  setPosts,
  setSuccess,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const props = {
    name: "file",
    action: " ",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (event) => {
    //call api here
    event.preventDefault();
    setConfirmLoading(true);
    setPosts((posts) => [...posts, formData]);
    setFormData({});
    setNewTopic(false);
    setSuccess(true);
  };
  const handleCancel = () => {
    setNewTopic(false);
  };

  return (
    <>
      <Modal
        className={styles.modal}
        open={newTopic}
        onOk={handleSubmit}
        width={866}
      
        footer={
          <CustomButton onClick={handleSubmit}>Post to forum</CustomButton>
        }
        confirmLoading={confirmLoading}
        closable={false}>
        <Row className={styles.modal_container}>
          <Row className={styles.header_row}>
            <div className={styles.topic}>New Topic</div>
            <div style={{ cursor: "pointer" }} onClick={handleCancel}>
              <Icon name="Close" />
            </div>
          </Row>

          <CustomInput
            placeholder="Enter a title"
            className={styles.mb_title}
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <Row className={styles.body_row}>
            <CustomTextArea
              rows={6}
              placeholder="start typing ..."
              name="post"
              value={formData.post}
              onChange={handleChange}
              className={styles.textarea}
            />
            <Row>
              <Input
                className={styles.smiley}
                prefix={<Icon name="SmileyFace" />}
                value={newTopic ? formData.post : ""}
                onChange={handleChange}
              />
              <Upload {...props}>
                <Button
                  className={styles.border}
                  icon={<Icon name="Pin" color="#058B94" />}></Button>
              </Upload>
            </Row>
          </Row>
        </Row>
      </Modal>
    </>
  );
};
