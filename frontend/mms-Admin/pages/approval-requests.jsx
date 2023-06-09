import React, { useState } from "react";
import { formatDistance } from "date-fns";
import styles from "../styles/approval_requests.module.scss";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { ListItem } from "../components/atoms/ListItem";
import { Button } from "../components/atoms/Button";
import { Icons } from "../components/atoms/Icons";
import { Loader } from "../components/atoms/Loader";
import { getApprovalRequestSummary } from "../pages/api/approvals";
import { Accordion } from "../components/molecules/Accordion";

const ApprovalRequests = () => {
  const { data, isLoading, isError } = useQuery(
    ["approval-requests"],
    getApprovalRequestSummary,
  );
  const [requestType, setRequestType] = useState("programs");

  if (isLoading) return <Loader />;

  if (isError) return "An error occured";

  function handleInputChange(e) {
    setRequestType(e.target.value);
  }

  function determineRequestTitle(requestType) {
    if (requestType === "mentors") return "Mentor";
    if (requestType === "mentorManagers") return "Mentor Manager";
    return "Programs";
  }

  return (
    <div className={`flex gap-16`}>
      <div className={styles.category_area}>
        <div className={`mb-3 ${styles.request_categories}`}>
          <h1 className="p-1">Category</h1>
          <label>
            <input
              name="request_category"
              value="mentors"
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
                <div>Mentor Requests</div>
              </div>
              <p className={styles.request_category_count}>
                {data.mentorsCount}
              </p>
            </div>
          </label>
          <label>
            <input
              value="mentorManagers"
              name="request_category"
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
                <div>Mentor Manager Requests</div>
              </div>
              <p className={styles.request_category_count}>
                {data.mentorManagersCount}
              </p>
            </div>
          </label>
          <label>
            <input
              name="request_category"
              value="programs"
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
                <div>Program Requests</div>
              </div>
              <p className={styles.request_category_count}>
                {data.programsCount}
              </p>
            </div>
          </label>
        </div>

        {/* recents */}
        <div className={styles.recent_requests}>
          <h1>Recents</h1>

          <div>
            {data.recentRequests.map((request) => (
              <ListItem key={request.id} className="bg-white border-0">
                <div
                  className={`flex flex-align-center flex-justify-between ${styles.request}`}>
                  <div className={`flex gap-16 flex-align-center`}>
                    <Image
                      src="/assets/images/user_img.svg"
                      width="40"
                      height="40"
                      alt="image"
                    />
                    <div>
                      <p
                        className={`list_main_text`}>{`${request.first_name} ${request.last_name}`}</p>
                      <div className={`flex gap-10`}>
                        <p className="flex flex-align-center gap-10 list_sub_text">
                          {request.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button variant="normal" size="small">
                    View
                  </Button>
                </div>
              </ListItem>
            ))}
          </div>
        </div>
      </div>

      {/* requests */}
      <div className={styles.requests}>
        <div className="flex justify-between items-center mb-4">
          <h1 className={styles.title}>{`${determineRequestTitle(
            requestType,
          )} Requests`}</h1>

          <Button variant="normal" size="large" bordered>
            {`Create New ${determineRequestTitle(requestType)}`}
          </Button>
        </div>

        <div className={styles.request_list}>
          {data[requestType].map((item) => (
            <Accordion
              key={item.id}
              header={
                requestType === "programs" ? (
                  <ProgramHeader
                    name={item.name}
                    start_date={item.start_date}
                    end_date={item.end_date}
                  />
                ) : (
                  <MentorHeader
                    first_name={item.first_name}
                    last_name={item.last_name}
                    bio={item.bio}
                  />
                )
              }
              body={
                requestType === "programs" ? (
                  <ProgramBody description={item.description} />
                ) : (
                  <MentorBody
                    beenAMentor={item.been_a_mentor}
                    bio={item.bio}
                    website={item.website}
                  />
                )
              }
              footer={
                <div className="w-full flex items-center justify-between">
                  <p>Send Message</p>

                  <div className="w-content gap-x-4 flex justify-end">
                    <Button variant="white" size="large" bordered>
                      Decline
                    </Button>
                    <Button variant="normal" size="large" bordered>
                      Approve
                    </Button>
                  </div>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ProgramHeader = ({ name, start_date, end_date }) => {
  return (
    <div className="flex flex-justify-between flex-align-center">
      <div className="flex gap-x-4 flex-align-center">
        <Icons name="gads" fill="#058B94" margin="0 1rem 0 0" />
        <div className={`flex flex-justify-center flex-column`}>
          <h1 className={styles.mentor_name}>{name} </h1>
          <div className="flex gap-x-8">
            <div className="flex gap-x-2 flex-align-center">
              <Icons name="calendar" />
              <p>
                {formatDistance(new Date(start_date), new Date(), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <div className="flex gap-x-2 flex-align-center">
              <Icons name="calendar" />
              <p>
                {formatDistance(new Date(end_date), new Date(), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Icons name="arrow-up" fill="#058B94" />
    </div>
  );
};
const ProgramBody = ({ description }) => {
  return (
    <div className={`flex flex-justify-center `}>
      <div className="w-full">
        <h2 className="text-xl font-bold">About</h2>

        <div className="pt-4 pb-4">
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
};
const MentorHeader = ({ first_name, last_name, bio }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-align-center gap-16">
        <Image
          width={50}
          height={50}
          src={"/assets/images/user_img.svg"}
          alt="User profile image"
          className={`circle-img`}
        />
        <div className={"flex gap-x-8"}>
          <div className="">
            <h1
              className={styles.mentor_name}>{`${first_name} ${last_name}`}</h1>
            <p className={`list_sub_text`}>{`${bio.substring(0, 16)}...`}</p>
          </div>

          <div className="flex items-center">
            <div className="flex gap-x-10">
              <p className={`tag`}>PROGRAM ASST.</p>
              <p className={`tag`}>MENTOR-GADS</p>
            </div>
          </div>
        </div>
      </div>
      <Icons name="arrow-up" fill="#058B94" />
    </div>
  );
};
const MentorBody = ({ beenAMentor, bio, website }) => {
  return (
    <div className="w-full">
      <h3 className="bold text-lg">Bio</h3>
      <div className="mt-4 mb-4 p-4 bg-mms-light-teal">
        <p>{bio}</p>
      </div>
      {/* <div className={`flex gap-16 mb-4 flex-align-center`}>
        <p className={`bold text-lg`}>Technical Proficiency:</p>
        <p>
          {technicalProficiencies
            .map((proficiency) => proficiency.stack)
            .join(", ")}
        </p>
      </div> */}
      {/* <div className={`flex gap-16 mb-4 flex-align-center`}>
        <p className={`bold text-lg`}>Previous Programs:</p>
        <p>{previousPrograms.map((item) => item.program).join(", ")}</p>
      </div>
      <div className={`flex gap-16 mb-4 flex-align-center`}>
        <p className={`bold text-lg`}>Previous Roles Held: </p>
        <p>{previousRoles.map((item) => item.role).join(", ")}</p>
      </div> */}
      {/* <div className={`flex gap-16 mb-4 flex-align-center`}>
        <p className={`bold text-lg`}>Availability to join a new program:</p>
        <p>Unavailable</p>
      </div> */}
      {/* <div className={`flex gap-16 mb-4 flex-align-center`}>
        <p className={`bold text-lg`}>Program of interest:</p>
        <p>{!programOfInterest ? "None" : programOfInterest}</p>
      </div> */}
      <div className={`flex gap-16 mb-4 flex-align-center`}>
        <p className={`bold text-lg`}>Been a Mentor Before?</p>
        <p>{beenAMentor ? "Yes" : "No"}</p>
      </div>
      {/* <div className={`flex gap-16 mb-4 flex-align-center`}>
        <p className={`bold text-lg`}>Years of Technical Experience:</p>
        <p>0</p>
      </div> */}
      <div className={`flex gap-16 mb-4 flex-align-center`}>
        <p className={`bold text-lg`}>Website:</p>
        <p>{website ? website : "None"}</p>
      </div>
    </div>
  );
};

export default ApprovalRequests;
