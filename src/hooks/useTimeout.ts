import { useEffect, useState, useRef } from "react";

const useTimeout = (
  initialTime: number,
  startImmediately: boolean,
  delay: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callBack: (props?: any) => any
) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(startImmediately);
  const callbackRef = useRef(callBack); // store the callback in a ref

  // update the callback ref every time it changes
  useEffect(() => {
    callbackRef.current = callBack;
  }, [callBack]);

  useEffect(() => {
    if (isRunning) setTime(initialTime);
  }, [isRunning]);

  useEffect(() => {
    if (time === 0) {
      callbackRef.current(); // call the callback
      setIsRunning(false);
      return;
    }
    if (!isRunning) return;
    const timer = setTimeout(
      () => setTime(time - 1),
      time === initialTime ? delay : 1000
    );
    return () => clearTimeout(timer); // clear the timeout when the component unmounts
  }, [time, isRunning, initialTime, delay]);

  return [time, setIsRunning] as const;
};

export default useTimeout;
