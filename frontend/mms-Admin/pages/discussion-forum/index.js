import { useEffect, useState, useRef, useCallback } from "react";
import { Input, Row, Col } from "antd";
import { CustomInput, Label } from "components/formInputs/CustomInput";
import { Error } from "components/organisms/Error";
import { Icon } from "components/Icon/Icon";
import { CustomFormModal } from "components/CustomModal";
import SuccessMessage from "components/SuccessMessage";
import NoSSRWrapper from "components/DisableSSR";

import { PostCard } from "components/Cards";
import styles from "styles/admin/discussionForum.module.css";
import usePostFetch from "../../hooks/usePostFetch";
import { useStateValue } from "store/context";
import { Loader } from "components/atoms/Loader";
import { fetchPosts } from "../api/forum";
import { useRouter } from "next/router";

function DiscussionForum() {
  const [newTopic, setNewTopic] = useState(false);
  const [formData, setFormData] = useState({});
  const [posts, setPosts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  // const { data, error, loading, hasMore } = usePostFetch(pageNumber,success);
  const { state, dispatch } = useStateValue();
  const observer = useRef();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPosts(pageNumber)
      .then((res) => {
        setData((prevData) => {
          return [...prevData, ...res.data?.posts?.data];
        });
        setError(false);
        setLoading(false);
        setPageNumber(res.data?.posts?.meta?.current_page);
        if (!res.data.posts?.meta?.next_page_url) {
          setHasMore(false);
        }
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  }, [pageNumber]);

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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }
  if (!data) {
    return <div>No data</div>;
  }
  return (
    <NoSSRWrapper>
      <div className="overflow-y-scroll h-full">
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
            success
          />
        )}
      </div>
    </NoSSRWrapper>
  );
}

export default DiscussionForum;
