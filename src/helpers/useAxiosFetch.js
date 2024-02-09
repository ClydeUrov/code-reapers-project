import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const corrUrl = process.env.REACT_APP_API_URL;

const useAxiosFetch = (dataUrl) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);

      try {
        const response = await axios.get(corrUrl + url, {
          cancelToken: source.token,
        });
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          setData([]);
          setFetchError(err);
        }
      } finally {
        if (isMounted) {
          isMounted && setIsLoading(false);
        }
      }
    };

    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
      source.cancel();
    };

    return cleanUp;
  }, [dataUrl]);

  return { fetchError, isLoading, data };
};

export default useAxiosFetch;
