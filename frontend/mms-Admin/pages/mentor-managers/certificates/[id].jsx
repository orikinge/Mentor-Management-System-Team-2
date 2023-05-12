import React from "react";
import UserDetailsLayout from "../../../components/Layouts/UserDetailsLayout";

function MentorManagerCertificates() {
  return <> mentor manager certificates content here</>;
}

MentorManagerCertificates.getLayout = function getLayout(page) {
  return <UserDetailsLayout>{page}</UserDetailsLayout>;
};

export default MentorManagerCertificates;
