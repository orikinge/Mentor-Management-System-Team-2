import React from "react";
import { Button } from "../atoms/Button";
import styles from "./styles/mentor_list_item.module.scss";
import { format } from "date-fns";
import Image from "next/image";

export const MentorListItem = ({ data }) => {
  const {
    first_name,
    last_name,
    id,
    isAdmin,
    isMentorManager,
    created_at,
    profile_image_path,
  } = data;
  const designation = getDesignation();

  const fullName = `${first_name} ${last_name}`;

  // Conditionally return what role this mentor has.
  function getDesignation() {
    return isAdmin ? "Admin" : isMentorManager ? "Mentor Manager" : "Mentor";
  }

  return (
    <div
      className={`flex flex-align-center flex-justify-between ${styles.wrapper}`}>
      <div className="flex gap-10">
        <Image
          width={60}
          height={60}
          src={
            profile_image_path
              ? profile_image_path
              : "/assets/images/user_img.svg"
          }
          alt="User profile image"
          className={styles.user_img}
        />
        <UserDetails name={fullName} createdAt={created_at} />
      </div>

      <Button
        type="link"
        variant="normal"
        size="small"
        url={{
          pathname: `/mentors/about/${id}`,
          query: {
            fullName,
            designation,
            avatar: profile_image_path,
          },
        }}>
        View
      </Button>
    </div>
  );
};

function UserDetails({ name, createdAt }) {
  return (
    <div className="flex flex-justify-center flex-column">
      {/* TODO: We need to reset padding and margin for p and all heading elements to avoid resetting them everywhere */}
      <p className={styles.user_name}>{name}</p>
      <p className={styles.date_joined}>
        Added {format(new Date(createdAt), "MMM. dd yyyy")}
      </p>
    </div>
  );
}

function UserAvatar({ imgURL }) {
  return <div className={styles.user_img}></div>;
}
