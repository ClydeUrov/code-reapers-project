import { useState, useEffect } from "react";
import axios from "axios";

const corrUrl = process.env.REACT_APP_API_URL;

const useAxiosFetch = (dataUrl, setFunction = () => {}) => {
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);

      try {
        const response = await axios.get(corrUrl + url, {
          cancelToken: source.token,
        });

        setFunction(response.data);
        setFetchError(null);
      } catch (err) {
        setFunction([]);
        setFetchError(err);
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

  return { fetchError, isLoading };
};

export default useAxiosFetch;
