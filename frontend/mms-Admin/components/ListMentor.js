import React from 'react';
import { Row, Col, Avatar } from 'antd';
import Icon from "./Icon";
import styles from "./componentStyles/listmentor.module.css"
import DeleteMentor from './DeleteMentor';
import { useStateValue } from "store/context";
import Link from "next/link";

function ListMentor() {

  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [mentorId, setMentorId] = React.useState(null);
  const [ {gridState} ] = Object.values(useStateValue())
  const handleClickDelete = (itemId) => {
    // e.preventDefault();
    setIsDeleteOpen(true);
    setMentorId(itemId)
  };
  return (
    <div className={styles.container}>
        <Row gutter={[18, 16]}>
        {gridState?.mentors?.mentors?.data.length > 0 ? (
          gridState?.mentors?.mentors?.data?.map(item => (
          <Col xs={24} sm={24} md={24} lg={24} key={item?.id}>
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
                    size={50}
                    icon={
                    <Icon
                    icon={"/assets/images/admin_avatar.png"}
                    width={"50px"}
                    height={"50px"}
                    />
                    }
                  />

                ) : (
                  <Avatar
                    size={50}
                    icon={
                    <Icon
                    icon={"/assets/images/admin_avatar.png"}
                    width={"50px"}
                    height={"50px"}
                    />
                    }
                  />
                )}
                </div>
                </Link>
                <div className={styles.gutter_box_main}>
                  <div className={styles.gutter_box_main_title}>
                    <Col className={styles.gutter_box_main_title_sub} xs={18} sm={18} md={18} lg={18}>
                      <h1 className={styles.gutter_box_main_header}>{item?.first_name} {item?.last_name}</h1>
                      <h2 className={styles.gutter_box_main_p}>Program Assistant, Andela, He/him</h2>
                    </Col>
                    <Col className={styles.gutter_box_main_span} xs={18} sm={18} md={18} lg={18}>
                      <span className={styles.gutter_box_main_span1}>PROGRAM ASST.</span>  <span className={styles.gutter_box_main_span2}>MENTOR-GADS.</span>
                    </Col>
                  </div>
                  <div className={styles.gutter_box_main_icon}>
                    <Col className={styles.gutter_box_main_icon1} xs={18} sm={18} md={18} lg={18}>
                        <Icon 
                        icon={"/assets/images/circle-chat.svg"}
                        width={"20px"}
                        height={"20px"}
                    />
                    </Col>
                    <Col className={styles.gutter_box_main_icon2} xs={18} sm={18} md={18} lg={18} onClick={()=> handleClickDelete(item?.id)}>
                     <Icon 
                        icon={"/assets/images/trash-delete.svg"}
                        width={"20px"}
                        height={"20px"}
                     />
                    </Col>
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

export default ListMentor