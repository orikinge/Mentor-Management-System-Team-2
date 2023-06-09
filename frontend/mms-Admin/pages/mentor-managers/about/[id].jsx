import React from "react";
import { useRouter } from "next/router";
import UserDetailsLayout from "../../../components/Layouts/UserDetailsLayout";
import { useQuery } from "@tanstack/react-query";
import { fetchMentorManagerData } from "pages/api/user";
import styles from "../../../styles/mentor-managers/mentor-managers.module.scss";
import { Loader } from "../../../components/atoms/Loader";

function AboutMentorManager() {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery(["about_mentor_manager"], () =>
    fetchMentorManagerData(router.query.id),
  );

  if (isLoading) return <Loader />;

  if (isError) return "An error occured";

  const {
    beenAMentor,
    bio,
    previousPrograms,
    previousRoles,
    profileImagePath,
    programOfInterest,
    website,
    technicalProficiencies,
  } = data?.result[0];

  return (
    <div className={styles.tab_content_wrapper}>
      <h3 className="bold text-lg">Bio</h3>
      <div className={styles.bio_text}>
        <p>{bio}</p>
      </div>
      <div className={`flex gap-16 mb-4 flex-align-center`}>
        <p className={`bold text-lg`}>Technical Proficiency:</p>
        <p>
          {technicalProficiencies
            .map((proficiency) => proficiency.stack)
            .join(", ")}
        </p>
      </div>
      <div className={`flex gap-16 mb-4 flex-align-center`}>
        <p className={`bold text-lg`}>Previous Programs:</p>
        <p>{previousPrograms.map((item) => item.program).join(", ")}</p>
      </div>
      <div className={`flex gap-16 mb-4 flex-align-center`}>
        <p className={`bold text-lg`}>Previous Roles Held: </p>
        <p>{previousRoles.map((item) => item.role).join(", ")}</p>
      </div>
      <div className={`flex gap-16 mb-4 flex-align-center`}>
        <p className={`bold text-lg`}>Availability to join a new program:</p>
        <p>Unavailable</p>
      </div>
      <div className={`flex gap-16 mb-4 flex-align-center`}>
        <p className={`bold text-lg`}>Program of interest:</p>
        <p>{!programOfInterest ? "None" : programOfInterest}</p>
      </div>
      <div className={`flex gap-16 mb-4 flex-align-center`}>
        <p className={`bold text-lg`}>Been a Mentor Before?</p>
        <p>{beenAMentor ? "Yes" : "No"}</p>
      </div>
      <div className={`flex gap-16 mb-4 flex-align-center`}>
        <p className={`bold text-lg`}>Years of Technical Experience:</p>
        <p>0</p>
      </div>
      <div className={`flex gap-16 mb-4 flex-align-center`}>
        <p className={`bold text-lg`}>Website:</p>
        <p>{website ? website : "None"}</p>
      </div>
    </div>
  );
}

AboutMentorManager.getLayout = function getLayout(page) {
  return <UserDetailsLayout>{page}</UserDetailsLayout>;
};

export default AboutMentorManager;
