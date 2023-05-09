import { Icons } from "../atoms/Icons";
import { MentorListItem } from "../molecules/MentorListItem";
import styles from "./styles/mentor_list.module.scss";

export const MentorsList = ({ mentors }) => {
  return (
    <>
      <div
        className={`flex flex-justify-between ${styles.mentors_list_header}`}>
        <h1 className={`${styles.title}`}>Mentors</h1>
        <Icons name="search" width="24" height="24" fill="#058B94" />
      </div>
      <div className={styles.mentors_list}>
        {mentors.map((mentor, idx) => (
          <MentorListItem key={idx} data={mentor} />
        ))}
      </div>
    </>
  );
};
