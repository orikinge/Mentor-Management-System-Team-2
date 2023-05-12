import { useRouter } from "next/router";
import React, { useState } from "react";
import { PaginationWithFilter } from "../../components/molecules/PaginationWithFilter";
import styles from "../../styles/mentor-managers/mentor-managers.module.scss";
import { ListItem } from "../../components/atoms/ListItem";
import { Icons } from "../../components/atoms/Icons";
import { Button } from "../../components/atoms/Button";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchMentorManagers } from "../api/user";

const TaskAssignees = () => {
  const [isGrid, setIsGrid] = useState(true);

  const {
    data: mentorManagers,
    isLoading,
    isError,
  } = useQuery(["mentor-managers"], fetchMentorManagers);

  if (isLoading) return "loading...";

  if (isError) return "An error occured";

  return (
    <div>
      <div className="flex flex-justify-between flex-align-center">
        <div className="flex flex-align-center gap-16">
          <h1 className={styles.page_title}>Mentor Managers</h1>
          <span className="cursor-pointer">
            <Icons name="grid" onClick={() => setIsGrid(true)} />
          </span>
          <span className="cursor-pointer">
            <Icons name="list" onClick={() => setIsGrid(false)} />
          </span>
        </div>
        <div className="flex flex-align-center gap-16">
          <Button variant="white" size="small" bordered>
            Send Broadcast Message
          </Button>
          <Button variant="normal" size="small" bordered>
            Add New Mentor Manager
          </Button>
          <PaginationWithFilter />
        </div>
      </div>
      <div
        className={`${isGrid && "grid column-gap-10 grid-template-column-2"} ${
          styles.mentor_managers
        }`}>
        {mentorManagers.data.map((item) => (
          <Link href={`/mentor-managers/about/${item.id}`}>
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
                    className={`list_main_text`}>{`${item.first_name} ${item.last_name}`}</h1>
                  <div
                    className={`flex flex-column gap-10 flex-justify-center`}>
                    <p className={`list_sub_text`}>
                      {`${item.bio.substring(0, 16)}...`}
                    </p>

                    <div className="flex gap-10">
                      <p className={`tag`}>PROGRAM ASST.</p>
                      <p className={`tag`}>MENTOR-GADS</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-column gap-16">
                <span className={`cursor-pointer`}>
                  <Icons name="comment" />
                </span>
                <span className={`cursor-pointer`}>
                  <Icons name="delete" />
                </span>
              </div>
            </ListItem>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TaskAssignees;
