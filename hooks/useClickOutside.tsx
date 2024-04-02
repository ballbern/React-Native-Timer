import { useRef, useEffect, useState } from "react";
import { PanResponder, View } from "react-native";

export const useClickOutside = (initialRefState = null) => {
  const [isClickedOutside, setIsClickedOutside] = useState(false);
  const ref = useRef(initialRefState);

  useEffect(() => {
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: () => setIsClickedOutside(true),
      onPanResponderTerminate: () => setIsClickedOutside(false),
    });

    const pressOutsideSubscription =
      ref.current &&
      ref.current.setNativeProps &&
      ref.current.setNativeProps({
        ...panResponder.panHandlers,
      });

    return () => pressOutsideSubscription && pressOutsideSubscription.remove();
  }, [ref]);

  return [ref, isClickedOutside];
};
