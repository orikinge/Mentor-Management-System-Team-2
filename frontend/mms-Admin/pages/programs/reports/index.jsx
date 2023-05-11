import React from "react";
import { ListItem } from "../../../components/atoms/ListItem";
import { Icons } from "../../../components/atoms/Icons";
import styles from "../../../styles/programs/reports.module.scss";

const Reports = () => {
  return (
    <div>
      {/* TODO: Make this pagination component re-usable but filter and close icons will be conditional */}
      <div className="flex flex-justify-between flex-align-center">
        <h1 className={styles.page_title}>Reports</h1>
        <div className={`flex flex-align-center gap-10`}>
          <span className={`cursor-pointer`}>
            <Icons name="double-backward" />
          </span>
          <span className={`cursor-pointer`}>
            <Icons name="backward" />
          </span>
          <span>1 </span> - <span>10</span> of <span>20</span>
          <span className={`cursor-pointer`}>
            <Icons name="foward" />
          </span>
          <span className={`cursor-pointer`}>
            <Icons name="double-foward" />
          </span>
          <span className="cursor-pointer">
            <Icons name="filter" />
          </span>
          <span className={`cursor-pointer`}>
            <Icons name="close" />
          </span>
        </div>
      </div>
      <div className={styles.program_reports}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <ListItem key={item}>
            <div className="flex flex-align-center gap-16">
              <Icons width="30" name="report-sheet" />
              <div>
                <h1 className={`list_main_text`}>Google Africa Scholarship</h1>
                <div className={`flex flex-align-center`}>
                  <p className={`list_sub_text`}>By Ibrahim Kabir -</p>
                  <p className={`list_sub_text`}> 19th - 25th Oct 22</p>
                </div>
              </div>
            </div>
            <div className="flex gap-16">
              <span className={`cursor-pointer`}>
                <Icons name="download" />
              </span>
              <span className={`cursor-pointer`}>
                <Icons name="forward" />
              </span>
              <span className={`cursor-pointer`}>
                <Icons name="arrow-up" />
              </span>
            </div>
          </ListItem>
        ))}
      </div>
    </div>
  );
};

export default Reports;
