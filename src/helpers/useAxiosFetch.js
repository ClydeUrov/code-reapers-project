import { useState, useEffect } from "react";
import axios from "axios";

const corrUrl =
  "http://ec2-16-170-239-71.eu-north-1.compute.amazonaws.com/auction/api/";

const useAxiosFetch = (dataUrl, setFunction = () => {}) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);

      try {
        const response = await axios.get(corrUrl + url, {
          cancelToken: source.token,
        });

        setData(response.data);
        setFunction(response.data);
        setFetchError(null);
      } catch (err) {
        setFetchError(err);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(dataUrl);

    const cleanUp = () => {
      source.cancel();
    };

    return cleanUp;
  }, [dataUrl]);

  return { data, fetchError, isLoading };
};

export default useAxiosFetch;
