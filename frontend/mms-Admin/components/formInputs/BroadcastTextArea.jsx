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
  const [emojiPickerActive, setEmojiPickerActive] = useState(false);
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
    <div className="flex flex-justify-between flex-align-center gap-10">
      <span onClick={() => setEmojiPickerActive(!emojiPickerActive)}>
        <Icon name="Emoji" width="22px" height="22px" />
      </span>

      {emojiPickerActive && (
        <div className="relative">
          <div
            style={{
              position: "absolute",
              bottom: "80%",
              left: "50%",
              transform: "translate(-10%, -10px)",
            }}>
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
          </div>
        </div>
      )}

      <Icon name={"Attachment"} />

      <Input
        className={styles.message_input}
        placeholder="| Type a message..."
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default BroadcastTextArea;
