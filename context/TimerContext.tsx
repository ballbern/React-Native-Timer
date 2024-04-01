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
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  setStartTime: Dispatch<SetStateAction<number>>;
  setTimeRemaining: Dispatch<SetStateAction<number>>;
  setCountdown: Dispatch<SetStateAction<number>>;
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

  const beepSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sounds/beep-sound.mp3")
      );
      await sound.playAsync();
      await sound.unloadAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const buzzerSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sounds/beep-sound-2.wav")
      );
      await sound.playAsync();
      await sound.unloadAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const updateTimeRemaining = () => {
      const currentTime = Date.now();
      const elapsedTime = Math.floor((currentTime - startTime) / 1000);
      const remainingTime = countDown - elapsedTime;

      console.log(remainingTime);
      if (remainingTime > 0) {
        setTimeRemaining(remainingTime);
        if (remainingTime <= 10) {
          // setIsLastSeconds(true);
          beepSound();
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

  // useEffect(() => {
  //   let interval: NodeJS.Timeout;

  //   if (isRunning) {
  //     interval = setInterval(() => {
  //       setTimeRemaining(prev => {
  //         if (prev > 0) {
  //           if (prev <= countDown + 1 && prev > 1) {
  //             setIsLastSeconds(true);
  //             beepSound();
  //           }
  //           if (prev === 1) {
  //             buzzerSound();
  //           }
  //           return prev - 1;
  //         } else {
  //           setIsRunning(false);
  //           setIsLastSeconds(false);
  //           return prev;
  //         }
  //       });
  //     }, 1000);
  //   }

  //   return () => {
  //     if (interval) {
  //       clearInterval(interval);
  //     }
  //   };
  // }, [countDown, isRunning]);

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
        setCountdown,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
