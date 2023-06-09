import React from "react";
import { format, formatDistance } from "date-fns";
import styles from "styles/admin/dashboard.module.scss";
import { getDashboardData } from "./api/dashboard/index";
import { Button } from "../components/atoms/Button";
import { FlexContainer, Section } from "../components/atoms/HTMLElements";
import { Icons } from "../components/atoms/Icons";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "components/atoms/Loader";

function Dashboard() {
  const { data, isLoading, isError } = useQuery(["dashboard"], () =>
    getDashboardData(),
  );

  if (isLoading) return <Loader />;

  if (isError) return "An error occured";

  return (
    <div className={`flex flex-column gap-y-6 ${styles.wrapper}`}>
      <h1 className={`text-lg font-bold text-gray-700`}>Dashboard</h1>

      <FlexContainer className="gap-x-8">
        <Section className="px-3 min-w-[200px] pt-4 bg-mms-teal text-white rounded w-1/6">
          <div className="flex justify-end">
            <Button type="link" url="/programs" variant="white" size="small">
              View
            </Button>
          </div>
          <div className="flex items-center gap-x-4">
            <h1 className="text-7xl">{data.active_programs}</h1>
            <h3 className="text-xl font-bold w-1/2 leading-5">
              Active Programs
            </h3>
          </div>
        </Section>

        <Section className="flex overflow-x-auto gap-x-4 justify-between p-3 w-5/6 bg-mms-ts-teal rounded">
          <ReportCard
            title="Mentors"
            meta={data.mentors}
            icon={<Icons name="mentor-lg" />}
          />

          <ReportCard
            title="Mentor Managers"
            meta={data.mentor_managers}
            icon={<Icons name="mentor-manager-lg" />}
          />

          <ReportCard
            title="Tasks"
            meta={data.tasks}
            icon={<Icons name="task" fill="#058B94" />}
          />

          <ReportCard
            title="Reports"
            meta={data.reports}
            icon={<Icons name="report-sheet" width="35" />}
          />
        </Section>
      </FlexContainer>

      {/* Programs overview */}
      <Section className="flex flex-column gap-y-4 justify-between p-3 w-full bg-mms-ts-teal rounded">
        <div className="flex justify-between">
          <h1 className={`text-base font-bold text-gray-600`}>
            Programs Overview
          </h1>
          <h1 className={`bg-white px-4 py-1 text-base`}>
            {data.active_programs} Active
          </h1>
        </div>
        <div className="flex overflow-x-auto gap-x-4 justify-between">
          {data.program_list.map((program) => (
            <ReportCard
              key={program.id}
              title={program.name}
              meta={
                <p className="text-lg">
                  {format(new Date(program.created_at), "dd MMM yyyy")}
                </p>
              }
              icon={<Icons name="gads" />}
              flip
            />
          ))}
        </div>
        <div className="flex justify-end">
          <Button type="link" url="/programs" variant="normal" size="small">
            View all
          </Button>
        </div>
      </Section>

      {/* Reports overview */}
      <Section className="flex flex-column gap-y-4 justify-between p-3 w-full bg-mms-ts-teal rounded">
        <div className="flex justify-between">
          <h1 className={`text-base font-bold text-gray-600`}>
            Reports Overview
          </h1>
          <h1 className={`bg-white px-4 py-1 text-base`}>
            {data.reports} reports submitted
          </h1>
        </div>
        <div className="flex overflow-x-auto gap-x-4 justify-between">
          {data.report_list.map((report) => (
            <ReportCard
              key={report.id}
              title={report.achievement}
              meta={
                <p className="text-lg">
                  {`${report.mentorManager.firstName} ${
                    report.mentorManager.lastName
                  } - ${format(
                    new Date(report.task.startDate),
                    "dd",
                  )} - ${format(new Date(report.task.endDate), "dd MMM yyyy")}`}
                </p>
              }
              icon={<Icons name="report-sheet" width="35" />}
              flip
            />
          ))}
        </div>
        <div className="flex justify-end">
          <Button type="link" url="/reports" variant="normal" size="small">
            View all
          </Button>
        </div>
      </Section>

      {/* Tasks overview */}
      <Section className="flex flex-column gap-y-4 justify-between p-3 w-full bg-mms-ts-teal rounded">
        <div className="flex justify-between">
          <h1 className={`text-base font-bold text-gray-600`}>
            Tasks Overview
          </h1>
        </div>
        <FlexContainer className="gap-x-8">
          <Section className="flex min-w-[200px] justify-center items-center px-3 bg-mms-teal text-white rounded w-1/6">
            <h3 className="text-xl font-bold leading-5">In progress</h3>
          </Section>

          <Section className="flex overflow-x-auto gap-x-4 justify-between w-5/6">
            {data.inprogress_task_list.map((task) => (
              <ReportCard
                key={task.id}
                title={task.title}
                meta={
                  <p className="flex items-center gap-x-4">
                    {<Icons name="calendar" />}{" "}
                    {formatDistance(new Date(task.end_date), new Date(), {
                      addSuffix: true,
                    })}
                  </p>
                }
                icon={<Icons name="task" fill="#058B94" />}
                flip
              />
            ))}
          </Section>
        </FlexContainer>

        <FlexContainer className="gap-x-8">
          <Section className="flex min-w-[200px] justify-center items-center px-3 bg-mms-teal text-white rounded w-1/6">
            <h3 className="text-xl font-bold leading-5">Completed</h3>
          </Section>

          <Section className="flex overflow-x-auto gap-x-4 justify-between w-5/6">
            {data.completed_task_list.map((task) => (
              <ReportCard
                key={task.id}
                title={task.title}
                meta={
                  <p className="flex items-center gap-x-4">
                    {<Icons name="calendar" />}{" "}
                    {formatDistance(new Date(task.end_date), new Date(), {
                      addSuffix: true,
                    })}
                  </p>
                }
                icon={<Icons name="task" fill="#058B94" />}
                flip
              />
            ))}
          </Section>
        </FlexContainer>
        <div className="flex justify-end">
          <Button type="link" url="/tasks" variant="normal" size="small">
            View all
          </Button>
        </div>
      </Section>
    </div>
  );
}

function ReportCard({ flip, title, meta, icon }) {
  return (
    <FlexContainer
      className={`min-w-[250px] bg-mms-light-teal basis-1/2 rounded p-4`}>
      <div
        className={`flex items-center gap-x-4 w-full ${
          flip ? "flex-row-reverse justify-end" : "justify-between"
        }`}>
        <Section>
          <p className="text-xl font-bold text-gray-600">{`${title.substring(
            0,
            25,
          )}...`}</p>
          <div className="flex items-center gap-x-4">{meta}</div>
        </Section>
        <div>{icon}</div>
      </div>
    </FlexContainer>
  );
}

export default Dashboard;
