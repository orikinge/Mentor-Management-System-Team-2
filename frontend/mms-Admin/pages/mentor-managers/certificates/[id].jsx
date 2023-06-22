import React from "react";
import UserDetailsLayout from "../../../components/Layouts/UserDetailsLayout";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { fetchMentorCertificates } from "pages/api/user";
import styles from "../../../styles/mentor-managers/mentor-managers.module.scss";
import { Loader } from "../../../components/atoms/Loader";

// import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { SettingOutlined } from "@ant-design/icons";
import { Collapse, Select } from "antd";
import { useState } from "react";
import CertificatePreview from "../../../components/molecules/certificate/previewCert";
import { Accordion } from "../../../components/molecules/Accordion";
import { Icons } from "../../../components/atoms/Icons";
import Image from "next/image";

function MentorManagerCertificates() {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery(["mentor_manager_cert"], () =>
    fetchMentorCertificates(router.query.id),
  );
  console.log(data);

  if (isLoading) return <Loader />;

  if (isError) return "An error occured";

  return (
    <div className={styles.tab_content_wrapper}>
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

MentorManagerCertificates.getLayout = function getLayout(page) {
  return <UserDetailsLayout>{page}</UserDetailsLayout>;
};

export default MentorManagerCertificates;



