import React from "react";
import Image from "next/image";
import { Button, Modal } from "antd";
import styles from "./componentStyles/splashscreen.module.css";
import { CustomButton } from "./formInputs/CustomInput";
import { useRouter } from "next/router";

function SuccessMessage({
  image,
  message,
  isModalOpen,
  setIsModalOpen,
  redirectLogin,
  reloadPage,
  success
}) {
  const router = useRouter();

  const handleOk = () => {
    if (redirectLogin) {
      setIsModalOpen(false);
      router.push("/login");
    } else {
      setIsModalOpen(false);
    }

    if (reloadPage) {
      router.reload();
    }

    if (success) {
      router.reload();
    }
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
        <div className={styles.modal_container}>
          <div>
            <p className={styles.modal_text}>{message}</p>
          </div>

          <div>
            <Image src={image} width="220" height="165" />;
          </div>
          <div>
            <CustomButton onClick={handleOk}>Done</CustomButton>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default SuccessMessage;
