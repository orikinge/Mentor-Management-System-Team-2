import React from "react";
import Image from "next/image";
import { Button, Modal } from "antd";
import styles from "./componentStyles/splashscreen.module.css";

function SuccessMessage({
  image,
  message,
  width,
  height,
  isModalOpen,
  setIsModalOpen,
}) {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        className={styles.modal}
        centered
        open={isModalOpen}
        onOk={handleOk}
        footer={null}
        width={600}
        closable={false}>
        <div>
          <p className={styles.modal_text}>{message}</p>
        </div>
        <div>
          <Image src={image} width={width} height={height} />;
        </div>
        <div>
          <Button
            className={styles.modal_button}
            onClick={() => {
              setIsModalOpen(false);
            }}>
            Done
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default SuccessMessage;
