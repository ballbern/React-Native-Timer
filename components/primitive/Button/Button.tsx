import React from "react";
import { StyleSheet, Pressable, PressableProps } from "react-native";
import { Font } from "../Font/Font";

type ButtonProps = PressableProps & {
  title: string | React.ReactElement | boolean;
  fontSize?: number;
  buttonStyle?: any;
  textStyle?: any;
  isLastSeconds?: boolean;
};

export const Button = ({
  onPress,
  title,
  fontSize,
  buttonStyle,
  textStyle,
  isLastSeconds,
  hitSlop,
}: ButtonProps) => {
  const otherButtonStyles = { ...styles.button, ...buttonStyle };
  const otherButtonTextStyles = { ...styles.text, ...textStyle };

  return (
    <Pressable style={otherButtonStyles} onPress={onPress} hitSlop={hitSlop}>
      <Font
        size={fontSize}
        color={`${!isLastSeconds ? "white" : "red"}`}
        style={otherButtonTextStyles}
      >
        {title}
      </Font>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "transparent",
  },
  text: {
    color: `${false ? "white" : "red"}`,
  },
});
