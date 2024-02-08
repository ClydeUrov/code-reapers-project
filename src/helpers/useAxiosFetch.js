import { useState, useEffect } from "react";
import axios from "axios";
import { setUserLS } from "./localStorage";

const corrUrl =
  "http://ec2-16-170-239-71.eu-north-1.compute.amazonaws.com/auction/api/";

const useAxiosFetch = (dataUrl, setFunction = () => {}) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
          setFunction(response.data);
          setFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          setFetchError(err);
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
};

export default useAxiosFetch;
