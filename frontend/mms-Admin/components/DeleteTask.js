import React from "react";
import Image from "next/image";
import { Modal } from "antd";
import styles from "./componentStyles/splashscreen.module.css";
import { CustomButton } from "./formInputs/CustomInput";
import toast from 'react-hot-toast';
import axios from "../pages/api/axios";

function DeleteTask({
  image,
  message,
  width,
  height,
  isDeleteOpen,
  setIsDeleteOpen,
  data
}) {
  const handleClose = () => {
    setIsDeleteOpen(false);
  };

  const DeleteTask = (taskId) => {
      
    const token = 'OA.YWauKgOJ1E1AB7PBhAt5vlGbS4qrTxVPyyBKffhg3Dcqll0OnN2ZyfA8hKxe';

    axios.delete(`task/delete/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('Deleted successfully:', response.data);
      toast.success(response?.data?.message);
      setIsDeleteOpen(false);
    })
    .catch(error => {
      console.error('Delete failed:', error);
      toast.error(error);
    });
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
            <Image src={image} width={width} height={height} />;
          </div>
          <div>
            <CustomButton onClick={handleClose} className={styles.modal_b1}>Undo</CustomButton>
            <CustomButton onClick={()=> DeleteTask(data.id)} className={styles.modal_b2}>Done</CustomButton>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default DeleteTask;
