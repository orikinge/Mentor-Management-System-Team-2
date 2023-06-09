import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "../../styles/programs/create_edit.module.scss";
import Image from "next/image";
import { Button } from "../../components/atoms/Button";
import { Icons } from "../../components/atoms/Icons";
import { Selector } from "../../components/molecules/Selector";
import { ListItem } from "../../components/atoms/ListItem";
import { SuccessModal } from "../../components/molecules/SuccessModal";
import Modal from "../../components/molecules/Modal";
import { useRouter } from "next/router";
import { capitalize } from "../../utils/capitalize";
import { fetchMentorManagers, fetchMentors } from "../api/user/index";
import { createProgram, fetchProgram, editProgram } from "../api/program/index";

const initialSate = {
  mentorManagers: [],
  mentors: [],
  programName: "",
  programDescription: "",
  criteria: [],
};

const Create = () => {
  const router = useRouter();
  const { action, id } = router.query;
  const [listType, setListType] = useState("");
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false);
  const [users, setUsers] = useState([]);
  const [inputData, setInputData] = useState(initialSate);

  useEffect(async () => {
    if (listType === "mentor") {
      const mentors = await fetchMentors();
      setUsers((prev) => mentors.data);
    }

    if (listType === "mentor-manager") {
      const mentorManagers = await fetchMentorManagers();
      setUsers((prev) => mentorManagers.data);
    }
  }, [listType]);

  useEffect(async () => {
    if (action === "edit" && id) {
      const response = await fetchProgram(id);
      if (response) {
        setInputData((prev) => ({
          mentorManagers: response.mentorManagers.map(
            (manager) => manager.user_id,
          ),
          mentors: response.mentors.map((mentor) => mentor.user_id),
          programName: response.program.name,
          programDescription: response.program.description,
          criteria: [],
        }));
      }
    }
  }, []);

  function selectUser(id) {
    if (listType === "mentor" && !inputData.mentors.includes(id)) {
      setInputData((prev) => ({ ...prev, mentors: [...prev.mentors, id] }));
      toast.success("Mentor selected", { id: "user_added" });
    }

    if (
      listType === "mentor-manager" &&
      !inputData.mentorManagers.includes(id)
    ) {
      setInputData((prev) => ({
        ...prev,
        mentorManagers: [...prev.mentorManagers, id],
      }));
      toast.success("Mentor Manager selected", { id: "user_added" });
    }
  }

  function deSelectUser(id) {
    if (listType === "mentor" && inputData.mentors.includes(id)) {
      setInputData((prev) => ({
        ...prev,
        mentors: prev.mentors.filter((userID) => userID !== id),
      }));
      toast.success("Mentor removed for selection", { id: "user_removed" });
    }

    if (
      listType === "mentor-manager" &&
      inputData.mentorManagers.includes(id)
    ) {
      setInputData((prev) => ({
        ...prev,
        mentorManagers: prev.mentorManagers.filter((userID) => userID !== id),
      }));
      toast.success("Mentor Manager removed for selection", {
        id: "user_removed",
      });
    }
  }

  function handleInputChange(e) {
    setInputData((prev) => ({ ...prev, programName: e.target.value }));
  }

  function handleTextAreaChange(e) {
    setInputData((prev) => ({ ...prev, programDescription: e.target.value }));
  }

  async function submitProgramData() {
    const payload = {
      name: inputData.programName,
      description: inputData.programDescription,
      mentors: inputData.mentors,
      mentorManagers: inputData.mentorManagers,
      criteria: inputData.criteria,
    };

    const response = await createProgram(payload);
    if (response) {
      setCreatedSuccessfully(true);
      resetState();
    }
  }

  async function editAProgram() {
    const payload = {
      name: inputData.programName,
      description: inputData.programDescription,
      mentors: inputData.mentors,
      mentorManagers: inputData.mentorManagers,
      criteria: inputData.criteria,
    };

    const response = await editProgram(id, payload);
    if (response) {
      setCreatedSuccessfully(true);
      resetState();
    }
  }

  function resetState() {
    setInputData(initialSate);
  }

  return (
    <>
      {action === "create" || action === "edit" ? (
        <div className="flex gap-16">
          <div className={styles.main_content_area}>
            <h1 className={styles.page_title}>
              {capitalize(router.query.action)}
              {router.query.action === "create" && "New"} Program
            </h1>

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
                      value={inputData.programName}
                      onChange={handleInputChange}
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
                    <textarea
                      value={inputData.programDescription}
                      onChange={handleTextAreaChange}
                      className={styles.text_area}></textarea>
                  </div>
                </div>
              </div>

              <div className="flex flex-justify-between mb-3">
                <Selector
                  title="Add Mentor Manager"
                  value={inputData.mentorManagers.length}
                  showUserList={() => {
                    setListType("mentor-manager");
                  }}
                />
                <Selector
                  title="Add Mentor"
                  value={inputData.mentors.length}
                  showUserList={() => {
                    setListType("mentor");
                  }}
                />
                <Selector
                  title="Set Criteria"
                  value={inputData.criteria.length}
                  type="link"
                  url="https://google.com"
                />
              </div>

              <div className="flex flex-justify-end">
                <Button
                  onClick={
                    router.query.action === "create"
                      ? submitProgramData
                      : editAProgram
                  }
                  variant="normal"
                  size="large">
                  {router.query.action === "edit"
                    ? "Save Changes"
                    : "Create Program"}
                </Button>
              </div>
            </div>
          </div>

          {/* Mentor / Mentor Managers list view */}
          {users.length > 0 && (
            <div className={styles.users_list_area}>
              <div className="flex flex-align-center flex-justify-end gap-16 mb-1">
                <span className="cursor-pointer">
                  <Icons name="search" width="20" fill="#058B94" />
                </span>
                <span className="cursor-pointer">
                  <Icons name="filter" />
                </span>
                <span className="cursor-pointer" onClick={() => setUsers([])}>
                  <Icons name="close" />
                </span>
              </div>

              <div className={styles.users_list}>
                {users?.map((item) => (
                  <ListItem key={item.id}>
                    <div className="flex flex-align-center gap-16">
                      <Image
                        width={50}
                        height={50}
                        src={"/assets/images/user_img.svg"}
                        alt="User profile image"
                        className={`circle-img`}
                      />
                      <div>
                        <h1
                          className={`list_main_text`}>{`${item.first_name} ${item.last_name}`}</h1>
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
                        {[
                          ...inputData.mentors,
                          ...inputData.mentorManagers,
                        ].includes(item.id) ? (
                          <Icons
                            name="subtract"
                            onClick={() => deSelectUser(item.id)}
                          />
                        ) : (
                          <Icons
                            name="circle-add"
                            onClick={() => selectUser(item.id)}
                          />
                        )}
                      </span>
                    </div>
                  </ListItem>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>Url entry not supported</div>
      )}
      <Modal show={createdSuccessfully}>
        <SuccessModal
          title={
            action === "create"
              ? "Program created successfully!"
              : "Program saved successfully"
          }
          onConfirm={() => router.push("/programs")}
        />
      </Modal>
    </>
  );
};

export default Create;
