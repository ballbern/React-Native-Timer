import { TimeDropdown } from "../../";
import { View, StyleSheet } from "react-native";
import { Button } from "../../";
import { useRef, useState } from "react";
import { useTimer } from "../../../context/TimerContext";

export const Main = () => {
  const {
    startTimer,
    stopTimer,
    resetTimer,
    setTimeRemaining,
    isRunning,
    hours,
    minutes,
    seconds,
    isLastSeconds,
  } = useTimer();

  const [countIn, setCountIn] = useState(false);

  const timeValuesRef = useRef({ h: 0, m: 0, s: 0 });

  const setTimeValue = (totalTimeValue: number) => {
    setTimeRemaining(totalTimeValue);
  };

  const getTimeValue = (value: number, unit: string) => {
    const updatedTimeValues = { ...timeValuesRef.current };

    switch (unit) {
      case "h":
        updatedTimeValues.h = value * 3600;
        break;
      case "m":
        updatedTimeValues.m = value * 60;
        break;
      case "s":
        updatedTimeValues.s = value;
        break;
      default:
        break;
    }

    timeValuesRef.current = updatedTimeValues;

    const totalTimeValue = Object.values(updatedTimeValues).reduce(
      (tot, val) => tot + val
    );

    setTimeValue(totalTimeValue);
  };

  const reset = () => {
    resetTimer();
    timeValuesRef.current = { h: 0, m: 0, s: 0 };
  };

  console.log(isRunning);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          top: "12%",
          left: "36%",
        }}
      >
        <Button
          title={isRunning ? "Stop" : "Start"}
          onPress={!isRunning ? startTimer : stopTimer}
          fontSize={30}
          buttonStyle={{ marginRight: 100 }}
        />

        {!isRunning ? (
          <Button title='Reset' onPress={reset} fontSize={30}>
            Reset
          </Button>
        ) : null}
      </View>

      <View style={styles.main}>
        <TimeDropdown
          isLastSeconds={isLastSeconds}
          dropdownPress={getTimeValue}
          fontSize={parseInt(`${!isRunning ? 110 : 160}`)}
          value={hours}
          unit='h'
        />
        <TimeDropdown
          isLastSeconds={isLastSeconds}
          dropdownPress={getTimeValue}
          fontSize={parseInt(`${!isRunning ? 110 : 160}`)}
          value={minutes}
          unit='m'
        />
        <TimeDropdown
          isLastSeconds={isLastSeconds}
          dropdownPress={getTimeValue}
          fontSize={parseInt(`${!isRunning ? 110 : 160}`)}
          value={seconds}
          unit='s'
        />
      </View>

      {!isRunning ? (
        <View style={styles.footer}>
          <Button
            fontSize={20}
            buttonStyle={styles.footerButton}
            title='3 minutes'
            onPress={() => setTimeRemaining(180)}
          />
          <Button
            fontSize={20}
            buttonStyle={styles.footerButton}
            title='5 minutes'
            onPress={() => setTimeRemaining(300)}
          />
          <Button
            fontSize={20}
            buttonStyle={styles.footerButton}
            title='10 minutes'
            onPress={() => setTimeRemaining(600)}
          />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "row",
  },
  footer: {
    position: "absolute",
    flexDirection: "row",
    bottom: "10%",
    left: "12%",
  },
  footerButton: {
    marginRight: 200,
  },
});
