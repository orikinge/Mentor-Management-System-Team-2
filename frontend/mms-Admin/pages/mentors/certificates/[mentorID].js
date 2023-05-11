import React from "react";
import MentorDetailsLayout from "../../../components/Layouts/MentorDetailsLayout";
import { Icons } from "../../../components/atoms/Icons";
import styles from "../../../styles/mentors/certificates.module.scss";
import Image from "next/image";
import { Accordion } from "../../../components/molecules/Accordion";
import { useRouter } from "next/router";
import { fetchMentorCertificates } from "pages/api/user";
import { useQuery } from "@tanstack/react-query";
import Certificate from "../../../components/organisms/Certificate";
function MentorCertificates() {
  const router = useRouter();
  const {
    data: certificates,
    isLoading,
    isError,
  } = useQuery(["fetch_certificates"], () =>
    fetchMentorCertificates(router.query.mentorID),
  );

  if (isLoading) return "loading certificates...";

  if (isError) return "An error occured. failed to get certificates";

  return (
    <div className={styles.wrapper}>
      {certificates.data.length > 0 ? (
        <>
          {certificates.data.map((item, idx) => (
            <Accordion
              key={idx}
              header={
                <div className="flex flex-justify-between flex-align-center">
                  <div className="flex flex-align-center gap-10">
                    <Image
                      src={item.logo_url}
                      width="50"
                      height="50"
                      alt={item.certification}
                    />
                    <h1 className={styles.task_title}>{item.certification}</h1>
                  </div>
                  <Icons name="arrow-up" fill="#058B94" />
                </div>
              }
              body={
                <div className={`flex flex-justify-center `}>
                  <div className={styles.certificate_info}>
                    <Certificate
                      logoURL={item.program_name_url}
                      badgeURL={item.logo_url}
                      signatureURL={item.signature}
                      certification={item.certification}
                      fullName={`${item.user.first_name} ${item.user.last_name}`}
                    />
                  </div>
                </div>
              }
            />
          ))}
        </>
      ) : (
        "No certificate found for user"
      )}
    </div>
  );
}

MentorCertificates.getLayout = function getLayout(page) {
  return <MentorDetailsLayout>{page}</MentorDetailsLayout>;
};

export default MentorCertificates;
