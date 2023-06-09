import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import styles from "../../styles/programs/programs.module.scss";
import { Icons } from "../../components/atoms/Icons";
import { Loader } from "../../components/atoms/Loader";
import { ListItem } from "../../components/atoms/ListItem";
import { Button } from "../../components/atoms/Button";
import { Stats } from "../../components/molecules/Stats";
import NoItemSelected from "../../components/organisms/NoItemSelected";
import { fetchTasks } from "pages/api/task";
import { formatDistance } from "date-fns";
import { useRouter } from "next/router";

const Tasks = () => {
  const router = useRouter();
  const [task, setTask] = useState(null);
  const { data: tasks, isLoading, isError } = useQuery(["tasks"], fetchTasks);

  useEffect(() => {
    if (router.query.id && tasks) {
      setTask((prev) => tasks.filter((task) => task.id == router.query.id)[0]);
    }
  }, [tasks]);

  if (isLoading) return <Loader />;

  if (isError) return "An error occured";

  return (
    <div className={`flex`}>
      <div className={`${styles.list_area}`}>
        <div className="flex flex-justify-between flex-align-center mb-1">
          <h1 className={styles.page_title}>Tasks</h1>
          <div className={`flex flex-align-center gap-10`}>
            <Icons name="search" width="24" fill="#058B94" />
            <Icons name="filter" />
          </div>
        </div>

        <div className={`${styles.list_wrapper}`}>
          {tasks.map((item) => (
            <ListItem
              onClick={() => {
                router.push({
                  pathname: `/tasks`,
                  query: { id: encodeURI(item.id) },
                });
                setTask(item);
              }}
              className="cursor-pointer"
              key={item.id}>
              <div className={`flex gap-16 flex-align-center`}>
                <Icons name="task" fill="#058B94" />

                <div>
                  <p className={`list_main_text`}>{item.title}</p>
                  <div className={`flex gap-10`}>
                    <p className="flex flex-align-center gap-10 list_sub_text">
                      <Icons name="calendar" />
                      {formatDistance(new Date(item.endDate), new Date(), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </ListItem>
          ))}
        </div>
      </div>

      <div className={styles.program_details}>
        <div className={`flex flex-justify-end ${styles.compose_button_area}`}>
          <Button variant="normal" size="large" type="link" url="/tasks/create">
            Create New Task
          </Button>
        </div>
        <div className={styles.program_details_content}>
          {task ? (
            <div>
              <div
                className={`flex flex-justify-between flex-align-center ${styles.details_header}`}>
                <div className={`flex gap-16 flex-align-center`}>
                  <Icons name="task" fill="#058B94" />
                  <div>
                    <p className={`list_main_text`}>{task.title}</p>
                    <div className={`flex gap-10`}>
                      <p className="flex flex-align-center gap-10 list_sub_text">
                        <Icons name="calendar" />
                        {formatDistance(new Date(task.endDate), new Date(), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                </div>
                <Icons onClick={() => setTask(null)} name="close" />
              </div>

              <div className={styles.details_body}>
                <section>
                  <p>{task.description}</p>

                  <Stats
                    url={`/tasks/assignees/mentor-manager/${task.id}`}
                    icon={<Icons name="mentor-manager" />}
                    number={task.mentorManagerCount}
                    text="Mentor Managers assigned to this task"
                  />

                  <Stats
                    url={`/tasks/assignees/mentor/${task.id}`}
                    icon={<Icons name="mentor" />}
                    number={task.mentorCount}
                    text="Mentors assigned to this task"
                  />

                  <Stats
                    url={`/tasks/reports/${task.id}`}
                    icon={<Icons name="report-sheet" />}
                    number={task.taskReportCount}
                    text="Task reports"
                  />
                </section>

                <section className="flex flex-align-center flex-justify-end gap-16">
                  <Link href="#">
                    <span className={`cursor-pointer ${styles.remove_program}`}>
                      Delete
                    </span>
                  </Link>
                  <Button
                    type="link"
                    url={`/tasks/edit?id=${task.id}`}
                    variant="normal"
                    size="large">
                    Edit Task
                  </Button>
                </section>
              </div>
            </div>
          ) : (
            <NoItemSelected />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
