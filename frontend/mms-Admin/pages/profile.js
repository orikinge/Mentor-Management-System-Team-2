import moment from "moment";
import { Avatar, Col, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import styles from "../styles/admin/about.module.scss";
import Icon from "../components/Icon.js";
import IconWithText from "components/Icon/IconWithText";
import { fetchUserProfile } from "pages/api/user";
import { capitalize } from "utils/capitalize";
import getUserRole from "utils/getUserRole";

import { Loader } from "components/Loader";
import { Button } from "components/Button";
import { useRouter } from "next/router";

let image_url =
  process.env.NEXT_PUBLIC_BASE_URL.replace("/api/v1", "") +
  "/uploads/upload_file/";
function About() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sMedia, setSmedia] = useState({});
  const { Paragraph } = Typography;

  const router = useRouter();
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const response = await fetchUserProfile();
      if (response.status === 200) {
        setData(response.data);
        setSmedia(
          response?.data?.social_media_links ? JSON.parse(response?.data?.social_media_links) : {},
        );
        setLoading(false);
      }

      if (
        response.status === 401 ||
        response.status === 400 ||
        response.status === 404
      ) {
        setError(error);
        setLoading(false);
      }
    } catch (e) {
      setError(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.spin}>
        <Loader size="large" />
      </div>
    );
  }

  const handleEdit = (e) => {
    e.preventDefault();
    router.push("/settings");
  };

  return (
    <>
      <Row className={styles.about}>
        <Col span={18}>
          <div className={styles.about_header}>
            {data?.profile_image_path ? (
              <Avatar
                size={90}
                icon={
                  <img
                    src={image_url + data.profile_image_path}
                    width="90px"
                    height="90px"
                  />
                }
              />
            ) : (
              <Avatar
                size={90}
                icon={
                  <Icon
                    icon={"/assets/images/admin_avatar.png"}
                    width={"90px"}
                    height={"90px"}
                  />
                }
              />
            )}

            <div className={styles.profile}>
              <p className={styles.about_name}>
                {capitalize(data.first_name) + " " + capitalize(data.last_name)}
                <span>
                  {/* <NG title="Nigeria" className={styles.flag} /> */}
                </span>
              </p>
              <p className={styles.about_role}>{getUserRole(data)}</p>
            </div>
          </div>
        </Col>
        <Col span={6} className={styles.t_align}>
          <Button onClick={handleEdit} className={styles.button}>
            Edit Profile
          </Button>
        </Col>
      </Row>
      <Row className={styles.profile_description}>
        <Col span={24}>
          <div>
            <p className={styles.about_title}>About</p>
            <div className={styles.about_desc_container}>
              <p className={styles.about_desc}>{data.bio}</p>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <Paragraph className={styles.meta}>
            <div>
              <h4>Location:</h4>
              <p>{data?.country || "NIL"}</p>
            </div>
            <div>
              <h4>Email:</h4>
              <p>{data?.email || "NIL"}</p>
            </div>
            <div>
              <h4>Website:</h4>
              <p>{data?.website || "NIL"}</p>
            </div>
            <div>
              <h4>Member Since:</h4>
              <p>{moment(data?.created_at).format("ll")}</p>
            </div>
          </Paragraph>
        </Col>
        <Col span={24}>
          <p className={styles.about_title}>Socials</p>
          <Row justify={"space-between"} gutter={[16, 16]}>
            <Col span={12}>
              <IconWithText
                container={styles.social_icon_container}
                color={styles.social_color}
                styles={styles.social_icon}
                text={sMedia ? sMedia.github : ""}>
                <Icon
                  icon={"/assets/images/Gitlogo.svg"}
                  width={"25px"}
                  height={"25px"}
                />
              </IconWithText>
            </Col>
            <Col span={12}>
              <IconWithText
                container={styles.social_icon_container}
                color={styles.social_color}
                styles={styles.social_icon}
                text={sMedia ? sMedia.linkedin : ""}>
                <Icon
                  icon={"/assets/images/Linkeinlogo.svg"}
                  width={"25px"}
                  height={"25px"}
                />
              </IconWithText>
            </Col>
          </Row>
          <Row justify={"space-between"} gutter={[16, 16]}>
            <Col span={12}>
              <IconWithText
                container={styles.social_icon_container}
                color={styles.social_color}
                styles={styles.social_icon}
                text={sMedia ? sMedia.twitter : ""}>
                <Icon
                  icon={"/assets/images/Twitterlogo.svg"}
                  width={"25px"}
                  height={"25px"}
                />
              </IconWithText>
            </Col>
            <Col span={12}>
              <IconWithText
                container={styles.social_icon_container}
                color={styles.social_color}
                styles={styles.social_icon}
                text={sMedia ? sMedia.instagram : ""}>
                <Icon
                  icon={"/assets/images/instagramlogo.svg"}
                  width={"25px"}
                  height={"25px"}
                />
              </IconWithText>
            </Col>
          </Row>
        </Col>
        <div>
          <image
            src="http://127.0.0.1:3333/uploads/upload_file/clhity6g60005m0ss65ctblxj.png"
            width="90px"
            height="90px"
            alt="image"
          />
        </div>
      </Row>
    </>
  );
}

export default About;
