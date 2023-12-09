import { useEffect, useState, useRef } from "react";

const useTimeout = (
  initialTime: number,
  startImmediately: boolean,
  delay: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callBack: (props?: any) => any
) => {
  const [time, setTime] = useState(initialTime);
  const isRunning = useRef(startImmediately);
  const callbackRef = useRef(callBack); 
  useEffect(() => {
    callbackRef.current = callBack;
  }, [callBack]);

  useEffect(() => {
    if (isRunning.current) setTime(initialTime);
  }, [isRunning.current]);

  useEffect(() => {
    if (time === 0) {
      callbackRef.current(); // call the callback
      isRunning.current = false;
      return;
    }
    if (!isRunning.current) return;
    const timer = setTimeout(
      () => setTime(time - 1),
      time === initialTime ? delay : 1000
    );
    return () => clearTimeout(timer); // clear the timeout when the component unmounts
  }, [time, isRunning.current, isRunning, initialTime, delay]);
  const setIsRunning = (value: boolean) => {
    isRunning.current = value;
  }
  return [time, setIsRunning] as const;
};

export default useTimeout;
