import React from "react";
import MentorDetailsLayout from "../../../components/Layouts/MentorDetailsLayout";
import { useQuery } from "@tanstack/react-query";
import { fetchMentorAbout } from "pages/api/user";
import { useRouter } from "next/router";
import { Col, Row, Typography } from "antd";
import styles from "../../../styles/admin/about.module.scss";

function AboutMentor() {
  const { Paragraph } = Typography;

  const router = useRouter();
  const {
    data: about,
    isLoading,
    isError,
  } = useQuery(["about_user"], () => fetchMentorAbout(router.query.mentorID));

 
  if (isLoading) return "loading tasks...";

  if (isError) return "An error occured";

  return (
    <>
      <Row className={styles.about_container}>
        <Col span={24}>
          <Paragraph className={styles.meta}>
            <p className={styles.title_h4}>Bio:</p>
            <div>
              <p className={styles.bio}>
                {about?.result[0]?.bio ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent dignissim ut cursus purus efficitur et. Duis ac enim tellus. Phasellus pharetra metus, ut cursus purus efficitur et. Duis ac enim tellus. Phasellus eget tortor dapibus, laoreet mauris sed, dignissim lectus."}
              </p>
            </div>
            <div>
              <p className={styles.title_h4}>Technical Proficiency:</p>
              <p className={styles.text_desc}>
                Java Script, Django, Mysql, Android
              </p>
            </div>
            <div>
              <p className={styles.title_h4}>Previous Programs:</p>
              <p className={styles.text_desc}>
                GADS 2022, Google I/O Extended 2021
              </p>
            </div>
            <div>
              <p className={styles.title_h4}>Previous Roles Held:</p>
              <p className={styles.text_desc}>
                Learner, Mentor, Program Assistant, Program Assistant Lead
              </p>
            </div>
            <div>
              <p className={styles.title_h4}>
                Availability to join a new program:
              </p>
              <p className={styles.text_desc}>
                {about?.result[0]?.available || "Unavailable"}
              </p>
            </div>
            <div>
              <p className={styles.title_h4}>Program of interest:</p>
              <p className={styles.text_desc}>
                Google Africa Scholarship Program
              </p>
            </div>
            <div>
              <p className={styles.title_h4}>Been a Mentor Before?</p>
              {about?.result[0]?.beenAMentor ? (
                <p className={styles.text_desc}> Yes </p>
              ) : (
                <p>No</p>
              )}
            </div>
            <div>
              <p className={styles.title_h4}>Years of Technical Experience:</p>
              <p className={styles.text_desc}>{about?.website || "3years"}</p>
            </div>
            <div>
              <p className={styles.title_h4}>Documents</p>
            </div>
            <div>
              <p className={styles.title_h4}>Website:</p>
              <p className={styles.text_bold}>
                {about?.result[0]?.website || "www.kabir.i@andela.com"}
              </p>
            </div>
          </Paragraph>
        </Col>
      </Row>
    </>
  );
}

AboutMentor.getLayout = function getLayout(page) {
  return <MentorDetailsLayout>{page}</MentorDetailsLayout>;
};

export default AboutMentor;
