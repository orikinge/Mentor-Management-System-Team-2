import React, { useState } from 'react'
import styles from "../styles/tasks.module.css";
import TasksSidebar from '../components/TasksSidebar';
import Icon from '../components/Icon';
import { CustomButton } from '../components/formInputs/CustomInput';
import TasksModal from '../components/TasksModal';

function tasks() {
  const [data, setData] = useState(null);

  const handleDataChange = newData => {
    setData(newData);
  };
  return (
    <div className={styles.main_div}>
        <div className={styles.side_container}>
         <TasksSidebar onDataChanged={handleDataChange}/>
         </div>
         <div className={styles.main_container}>
          <div className={styles.main_container_sub}>
            <div className={styles.side_container_task}>
              <div className={styles.side_div_logo_task}>
                <Icon
                icon={"/assets/images/task.svg"}
                width={"40px"}
                height={"40px"}
                />
                </div>
                <div className={styles.side_div_item_task}>
                <p>
                  Room library article written in java
                </p>
                <div className={styles.side_div_item_div_task}>
                    <Icon
                    icon={"/assets/images/ClockLogo.svg"}
                    width={"16.5px"}
                    height={"16.5px"}
                    className={styles.side_div_item_icon_task}
                    />
                    <div className={styles.side_div_item_date_task}>3 days from now</div>
                </div>
              </div>
            </div>
            
            <div className={styles.side_div_item_des}>
              <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. 
              Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. 
              Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. 
              Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque
              </p>
              <div className={styles.side_div_item_des1}>
                <div className={styles.side_div_mentor_managers1}>
                  <Icon
                    icon={"/assets/images/Mentor_Managers.svg"}
                    width={"30px"}
                    height={"30px"}
                    className={styles.item_icon_mentor_managers}
                   />
                </div>
                <div className={styles.side_div_mentor_managers2}>
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
                    <div className={styles.side_div_item_des2}>
                    <div className={styles.side_div_mentor_managers1}>
                    <Icon
                      icon={"/assets/images/Mentor.svg"}
                      width={"30px"}
                      height={"30px"}
                      className={styles.item_icon_mentor_managers}
                    />
                  </div>
                  <div className={styles.side_div_mentor_managers2_1}>
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
                

              <div className={styles.side_div_item_des2}>
                    <div className={styles.side_div_mentor_managers1}>
                    <Icon
                      icon={"/assets/images/reportstask.svg"}
                      width={"30px"}
                      height={"30px"}
                      className={styles.item_icon_mentor_managers}
                    />
                  </div>
                  <div className={styles.side_div_mentor_managers2_1}>
                  <div className={styles.amount_mentor_managers2}>
                    45
                  </div>
                  <span className={styles.program_mentor_managers3}>
                    Task reports
                  </span>
                  <span className={styles.taskbuttonspan}>
                    <CustomButton className={styles.taskbutton1}>
                        View
                    </CustomButton>
                </span>
               </div>
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

            <CustomButton>
              Edit Task
            </CustomButton>
            </div>
       </div>
     </div>
  )
}

export default tasks