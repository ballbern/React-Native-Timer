import { Moment } from "moment";
import { Dispatch, ReactNode, SetStateAction } from "react";

export type TimerProviderProps = {
  children: ReactNode;
};

type RemainingTime = {
  rounds: number;
  intervals: number;
  time: number;
  countIn: number;
  countOut: number;
};

export type TimerProps = {
  timeRemaining: RemainingTime;
  isRunning: boolean;
  startTime: Moment;
  hours: string;
  minutes: string;
  seconds: string;
  isLastSeconds: boolean;
  hasCountInTime: boolean;
  countInSeconds: string;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  setStartTime: Dispatch<SetStateAction<Moment>>;
  setTimeRemaining: Dispatch<SetStateAction<RemainingTime>>;
  countOutTime: (seconds: { id: number }) => void;
  countInTime: (seconds: { id: number }) => void;
};
