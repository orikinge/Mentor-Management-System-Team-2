import React from "react";
import UserDetailsLayout from "../../../components/Layouts/UserDetailsLayout";

function MentorManagerTasks() {
  return <> mentor manager tasks content here</>;
}

MentorManagerTasks.getLayout = function getLayout(page) {
  return <UserDetailsLayout>{page}</UserDetailsLayout>;
};

export default MentorManagerTasks;
