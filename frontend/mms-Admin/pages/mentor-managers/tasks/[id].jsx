import React from "react";
import UserDetailsLayout from "../../../components/Layouts/UserDetailsLayout";
import { formatDistance } from "date-fns";
import { Inputs } from "../../../components/atoms/Inputs";
import { Icons } from "../../../components/atoms/Icons";
import { Loader } from "../../../components/atoms/Loader";
import { Button } from "../../../components/atoms/Button";
import { Stats } from "../../../components/molecules/Stats";
import { Accordion } from "../../../components/molecules/Accordion";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getMentorManagersTasks } from "pages/api/mentor";

function MentorManagerTasks() {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery(["mentor_manager_tasks"], () =>
    getMentorManagersTasks(router.query.id),
  );

  if (isLoading) return <Loader />;

  if (isError) return "An error occured";

  return (
    <>
      <div className="flex pt-4 pb-4 justify-between items-center">
        <p>All tasks</p>
        <div className="w-full lg:max-w-[40%]">
          <Inputs
            icon={<Icons name="search" fill="#cbcbcb" width={20} />}
            type="search"
            placeholder="search here"
          />
        </div>
      </div>
      <div className="h-[70vh] overflow-y-auto pb-16">
        {data.map((item) => {
          const { description, endDate, id, taskReportCount, title } = item;

          return (
            <Accordion
              header={
                <div className="flex flex-justify-between flex-align-center">
                  <div className="flex gap-x-4 flex-align-center">
                    <Icons name="task" fill="#058B94" margin="0 1rem 0 0" />
                    <div className={`flex flex-justify-center flex-column`}>
                      <h1 className="text-lg font-bold">{title} </h1>
                      <div className="flex gap-x-2 flex-align-center">
                        <Icons name="calendar" />
                        <p>
                          {formatDistance(new Date(endDate), new Date(), {
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
                <div className={`flex`}>
                  <div className="w-full">
                    <h2 className="text-xl font-bold">About</h2>

                    <div className="pt-4 pb-4">
                      <p className="text-gray-500">{description}</p>
                    </div>

                    <Stats
                      url={`/tasks/reports/${id}`}
                      icon={<Icons name="report-sheet" />}
                      number={taskReportCount}
                      text="Task reports"
                    />
                  </div>
                </div>
              }
              footer={
                <div className="flex justify-end">
                  <Button variant="white" size="large" bordered>
                    Unassign from Program
                  </Button>
                </div>
              }
            />
          );
        })}
      </div>
    </>
  );
}

MentorManagerTasks.getLayout = function getLayout(page) {
  return <UserDetailsLayout>{page}</UserDetailsLayout>;
};

export default MentorManagerTasks;
