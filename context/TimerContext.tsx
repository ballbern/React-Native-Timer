import moment from "moment";
import { useContext, createContext, useState, useEffect } from "react";
import { TimerProviderProps, TimerProps } from "../types/TimerContext";
import { useSounds } from "../hooks/useSounds";

const TimerContext = createContext({} as TimerProps);

export const useTimer = () => {
  return useContext(TimerContext);
};

export const TimerProvider = ({ children }: TimerProviderProps) => {
  const [startTime, setStartTime] = useState(moment(0));
  const [isRunning, setIsRunning] = useState(false);
  const [isLastSeconds, setIsLastSeconds] = useState(false);
  const [hasCountInTime, setHasCountInTime] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState({
    rounds: 1,
    intervals: 0,
    time: 0,
    countIn: 5,
    countOut: 5,
  });

  const { beepSound, buzzerSound } = useSounds();

  const updateTimeRemaining = () => {
    const currentTime = moment();
    const elapsedTime = currentTime.diff(startTime, "seconds");
    const remainingTime = timeRemaining.time - elapsedTime;

    if (remainingTime === 0) buzzerSound();

    if (remainingTime > 0) {
      setTimeRemaining(prev => ({
        ...prev,
        time: remainingTime,
      }));

      if (remainingTime <= timeRemaining.countOut) {
        beepSound();
        setIsLastSeconds(true);
      }
    } else {
      setIsRunning(false);
      setIsLastSeconds(false);
      setTimeRemaining(prev => ({
        ...prev,
        time: 0,
        countIn: prev.countIn,
        countOut: prev.countOut,
      }));
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(updateTimeRemaining, 1000);
      updateTimeRemaining();
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, startTime]);

  const startTimer = () => {
    if (timeRemaining.countIn > 0) {
      updateCountInTime();
    } else {
      setStartTime(moment());
      setIsRunning(true);
    }
    // start interval if set
  };

  const updateCountInTime = () => {
    setHasCountInTime(true);
    setStartTime(moment().add(timeRemaining.countIn, "seconds"));
    setIsRunning(true);

    // Initialize remaining time to countIn
    let remainingTime = timeRemaining.countIn;
    let originalCountIn = timeRemaining.countIn;

    // Decrement remaining time every second until it reaches 0
    const countInInterval = setInterval(() => {
      remainingTime--;
      setTimeRemaining(prev => ({
        ...prev,
        countIn: remainingTime,
      }));

      if (remainingTime <= 0) {
        clearInterval(countInInterval);
        setIsRunning(false);
        setHasCountInTime(false);
        setTimeRemaining(prev => ({
          ...prev,
          countIn: originalCountIn,
        }));
        setStartTime(moment());
        setIsRunning(true);
      }
    }, 1000);
  };

  const stopTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(prev => ({
      ...prev,
      time: 0,
    }));
    setStartTime(moment(0));
    setIsLastSeconds(false);
  };

  const countOutTime = (seconds: { id: number }) => {
    setTimeRemaining(prev => ({ ...prev, countOut: seconds.id }));
  };

  const countInTime = (seconds: { id: number }) => {
    setTimeRemaining(prev => ({ ...prev, countIn: seconds.id }));
  };

  const hours = Math.floor(timeRemaining.time / 3600)
    .toString()
    .padStart(2, "0");

  const minutes = Math.floor((timeRemaining.time % 3600) / 60)
    .toString()
    .padStart(2, "0");

  const seconds = (timeRemaining.time % 60).toString().padStart(2, "0");

  const countInSeconds = (timeRemaining.countIn % 60)
    .toString()
    .padStart(2, "0");

  return (
    <TimerContext.Provider
      value={{
        timeRemaining,
        isRunning,
        startTime,
        hours,
        minutes,
        seconds,
        isLastSeconds,
        hasCountInTime,
        countInSeconds,
        setTimeRemaining,
        startTimer,
        stopTimer,
        resetTimer,
        setStartTime,
        countOutTime,
        countInTime,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
