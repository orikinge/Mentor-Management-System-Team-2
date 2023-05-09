import { useRouter } from "next/router";
import { Button } from "../atoms/Button";
import { CustomTab } from "./CustomTab";
import styles from "./styles/mentor_details.module.scss";

export const MentorDetails = ({ children }) => {
  const router = useRouter();
  const { fullName, designation } = router.query;
  const urlQuery = { fullName, designation };

  const subPages = [
    {
      name: "About",
      link: {
        pathname: `/mentors/about/${router.query.mentorID}`,
        query: urlQuery,
      },
    },
    {
      name: "Programs",
      link: {
        pathname: `/mentors/programs/${router.query.mentorID}`,
        query: urlQuery,
      },
    },
    {
      name: "Tasks",
      link: {
        pathname: `/mentors/tasks/${router.query.mentorID}`,
        query: urlQuery,
      },
    },
    {
      name: "Certificates",
      link: {
        pathname: `/mentors/certificates/${router.query.mentorID}`,
        query: urlQuery,
      },
    },
  ];

  return (
    <>
      <div
        className={`flex flex-align-center flex-justify-between ${styles.wrapper}`}>
        <div className="flex">
          <div className={styles.user_img}></div>
          <div className="flex flex-justify-center flex-column">
            <h2 className={styles.user_name}>{`${fullName}`}</h2>
            <p className={styles.designation}>{designation}</p>
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
