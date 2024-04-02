import React, { useRef, ReactElement } from "react";
import {
  StyleSheet,
  DrawerLayoutAndroid,
  Text,
  View,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTimer } from "../../../context/TimerContext";
import { CountControl } from "../CountControl/CountControl";

type DrawerProps = {
  children: ReactElement;
};

export const Drawer = ({ children }: DrawerProps) => {
  const { isRunning } = useTimer();
  const drawer = useRef<DrawerLayoutAndroid>(null);

  const navigationView = () => (
    <View style={styles.navigationContainer}>
      <CountControl title='Count out' />
      <CountControl title='Count in' />
    </View>
  );

  const openDrawer = () => drawer.current?.openDrawer();

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={"right"}
      renderNavigationView={navigationView}
    >
      {!isRunning ? (
        <View style={{ position: "absolute", right: 30, top: 20 }}>
          <Pressable
            onPress={openDrawer}
            hitSlop={{ top: 20, bottom: 30, left: 50, right: 20 }}
          >
            <Ionicons name='settings-sharp' size={20} color='white' />
          </Pressable>
        </View>
      ) : null}
      {children}
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
    padding: 20,
    color: "white",
    backgroundColor: "#3b3a3a",
  },
});
