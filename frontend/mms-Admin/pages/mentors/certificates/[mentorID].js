import React from "react";
import MentorDetailsLayout from "../../../components/Layouts/MentorDetailsLayout";
import { Accordion } from "../../../components/molecules/Accordion";
import { useRouter } from "next/router";
import { fetchMentorCertificates } from "pages/api/user";
import { useQuery } from "@tanstack/react-query";
import CertificatePreview from "../../../components/molecules/certificate/previewCert";
import { Loader } from "../../../components/atoms/Loader";
import { Icons } from "../../../components/atoms/Icons";
import Image from "next/image";



function MentorCertificates() {
  const router = useRouter();
  const {
    data,
    isLoading,
    isError,
  } = useQuery(["fetch_certificates"], () =>
    fetchMentorCertificates(router.query.mentorID),
  );

  if (isLoading) return <Loader/>;

  if (isError) return "An error occured. failed to get certificates";
 
  return (
    <div>
      {data.data.length == 0 && (
        <p>Certificates would appear here if available</p> 
      )}

      {data.data.length > 0 && 
        data?.data?.map((cert) => {
          return (
            // <Accordion
            //   key={cert?.certificate_id}
            //   header={cert.certification}
            //   icon
            //   footer={
            //     <image src="/assets/images/arrow_down.svg" alt="arrow down" />
            //   }
            //   body={<CertificatePreview data={cert} />}
            // />
            <Accordion
            key={cert?.certificate_id}
            header={
              <div  className="flex flex-justify-between flex-align-center">
                <div className="flex flex-align-center gap-10">
                  <Image
                    src={cert.logo_url}
                    width="50"
                    height="50"
                    alt={cert.certification}
                  />
                  <div>
                    <p>{cert.certification}</p>
                   
                  </div>
                </div>
                <Icons name="arrow-up" fill="#058B94" />
              </div>
            }
            body={
              <div >
                <div >
                  {/* <Certificate
                    logoURL={item.program_name_url}
                    badgeURL={item.logo_url}
                    signatureURL={item.signature}
                    certification={item.certification}
                    fullName={`Simon MMS`}
                  /> */}
                <CertificatePreview data={cert}/>
                </div>
              </div>
            }
          />
          );
        })}
    </div>
  );
}

MentorCertificates.getLayout = function getLayout(page) {
  return <MentorDetailsLayout>{page}</MentorDetailsLayout>;
};

export default MentorCertificates;
