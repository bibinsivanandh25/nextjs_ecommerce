import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

// provides the info about loggedin user
const useUserInfo = () => {
  const temp = useSession();
  if (temp && temp?.data?.user) return { ...temp?.data?.user };
  return undefined;
};

const useStoreList = (cb = () => {}, page) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const sendQuery = async () => {
    try {
      await setLoading(true);
      await setError(false);
      const res = await cb();
      // console.log({ res });
      await setList((prev) => [...prev, ...res]);
      await setLoading(false);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    sendQuery();
  }, [cb, page]);

  return { loading, error, list };
};

export { useUserInfo, useStoreList };
