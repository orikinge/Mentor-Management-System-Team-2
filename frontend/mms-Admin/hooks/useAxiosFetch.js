import axios from "axios";
import { useEffect, useState } from "react";
import { apiService } from "../pages/api/axios";

function useAxiosFetch(dataUrl, method = "GET", payload) {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();
    const config = payload
      ? { ...payload, cancelToken: source.token }
      : { cancelToken: source.token };

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await apiService(url, method, config);
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (e) {
        if (isMounted) {
          setFetchError(e.message);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  }, [dataUrl]);

  return { data, fetchError, isLoading };
}

export default useAxiosFetch;
