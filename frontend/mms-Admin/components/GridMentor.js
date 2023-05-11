import React from 'react';
import { Row, Col, Avatar } from 'antd';
import Icon from "./Icon";
import styles from "./componentStyles/gridmentor.module.css"
import DeleteMentor from './DeleteMentor';
import { useStateValue } from "store/context";
import Link from "next/link";

function GridMentor() {
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [mentorId, setMentorId] = React.useState(null);
  const [Id, setId] = React.useState(null);
  const [ {gridState} ] = Object.values(useStateValue())

  const handleClickDelete = (itemId) => {
    // e.preventDefault();
    setIsDeleteOpen(true);
    setMentorId(itemId)
  };

  const getMentor = (itemId) => {
    setId(itemId)
  }
  return (
    <div className={styles.container}>
        <Row gutter={[18, 16]}>
        {gridState?.mentors?.mentors?.data.length > 0 ? (
          gridState?.mentors?.mentors?.data?.map(item => (
          <Col xs={12} sm={12} md={12} lg={12} key={item?.id}>
            <div className={styles.gutter_box}>
              <div className={styles.gutter_box_container}>
              <Link
                href={{
                pathname: `/mentors/tasks/${item?.id}`,
                query: {
                  id: item?.id,
                  fullName: `${item?.first_name} ${item?.last_name}`,
                  avatar: '',
                  designation: 'Mentor'
                },
              }}>
                <div className={styles.gutter_box_avatar}>
                {item?.profile_image_path !== null ? (
                  <Avatar
                    size={73}
                    icon={
                    <Icon
                    icon={"/assets/images/admin_avatar.png"}
                    width={"73px"}
                    height={"73px"}
                    />
                    }
                  />

                ) : (
                  <Avatar
                    size={73}
                    icon={
                    <Icon
                    icon={"/assets/images/admin_avatar.png"}
                    width={"73px"}
                    height={"73px"}
                    />
                    }
                  />
                )}
                  
                </div>
                </Link>
                <div className={styles.gutter_box_main}>
                  <div className={styles.gutter_box_main_title}>
                    <h1 className={styles.gutter_box_main_header}>{item?.first_name} {item?.last_name}</h1>
                    <h2 className={styles.gutter_box_main_p}>Program Assistant, Andela, He/him</h2>
                    <span className={styles.gutter_box_main_span1}>PROGRAM ASST.</span>  <span className={styles.gutter_box_main_span2}>MENTOR-GADS.</span>
                  </div>
                  <div className={styles.gutter_box_main_icon}>
                    <div className={styles.gutter_box_main_icon1}>
                        <Icon 
                        icon={"/assets/images/circle-chat.svg"}
                        width={"20px"}
                        height={"20px"}
                    />
                    </div>
                    <div className={styles.gutter_box_main_icon2} onClick={()=> handleClickDelete(item?.id)}>
                     <Icon 
                        icon={"/assets/images/trash-delete.svg"}
                        width={"20px"}
                        height={"20px"}
                     />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          ))
       ): (
        <div>No Mentor</div>
       )}
       </Row>
       {isDeleteOpen && (
        <DeleteMentor
          image={"/assets/images/deleteTask.svg"}
          message={"Mentor Deleted Successfully"}
          width={"400px"}
          height={"200px"}
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          mentorId={mentorId}
        />
      )}
    </div>
  )
}

export default GridMentor