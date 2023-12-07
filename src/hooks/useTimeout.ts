import { useEffect, useState } from "react";

const useTimeout = (
  initialTime: number,
  startImmediately: boolean,
  delay: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callBack: (props?: any) => any
) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(startImmediately);

  useEffect(() => {
    if (time === 0) return;
    if (!isRunning) return;
    // wait the delay before starting the timer
    if (time === initialTime) {
      const timer = setTimeout(() => setTime(time - 1), delay);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time, isRunning]);

  useEffect(() => {
    if (time === 0) callBack();
  }, [time, callBack]);

  useEffect(() => {
    if (isRunning) setTime(initialTime);
  }, [isRunning, initialTime]);

  return [time, setIsRunning] as const;
};

export default useTimeout;
