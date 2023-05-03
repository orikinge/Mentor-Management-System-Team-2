import React, { useState, useEffect } from 'react'
import styles from "styles/tasks.module.css";
import TasksSidebar from 'components/TasksSidebar';
import Icon from 'components/Icon';
import { CustomButton } from 'components/formInputs/CustomInput';
import moment from 'moment';
import { Card } from 'antd';
import DeleteTask from 'components/DeleteTask';


function tasks() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const handleDataChange = newData => {
    setData(newData);
  };
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const handleClickDelete = (e) => {
    e.preventDefault();
    setIsDeleteOpen(true);
  };
  return (
    <div className={styles.main_div}>
        <div className={styles.side_container}>
         <TasksSidebar onDataChanged={handleDataChange}/>
         </div>
         <div className={styles.main_container}>
         {data !== null ? (
          <>
          <div className={styles.main_container_sub}>
            <div className={styles.side_container_task}>
              <div className={styles.side_div_logo_task}>
                <Icon
                  icon={"/assets/images/task.svg"}
                  width={"40px"}
                  height={"40px"} />
              </div>
              <div className={styles.side_div_item_task}>
                <p>
                  {data?.title}
                </p>
                <div className={styles.side_div_item_div_task}>
                  <Icon
                    icon={"/assets/images/ClockLogo.svg"}
                    width={"16.5px"}
                    height={"16.5px"}
                    className={styles.side_div_item_icon_task} />
                  <div className={styles.side_div_item_date_task}>{moment(data?.endDate).diff(moment(), 'days')} days from now</div>
                </div>
              </div>
            </div>

            <div className={styles.side_div_item_des}>
              <p>
                {data?.description}
              </p>
              <div className={styles.side_div_item_des1}>
                <div className={styles.side_div_mentor_managers1}>
                  <Icon
                    icon={"/assets/images/Mentor_Managers.svg"}
                    width={"30px"}
                    height={"30px"}
                    className={styles.item_icon_mentor_managers} />
                </div>
                <div className={styles.side_div_mentor_managers2}>
                  <div className={styles.amount_mentor_managers}>
                    {data?.mentorManagerCount}
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
                    className={styles.item_icon_mentor_managers} />
                </div>
                <div className={styles.side_div_mentor_managers2_1}>
                  <div className={styles.amount_mentor_managers2}>
                    {data?.mentorCount}
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
                    className={styles.item_icon_mentor_managers} />
                </div>
                <div className={styles.side_div_mentor_managers2_1}>
                  <div className={styles.amount_mentor_managers2}>
                    {data?.taskReportCount}
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
              <button className={styles.button_div_icon} onClick={handleClickDelete}>
                <Icon
                  icon={"/assets/images/Delete.svg"}
                  width={"30px"}
                  height={"30px"} /> Delete
              </button>

              <CustomButton>
                Edit Task
              </CustomButton>
            </div>
            {isDeleteOpen && (
              <DeleteTask
                image={"/assets/images/deleteTask.svg"}
                message={"Task Deleted Successfully"}
                width={"300px"}
                height={"150px"}
                isDeleteOpen={isDeleteOpen}
                setIsDeleteOpen={setIsDeleteOpen}
                data={data}
              />
            )}
            </>
          ):(
            <>
            <div>
            <Card style={{ width: "100%"}} loading={loading} className={styles.card_div}></Card>
            <Card style={{ width: "100%"}} loading={loading} className={styles.card_div}></Card>
            <Card style={{ width: "100%"}} loading={loading} className={styles.card_div}></Card>
            </div>
            </>
          )}
       </div>
     </div>
  )
}

export default tasks