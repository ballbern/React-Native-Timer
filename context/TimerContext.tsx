import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Audio } from "expo-av";

export type TimerProviderProps = {
  children: ReactNode;
};

export type TimerProps = {
  timeRemaining: number;
  isRunning: boolean;
  startTime: number;
  hours: string;
  minutes: string;
  seconds: string;
  isLastSeconds: boolean;
  countHasValue: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  setStartTime: Dispatch<SetStateAction<number>>;
  setTimeRemaining: Dispatch<SetStateAction<number>>;
  setCountdown: Dispatch<SetStateAction<number>>;
  countOutTime: (seconds: string) => void;
  countInTime: (seconds: string) => void;
  countOut: number;
};

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
  const [countDown, setCountdown] = useState(10);
  const [countHasValue, setCountHasValue] = useState(false);
  const [countOut, setCountOut] = useState(10);
  const [countIn, setCountIn] = useState(10);

  const beepSound = async () => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync(require("../assets/sounds/beep-sound.mp3"), {
        shouldPlay: true,
      });
      await sound.setPositionAsync(0);
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing beep sound:", error);
    }
  };

  const buzzerSound = async () => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync(require("../assets/sounds/beep-sound-2.wav"), {
        shouldPlay: true,
      });
      await sound.setPositionAsync(0);
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing buzzer sound:", error);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    timeRemaining > 0 ? setCountHasValue(true) : setCountHasValue(false);

    const updateTimeRemaining = () => {
      const currentTime = Date.now();
      const elapsedTime = Math.floor((currentTime - startTime) / 1000);
      const remainingTime = timeRemaining - elapsedTime;

      if (remainingTime === 0) buzzerSound();

      if (remainingTime > 0) {
        setTimeRemaining(remainingTime);
        if (remainingTime <= countOut) {
          beepSound();
          setIsLastSeconds(true);
        }
      } else {
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
  }, [countDown, isRunning, startTime]);

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
        countHasValue,
        setTimeRemaining,
        startTimer,
        stopTimer,
        resetTimer,
        setStartTime,
        setCountdown,
        countOutTime,
        countInTime,
        countOut,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
