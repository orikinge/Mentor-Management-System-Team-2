import { Avatar, Button, Col, Row } from "antd";
import React from "react";
import styles from "../styles/admin/about.module.css";
import Icon from "../components/Icon.js";
import { NG } from "country-flag-icons/react/3x2";
import IconWithText from "components/Icon/IconWithText";
import { Icon as Iconn } from "components/Icon/Icon";

function About() {
  return (
    <>
      <Row className={styles.about}>
        <Col span={18}>
          <div className={styles.about_header}>
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
            <div className={styles.profile}>
              <p className={styles.about_name}>
                Peculiar Umeh
                <span>
                  <NG title="Nigeria" className={styles.flag} />
                </span>
              </p>
              <p className={styles.about_role}>Admin</p>
            </div>
          </div>
        </Col>
        <Col span={6} className={styles.t_align}>
          <Button className={styles.button}>Edit Profile</Button>
        </Col>
      </Row>
      <Row className={styles.profile_description}>
        <Col span={24}>
          <div>
            <p className={styles.about_title}>About</p>
            <div className={styles.about_desc_container}>
              <p className={styles.about_desc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent dignissim ut cursus purus efficitur et. Duis ac enim
                tellus. Phasellus pharetra metus, ut cursus purus efficitur et.
                Duis ac enim tellus. Phasellus eget tortor dapibus, laoreet
                mauris sed, dignissim lectus. Duis ac enim tellus. Phasellus
                pharetra metus, ut cursus purus efficitur et. Duis ac enim
                tellus. Phasellus eget tortor dapibus, laoreet mauris sed,
                dignissim lectus
              </p>
            </div>
          </div>
        </Col>
        <Col span={24}>
          <Row>
            <Col span={12}>
              <IconWithText
                container={styles.icon_container}
                color={styles.icon_color}
                styles={styles.icon}
                text={"peculiah@andela.com"}>
                <Iconn name="Mail" />
              </IconWithText>
            </Col>
            <Col span={12}>
              <IconWithText
                container={styles.icon_container}
                color={styles.icon_color}
                styles={styles.icon}
                text={"Nigeria, Lagos"}>
                <Iconn name="Location" />
              </IconWithText>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <IconWithText
                container={styles.icon_container}
                color={styles.icon_color}
                styles={styles.icon}
                text={"www.peculiah.com"}>
                <Iconn name="Globe" />
              </IconWithText>
            </Col>
            <Col span={12}>
              <IconWithText
                container={styles.icon_container}
                color={styles.icon_color}
                styles={styles.icon}
                text={"Member since june, 2021"}>
                <Iconn name="Calendar" />
              </IconWithText>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <p className={styles.about_title}>Socials</p>

          <Row>
            <Col span={12}>
              <IconWithText
                container={styles.social_icon_container}
                color={styles.social_color}
                styles={styles.social_icon}
                text={"@peculiar.umeh"}>
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
                text={"@peculiar.umeh"}>
                <Icon
                  icon={"/assets/images/Linkeinlogo.svg"}
                  width={"25px"}
                  height={"25px"}
                />
              </IconWithText>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <IconWithText
                container={styles.social_icon_container}
                color={styles.social_color}
                styles={styles.social_icon}
                text={"@peculiar.umeh"}>
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
                text={"@peculiar.umeh"}>
                <Icon
                  icon={"/assets/images/instagramlogo.svg"}
                  width={"25px"}
                  height={"25px"}
                />
              </IconWithText>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default About;
