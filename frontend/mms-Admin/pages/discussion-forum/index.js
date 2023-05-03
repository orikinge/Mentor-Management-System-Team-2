import { useEffect, useState, useRef, useCallback } from "react";
import { Input, Row, Col } from "antd";
import { CustomInput, Label } from "components/formInputs/CustomInput";
import { Icon } from "components/Icon/Icon";
import { CustomFormModal } from "components/CustomModal";
import SuccessMessage from "components/SuccessMessage";
import { PostCard } from "components/Cards";
import styles from "styles/admin/discussionForum.module.css";
import usePostFetch from "../../hooks/usePostFetch";
import { useStateValue } from "store/context";
import { Loader } from "components/Loader";

function DiscussionForum() {
  const [newTopic, setNewTopic] = useState(false);
  const [formData, setFormData] = useState({});
  const [posts, setPosts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const { data, error, loading, hasMore } = usePostFetch(pageNumber,success);
  const { state, dispatch } = useStateValue();

  const observer = useRef(); 


  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loading],
  );

  const handleClick = (e) => {
    e.preventDefault();
    setNewTopic(true);
  };

  if (!data) {
    return <Loader />;
  }

  if (error) {
    return <div>Failed to fetch</div>;
  }

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
          {data.length > 0 &&
            data.map((post, index) => {
              if (data.length === index + 1) {
                return (
                  <Row
                    key={post.id}
                    style={{ width: "100%" }}
                    ref={lastPostElementRef}>
                    <PostCard data={post} />
                  </Row>
                );
              } else {
                return (
                  <Row key={post.id} style={{ width: "100%" }}>
                    <PostCard data={post} />
                  </Row>
                );
              }
            })}
          {hasMore && <Loader size="large" />}
        </Row>
      </Row>
      {newTopic && (
        <CustomFormModal
          formData={formData}
          setFormData={setFormData}
          newTopic={newTopic}
          setNewTopic={setNewTopic}
          // setPosts={setPosts}
          // posts={posts}
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
