import React from "react";
import UserDetailsLayout from "../../../components/Layouts/UserDetailsLayout";
import { Inputs } from "../../../components/atoms/Inputs";
import { Icons } from "../../../components/atoms/Icons";
import { Loader } from "../../../components/atoms/Loader";
import { ListItem } from "../../../components/atoms/ListItem";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { getMentorsOfManagers } from "pages/api/mentor";
import { useQuery } from "@tanstack/react-query";

function MentorManagerMentors() {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery(
    ["mentor_manager_programs"],
    () => getMentorsOfManagers(router.query.id),
  );

  if (isLoading) return <Loader />;

  if (isError) return "An error occured";

  console.log(data);
  return (
    <>
      <div className="flex pt-4 pb-4 justify-between items-center">
        <p>All mentors</p>
        <div className="w-full lg:max-w-[40%]">
          <Inputs
            icon={<Icons name="search" fill="#cbcbcb" width={20} />}
            type="search"
            placeholder="search here"
          />
        </div>
      </div>
      <div>
        {data?.map((item) => {
          const { first_name, last_name, id } = item;

          return (
            <ListItem>
              <Link
                href={`/mentors/about/${id}?fullName=${first_name} ${last_name}&designation=mentor`}>
                <div className="flex flex-align-center gap-16">
                  <Image
                    width={50}
                    height={50}
                    src={"/assets/images/user_img.svg"}
                    alt="User profile image"
                    className={`circle-img`}
                  />
                  <div className="flex gap-x-8 me-4">
                    <div>
                      <h1
                        className={`list_main_text`}>{`${first_name} ${last_name}`}</h1>
                      <p className={`list_sub_text`}>Mentor</p>
                    </div>

                    <div
                      className={`flex flex-column gap-10 flex-justify-center`}>
                      <div className="flex gap-x-10">
                        <p className={`tag`}>PROGRAM ASST.</p>
                        <p className={`tag`}>MENTOR-GADS</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="flex flex-column gap-16">
                <span className={`cursor-pointer`}>
                  <Icons name="comment" />
                </span>
              </div>
            </ListItem>
          );
        })}
      </div>
    </>
  );
}

MentorManagerMentors.getLayout = function getLayout(page) {
  return <UserDetailsLayout>{page}</UserDetailsLayout>;
};

export default MentorManagerMentors;
