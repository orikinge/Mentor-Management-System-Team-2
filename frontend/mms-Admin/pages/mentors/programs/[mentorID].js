import React, { useState, useEffect } from "react";
import MentorDetailsLayout from "../../../components/Layouts/MentorDetailsLayout";
import { Accordion } from "../../../components/molecules/Accordion";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import styles from "../../../components/componentStyles/archive.module.css";
import Icon from "../../../components/Icon";
import moment from 'moment';
import { CustomInput } from "../../../components/formInputs/CustomInput";
import { convertToURLQuery } from "../../../utils/extractTitleFromUrl";
import { getUserProgram } from "pages/api/program";
import { Icons } from "../../../components/atoms/Icons";
import { Button } from "../../../components/atoms/Button";



function MentorPrograms() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const query = { search:search, page:1, limit:10 }
  

  const {
    data: programs,
    isLoading,
    isError,
  } = useQuery(["mentor_program", search], () => getUserProgram(router.query.mentorID, convertToURLQuery(query)));
  console.log(programs, "oh")
  const total = programs?.meta?.total
  console.log(total)

  if (!search) {
    if (isLoading) return "loading tasks...";
  }

  if (isError) return "An error occured";

  const handleOnchangeTask = (event) => {
    event.preventDefault();
    setSearch(event.target.value)
  }
  return (
    <div>
     <div className={styles.search}>
      <CustomInput
      type="text"
      value={search}
      onChange={handleOnchangeTask}
      placeholder="Search for program"
      />
     </div>
      <div className={styles.wrapper}>
      {programs?.data?.map((program, idx) => (
        <nav>
        <Accordion
         key={idx}
         header={
          <div className={styles.main_sub_div} key={program?.id}>
          <div className={styles.main_sub_icon}>
            <Icon
              icon={"/assets/images/BlackGoogleLogo.svg"}
              width={"48px"}
              height={"48px"}
            />
          </div>
          <div className={styles.main_sub_content}>
            <h1>{program?.program?.name?.slice(0, 50)}</h1>
            <div className={styles.main_sub_con_main}>
              <div className={styles.main_sub_con}>
                <span className={styles.main_sub_content_timeicon}>
                  <Icon
                    icon={"/assets/images/ClockLogo.svg"}
                    width={"16.5px"}
                    height={"16.5px"}
                  />
                </span>
                <div className={styles.main_sub_content_time}>{moment(program?.program?.created_at).format('ll')}</div>
              </div>
              <div className={styles.main_sub_con}>
                <span className={styles.main_sub_content_timeicon1}>
                  <Icon
                    icon={"/assets/images/MainClockLogo.svg"}
                    width={"18px"}
                    height={"18px"}
                  />
                </span>
                <div className={styles.main_sub_content_time}>{moment(program?.program?.created_at).format('LT')}</div>
              </div>
              <div className={styles.main_sub_con}>
                <span className={styles.main_sub_content_archor}>
                  <Icon
                    icon={"/assets/images/Archor.svg"}
                    width={"20px"}
                    height={"20px"}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        }
        body={
          <>
            <p className={styles.about}>About:</p>
            <h1 className={styles.program_description}>{program?.program?.description}</h1>
            <div
                className={`flex flex-justify-between flex-align-center ${styles.program_stats}`}>
                <div className={`flex flex-align-center ${styles.program_stats_div}`}>
                  <Icons name="report-sheet" />

                  <div
                    className={`flex flex-align-center ${styles.program_stat}`}>
                    <h1 className={styles.number_of_programs}>
                      {total}
                    </h1>
                    <p className={styles.stat_text}>Program reports</p>
                  </div>
                </div>

                <div>
                  <Button variant="normal" size="small">
                    View
                  </Button>
                </div>
              </div>
          </>
        }
        footer={
          <Button variant="transparent" size="large" bordered={true}>
            Unassign from program
          </Button>
        }
        />
        </nav>
      ))}
      </div>
    </div>
  );
}


MentorPrograms.getLayout = function getLayout(page) {
  return <MentorDetailsLayout>{page}</MentorDetailsLayout>;
};

export default MentorPrograms;
