import { useEffect, useState, useRef } from "react";

const useTimeout = (
  initialTime: number,
  startImmediately: boolean,
  delay: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callBack: (props?: any) => any
) => {
  const [time, setTime] = useState(initialTime);
  const hasDelayFinished = useRef(false);
  const isRunning = useRef(startImmediately);
  const callbackRef = useRef(callBack);

  // the delay should be applied only once, when the component mounts
  // so we need to check if the delay has already finished

  const calculateTimer = () => {
    if (!hasDelayFinished.current) return delay;
    return 1000;
  };

  useEffect(() => {
    callbackRef.current = callBack;
  }, [callBack]);

  useEffect(() => {
    if (delay > 0 && isRunning.current) {
      const delayTimer = setTimeout(() => {
        hasDelayFinished.current = true;
        setTime(initialTime);
        isRunning.current = true;
      }, delay);
      return () => clearTimeout(delayTimer);
    }
    return () => {};
  }, [delay, initialTime, startImmediately]);

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
    const timer = setTimeout(() => setTime(time - 1), calculateTimer());
    return () => clearTimeout(timer); // clear the timeout when the component unmounts
  }, [time, isRunning.current, initialTime, delay, hasDelayFinished.current]);
  const setIsRunning = (value: boolean) => {
    isRunning.current = value;
  };
  return [time, setIsRunning] as const;
};

export default useTimeout;
