import React from "react";
import Image from "next/image";
import { Button, Modal } from "antd";
import styles from "./componentStyles/splashscreen.module.css";
import { CustomButton } from "./formInputs/CustomInput";
import { useRouter } from "next/router";


function SuccessMessage({
  image,
  message,
  width,
  height,
  isModalOpen,
  setIsModalOpen,
  redirectLogin

}) {
  
  const router = useRouter()
  
  const handleOk = () => {
    if(redirectLogin){
      setIsModalOpen(false);
      router.push("/login")

    }
    else{
      setIsModalOpen(false);

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
            <Image src={image} width={width} height={height} />;
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
