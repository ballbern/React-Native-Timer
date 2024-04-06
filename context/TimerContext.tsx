import { useContext, createContext, useState, useEffect } from "react";
import { TimerProviderProps, TimerProps } from "../types/TimerContext";
import { useSounds } from "../hooks/useSounds";

const TimerContext = createContext({} as TimerProps);

// eslint-disable-next-line react-refresh/only-export-components
export const useTimer = () => {
  return useContext(TimerContext);
};

export const TimerProvider = ({ children }: TimerProviderProps) => {
  const [startTime, setStartTime] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(startTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isLastSeconds, setIsLastSeconds] = useState(false);
  const [countOut, setCountOut] = useState(5);
  const [countIn, setCountIn] = useState(10);

  const { beepSound, buzzerSound } = useSounds();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const updateTimeRemaining = () => {
      // Get the current time in milliseconds.
      const currentTime = Date.now();
      // Calculate the elapsed time in seconds by subtracting the start time from the current time and converting it to seconds.
      const elapsedTime = Math.floor((currentTime - startTime) / 1000);
      // Calculate the remaining time by subtracting the elapsed time from the total time.
      const remainingTime = timeRemaining - elapsedTime;

      // If the remaining time is 0, trigger the buzzer sound.
      if (remainingTime === 0) buzzerSound();

      // If there is remaining time.
      if (remainingTime > 0) {
        // Update the state with the remaining time.
        setTimeRemaining(remainingTime);
        // If the remaining time is less than or equal to countOut, trigger the beep sound and set isLastSeconds to true.
        if (remainingTime <= countOut) {
          beepSound();
          setIsLastSeconds(true);
        }
      } else {
        // If there is no remaining time, set isRunning and isLastSeconds to false, and reset the remaining time to 0.
        setIsRunning(false);
        setIsLastSeconds(false);
        setTimeRemaining(0);
      }
    };

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
    if (timeRemaining === 0) {
      setTimeRemaining(startTime);
    }
    setStartTime(Date.now());
    setIsRunning(true);
  };

  const stopTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(0);
    setStartTime(0);
    setIsLastSeconds(false);
  };

  const countOutTime = (seconds: string) => {
    setCountOut(parseInt(seconds));
  };

  const countInTime = (seconds: string) => {
    setCountIn(parseInt(seconds));
  };

  return (
    <TimerContext.Provider
      value={{
        timeRemaining,
        isRunning,
        startTime,
        hours: Math.floor(timeRemaining / 3600)
          .toString()
          .padStart(2, "0"),
        minutes: Math.floor((timeRemaining % 3600) / 60)
          .toString()
          .padStart(2, "0"),
        seconds: (timeRemaining % 60).toString().padStart(2, "0"),
        isLastSeconds,
        setTimeRemaining,
        startTimer,
        stopTimer,
        resetTimer,
        setStartTime,
        countOutTime,
        countInTime,
        countOut,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
