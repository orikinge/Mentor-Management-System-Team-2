import React, { useState } from "react";
import { useStateValue } from "store/context";
import styles from "../componentStyles/archive.module.css";
import Icon from "../Icon";
import moment from 'moment';
import { Accordion } from "../molecules/Accordion";


function Archive() {
  const [newData, setNewData] = useState([])
  const [ {search} ] = Object.values(useStateValue())
 
  
  return (
    <div className={styles.main_div}>
     {search?.data?.length > 0 ? (
      search?.data?.map(data => (
      <nav> 



         
      <Accordion
       key={data?.id}
       header={
        <div className={styles.main_sub_div} key={data?.id}>
        <div className={styles.main_sub_icon}>
          <Icon
            icon={"/assets/images/BlackGoogleLogo.svg"}
            width={"48px"}
            height={"48px"}
          />
        </div>
        <div className={styles.main_sub_content}>
          <h1 className="mb-4">{data?.name.slice(0, 50)}</h1>
          <div className={styles.main_sub_con_main}>
            <div className={styles.main_sub_con}>
              <span className={styles.main_sub_content_timeicon}>
                <Icon
                  icon={"/assets/images/ClockLogo.svg"}
                  width={"16.5px"}
                  height={"16.5px"}
                />
              </span>
              <div className={styles.main_sub_content_time}>{moment(data?.created_at).format('ll')}</div>
            </div>
            <div className={styles.main_sub_con}>
              <span className={styles.main_sub_content_timeicon1}>
                <Icon
                  icon={"/assets/images/MainClockLogo.svg"}
                  width={"18px"}
                  height={"18px"}
                />
              </span>
              <div className={styles.main_sub_content_time}>{moment(data?.created_at).format('LT')}</div>
            </div>
            <div className={styles.main_sub_con}>
              <span className={styles.main_sub_content_archor}>
                <Icon
                  icon={"/assets/images/Archor.svg"}
                  width={"20px"}
                  height={"20px"}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      }
      body={
        <>
          <p className={styles.task_description}>{data?.description}</p>
        </>
      }
      />
      </nav>
      ))) : ""}
    </div>
  );
}

export default Archive;



// <Accordion
// key={idx}
// header={
//   <div className="flex flex-justify-between flex-align-center">
//     <div className="flex flex-align-center">
//       <Icons name="task" fill="#058B94" margin="0 1rem 0 0" />
//       <div
//         className={`flex flex-justify-center flex-column ${styles.title_area}`}>
//         <h1 className={styles.task_title}>{task.title}</h1>
//         <div className="flex flex-align-center">
//           <Icons name="calendar" />
//           <p className={styles.brief_description}>
//             {formatDistance(new Date(task.endDate), new Date(), {
//               addSuffix: true,
//             })}
//           </p>
//         </div>
//       </div>
//     </div>
//     <Icons name="arrow-up" fill="#058B94" />
//   </div>
// }
// body={
//   <>
//     <p className={styles.task_description}>{task.description}</p>
//     <div
//       className={`flex flex-justify-between flex-align-center ${styles.task_stats}`}>
//       <div className="flex flex-align-center">
//         <Icons name="report-sheet" />

//         <div
//           className={`flex flex-align-center ${styles.report_stat}`}>
//           <h1 className={styles.number_of_reports}>
//             {task.reports.length}
//           </h1>
//           <p className={styles.stat_text}>Task reports</p>
//         </div>
//       </div>

//       <div>
//         <Button variant="normal" size="small">
//           View
//         </Button>
//       </div>
//     </div>
//   </>
// }
// footer={
//   <Button variant="transparent" size="large" bordered={true}>
//     Unassign from Task
//   </Button>
// }
// />
