import React from "react";
import Image from "next/image";
import { Button, Modal } from "antd";
import styles from "./componentStyles/splashscreen.module.css";
import { CustomButton } from "./formInputs/CustomInput";
import Router from "next/router";
import NoSSRWrapper from "./DisableSSR";

function SuccessMessage({
  image,
  message,
  isModalOpen,
  setIsModalOpen,
  redirectLogin,
  reloadPage,
  success,
  logout
}) {
  const handleOk = () => {
    if (redirectLogin) {
      setIsModalOpen(false);
      Router.push("/login");
    } else {
      setIsModalOpen(false);
    }

    if (reloadPage) {
      Router.reload();
    }

    if (success) {
      Router.reload();
    }

    if(logout){
      localStorage.clear();
      sessionStorage.clear();
      Router.reload()
    }
  };

  return (
    <NoSSRWrapper>
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
    </NoSSRWrapper>
  );
}

export default SuccessMessage;
