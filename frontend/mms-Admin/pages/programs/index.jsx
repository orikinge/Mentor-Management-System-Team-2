import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/programs/programs.module.scss";
import { Icons } from "../../components/atoms/Icons";
import { ListItem } from "../../components/atoms/ListItem";
import { Button } from "../../components/atoms/Button";
import { Stats } from "../../components/molecules/Stats";
import NoItemSelected from "../../components/organisms/NoItemSelected";

const Programs = () => {
  const [program, setProgram] = useState(null);

  return (
    <div className={`flex`}>
      <div className={`${styles.list_area}`}>
        <div className="flex flex-justify-between flex-align-center mb-1">
          <h1 className={styles.page_title}>Programs</h1>
          <div className={`flex flex-align-center gap-10`}>
            <Icons name="search" width="24" fill="#058B94" />
            <Icons name="filter" />
          </div>
        </div>

        <div className={`${styles.list_wrapper}`}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <ListItem
              onClick={() => setProgram({})}
              className="cursor-pointer"
              key={item}>
              <div className={`flex gap-16 flex-align-center`}>
                <Icons name="gads" />
                <div>
                  <p className={`list_main_text`}>
                    Google Africa Scholarship Program
                  </p>
                  <div className={`flex gap-10`}>
                    <p className="flex flex-align-center gap-10 list_sub_text">
                      <Icons name="calendar" /> Dec 12, 2022
                    </p>
                    <p className="flex flex-align-center gap-10 list_sub_text">
                      <Icons name="timer" /> 8:00 pm
                    </p>
                  </div>
                </div>
              </div>
            </ListItem>
          ))}
        </div>
      </div>

      <div className={styles.program_details}>
        <div className={`flex flex-justify-end ${styles.compose_button_area}`}>
          <Button
            variant="normal"
            size="large"
            type="link"
            url="/programs/create">
            Create New Program
          </Button>
        </div>
        <div className={styles.program_details_content}>
          {program ? (
            <div>
              <div
                className={`flex flex-justify-between flex-align-center ${styles.details_header}`}>
                <div className={`flex gap-16 flex-align-center`}>
                  <Icons name="gads" />
                  <div>
                    <p className={`list_main_text`}>
                      Google Africa Scholarship Program
                    </p>
                    <div className={`flex gap-10`}>
                      <p className="flex flex-align-center gap-10 list_sub_text">
                        <Icons name="calendar" /> Dec 12, 2022
                      </p>
                      <p className="flex flex-align-center gap-10 list_sub_text">
                        <Icons name="timer" /> 8:00 pm
                      </p>
                    </div>
                  </div>
                </div>
                <Icons onClick={() => setProgram(null)} name="close" />
              </div>

              <div className={styles.details_body}>
                <section>
                  <h1>About:</h1>
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

                  <Stats
                    icon={<Icons name="mentor-manager" />}
                    number={12}
                    text="Mentor Managers assigned to this program"
                  />

                  <Stats
                    icon={<Icons name="mentor" />}
                    number={80}
                    text="Mentors assigned to this program"
                  />

                  <Stats
                    icon={<Icons name="report-sheet" />}
                    number={35}
                    text="Program reports"
                  />
                </section>

                <section className="flex flex-align-center flex-justify-end gap-16">
                  <Link href="#">
                    <span className={`cursor-pointer ${styles.remove_program}`}>
                      Delete/Archive Program
                    </span>
                  </Link>
                  <Button onClick={() => {}} variant="normal" size="large">
                    Edit Program
                  </Button>
                </section>
              </div>
            </div>
          ) : (
            <NoItemSelected />
          )}
        </div>
      </div>
    </div>
  );
};

export default Programs;
