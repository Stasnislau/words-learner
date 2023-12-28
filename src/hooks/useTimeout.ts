import { useEffect, useState, useRef } from "react";

const useTimeout = (
  initialTime: number,
  startImmediately: boolean,
  delay: number,
  callBack: (props?: unknown) => void
) => {
  const [time, setTime] = useState(initialTime);
  const hasDelayFinished = useRef(false);
  const callbackRef = useRef(callBack);
  const [isRunning, setIsRunning] = useState(startImmediately);
  const [isTimeSet, setIsTimeSet] = useState(false);
  const restartWithDelay = () => {
    setTime(initialTime);
    setIsRunning(true);
    hasDelayFinished.current = false;
  };

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
    if (delay > 0 && isRunning && !hasDelayFinished.current) {
      const delayTimer = setTimeout(() => {
        hasDelayFinished.current = true;
        setTime(initialTime);
        setIsTimeSet(true);
      }, delay);
      return () => clearTimeout(delayTimer);
    }
    return () => {};
  }, [delay, initialTime, startImmediately, isRunning]);

  useEffect(() => {
    if (isRunning) {
      setIsTimeSet(true);
      setTime(initialTime);
    }
  }, [isRunning]);

  useEffect(() => {
    if (time === 0 && isRunning && isTimeSet) {
      callbackRef.current(); // call the callback
      setIsRunning(false);
      setIsTimeSet(false);
      return;
    }
    if (!isRunning) return;
    const timer = setTimeout(() => setTime(time - 1), calculateTimer());
    return () => clearTimeout(timer); // This will clear the timer when the component unmounts or when `isRunning` or `time` changes
  }, [time, isRunning, isTimeSet]);
  return [time, setIsRunning, restartWithDelay] as const;
};

export default useTimeout;
