import React from "react";
import { useRouter } from "next/router";
import UserDetailsLayout from "../../../components/Layouts/UserDetailsLayout";
import { useQuery } from "@tanstack/react-query";
import { fetchMentorManagerData } from "pages/api/user";
import styles from "../../../styles/mentor-managers/mentor-managers.module.scss";

function AboutMentorManager() {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery(["about_mentor_manager"], () =>
    fetchMentorManagerData(router.query.id),
  );

  if (isLoading) return "loading...";

  if (isError) return "An error occured";

  

  return (
    <div className={styles.tab_content_wrapper}>
      <h3>Bio</h3>
      <div className={styles.bio_text}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          dignissim ut cursus purus efficitur et. Duis ac enim tellus. Phasellus
          pharetra metus, ut cursus purus efficitur et. Duis ac enim tellus.
          Phasellus eget tortor dapibus, laoreet mauris sed, dignissim lectus.{" "}
        </p>
      </div>
      <div className={`flex gap-16 flex-align-center`}>
        <p className={`bold`}>Technical Proficiency:</p>
        <p>Java Script, Django, Mysql, Android </p>
      </div>
      <div className={`flex gap-16 flex-align-center`}>
        <p className={`bold`}>Previous Programs:</p>
        <p>GADS 2022, Google I/O Extended 2021</p>
      </div>
      <div className={`flex gap-16 flex-align-center`}>
        <p className={`bold`}>Previous Roles Held: </p>
        <p>Learner, Mentor, Program Assistant, Program Assistant Lead</p>
      </div>
      <div className={`flex gap-16 flex-align-center`}>
        <p className={`bold`}>Availability to join a new program:</p>
        <p>Unavailable</p>
      </div>
      <div className={`flex gap-16 flex-align-center`}>
        <p className={`bold`}>Program of interest:</p>
        <p>Google Africa Scholarship Program</p>
      </div>
      <div className={`flex gap-16 flex-align-center`}>
        <p className={`bold`}>Been a Mentor Before?</p>
        <p>Yes</p>
      </div>
      <div className={`flex gap-16 flex-align-center`}>
        <p className={`bold`}>Years of Technical Experience:</p>
        <p>3years</p>
      </div>
      <div className={`flex gap-16 flex-align-center`}>
        <p className={`bold`}>Website:</p>
        <p>www.kabir.i@andela.com</p>
      </div>
    </div>
  );
}

AboutMentorManager.getLayout = function getLayout(page) {
  return <UserDetailsLayout>{page}</UserDetailsLayout>;
};

export default AboutMentorManager;
