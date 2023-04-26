import styles from "../componentStyles/broadcast.module.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Icon } from "components/Icon/Icon";
import { Input, Upload, Button, Row, Col } from "antd";
import { useState } from "react";

const BroadcastTextArea = ({ handleSubmit }) => {
  const { TextArea } = Input;
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState(false);
  const fileList = [];
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value;
      handleSubmit(value);
      setMessage("");
      setFile(null);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native);
  };

  return (
    <Row>
      <Col span={2} className={styles.text_area_btn}>
        <button onClick={() => setEmoji(!emoji)}>
          <Icon name={"Emoji"} />
        </button>
        {emoji && (
          <>
            <div
              style={{
                position: "absolute",
                bottom: "80%",
                left: "50%",
                transform: "translate(-10%, -10px)",
              }}>
              <Picker data={data} onEmojiSelect={handleEmojiSelect} />
            </div>
          </>
        )}
        <Upload
          action="#"
          listType="picture"
          defaultFileList={[...fileList]}>
          <Button
            className={styles.upload_btn}
            icon={<Icon name={"Attachment"} />}
          />
        </Upload>
      </Col>
      <Col span={22}>
        <TextArea
          className={styles.text_message_area}
          placeholder="| Type a message..."
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          autoSize={{ minRows: 1, maxRows: 6 }}
        />
      </Col>
    </Row>
  );
};

export default BroadcastTextArea;
