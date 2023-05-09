import React from "react";
import MentorDetailsLayout from "../../../components/Layouts/MentorDetailsLayout";

function MentorPrograms() {
  return <>Programs here</>;
}

MentorPrograms.getLayout = function getLayout(page) {
  return <MentorDetailsLayout>{page}</MentorDetailsLayout>;
};

export default MentorPrograms;
