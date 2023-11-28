import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useTimeout = (initialTime: number, callBack: (props?: any) => any) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time === 0) return;
    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time]);

  useEffect(() => {
    if (time === 0) callBack();
  }, [time, callBack]);

  return time;
};

export default useTimeout;
