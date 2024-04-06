import { ReactNode, useEffect, useState } from "react";
import { Text, TextProps, Animated } from "react-native";

type FontProps = TextProps & {
  children: ReactNode;
  size?: number;
  color?: string;
  bounce?: boolean;
};

export const Font = ({ size, color, bounce = false, children }: FontProps) => {
  // const [bounceAnim] = useState(new Animated.Value(0));

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     Animated.sequence([
  //       Animated.timing(bounceAnim, {
  //         toValue: 1,
  //         duration: 500,
  //         useNativeDriver: true,
  //       }),
  //       Animated.spring(bounceAnim, {
  //         toValue: 0,
  //         friction: 3,
  //         tension: 40,
  //         useNativeDriver: true,
  //       }),
  //     ]).start();
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <Text
      style={{
        fontFamily: "Anton-Regular",
        color: color ?? "white",
        fontSize: size ?? 12,
        // transform: bounce
        //   ? [
        //       {
        //         scale: bounceAnim.interpolate({
        //           inputRange: [0, 0.5, 1],
        //           outputRange: [1, 1.2, 1],
        //         }),
        //       },
        //     ]
        //   : [],
      }}
    >
      {children}
    </Text>
  );
};
