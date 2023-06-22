import moment from "moment";
import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import styles from "../styles/admin/about.module.scss";
import Icon from "../components/Icon.js";
import { fetchUserProfile } from "pages/api/user";
import { capitalize } from "utils/capitalize";
import getUserRole from "utils/getUserRole";

import { Loader } from "components/atoms/Loader";
import { Button } from "components/atoms/Button";
import { useRouter } from "next/router";

let image_url =
  process.env.NEXT_PUBLIC_BASE_URL.replace("/api/v1", "") +
  "/uploads/upload_file/";
function About() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sMedia, setSmedia] = useState({});

  const router = useRouter();

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    try {
      const response = await fetchUserProfile();
      if (response.status === 200) {
        setData(response.data);
        if (response?.data?.social_media_links) {
          setSmedia(JSON.parse(response?.data?.social_media_links));
        }
        setLoading(false);
      }

      if (
        response.status === 401 ||
        response.status === 400 ||
        response.status === 404
      ) {
        setError(error);
        setLoading(false);
      }
    } catch (e) {
      setError(error);
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="h-full overflow-y-scroll">
      <div className={`flex items-center justify-between`}>
        <div className={styles.about_header}>
          <Avatar
            size={80}
            icon={
              data?.profile_image_path ? (
                <img
                  src={image_url + data.profile_image_path}
                  width="80px"
                  height="80px"
                />
              ) : (
                <Icon
                  icon={"/assets/images/admin_avatar.png"}
                  width={"80px"}
                  height={"80px"}
                />
              )
            }
          />

          <div className={styles.profile}>
            <p className={styles.about_name}>
              {capitalize(data.first_name) + " " + capitalize(data.last_name)}
            </p>
            <p className={styles.about_role}>{getUserRole(data)}</p>
          </div>
        </div>

        <Button type="link" url="/settings" size="large" variant="normal">
          Edit Profile
        </Button>
      </div>

      <div className="mt-8 p-4 border border-gray-200 rounded">
        <div className="mb-8">
          <p className="text-xl font-bold mb-4">About</p>
          <div className="p-4 mb-4 bg-mms-ts-teal">
            <p className={styles.about_desc}>{data.bio}</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex gap-x-4 mb-4">
            <h4 className="font-bold">Location:</h4>
            <p>{data?.country || "NIL"}</p>
          </div>
          <div className="flex gap-x-4 mb-4">
            <h4 className="font-bold">Email:</h4>
            <p>{data?.email || "NIL"}</p>
          </div>
          <div className="flex gap-x-4 mb-4">
            <h4 className="font-bold">Website:</h4>
            <p>{data?.website || "NIL"}</p>
          </div>
          <div className="flex gap-x-4 mb-4">
            <h4 className="font-bold">Member Since:</h4>
            <p>{moment(data?.created_at).format("ll")}</p>
          </div>
        </div>

        <div>
          <p className="text-xl font-bold mb-4">Socials</p>
          <div className="flex mb-4 gap-x-4">
            <div className="flex w-full bg-mms-ts-teal p-4 rounded gap-x-4 items-center">
              <Icon
                icon={"/assets/images/Gitlogo.svg"}
                width={"25px"}
                height={"25px"}
              />
              <p className="font-bold">{sMedia ? sMedia.github : ""}</p>
            </div>

            <div className="flex w-full bg-mms-ts-teal p-4 rounded gap-x-4 items-center">
              <Icon
                icon={"/assets/images/Linkeinlogo.svg"}
                width={"25px"}
                height={"25px"}
              />
              <p className="font-bold">{sMedia ? sMedia.linkedin : ""}</p>
            </div>
          </div>

          <div className="flex gap-x-4">
            <div className="flex w-full bg-mms-ts-teal p-4 rounded gap-x-4 items-center">
              <Icon
                icon={"/assets/images/Twitterlogo.svg"}
                width={"25px"}
                height={"25px"}
              />
              <p className="font-bold">{sMedia ? sMedia.twitter : ""}</p>
            </div>

            <div className="flex w-full bg-mms-ts-teal p-4 rounded gap-x-4 items-center">
              <Icon
                icon={"/assets/images/instagramlogo.svg"}
                width={"25px"}
                height={"25px"}
              />
              <p className="font-bold">{sMedia ? sMedia.instagram : ""}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
