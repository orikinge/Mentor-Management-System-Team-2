import { useState, useEffect } from "react";
import { Row, Col, Upload, Button } from "antd";

import { useRouter } from "next/router";
import { PostCard, CommentCard } from "components/Cards";
import { fetchSinglePost } from "pages/api/forum";
import EmojiPicker from "emoji-picker-react";
import { Icon } from "components/Icon/Icon";
import { createComment } from "../api/forum/index";
import { Loader } from "components/Loader";

import styles from "styles/admin/discussionForum.module.css";

import {
  CustomInput,
  CustomTextArea,
  Label,
  CustomButton,
} from "components/formInputs/CustomInput";

function Post() {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({
    comment: "",
  });
  const [file, setFile] = useState("");
  const [emojis, showEmojis] = useState(false);
  const [id, setId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (router.isReady && router.query.id) {
      setId(router.query.id);
      let { first_name, last_name } = router.query;
      setUser(first_name + " " + last_name);
      fetchSinglePost(router.query.id)
        .then((res) => {
          setData(res.data.post);
          setError(false);
          setLoading(false);
        })
        .catch((e) => {
          setError(true);
          setLoading(false);
        });
    }
  }, [router.isReady, isLoading]);
  const props = {
    onRemove: (file) => {
      setFile("");
    },
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
    file,
  };

  const handleChange = (e) => {
    e.preventDefault();
    setPostData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postData?.comment) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await createComment(id, postData);
      if (response.status === 201) {
        setIsLoading(false);
        setPostData({});
      }
      if (
        response.status === 400 ||
        response.status === 401 ||
        response.status === 404
      ) {
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <Loader size="large" />;
  }

  if (error) {
    console.log(error)
    return <div>something went wrong!</div>;
  }

  return (
    <>
      <Label title="Comments" weight="bold" />

      <Row style={{ width: "100%" }}>
        <PostCard data={data} fullPost names={user} />
      </Row>

      <Row className={[styles.body_row, styles.comment_card]}>
        <CustomTextArea
          rows={3}
          placeholder="Write a comment ..."
          name="comment"
          value={postData.comment}
          onChange={handleChange}
          className={[styles.textarea, styles.bg_color]}
        />
        <Row
          className={styles.emojis}
          style={{ justifyContent: "space-between" }}>
          <Row>
            <Col
              onClick={() => {
                showEmojis(!emojis);
              }}
              className={styles.smiley}>
              <Icon name="SmileyFace" />
            </Col>

            <Upload {...props} className={styles.smiley}>
              <Icon name="Pin" color="#058B94" />
            </Upload>
          </Row>
          <Col style={{ justifyContent: "flex-end" }}>
            <Button
              loading={isLoading}
              onClick={handleSubmit}
              className={styles.comment_button}>
              Post Comment
            </Button>
          </Col>
        </Row>
        <Row className={styles.emojis_container}>
          {emojis && (
            <EmojiPicker
              onEmojiClick={(emoji, e) => {
                setPostData((prevState) => ({
                  ...prevState,
                  comment: prevState.comment + emoji.emoji,
                }));
              }}
              skinTonesDisabled={true}
              width={"100%"}
            />
          )}
        </Row>
      </Row>
      {data?.comments?.length > 0 && (
        <Row className={styles.comment_container}>
          {data?.comments.length > 0 &&
            data.comments.map((post) => {
              return <CommentCard key={post.id} data={post} />;
            })}
        </Row>
      )}

      
    </>
  );
}

export default Post;
