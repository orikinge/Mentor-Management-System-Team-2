import React from "react";
import UserDetailsLayout from "../../../components/Layouts/UserDetailsLayout";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { fetchMentorCertificates } from "pages/api/user";
// import { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { SettingOutlined } from '@ant-design/icons';
import { Collapse, Select } from 'antd';
import { useState } from 'react';
import CertificatePreview from "../../../components/molecules/certificate/previewCert";
import {Accordion} from "../../../components/molecules/Accordion"

function MentorManagerCertificates() {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery(["mentor_manager_cert"], () =>
    fetchMentorCertificates(router.query.id),
  );
  console.log(data)

  if (isLoading) return "loading...";

  if (isError) return "An error occured";



  
  
  return (  

    
    <>
    {data.data.length==0 && <p>Certificates would appear here if available</p>}
   
      {data.data.length > 0 && 
        data?.data?.map((cert) => {
          return <Accordion key={cert?.certificate_id} header={cert.certification} icon footer={<image src="/assets/images/arrow_down.svg" alt="arrow down"/>} body={<CertificatePreview data={cert}  /> }/>;
        })} 
    </>
  );
}

MentorManagerCertificates.getLayout = function getLayout(page) {
  return <UserDetailsLayout>{page}</UserDetailsLayout>;
};

export default MentorManagerCertificates;



