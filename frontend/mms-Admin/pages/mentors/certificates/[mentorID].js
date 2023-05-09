import React from "react";
import MentorDetailsLayout from "../../../components/Layouts/MentorDetailsLayout";

function MentorCertificates() {
  return <>Certificates here</>;
}

MentorCertificates.getLayout = function getLayout(page) {
  return <MentorDetailsLayout>{page}</MentorDetailsLayout>;
};

export default MentorCertificates;
