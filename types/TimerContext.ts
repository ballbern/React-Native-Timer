import { Dispatch, ReactNode, SetStateAction } from "react";

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
  countOutTime: (seconds: string) => void;
  countInTime: (seconds: string) => void;
  countOut: number;
};
