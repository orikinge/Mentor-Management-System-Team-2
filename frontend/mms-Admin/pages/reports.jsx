import React, { useState } from "react";
import { ListItem } from "../components/atoms/ListItem";
import { Icons } from "../components/atoms/Icons";
import { Button } from "../components/atoms/Button";
import styles from "../styles/reports.module.scss";
import Modal from "../components/molecules/Modal";
import { ShareReportConfirmationDialogue } from "../components/molecules/ShareReportConfirmationDialogue";
import { DownloadSuccessModal } from "../components/molecules/DownloadSuccessModal";

const Reports = () => {
  const [report, setReport] = useState(null);
  const [reportFilterType, setReportFilterType] = useState("program");
  const [showConfirmSharingByEmail, setShowConfirmSharingByEmail] =
    useState(false);
  const [showDownLoadSuccessModal, setShowDownLoadSuccessModal] =
    useState(false);

  return (
    <div className={`flex`}>
      <div>
        <div
          className={`flex flex-align-center gap-16 ${styles.report_selector}`}>
          <label>
            <input
              name="report_type"
              type="radio"
              onChange={() => setReportFilterType("program")}
            />
            <div>Program Reports</div>
          </label>
          <label>
            <input
              name="report_type"
              type="radio"
              onChange={() => setReportFilterType("task")}
            />
            <div>Task Reports</div>
          </label>
        </div>
        <div className={`${styles.list_wrapper}`}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <ListItem
              onClick={() => setReport({})}
              className="cursor-pointer"
              key={item}>
              <div className={`flex gap-16 flex-align-center`}>
                <Icons name="report-sheet" />
                <div>
                  <p className={`list_main_text`}>Google Africa Scholarship</p>
                  <div className={`flex`}>
                    <p className="list_sub_text">By Ibrahim Kabir -</p>
                    <p className="list_sub_text"> 19th - 25th Oct 22</p>
                  </div>
                </div>
              </div>
            </ListItem>
          ))}
        </div>
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
                      Google Africa Scholarship
                    </p>
                    <div className={`flex`}>
                      <p className="list_sub_text">By Ibrahim Kabir -</p>
                      <p className="list_sub_text"> 19th - 25th Oct 22</p>
                    </div>
                  </div>
                </div>
                <Icons onClick={() => setReport(null)} name="close" />
              </div>

              <div className={styles.details_body}>
                <section>
                  <h1>Major Achievements</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    et massa mi. Aliquam in hendrerit urna. Pellentesque sit
                    amet sapien fringilla, mattis ligula consectetur, ultrices
                    mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet
                    augue. Vestibulum auctor ornare leo, non suscipit magna
                    interdum eu. Curabitur pellentesque nibh nibh, at maximus
                    ante fermentum sit amet. Pellentesque commodo lacus at
                    sodales sodales. Quisque sagittis orci ut diam condimentum,
                    vel euismod erat placerat.{" "}
                  </p>
                </section>

                <section>
                  <h1>Major Achievements</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    et massa mi. Aliquam in hendrerit urna. Pellentesque sit
                    amet sapien fringilla, mattis ligula consectetur, ultrices
                    mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet
                    augue. Vestibulum auctor ornare leo, non suscipit magna
                    interdum eu. Curabitur pellentesque nibh nibh, at maximus
                    ante fermentum sit amet. Pellentesque commodo lacus at
                    sodales sodales. Quisque sagittis orci ut diam condimentum,
                    vel euismod erat placerat.{" "}
                  </p>
                </section>

                <section>
                  <h1>Major Achievements</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    et massa mi. Aliquam in hendrerit urna. Pellentesque sit
                    amet sapien fringilla, mattis ligula consectetur, ultrices
                    mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet
                    augue. Vestibulum auctor ornare leo, non suscipit magna
                    interdum eu. Curabitur pellentesque nibh nibh, at maximus
                    ante fermentum sit amet. Pellentesque commodo lacus at
                    sodales sodales. Quisque sagittis orci ut diam condimentum,
                    vel euismod erat placerat.{" "}
                  </p>
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
            <div
              className={`flex flex-align-center flex-justify-center ${styles.empty_report_screen}`}>
              <div className="flex flex-column flex-align-center">
                <Icons name="report-details" />
                <h1>No item selected yet </h1>
                <p>Select an item from the list to view report details</p>
              </div>
            </div>
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
        <DownloadSuccessModal
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
