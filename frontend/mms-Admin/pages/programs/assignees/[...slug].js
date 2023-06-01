import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PaginationWithFilter } from "../../../components/molecules/PaginationWithFilter";
import styles from "../../../styles/programs/task_assignees.module.scss";
import { ListItem } from "../../../components/atoms/ListItem";
import { Icons } from "../../../components/atoms/Icons";
import { Loader } from "../../../components/atoms/Loader";
import Image from "next/image";
import {
  getMentorManagerssAssignedToAProgram,
  getMentorsAssignedToAProgram,
} from "../../api/mentor";

const ProgramAssignees = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [programData, setProgramData] = useState({});
  const router = useRouter();
  const { slug } = router.query;
  const role = slug?.[0] === "mentor-manager" ? "Mentor Manager" : "Mentor";
  const id = slug?.[1];

  useEffect(async () => {
    if (id && role) {
      if (role === "Mentor Manager") {
        const data = await getMentorManagerssAssignedToAProgram(id);
        if (data) {
          setProgramData(data);
          setIsLoading(false);
        }
      }

      if (role === "Mentor") {
        const data = await getMentorsAssignedToAProgram(id);
        if (data) {
          setProgramData(data);
          setIsLoading(false);
        }
      }
    }
  }, [id, role]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {programData.users?.data.length > 0 ? (
            <div>
              <div className="flex flex-justify-between flex-align-center">
                <h1 className={styles.page_title}>
                  {role ? `${role}s` : "Mentors"} {programData.name}
                </h1>
                <PaginationWithFilter />
              </div>
              <div className={styles.program_reports}>
                {programData.users?.data.map((item) => {
                  return (
                    <ListItem key={item.id}>
                      <div className="flex flex-align-center gap-16">
                        <Image
                          width={50}
                          height={50}
                          src={"/assets/images/user_img.svg"}
                          alt="User profile image"
                          className={`circle-img`}
                        />
                        <div className={styles.user_summary}>
                          <h1
                            className={`list_main_text`}>{`${item.user.first_name} ${item.user.last_name}`}</h1>
                          <div className={`flex flex-align-center`}>
                            <p className={`list_sub_text`}>{item.user.bio}</p>
                          </div>
                        </div>
                        <p className={`tag`}>PROGRAM ASST.</p>
                        <p className={`tag`}>MENTOR-GADS</p>
                      </div>
                      <div className="flex gap-16">
                        <span className={`cursor-pointer`}>
                          <Icons name="comment" />
                        </span>
                      </div>
                    </ListItem>
                  );
                })}
              </div>
            </div>
          ) : (
            <p>No user found for this program</p>
          )}
        </>
      )}
    </>
  );
};

export default ProgramAssignees;
