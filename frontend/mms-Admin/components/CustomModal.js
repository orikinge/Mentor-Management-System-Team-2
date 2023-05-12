import { Button, Modal, Row, Col, Input, message, Upload } from "antd";
import { useState, useEffect } from "react";
import SuccessMessage from "./SuccessMessage";
import {
  CustomButton,
  CustomInput,
  CustomTextArea,
} from "./formInputs/CustomInput";
import styles from "../styles/admin/discussionForum.module.css";
import { Icon } from "./Icon/Icon";
import EmojiPicker from "emoji-picker-react";
import { createPost } from "pages/api/forum";
import NoSSRWrapper from "./DisableSSR";

export const CustomFormModal = ({
  newTopic,
  setNewTopic,
  posts,
  setPosts,
  setSuccess,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [emojis, showEmojis] = useState(false);
  const [file, setFile] = useState();
  const [uploading, setUploading] = useState(false);
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    emoji: "happy face",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setPostData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const props = {
    onRemove: (file) => {
      // const index = fileList.indexOf(file);
      // const newFileList = fileList.slice();
      // newFileList.splice(index, 1);
      setFile("");
    },
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
    file,
  };

  const handleSubmit = async (event) => {
    //call api here
    event.preventDefault();
    console.log(postData);
    try {
      if (!postData.title || !postData.description) {
        setConfirmLoading(false);
        return;
      }

      setConfirmLoading(true);
      setMessage("");

      const formData = new FormData();
      if (file) {
        formData.append("imageUrl", file);
      }
      formData.append("title", postData.title);
      formData.append("description", postData.description);
      formData.append("emoji", JSON.stringify(postData.emoji));

      const response = await createPost(formData);

      if (response?.status === 201) {
        setConfirmLoading(true);
        setPostData({});
        setNewTopic(false);
        setSuccess(true);
      }

      if (
        response?.status === 401 ||
        response?.status === 400 ||
        response?.status === 403
      ) {
        setConfirmLoading(false);
        setMessage(response?.message);
        throw response;
      }
    } catch (e) {
      setConfirmLoading(false);
      setMessage(e.message);
    }
  };
  const handleCancel = () => {
    setNewTopic(false);
  };

  return (
    <>
    <NoSSRWrapper>
      <Modal
        className={styles.modal}
        open={newTopic}
        onOk={handleSubmit}
        width={866}
        footer={
          <CustomButton loading={confirmLoading} onClick={handleSubmit}>
            Post to forum
          </CustomButton>
        }
        confirmLoading={confirmLoading}
        closable={false}>
        <Row className={styles.modal_container}>
          {message && <p>{message}</p>}

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
            value={postData.title}
            onChange={handleChange}
          />
          <Row className={styles.body_row}>
            <CustomTextArea
              rows={6}
              placeholder="start typing ..."
              name="description"
              value={postData.description}
              onChange={handleChange}
              className={styles.textarea}
            />
            <Row className={styles.emojis}>
              <Row>
                <Col
                  onClick={() => {
                    showEmojis(!emojis);
                  }}
                  className={styles.smiley}>
                  <Icon name="SmileyFace" />
                </Col>

                <Upload {...props}>
                  <Icon name="Pin" color="#058B94" />
                </Upload>
              </Row>
            </Row>
            <Row className={styles.emojis_container}>
              {emojis && (
                <EmojiPicker
                  onEmojiClick={(emoji, e) => {
                    setPostData((prevState) => ({
                      ...prevState,
                      description: prevState.description + emoji.emoji,
                    }));
                  }}
                  skinTonesDisabled={true}
                  width={"100%"}
                />
              )}
            </Row>
          </Row>
        </Row>
      </Modal>
      </NoSSRWrapper>
    </>
  );
};
