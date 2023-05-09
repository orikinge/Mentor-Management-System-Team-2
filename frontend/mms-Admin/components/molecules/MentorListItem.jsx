import React from "react";
import { Button } from "../atoms/Button";
import styles from "./styles/mentor_list_item.module.scss";
import Link from "next/link";

export const MentorListItem = ({ data }) => {
  const { first_name, last_name, id, isAdmin, isMentorManager } = data;
  const designation = getDesignation();

  const fullName = `${first_name} ${last_name}`;

  // Conditionally return what role this mentor has.
  function getDesignation() {
    return isAdmin ? "Admin" : isMentorManager ? "Mentor Manager" : "Mentor";
  }

  return (
    <div
      className={`flex flex-align-center flex-justify-between ${styles.wrapper}`}>
      <div className="flex">
        <UserAvatar />
        <UserDetails name={fullName} />
      </div>

      <Button
        type="link"
        variant="normal"
        size="small"
        url={{
          pathname: `/mentors/about/${id}`,
          query: { fullName, designation },
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
      <p className={styles.date_joined}>Added 0ct. 10 2022</p>
    </div>
  );
}

function UserAvatar({ imgURL }) {
  return <div className={styles.user_img}></div>;
}
