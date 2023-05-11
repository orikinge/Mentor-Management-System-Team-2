import React, { useState } from "react";
import Image from "next/image";
import { Modal } from "antd";
import styles from "./componentStyles/splashscreen.module.css";
import { CustomButton } from "./formInputs/CustomInput";
import toast from 'react-hot-toast';
import { deleteMentor } from "pages/api/mentor";
function DeleteMentor({
  image,
  message,
  width,
  height,
  isDeleteOpen,
  setIsDeleteOpen,
  mentorId
}) {
  const handleClose = () => {
    setIsDeleteOpen(false);
  };
  const [loading, setLoading] = useState(false);


  const DeleteMentor = async (mentorId) => {
    setLoading(true);
    try {
      const response = await deleteMentor(mentorId);
      if (response.status === 200) {
        toast.success(response?.data?.statusText);
        setIsDeleteOpen();
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
      toast.error(e);
    } finally {
      setIsDeleteOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        className={styles.modal}
        centered
        open={isDeleteOpen}
        onOk={handleClose}
        footer={null}
        width={600}
        closable={false}>
        <div className={styles.modal_container}>
          <div>
            <p className={styles.modal_text}>{message}</p>
          </div>

          <div>
            <Image src={image} width={width} height={height} />
          </div>
          <div>
            <CustomButton onClick={handleClose} className={styles.modal_b1}>Undo</CustomButton>
            <CustomButton onClick={()=> DeleteMentor(mentorId)} className={styles.modal_b2}>Done</CustomButton>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DeleteMentor;
