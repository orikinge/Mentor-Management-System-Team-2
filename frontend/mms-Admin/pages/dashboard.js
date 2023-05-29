import React, { Component, useEffect, useState } from "react";
import DetailsCard from "../components/atoms/DetailsCard";
import { ReportCard } from "../components/atoms/DetailsCard";
import { Col, Row } from "antd";
import styles from "styles/admin/dashboard.module.scss";
import { getDashboardData } from "./api/dashboard/index";
import { fetchPrograms } from "pages/api/program";
import { Button } from "../components/atoms/Button";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { Loader } from "components/Loader";
import Link from "next/link";
const createArray = (length) => [...Array(length)];

function Badge({ text }) {
  return <div className={styles.program_badge}>{text}</div>;
}

function Dashboard() {
  const { data, isLoading, isError } = useQuery(["dashboard"], () =>
    getDashboardData(),
  );

  if (isLoading) return <Loader />;

  if (isError) return "An error occured";

  return (
    <>
      <div className={styles.header_text}>Dashboard</div>

      <Row>
        <Col xs={12} lg={4} className={styles.active_program}>
          <div className={styles.active_program_number}>
            {data?.data?.active_programs}
          </div>

          <div className={styles.active_program_p}>
            Active
            <span className={styles.active_program_view}>View</span>
            <br /> Programs
          </div>
        </Col>

        <Col
          xs={24}
          sm={24}
          md={24}
          lg={19}
          className={styles.details_card_container}>
          <DetailsCard
            icon="Person"
            text="Mentors"
            number={data?.data?.mentors}
            marginRight="20px"
          />
          <DetailsCard
            icon="People"
            text="Mentor Managers"
            number={data?.data?.mentor_managers}
            width="224px"
            height="69px"
            marginRight="15px"
          />
          <DetailsCard
            icon="Task"
            text="Tasks"
            number={data?.data?.tasks}
            marginRight="15px"
          />
          <DetailsCard
            icon="Report"
            text="Reports"
            number={data?.data?.reports}
          />
        </Col>
      </Row>
      <Row className={styles.details_card_row}>
        <Col span={24} className={styles.programs_header_justify}>
          <div className={styles.overview_header}>Programs Overview</div>
          <div>
            <Badge text={data?.data?.active_programs + " Active"} />
          </div>
        </Col>

        <Col xs={24} className={styles.details_column}>
          {data?.data?.program_list?.map((program) => (
            <DetailsCard
              key={program?.id}
              icon="Person"
              text={program?.name.substring(0, 20)}
              program
              subText="Jun 13, 2022 -> Feb 10, 2023"
              marginRight="20px"
              width="332px"
              height="92px"
            />
          ))}
        </Col>
        <Col span={24} className={styles.button_container}>
          <Link href="/programs" passHref>
            <Button size="small" variant="normal">
              View All
            </Button>
          </Link>
        </Col>
      </Row>

      <Row className={styles.details_card_row}>
        <Col span={24} className={styles.programs_header_justify}>
          <div className={styles.overview_header}>Reports Overview</div>
          <div>
            <Badge text={data?.data?.reports + " Reports Submmited"} />
          </div>
        </Col>

        <Col xs={24} className={styles.details_column}>
          {createArray(3).map((report, index) => (
            <ReportCard
              key={index}
              icon="ReportRight"
              text="GADS Program 2022"
              subText="Jun 13, 2022 -> Feb 10, 2023"
              marginRight="20px"
              report
              width="332px"
              height="64px"
            />
          ))}
        </Col>
        <Col span={24} className={styles.button_container}>
          <Link href="/reports" passHref>
            <Button size="small" variant="normal">
              View All
            </Button>
          </Link>
        </Col>
      </Row>

      <div className={styles.details_card_row} >
        <Col span={24} className={styles.programs_header_justify}>
          <p className={styles.overview_header}>Tasks Overview</p>
        </Col>
        <Row  span={24}>
        <Col span={3} className={styles.details_in_progress_container}>
            <div className={styles.details_in_progress_header}>In Progress</div>
          </Col>
          <Col span={1}></Col>
          <Col span={20} className={styles.details_column}>
            {data?.data?.completed_task_list?.map((task) => (
              <ReportCard
                key={task?.id}
                icon="TaskRight"
                text={task?.title.substring(0, 28) + "..."}
                subtext={moment(task?.end_date).toNow()}
                marginRight="20px"
                report
                width="283px"
                height="92px"
                task
              />
            ))}
          </Col>
          <Col span={24} className={styles.button_container}>
            <Link href="/tasks" passHref>
              <Button size="small" variant="normal">
                View All
              </Button>
            </Link>
          </Col>
        </Row>


        <Row className={styles.mt}>
          <Col span={3} className={styles.details_in_progress_container}>
            <div className={styles.details_in_progress_header}>Completed</div>
          </Col>
          <Col span={1}></Col>
          <Col span={20} className={styles.details_column}>
            {data?.data?.inprogress_task_list?.map((task) => (
              <ReportCard
                key={task?.id}
                icon="TaskRight"
                text={task?.title.substring(0, 28) + "..."}
                subtext={moment(task?.end_date).toNow()}
                marginRight="20px"
                report
                width="283px"
                height="92px"
                task
              />
            ))}
          </Col>
          <Col span={24} className={styles.button_container}>
            <Link href="/tasks" passHref>
              <Button size="small" variant="normal">
                View All
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
