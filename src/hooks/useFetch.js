import { useEffect, useRef, useState } from "react";
import axios from "axios";
const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
        console.log(err);
      }
      setLoading(false);
    };
    if (firstRenderRef.current) {
      fetchData();
      firstRenderRef.current = false;
      return;
    }
  }, [url]);
  const refetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };
  return { data, loading, error, refetch };
};

export default useFetch;
