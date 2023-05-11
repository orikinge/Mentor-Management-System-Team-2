import { useRouter } from "next/router";
import React from "react";
import { PaginationWithFilter } from "../../../components/molecules/PaginationWithFilter";
import styles from "../../../styles/programs/task_assignees.module.scss";
import { ListItem } from "../../../components/atoms/ListItem";
import { Icons } from "../../../components/atoms/Icons";
import Image from "next/image";

const TaskAssignees = () => {
  const router = useRouter();
  const { id, role } = router.query;

  return (
    <div>
      <div className="flex flex-justify-between flex-align-center">
        <h1 className={styles.page_title}>
          {role ? `${role}s` : "Mentors"} Assigned to Room Library article
          write...
        </h1>
        <PaginationWithFilter />
      </div>
      <div className={styles.program_reports}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <ListItem key={item}>
            <div className="flex flex-align-center gap-16">
              <Image
                width={50}
                height={50}
                src={"/assets/images/user_img.svg"}
                alt="User profile image"
                className={`circle-img`}
              />
              <div className={styles.user_summary}>
                <h1 className={`list_main_text`}>Alison Davis</h1>
                <div className={`flex flex-align-center`}>
                  <p className={`list_sub_text`}>
                    Program Assistant, Andela, He/him
                  </p>
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
        ))}
      </div>
    </div>
  );
};

export default TaskAssignees;
