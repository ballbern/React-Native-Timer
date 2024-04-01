import { ReactNode } from "react";
import { Text, TextProps } from "react-native";

type FontProps = TextProps & {
  children: ReactNode;
  size?: number;
  color?: string;
};

export const Font = ({ size, color, children }: FontProps) => {
  return (
    <Text
      style={{
        fontFamily: "Anton-Regular",
        color: color ?? "white",
        fontSize: size ?? 12,
      }}
    >
      {children}
    </Text>
  );
};
