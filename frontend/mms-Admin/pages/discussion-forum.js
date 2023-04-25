import React, { useState, useReducer } from "react";
import { Input, Row, Col } from "antd";
import { CustomInput, Label } from "../components/formInputs/CustomInput";
import { Icon } from "../components/Icon/Icon";
import { CustomFormModal } from "../components/CustomModal";
import SuccessMessage from "components/SuccessMessage";
import { PostCard } from "components/Cards";
import styles from "../styles/admin/discussionForum.module.css";

function DiscussionForum() {
  const [newTopic, setNewTopic] = useState(false);
  const [formData, setFormData] = useState({});
  const [posts, setPosts] = useState([]);
  const [success, setSuccess] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setNewTopic(true);
  };

  return (
    <>
      <Row span={24} className={styles.container}>
        <Label title="Discussion Forum" weight="bold" />
        <Row className={styles.mb} onClick={handleClick}>
          <CustomInput
            placeholder="Add new topic"
            suffix={<Icon name="PlusIcon" />}
          />
        </Row>
        <Row>
          {posts.length > 0 && 
            posts.map((post, index) => {
              return (
                <Row style={{width:"100%"}} key={index}>
                  <PostCard data={post} />
                </Row>
              );
            })}
        </Row>
      </Row>
      {newTopic && (
        <CustomFormModal
          formData={formData}
          setFormData={setFormData}
          newTopic={newTopic}
          setNewTopic={setNewTopic}
          setPosts={setPosts}
          posts={posts}
          setSuccess={setSuccess}
        />
      )}
      {success && (
        <SuccessMessage
          image={"/assets/images/success.png"}
          message={"Post Created Successfully"}
          width={"220px"}
          height={"165px"}
          isModalOpen={success}
          setIsModalOpen={setSuccess}
        />
      )}
    </>
  );
}

export default DiscussionForum;
