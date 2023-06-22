import { Avatar, Card, Space, Col, Row } from "antd";
import cardStyle from "../styles/admin/about.module.scss";
import Icon from "./Icon";
import { Icon as Iconn } from "./Icon/Icon";
import styles from "./componentStyles/customCard.module.css";
import { useRouter } from "next/router";
import getUserRole from "../utils/getUserRole.js";
import Link from "next/link";
import moment from "moment";
import { EditPostModal,EditCommentModal } from "./EditPostModal";
import { useEffect, useState } from "react";
import SuccessMessage from "./SuccessMessage";
import NoSSRWrapper from "./DisableSSR";
import { capitalize } from "utils/capitalize";

export const PostCard = ({ data, fullPost, names }) => {
  const [showEdit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);

  console.log(data) 

  const router = useRouter();
  const handleEdit = (e, data) => {
    e.preventDefault();
    setEdit(true);
  };

  const handleCommentsClick = (e, id, name) => {
    e.preventDefault(); 
    router.push({
      pathname: "/discussion-forum/[id]",
      query: {
        id: data.id,
        first_name: data?.user?.first_name,
        last_name: data?.user?.last_name,
      },
    });
  };
  return (
    <NoSSRWrapper>
      <Row className="w-full">
        <Card className={styles.card}>
          <Row span={24} className="flex justify-between items-start align-center">
            <div className="flex ">
              <Avatar
                size={45}
                icon={
                  <Icon
                    icon={"/assets/images/admin_avatar.png"}
                    width={"45px"}
                    height={"45px"}
                  />
                }
              />
              <div style={{ marginLeft: "18px" }} className={styles.profile}>
                <p className={styles.title}>
                  {names
                    ? names
                    : capitalize(data?.user?.first_name ) + " " + capitalize(data?.user?.last_name)}
                </p>
                <p className={styles.role}>{getUserRole(data?.user)}</p>
              </div>
            </div>
            <div onClick={(e) => handleEdit(e, data)}>
              <Iconn name="Horizon" />
            </div>
          </Row>
 
          <Link
            href={{
              pathname: "/discussion-forum/[id]",
              query: {
                id: data.id,
                first_name: data?.user?.first_name,
                last_name: data?.user?.last_name,
              },
            }}>
            <div>
              <div className={styles.row_mt}>
                <p className={styles.data_title}>
                  {capitalize(data?.title)}
                </p>
              </div>
              <Row>
                {fullPost ? (
                  <div className={styles.data_post}>
                    <p>{data?.description}</p>
                  </div>
                ) : (
                  <div className={styles.data_post}>
                    <p>
                      {data?.description.slice(0, 500)}

                      {data?.description?.length > 500 ? "  ....." : ""}
                    </p>
                  </div>
                )}
              </Row>
            </div>
          </Link>
          <Row className="pt-6 flex justify-between  items-end mt-4">
            <div className="flex  w-32 justify-between" >
              <div onClick={handleCommentsClick}>
                <Iconn name="Comment" />
              </div>
              <div>
                <Iconn name="Share" />
              </div>
              <div>
                <Iconn name="BookMark" />
              </div>
            </div>
          
              <div className="flex justify-end items-center" >
                <div>
                  <Iconn name="Clock" />
                </div>
                <div className={styles.clock}>
                  {moment(data.created_at).fromNow(true)}
                </div>
              </div>
          </Row>
        </Card>

        {showEdit && (
          <EditPostModal
            newTopic={showEdit}
            setNewTopic={setEdit}
            data={data}
            setSuccess={setSuccess}
          />
        )}
        {success && (
          <SuccessMessage
            image={"/assets/images/success.png"}
            message={"Post Updated Successfully"}
            width={"220px"}
            height={"165px"}
            isModalOpen={success}
            setIsModalOpen={setSuccess}
            reloadPage={data?.id}
          />
        )}
      </Row>
    </NoSSRWrapper>
  );
};

export const CommentCard = ({ data }) => {
 
  return (
    <NoSSRWrapper>
      <Row className={styles.container_width} sm={24}>
        <Card className={[styles.card, styles.commentCard]}>
          <Row span={24} className={styles.row_justify}>
            <p className={styles.title}>
              {data?.user?.first_name + " " + data?.user?.last_name}
            </p>

              <Iconn name="Horizon" />
          </Row>
          <Row>
            <div className={styles.data_post}>
              <p>{data?.comment}</p>
            </div>
            <Col sm={24} className={styles.clock_icon}>
              <div>
                <span>
                  <Iconn name="Clock" />
                </span>
                <span className={styles.clock}>
                  {moment(data.created_at).fromNow(true)}
                </span>
              </div>
            </Col>
          </Row>
        </Card>

       
      </Row>
    </NoSSRWrapper>
  );
};
