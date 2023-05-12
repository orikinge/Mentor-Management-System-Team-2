import React from "react";
import { formatDistance } from "date-fns";
import MentorDetailsLayout from "../../../components/Layouts/MentorDetailsLayout";
import { Icons } from "../../../components/atoms/Icons";
import styles from "../../../styles/mentors/tasks.module.scss";
import { Button } from "../../../components/atoms/Button";
import { Accordion } from "../../../components/molecules/Accordion";
import { useQuery } from "@tanstack/react-query";
import { fetchMentorTasks } from "pages/api/user";
import { useRouter } from "next/router"; 

function MentorTasks() {
  const router = useRouter();
  const {
    data: tasks,
    isLoading,
    isError,
  } = useQuery(["mentor_tasks"], () => fetchMentorTasks(router.query.mentorID));
  if (isLoading) return "loading tasks...";

  if (isError) return "An error occured";
  console.log(isError)

  return (
    <div className={styles.wrapper}>
      {tasks.length > 0 ? (
        <>
          {tasks.map((task, idx) => (
            <Accordion
              key={idx}
              header={
                <div className="flex flex-justify-between flex-align-center">
                  <div className="flex flex-align-center">
                    <Icons name="task" fill="#058B94" margin="0 1rem 0 0" />
                    <div
                      className={`flex flex-justify-center flex-column ${styles.title_area}`}>
                      <h1 className={styles.task_title}>{task.title}</h1>
                      <div className="flex flex-align-center">
                        <Icons name="calendar" />
                        <p className={styles.brief_description}>
                          {formatDistance(new Date(task.endDate), new Date(), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Icons name="arrow-up" fill="#058B94" />
                </div>
              }
              body={
                <>
                  <p className={styles.task_description}>{task.description}</p>
                  <div
                    className={`flex flex-justify-between flex-align-center ${styles.task_stats}`}>
                    <div className="flex flex-align-center">
                      <Icons name="report-sheet" />

                      <div
                        className={`flex flex-align-center ${styles.report_stat}`}>
                        <h1 className={styles.number_of_reports}>
                          {task.reports.length}
                        </h1>
                        <p className={styles.stat_text}>Task reports</p>
                      </div>
                    </div>

                    <div>
                      <Button variant="normal" size="small">
                        View
                      </Button>
                    </div>
                  </div>
                </>
              }
              footer={
                <Button variant="transparent" size="large" bordered={true}>
                  Unassign from Task
                </Button>
              }
            />
          ))}
        </>
      ) : (
        <p>No task found for user</p>
      )}
    </div>
  );
}

MentorTasks.getLayout = function getLayout(page) {
  return <MentorDetailsLayout>{page}</MentorDetailsLayout>;
};

export default MentorTasks;
