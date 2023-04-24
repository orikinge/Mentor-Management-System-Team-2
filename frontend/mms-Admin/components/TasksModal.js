import React from "react";
import styles from "./componentStyles/tasksmodal.module.css";
import { Button, Modal } from "antd";
import Icon from "./Icon";
import { CustomButton } from "./formInputs/CustomInput";

export default function TasksModal({ 
    isModalOpen,
    isModelClose,
}) {
  return (
    <>
      <Modal
        className={styles.modal}
        centered
        open={isModalOpen}
        onCancel={isModelClose}
        footer={null}
        onClick={isModelClose}
        closable={true}>
        <div className={styles.modal_container}>
            <div className={styles.modal_container_task}>
                <div className={styles.modal_container_logo_task}>
                    <Icon
                    icon={"/assets/images/task.svg"}
                    width={"40px"}
                    height={"40px"}
                    />
                </div>
                <div className={styles.modal_container_item_task}>
                    <p>
                        Room library article written
                    </p>
                    <div className={styles.modal_container_div_task}>
                        <Icon
                        icon={"/assets/images/ClockLogo.svg"}
                        width={"16.5px"}
                        height={"16.5px"}
                        className={styles.modal_container_item_icon_task}
                        />
                        <div className={styles.modal_container_item_date_task}>3 days from now</div>
                    </div>
                 </div>
               </div> 
            </div>
            <div>
            <div className={styles.div_item_des}>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. 
              Pellentesque sit amet sapien fringilla, mattis ligula consectetur,
              </p>
              <div className={styles.div_item_des1}>
                <div className={styles.div_mentor_managers1}>
                  <Icon
                    icon={"/assets/images/Mentor_Managers.svg"}
                    width={"30px"}
                    height={"30px"}
                    className={styles.item_icon_mentor_managers}
                   />
                </div>
                <div className={styles.div_mentor_managers2}>
                      <div className={styles.amount_mentor_managers}>
                        10
                      </div>
                      <span className={styles.program_mentor_managers}>
                        Mentor Managers assigned to this program
                      </span>
                      <span className={styles.taskbuttonspan}>
                        <CustomButton className={styles.taskbutton}>
                            View
                        </CustomButton>
                      </span>
                      </div>
                    </div>
                    <div className={styles.div_item_des2}>
                    <div className={styles.div_mentor_managers1}>
                    <Icon
                      icon={"/assets/images/Mentor.svg"}
                      width={"30px"}
                      height={"30px"}
                      className={styles.item_icon_mentor_managers}
                    />
                  </div>
                  <div className={styles.div_mentor_managers2_1}>
                  <div className={styles.amount_mentor_managers2}>
                    80
                  </div>
                  <span className={styles.program_mentor_managers2}>
                    Mentors assigned to this program
                  </span>
                  <span className={styles.taskbuttonspan}>
                    <CustomButton className={styles.taskbutton1}>
                        View
                    </CustomButton>
                </span>
               </div>
              </div>
                

              <div className={styles.div_item_des2}>
                    <div className={styles.div_mentor_managers1}>
                    <Icon
                      icon={"/assets/images/reportstask.svg"}
                      width={"25px"}
                      height={"25px"}
                      className={styles.item_icon_mentor_managers}
                    />
                  </div>
                  <div className={styles.div_mentor_managers2_1}>
                  <div className={styles.amount_mentor_managers2}>
                    45
                  </div>
                  <span className={styles.program_mentor_managers3}>
                    Task reports
                  </span>
                  <span className={styles.taskbuttonspan}>
                    <CustomButton className={styles.taskbutton2}>
                        View
                    </CustomButton>
                </span>
               </div>
              </div>
            </div>
            <div className={styles.button_div}>
                <button className={styles.button_div_icon}>
                <Icon 
                icon={"/assets/images/Delete.svg"}
                width={"30px"}
                height={"30px"}
                /> Delete
                </button>

                <CustomButton className={styles.button_div_custom}>
                  Edit Task
                </CustomButton>
            </div>
        </div>
      </Modal>
    </>
  );
}
