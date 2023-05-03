import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { fetchPosts } from "../pages/api/forum";

function usePostFetch(page,success) {
console.log("this is the page")
console.log(page)

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(page);
  const [hasMore, setHasMore] = useState(true);


  console.log("this is the error");
  useEffect(() => {
    fetchPosts(page)
      .then((res) => {
        setData((prevData) => {
          return [...prevData, ...res.data?.posts?.data];
        });
        setError(false);
        setLoading(false);
        setPageNumber(res.data?.posts?.meta?.current_page);
        if (!res.data.posts?.meta?.next_page_url) {
          setHasMore(false);
        }
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  }, [page,success]);

  return { data, error, loading, hasMore, pageNumber };
}

export default usePostFetch;
