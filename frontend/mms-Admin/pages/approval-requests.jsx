import React from "react";
import styles from "../styles/approval_requests.module.scss";
import Image from "next/image";
import { ListItem } from "../components/atoms/ListItem";
import { Button } from "../components/atoms/Button";
import { Icons } from "../components/atoms/Icons";

const ApprovalRequests = () => {
  return (
    <div className={`flex gap-16`}>
      <div className={styles.category_area}>
        <div className={`mb-3 ${styles.request_categories}`}>
          <h1 className="p-1">Category</h1>
          <label>
            <input name="request_category" type="radio" onChange={() => {}} />
            <div
              className={`flex flex-justify-between flex-align-center gap-10`}>
              <div className={`flex flex-align-center gap-10`}>
                <Image
                  src="/assets/images/user_img.svg"
                  width="40"
                  height="40"
                  alt="image"
                />
                <div>Mentor Requests</div>
              </div>
              <p className={styles.request_category_count}>105</p>
            </div>
          </label>
          <label>
            <input name="request_category" type="radio" onChange={() => {}} />
            <div
              className={`flex flex-justify-between flex-align-center gap-10`}>
              <div className={`flex flex-align-center gap-10`}>
                <Image
                  src="/assets/images/user_img.svg"
                  width="40"
                  height="40"
                  alt="image"
                />
                <div>Mentor Manager Requests</div>
              </div>
              <p className={styles.request_category_count}>105</p>
            </div>
          </label>
          <label>
            <input name="request_category" type="radio" onChange={() => {}} />
            <div
              className={`flex flex-justify-between flex-align-center gap-10`}>
              <div className={`flex flex-align-center gap-10`}>
                <Image
                  src="/assets/images/user_img.svg"
                  width="40"
                  height="40"
                  alt="image"
                />
                <div>Program Requests</div>
              </div>
              <p className={styles.request_category_count}>105</p>
            </div>
          </label>
        </div>

        <div className={styles.recent_requests}>
          <h1>Recents</h1>

          <div>
            {[1, 2, 3, 4].map((item) => (
              <ListItem className="bg-white border-0">
                <div
                  className={`flex flex-align-center flex-justify-between ${styles.request}`}>
                  <div className={`flex gap-16 flex-align-center`}>
                    <Image
                      src="/assets/images/user_img.svg"
                      width="40"
                      height="40"
                      alt="image"
                    />
                    <div>
                      <p className={`list_main_text`}>Google Scholarship</p>
                      <div className={`flex gap-10`}>
                        <p className="flex flex-align-center gap-10 list_sub_text">
                          Program Assistant, And....
                        </p>
                      </div>
                    </div>
                  </div>
                  <Button variant="normal" size="small">
                    View
                  </Button>
                </div>
              </ListItem>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.requests}>
        <h1>Program Requests</h1>

        <div className={styles.request_list}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
            <ListItem>
              <div
                className={`flex flex-align-center flex-justify-between ${styles.request}`}>
                <div className={`flex gap-16 flex-align-center`}>
                  <div className={styles.program_icon}>
                    <Icons name="gads" />
                  </div>
                  <div>
                    <p className={`list_main_text`}>
                      Google Africa Scholarship Program
                    </p>
                  </div>
                </div>
                <div className={styles.request_count}>5</div>
              </div>
            </ListItem>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApprovalRequests;
