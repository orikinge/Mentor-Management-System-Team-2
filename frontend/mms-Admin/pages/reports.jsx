import React, { useEffect, useState } from "react";
import { ListItem } from "../components/atoms/ListItem";
import { Icons } from "../components/atoms/Icons";
import { Loader } from "../components/atoms/Loader";
import { Button } from "../components/atoms/Button";
import styles from "../styles/reports.module.scss";
import Modal from "../components/molecules/Modal";
import { ShareReportConfirmationDialogue } from "../components/molecules/ShareReportConfirmationDialogue";
import { SuccessModal } from "../components/molecules/SuccessModal";
import NoItemSelected from "../components/organisms/NoItemSelected";
import {
  fetchTaskReports,
  fetchProgramReports,
  downloadTaskReport,
  downloadProgramReport,
} from "./api/report/index";
import { format } from "date-fns";

const Reports = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [report, setReport] = useState(null);
  const [reportFilterType, setReportFilterType] = useState("program");
  const [showConfirmSharingByEmail, setShowConfirmSharingByEmail] =
    useState(false);
  const [showDownLoadSuccessModal, setShowDownLoadSuccessModal] =
    useState(false);
  const [reports, setReports] = useState([]);

  useEffect(async () => {
    if (reportFilterType === "program") {
      const reportData = await fetchProgramReports();
      if (reportData) {
        setReports((prev) => reportData);
        setIsLoading(false);
      }
    }

    if (reportFilterType === "task") {
      const reportData = await fetchTaskReports();
      if (reportData) {
        setReports((prev) => reportData);
        setIsLoading(false);
      }
    }
  }, [reportFilterType]);

  function changeFilterType(type) {
    setIsLoading(true);
    setReport(null);
    setReportFilterType(type);
  }

  async function downloadATaskReport() {
    const response = await downloadTaskReport();
  }

  async function downloadAProgramReport() {
    const response = await downloadProgramReport();
  }

  return (
    <div className={`flex`}>
      <div className={styles.list_area}>
        <div
          className={`flex flex-align-center gap-16 ${styles.report_selector}`}>
          <label>
            <input
              name="report_type"
              type="radio"
              onChange={() => changeFilterType("program")}
              checked={reportFilterType === "program"}
            />
            <div>Program Reports</div>
          </label>
          <label>
            <input
              name="report_type"
              type="radio"
              onChange={() => changeFilterType("task")}
              checked={reportFilterType === "task"}
            />
            <div>Task Reports</div>
          </label>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {reports.length > 0 ? (
              <div className={`${styles.list_wrapper}`}>
                {reports.map((item) => (
                  <ListItem
                    onClick={() => setReport(item)}
                    className="cursor-pointer"
                    key={item.id}>
                    <div className={`flex gap-16 flex-align-center`}>
                      <Icons name="report-sheet" />
                      <div>
                        <p className={`list_main_text`}>
                          {item[reportFilterType]?.title}
                        </p>
                        <div className={`flex gap-16`}>
                          <p className="list_sub_text">
                            {`By ${item.mentorManager.firstName} ${item.mentorManager.lastName}`}
                          </p>
                          {reportFilterType === "task" &&
                            item[reportFilterType] && (
                              <p className="list_sub_text">
                                {`${format(
                                  new Date(item[reportFilterType]?.startDate),
                                  "d",
                                )} - ${format(
                                  new Date(item[reportFilterType]?.endDate),
                                  "dd MMM yyyy",
                                )}`}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                  </ListItem>
                ))}
              </div>
            ) : (
              <p>No report found</p>
            )}
          </>
        )}
      </div>

      <div className={styles.report_details}>
        {!report && (
          <div
            className={`flex flex-justify-end ${styles.compose_button_area}`}>
            <Button variant="normal" size="large">
              Compose Report
            </Button>
          </div>
        )}
        <div className={styles.report_details_content}>
          {report ? (
            <div>
              <div
                className={`flex flex-justify-between flex-align-center ${styles.details_header}`}>
                <div className="flex gap-16 flex-align-center ">
                  <Icons name="report-sheet" width="30" />
                  <div>
                    <p className={`list_main_text`}>
                      {report[reportFilterType].title}
                    </p>
                    <div className={`flex gap-16`}>
                      <p className="list_sub_text">
                        {`By ${report.mentorManager.firstName} ${report.mentorManager.lastName}`}
                      </p>
                      {reportFilterType === "task" && (
                        <p className="list_sub_text">
                          {`${format(
                            new Date(report[reportFilterType].startDate),
                            "d",
                          )} - ${format(
                            new Date(report[reportFilterType].endDate),
                            "dd MMM yyyy",
                          )}`}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <Icons onClick={() => setReport(null)} name="close" />
              </div>

              <div className={styles.details_body}>
                <section>
                  <h1>Major Achievements</h1>
                  <p>{report.achievement}</p>
                </section>

                <section>
                  <h1>Major Blockers</h1>
                  <p>{report.blocker}</p>
                </section>

                <section>
                  <h1>Major Recommendations</h1>
                  <p>{report.recommendation}</p>
                </section>

                <section className="flex flex-justify-between">
                  <Button
                    onClick={() => setShowConfirmSharingByEmail(true)}
                    variant="white"
                    size="large"
                    bordered>
                    Share
                  </Button>
                  <Button
                    onClick={() => setShowDownLoadSuccessModal(true)}
                    variant="normal"
                    size="large">
                    Download
                  </Button>
                </section>
              </div>
            </div>
          ) : (
            <NoItemSelected />
          )}
        </div>
      </div>

      <Modal show={showConfirmSharingByEmail}>
        <ShareReportConfirmationDialogue
          onClose={() => setShowConfirmSharingByEmail(false)}
          onConfirm={() => {
            setShowConfirmSharingByEmail(false);
          }}
        />
      </Modal>
      <Modal show={showDownLoadSuccessModal}>
        <SuccessModal
          onClose={() => setShowDownLoadSuccessModal(false)}
          onConfirm={() => {
            setShowDownLoadSuccessModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Reports;
