import { TimeDropdown } from "../../";
import { View, StyleSheet, Dimensions } from "react-native";
import { Button } from "../../";
import { useRef } from "react";
import { useTimer } from "../../../context/TimerContext";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

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
    timeRemaining,
  } = useTimer();

  const { width, height } = Dimensions.get("window");
  const FullScreedHitSlop = {
    top: height,
    bottom: height,
    left: width,
    right: width,
  };
  const hitSlop = { top: 20, bottom: 50, left: 200, right: 50 };

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

  const settingsPress = () => console.log("settingsPress");

  return (
    <>
      {!isRunning ? (
        <View style={{ position: "absolute", right: 40, top: 55 }}>
          <Ionicons
            onPress={settingsPress}
            name='settings-sharp'
            size={20}
            color='white'
          />
        </View>
      ) : null}

      {timeRemaining > 0 && (
        <View style={styles.startStopButtons}>
          <Button
            title={
              !isRunning && <FontAwesome name='play' size={35} color='white' />
            }
            onPress={!isRunning ? startTimer : stopTimer}
            fontSize={30}
            buttonStyle={{ marginRight: 100 }}
            hitSlop={isRunning ? FullScreedHitSlop : hitSlop}
          />

          {!isRunning ? (
            <Button
              title={<FontAwesome name='refresh' size={35} color='white' />}
              onPress={reset}
              fontSize={30}
              hitSlop={{ top: 20, bottom: 50, left: 50, right: 200 }}
            />
          ) : null}
        </View>
      )}

      <View style={styles.main}>
        <TimeDropdown
          dropdownPress={getTimeValue}
          fontSize={parseInt(`${!isRunning ? 110 : 160}`)}
          hitSlop={{ top: 5, bottom: 5, left: 30, right: 50 }}
          value={hours}
          unit='h'
        />
        <TimeDropdown
          dropdownPress={getTimeValue}
          fontSize={parseInt(`${!isRunning ? 110 : 160}`)}
          hitSlop={{ top: 5, bottom: 5, left: 50, right: 50 }}
          value={minutes}
          unit='m'
        />
        <TimeDropdown
          dropdownPress={getTimeValue}
          fontSize={parseInt(`${!isRunning ? 110 : 160}`)}
          hitSlop={{ top: 5, bottom: 5, left: 30, right: 50 }}
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
            hitSlop={{ top: 30, bottom: 30, left: 100, right: 100 }}
          />
          <Button
            fontSize={20}
            buttonStyle={styles.footerButton}
            title='5 minutes'
            onPress={() => setTimeRemaining(300)}
            hitSlop={{ top: 30, bottom: 30, left: 100, right: 100 }}
          />
          <Button
            fontSize={20}
            buttonStyle={styles.footerButton}
            title='10 minutes'
            onPress={() => setTimeRemaining(600)}
            hitSlop={{ top: 30, bottom: 30, left: 100, right: 100 }}
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
  startStopButtons: {
    flexDirection: "row",
    position: "absolute",
    top: "12%",
    left: "40%",
    zIndex: 1,
  },
});
