import React, { useState } from "react";
import styles from "../../styles/approval_requests.module.scss";
import Image from "next/image";
import { ListItem } from "../../components/atoms/ListItem";
import { Button } from "../../components/atoms/Button";
import { Icons } from "../../components/atoms/Icons";
import { Loader } from "../../components/atoms/Loader";
import { Accordion } from "../../components/molecules/Accordion";
import Certificate from "../../components/organisms/Certificate";
import { useQuery } from "@tanstack/react-query";
import { getCertificates } from "../api/certificates";
import CertificatePreview from "../../components/molecules/certificate/previewCert";


const Certificates = () => {
  const { data, isLoading, isError } = useQuery(
    ["certificates"],
    getCertificates,
  );
  const [status, setStatus] = useState("approvedCertificates");

  if (isLoading) return <Loader />;

  if (isError) return "An error occured";

  function handleInputChange(e) {
    setStatus(e.target.value);
  }

  function determineRequestTitle(status) {
    if (status === "approvedCertificates") return "Approved Certificates";
    if (status === "pendingApproval") return "Pending Certificates";
    return "Generated Certificates";
  }

  return (
    <div className={`flex gap-16`}>
      <div className={styles.category_area}>
        <div className={`mb-3 ${styles.request_categories}`}>
          <h1 className="p-1">Category</h1>
          <label>
            <input
              name="request_category"
              value="approvedCertificates"
              type="radio"
              onChange={handleInputChange}
            />
            <div
              className={`flex flex-justify-between flex-align-center gap-10`}>
              <div className={`flex flex-align-center gap-10`}>
                <Image
                  src="/assets/images/user_img.svg"
                  width="40"
                  height="40"
                  alt="image"
                />
                <div>Approved Certificates</div>
              </div>
              <p className={styles.request_category_count}>
                {data.approvedCertificatesCount}
              </p>
            </div>
          </label>
          <label>
            <input
              name="request_category"
              value="userGeneratedCertificates"
              type="radio"
              onChange={handleInputChange}
            />
            <div
              className={`flex flex-justify-between flex-align-center gap-10`}>
              <div className={`flex flex-align-center gap-10`}>
                <Image
                  src="/assets/images/user_img.svg"
                  width="40"
                  height="40"
                  alt="image"
                />
                <div>My Generated Certificates</div>
              </div>
              <p className={styles.request_category_count}>
                {data.userGeneratedCertificatesCount}
              </p>
            </div>
          </label>
          <label>
            <input
              name="request_category"
              value="pendingApproval"
              type="radio"
              onChange={handleInputChange}
            />
            <div
              className={`flex flex-justify-between flex-align-center gap-10`}>
              <div className={`flex flex-align-center gap-10`}>
                <Image
                  src="/assets/images/user_img.svg"
                  width="40"
                  height="40"
                  alt="image"
                />
                <div>Certificates Pending Approval </div>
              </div>
              <p className={styles.request_category_count}>
                {data.pendingApprovalCount}
              </p>
            </div>
          </label>
        </div>

        <div className={styles.recent_requests}>
          <h1>Recents</h1>

          <div>
            {data.recentCertificates.length > 0 ? (
              data.recentCertificates.map((item) => (
                <ListItem className="bg-white border-0">
                  <div
                    className={`flex flex-align-center flex-justify-between ${styles.request}`}>
                    <div className={`flex gap-16 flex-align-center`}>
                      <Image
                        src={item.logo_url}
                        width="40"
                        height="40"
                        alt="image"
                      />
                      <div>
                        <p className={`list_main_text`}>Allison Davis</p>
                        <div className={`flex gap-10`}>
                          <p className="flex flex-align-center gap-10 list_sub_text">
                            {item.certification.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button variant="normal" size="small">
                      View
                    </Button>
                  </div>
                </ListItem>
              ))
            ) : (
              <>No recent requests found</>
            )}
          </div>
        </div>
      </div>

      <div className={styles.requests}>
        <div className="flex justify-between items-center mb-4">
          <h1 className={styles.title}>{determineRequestTitle(status)}</h1>

          <Button variant="normal" size="large" bordered>
            {`Generate Certificate`}
          </Button>
        </div>

        <div className={styles.request_list}>
          {data[status].length > 0 ? (
            data[status].map((item, idx) => (
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
                      <div>
                      <p>{ item?.user ? `${item?.user?.first_name} ${item?.user?.first_name}`:"Allison Davids"}</p>  
                        <h1 className="pt-0 pb-0 mt-0 mb-0">
                          {item.certification}
                        </h1>
                      </div>
                    </div>
                    <Icons name="arrow-up" fill="#058B94" />
                  </div>
                }
                body={
                  <div >
                    <div className={""}>
                      {/* <Certificate
                        logoURL={item.program_name_url}
                        badgeURL={item.logo_url}
                        signatureURL={item.signature}
                        certification={item.certification}
                        fullName={`Simon MMS`}
                      /> */}
                    <CertificatePreview data={item}/>
                    </div>
                  </div>
                }
              />
            ))
          ) : (
            <p>No certificate for this category</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
