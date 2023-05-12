import React from "react";
import UserDetailsLayout from "../../../components/Layouts/UserDetailsLayout";

function MentorManagerMentors() {
  return <> mentor manager mentors content here</>;
}

MentorManagerMentors.getLayout = function getLayout(page) {
  return <UserDetailsLayout>{page}</UserDetailsLayout>;
};

export default MentorManagerMentors;
