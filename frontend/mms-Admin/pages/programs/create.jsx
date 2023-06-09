import React, { useState } from "react";
import styles from "../../styles/programs/create_edit.module.scss";
import Image from "next/image";
import { Button } from "../../components/atoms/Button";
import { Icons } from "../../components/atoms/Icons";
import { Selector } from "../../components/molecules/Selector";
import { ListItem } from "../../components/atoms/ListItem";
import { SuccessModal } from "../../components/molecules/SuccessModal";
import Modal from "../../components/molecules/Modal";

const Create = () => {
  const [showList, setShowList] = useState(false);
  const [listType, setListType] = useState("mentors");
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);

  return (
    <>
      <div className="flex gap-16">
        <div className={styles.main_content_area}>
          <h1 className={styles.page_title}>Create New Program</h1>

          <div className={styles.content_wrapper}>
            <div className={`flex flex-align-center gap-16`}>
              <Image
                src="/assets/images/user_img.svg"
                width={85}
                height={85}
                alt="profile image"
                className={styles.profile_image}
              />
              <div>
                <h3>Set Program Avatar</h3>
                <Button variant="white" bordered size="small">
                  Select file
                </Button>
              </div>
            </div>

            <div className={styles.input_area}>
              <div className={`mb-1`}>
                <label className={styles.input_label}>Program Name</label>
                <div>
                  <input
                    className={styles.input}
                    placeholder="Enter program name"
                  />
                </div>
              </div>

              <div>
                <label className={styles.input_label}>
                  Program Description
                </label>
                <div>
                  <textarea className={styles.text_area}></textarea>
                </div>
              </div>
            </div>

            <div className="flex flex-justify-between mb-3">
              <Selector
                showUserList={() => {
                  setShowList(true);
                  setListType("mentor");
                }}
              />
              <Selector
                showUserList={() => {
                  setShowList(true);
                  setListType("mentor-manager");
                }}
              />
              <Selector
                showUserList={() => {
                  setShowList(true);
                  setListType("set-criteria");
                }}
              />
            </div>

            <div className="flex flex-justify-end">
              <Button
                onClick={() => setCreatedSuccessfully(true)}
                variant="normal"
                size="large">
                Create Program
              </Button>
            </div>
          </div>
        </div>

        {showList && (
          <div className={styles.users_list_area}>
            <div className="flex flex-align-center flex-justify-end gap-16 mb-1">
              <span className="cursor-pointer">
                <Icons name="search" width="20" fill="#058B94" />
              </span>
              <span className="cursor-pointer">
                <Icons name="filter" />
              </span>
              <span
                className="cursor-pointer"
                onClick={() => setShowList(false)}>
                <Icons name="close" />
              </span>
            </div>

            <div className={styles.users_list}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <ListItem>
                  <div className="flex flex-align-center gap-16">
                    <Image
                      width={50}
                      height={50}
                      src={"/assets/images/user_img.svg"}
                      alt="User profile image"
                      className={`circle-img`}
                    />
                    <div>
                      <h1 className={`list_main_text`}>Kabiru Omo Isaka</h1>
                      <div
                        className={`flex flex-column gap-5 flex-justify-center`}>
                        <p className={`list_sub_text`}>
                          Program Assistant, Andela, She/her
                        </p>

                        <div className="flex gap-10">
                          <p className={`tag`}>PROGRAM ASST.</p>
                          <p className={`tag`}>MENTOR-GADS</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-column gap-16">
                    <span className={`cursor-pointer`}>
                      <Icons name="circle-add" />
                    </span>
                  </div>
                </ListItem>
              ))}
            </div>
          </div>
        )}
      </div>
      <Modal show={createdSuccessfully}>
        <SuccessModal
          title="Program Created Successfully!"
          onConfirm={() => setCreatedSuccessfully(false)}
        />
      </Modal>
    </>
  );
};

export default Create;
