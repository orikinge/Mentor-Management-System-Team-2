import { useState, useEffect } from "react";
import Statistics from "components/admin/dashboard/Statistics";
import Programs from "components/admin/dashboard/Programs";
import Reports from "components/admin/dashboard/Reports";

import { fetchMentors, fetchMentorManagers } from "pages/api/user";
import { fetchTaskReports } from "pages/api/taskReport";
import { fetchTasks } from "pages/api/task";
import { fetchPrograms } from "pages/api/program";

import styles from "styles/admin/dashboard.module.scss";
import Tasks from "components/admin/dashboard/Tasks";

let stats = [
  { 
    title: "Mentors",
    total: 0,
    icon: "Person",
  },
  {
    title: "Mentor Managers",
    total: 0,
    icon: "People",
  },
  {
    title: "Tasks",
    total: 0,
    icon: "Task",
  },
  {
    title: "Reports",
    total: 0,
    icon: "Report",
  },
];

const initialState = {
  mentors: [],
  managers: [],
  tasks: [],
  reports: [],
  programs: [],
};

const Dashboard = () => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data: { mentors } } = await fetchMentors();
        const { data: tasks } = await fetchTasks();
        const { data: reports } = await fetchTaskReports();
        const { data: { mentorManagers } } = await fetchMentorManagers();
        const { data: programs } = await fetchPrograms();


        setState((prev) => ({
          ...prev,
          mentors,
          tasks: tasks?.data,
          managers: mentorManagers,
          reports: reports?.responseData,
          programs: programs?.data
        }));

        // TODO:
        // Persist data to store
      } catch (error) {}
      setLoading(false);
    };

    getData();
  }, []);

  const getStats = () => stats.map((stat) => {
    switch (stat.title) {
      case "Mentors":
        return { ...stat, total: state.mentors.length };
      case "Mentor Managers":
        return { ...stat, total: state.managers.length };
      case "Tasks":
        return { ...stat, total: state.tasks.length };
      case "Reports":
        return { ...stat, total: state.reports.length };
      default:
        return stat;
    }
  });

  return (
    <div className={styles.dashboard}>
      <Statistics stats={getStats()} loading={loading} />
      <Programs programs={state.programs.slice(0 ,3)} loading={loading} />
      <Reports reports={state.reports.slice(0, 3)} loading={loading} />
      <Tasks tasks={state.tasks} loading={loading} />
    </div>
  );
};

export default Dashboard;
