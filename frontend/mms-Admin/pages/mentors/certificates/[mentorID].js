import React from "react";
import MentorDetailsLayout from "../../../components/Layouts/MentorDetailsLayout";
import { Accordion } from "../../../components/molecules/Accordion";
import { useRouter } from "next/router";
import { fetchMentorCertificates } from "pages/api/user";
import { useQuery } from "@tanstack/react-query";
import CertificatePreview from "../../../components/molecules/certificate/previewCert";

function MentorCertificates() {
  const router = useRouter();
  const {
    data,
    isLoading,
    isError,
  } = useQuery(["fetch_certificates"], () =>
    fetchMentorCertificates(router.query.mentorID),
  );

  if (isLoading) return "loading certificates...";

  if (isError) return "An error occured. failed to get certificates";

  return (
    <>
      {data.data.length == 0 && (
        <p>Certificates would appear here if available</p>
      )}

      {data.data.length > 0 &&
        data?.data?.map((cert) => {
          return (
            <Accordion
              key={cert?.certificate_id}
              header={cert.certification}
              icon
              footer={
                <image src="/assets/images/arrow_down.svg" alt="arrow down" />
              }
              body={<CertificatePreview data={cert} />}
            />
          );
        })}
    </>
  );
}

MentorCertificates.getLayout = function getLayout(page) {
  return <MentorDetailsLayout>{page}</MentorDetailsLayout>;
};

export default MentorCertificates;
