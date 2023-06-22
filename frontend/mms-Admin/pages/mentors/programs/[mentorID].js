import React, { useState, useEffect } from "react";
import MentorDetailsLayout from "../../../components/Layouts/MentorDetailsLayout";
import { Accordion } from "../../../components/molecules/Accordion";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import styles from "../../../components/componentStyles/archive.module.css";
import { Inputs } from "../../../components/atoms/Inputs";
import { getUserProgram } from "pages/api/program";
import { Icons } from "../../../components/atoms/Icons";
import { Button } from "../../../components/atoms/Button";
import { formatDistance } from "date-fns";
import { Stats } from "../../../components/molecules/Stats";

function MentorPrograms() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const query = { search: search, page: 1, limit: 10 };

  const { data, isLoading, isError } = useQuery(
    ["mentor_program", search],
    () => getUserProgram(router.query.mentorID),
  );

  const total = data?.programs?.length;

  if (!search) {
    if (isLoading) return "loading programs...";
  }

  if (isError) return "An error occured";

  return (
    <div>
      <div className="flex pt-4 pb-4 justify-between items-center">
        <p>All programs</p>
        <div className="w-full lg:max-w-[40%]">
          <Inputs
            icon={<Icons name="search" fill="#cbcbcb" width={20} />}
            type="search"
            placeholder="search here"
          />
        </div>
      </div>
      <div className={styles.wrapper}>
        {data?.programs?.map((program, idx) => (
          <nav>
            <Accordion
              header={
                <div className="flex flex-justify-between flex-align-center">
                  <div className="flex gap-x-4 flex-align-center">
                    <Icons name="gads" fill="#058B94" margin="0 1rem 0 0" />
                    <div className={`flex flex-justify-center flex-column`}>
                      <h1 className="text-lg font-bold">{program.name} </h1>
                      <div className="flex gap-x-8">
                        <div className="flex gap-x-2 flex-align-center">
                          <Icons name="calendar" />
                          <p>
                            {formatDistance(
                              new Date(program.start_date),
                              new Date(),
                              {
                                addSuffix: true,
                              },
                            )}
                          </p>
                        </div>
                        <div className="flex gap-x-2 flex-align-center">
                          <Icons name="calendar" />
                          <p>
                            {formatDistance(
                              new Date(program.end_date),
                              new Date(),
                              {
                                addSuffix: true,
                              },
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Icons name="arrow-up" fill="#058B94" />
                </div>
              }
              body={
                <div className={`flex flex-justify-center `}>
                  <div className="w-full">
                    <h2 className="text-xl font-bold">About</h2>

                    <div className="pt-4 pb-4">
                      <p className="text-gray-500">{program.description}</p>
                    </div>

                    <Stats
                      url={`/programs/reports/${program.id}`}
                      icon={<Icons name="report-sheet" />}
                      number={program.programReportsCount}
                      text="Program reports"
                    />
                  </div>
                </div>
              }
              footer={
                <div className="flex justify-end">
                  <Button variant="white" size="large" bordered>
                    Unassign from Program
                  </Button>
                </div>
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
