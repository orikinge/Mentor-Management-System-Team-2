import React from "react";
import UserDetailsLayout from "../../../components/Layouts/UserDetailsLayout";

function AboutMentorManager() {
  return <>About mentor manager content here</>;
}

AboutMentorManager.getLayout = function getLayout(page) {
  return <UserDetailsLayout>{page}</UserDetailsLayout>;
};

export default AboutMentorManager;
