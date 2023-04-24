import Statistics from "components/admin/dashboard/Statistics";
import Programs from "components/admin/dashboard/Programs";
import Reports from "components/admin/dashboard/Reports";

import styles from "styles/admin/dashboard.module.scss";
import Tasks from "components/admin/dashboard/Tasks";

const stats = [
  {
    title: "Mentors",
    value: 30,
    icon: "Person",
  },
  {
    title: "Mentor Managers",
    value: 10,
    icon: "People",
  },
  {
    title: "Tasks",
    value: 40,
    icon: "Task",
  },
  {
    title: "Reports",
    value: 38,
    icon: "Report",
  },
];

const programs = [
  {
    name: "GADS Program 2022",
    level: "50%",
    date: "Apr 21, 2023",
  },
  {
    name: "GADS Program 2022",
    level: "50%",
    date: "Apr 21, 2023",
  },
  {
    name: "GADS Program 2022",
    level: "50%",
    date: "Apr 21, 2023",
  },
];

const reports = [
  {
    title: "Google Africa Scholarship",
    author: "Ibrahim Kabir",
    date: "25th Aug 2022",
  },
  {
    title: "Google Africa Scholarship",
    author: "Ibrahim Kabir",
    date: "25th Aug 2022",
  },
  {
    title: "Google Africa Scholarship",
    author: "Ibrahim Kabir",
    date: "25th Aug 2022",
  },
]

const tasks = [
  {
    title: "Room library article",
    daysLeft: 2,
  },
  {
    title: "Room library article",
    daysLeft: 2
  },
  {
    title: "Room library article",
    daysLeft: 2
  },
]

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Statistics stats={stats} />
      <Programs programs={programs} />
      <Reports reports={reports} />
      <Tasks tasks={tasks} />
    </div>
  );
};

export default Dashboard;
