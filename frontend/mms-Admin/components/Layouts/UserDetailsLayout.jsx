import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./styles/user_details.module.scss";
import { ListItem } from "../atoms/ListItem";
import { Icons } from "../atoms/Icons";
import Image from "next/image";
import { Button } from "../atoms/Button";
import { CustomTab } from "../organisms/CustomTab";
import { useRouter } from "next/router";
import { fetchMentorManagers, fetchMentors } from "../../pages/api/user";
import { format } from "date-fns";

const UserDetailsLayout = ({ data, children }) => {
  const router = useRouter();
  const role = router.pathname.split("/")[1];

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery([role], role === "mentors" ? fetchMentors : fetchMentorManagers);

  if (isLoading) return "loading...";

  if (isError) return "An error occured";

  return (
    <div className="flex">
      <div className={styles.user_list_container}>
        <ListHeader />

        <Users users={users.data} />
      </div>
      <div className={styles.user_details_container}>
        <UserDetails users={users.data} children={children} role={role} />
      </div>
    </div>
  );
};

const ListHeader = ({ userRole }) => {
  return (
    <div className={`flex flex-justify-between ${styles.user_list_header}`}>
      <h1 className={`${styles.title}`}>{userRole ? userRole : "Mentors"}</h1>
      <Icons name="search" width="24" height="24" fill="#058B94" />
    </div>
  );
};

const Users = ({ users }) => {
  return (
    <div className={styles.users}>
      {users.map((user) => (
        <ListItem key={user.id}>
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
                className={`list_main_text`}>{`${user.first_name} ${user.last_name}`}</h1>
              <div className={`flex flex-column gap-10 flex-justify-center`}>
                <p className={`list_sub_text`}>
                  Added {format(new Date(user.created_at), "MMM. dd yyyy")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-column gap-16">
            <Button
              type="link"
              url={`/mentor-managers/about/${user.id}`}
              variant="normal"
              size="small">
              View
            </Button>
          </div>
        </ListItem>
      ))}
    </div>
  );
};

const UserDetails = ({ children, role, users }) => {
  const router = useRouter();
  const { id, avatar } = router.query;
  const [userDetails, setUserDetails] = useState({});

  function generateSubPages(role) {
    const defaultSubPages = [
      {
        name: "About",
        link: `/${role}/about/${router.query.id}`,
      },
      {
        name: "Programs",
        link: `/${role}/programs/${router.query.id}`,
      },
      {
        name: "Tasks",
        link: `/${role}/tasks/${router.query.id}`,
      },
      {
        name: "Certificates",
        link: `/${role}/certificates/${router.query.id}`,
      },
    ];

    if (role === "mentor-managers") {
      return [
        ...defaultSubPages,
        {
          name: "Mentors",
          link: `/${role}/mentors/${router.query.id}`,
        },
      ];
    }

    return defaultSubPages;
  }

  const subPages = generateSubPages(role);

  function getUserDetails(id) {
    return users.filter((user) => user.id == id)[0];
  }

  function getDesignation(isAdmin, isMentorManager) {
    return isAdmin ? "Admin" : isMentorManager ? "Mentor Manager" : "Mentor";
  }

  useEffect(() => {
    setUserDetails(getUserDetails(id));
  }, [id]);

  return (
    <>
      <div
        className={`flex flex-align-center flex-justify-between ${styles.user_details_wrapper}`}>
        <div className="flex gap-10">
          <Image
            width={90}
            height={90}
            src={avatar ? avatar : "/assets/images/user_img.svg"}
            alt="User profile image"
            className={styles.user_img}
          />
          <div className="flex flex-justify-center flex-column">
            <h2
              className={
                styles.user_name
              }>{`${userDetails.first_name} ${userDetails.last_name}`}</h2>
            <p className={styles.designation}>
              {getDesignation(userDetails.isAdmin, userDetails.isMentorManager)}
            </p>
          </div>
        </div>

        <div className={`flex ${styles.cta_wrapper}`}>
          <Button variant="normal" size="large">
            Send Message
          </Button>
          <Button variant="normal" size="large">
            Close
          </Button>
        </div>
      </div>
      <CustomTab tabs={subPages}>{children}</CustomTab>
    </>
  );
};

export default UserDetailsLayout;
