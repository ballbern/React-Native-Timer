import { Button, Font } from "../../";
import {
  View,
  StyleSheet,
  PressableProps,
  Pressable,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { useTimer } from "../../../context/TimerContext";

type TimeDropdown = PressableProps & {
  unit: string;
  value: string;
  fontSize?: number;
  textStyle?: any;
  autoStart?: boolean;
  dropdownPress?: (value: number, unit: string) => void;
};

export const TimeDropdown = ({
  unit,
  value,
  fontSize,
  textStyle,
  autoStart,
  hitSlop,
  dropdownPress,
  ...props
}: TimeDropdown) => {
  const { isRunning, isLastSeconds } = useTimer();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const numberOfLinks = unit === "h" ? 12 : 60;

  const getSelection = (value: string) => {
    setDropdownOpen(!dropdownOpen);
    dropdownPress?.(parseInt(value), unit);
  };

  const toggleDropdown = () => !isRunning && setDropdownOpen(!dropdownOpen);

  const buttonStyle = { paddingBottom: 35 };

  return (
    <>
      <View style={styles.container}>
        <View>
          <Button
            onPress={toggleDropdown}
            fontSize={fontSize}
            title={`${value}${unit}`}
            textStyle={textStyle}
            buttonStyle={buttonStyle}
            isLastSeconds={isLastSeconds}
            hitSlop={hitSlop}
            {...props}
          />
        </View>
        {dropdownOpen ? (
          <View style={styles.list}>
            <ScrollView>
              {Array(numberOfLinks)
                .fill(null)
                .map((_, index) => (
                  <Pressable
                    onPress={() => getSelection(index.toString())}
                    style={styles.item}
                    key={index}
                  >
                    <Font size={60} color='white'>
                      {index}
                    </Font>
                  </Pressable>
                ))}
            </ScrollView>
          </View>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
    height: "100%",
    backgroundColor: "#3b3a3a",
    position: "absolute",
    bottom: 0,
    zIndex: 1,
  },
  item: {
    alignItems: "center",
    justifyContent: "center",
    height: 90,
  },
});
