import React from "react";
import { Modal } from "antd";
import styles from "./componentStyles/splashscreen.module.css";
import { CustomButton, CustomInput } from "./formInputs/CustomInput";


function AddMentorSuccess({
  message,
  open,
  setOpen,
  email,
  handle
}) {
  const handleClose = () => {
    setOpen(false);
    handle()
  };


  return (
    <>
      <Modal
        className={styles.modal}
        centered
        open={open}
        onOk={handleClose}
        footer={null}
        width={500}
        height={300}
        closable={false}>
        <div className={styles.modal_container}>
          <div>
            <p className={styles.modal_text}>{message}</p>
          </div>
          <div className={styles.invite_input}>
            <p>An invitation has been sent to {email} successfully</p>
          </div>
            <CustomButton onClick={handleClose} className={styles.modal_b2}>Done</CustomButton>
        </div>
      </Modal>
    </>
  );
}

export default AddMentorSuccess;
