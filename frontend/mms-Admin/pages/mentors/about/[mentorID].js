import React from "react";
import MentorDetailsLayout from "../../../components/Layouts/MentorDetailsLayout";

function AboutMentor() {
  return <>About content here</>;
}

AboutMentor.getLayout = function getLayout(page) {
  return <MentorDetailsLayout>{page}</MentorDetailsLayout>;
};

export default AboutMentor;
