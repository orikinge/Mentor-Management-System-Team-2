import React from "react";
import { formatDistance } from "date-fns";
import UserDetailsLayout from "../../../components/Layouts/UserDetailsLayout";
import { Inputs } from "../../../components/atoms/Inputs";
import { Icons } from "../../../components/atoms/Icons";
import { Loader } from "../../../components/atoms/Loader";
import { Button } from "../../../components/atoms/Button";
import { Stats } from "../../../components/molecules/Stats";
import { Accordion } from "../../../components/molecules/Accordion";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getMentorManagersPrograms } from "pages/api/mentor";

function MentorManagerPrograms() {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery(
    ["mentor_manager_programs"],
    () => getMentorManagersPrograms(router.query.id),
  );

  if (isLoading) return <Loader />;

  if (isError) return "An error occured";

  return (
    <>
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
      <div className="h-[80vh] overflow-y-auto">
        {data?.programs?.map((item) => {
          const {
            created_at,
            description,
            id,
            name,
            programReportsCount,
            updated_at,
          } = item;
          return (
            <Accordion
              header={
                <div className="flex flex-justify-between flex-align-center">
                  <div className="flex gap-x-4 flex-align-center">
                    <Icons name="gads" fill="#058B94" margin="0 1rem 0 0" />
                    <div className={`flex flex-justify-center flex-column`}>
                      <h1 className="text-lg font-bold">{name} </h1>
                      <div className="flex gap-x-8">
                        <div className="flex gap-x-2 flex-align-center">
                          <Icons name="calendar" />
                          <p>
                            {formatDistance(new Date(created_at), new Date(), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                        <div className="flex gap-x-2 flex-align-center">
                          <Icons name="calendar" />
                          <p>
                            {formatDistance(new Date(updated_at), new Date(), {
                              addSuffix: true,
                            })}
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
                      <p className="text-gray-500">{description}</p>
                    </div>

                    <Stats
                      url={`/programs/reports/${id}`}
                      icon={<Icons name="report-sheet" />}
                      number={programReportsCount}
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
          );
        })}
      </div>
    </>
  );
}

MentorManagerPrograms.getLayout = function getLayout(page) {
  return <UserDetailsLayout>{page}</UserDetailsLayout>;
};

export default MentorManagerPrograms;
