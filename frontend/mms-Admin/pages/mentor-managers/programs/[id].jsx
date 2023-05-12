import React from "react";
import UserDetailsLayout from "../../../components/Layouts/UserDetailsLayout";

function MentorManagerPrograms() {
  return <> mentor manager programs content here</>;
}

MentorManagerPrograms.getLayout = function getLayout(page) {
  return <UserDetailsLayout>{page}</UserDetailsLayout>;
};

export default MentorManagerPrograms;
