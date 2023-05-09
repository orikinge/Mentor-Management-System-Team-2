import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MentorsList } from "../organisms/MentorList";
import { MentorDetails } from "../organisms/MentorDetails";
import styles from "../../styles/mentors/mentors.module.scss";
import { fetchMentors } from "pages/api/user";

const MentorDetailsLayout = ({ children }) => {
  const {
    data: mentors,
    isLoading,
    isError,
  } = useQuery(["mentors"], fetchMentors);

  if (isLoading) return "loading...";

  if (isError) return "An error occured";

  return (
    <div className="flex">
      <div className={styles.mentor_list_container}>
        <MentorsList mentors={mentors} />
      </div>
      <div className={styles.mentor_details_container}>
        <MentorDetails mentors={mentors}>{children}</MentorDetails>
      </div>
    </div>
  );
};

export default MentorDetailsLayout;
