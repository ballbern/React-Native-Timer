import React, { useRef, ReactElement } from "react";
import {
  StyleSheet,
  DrawerLayoutAndroid,
  View,
  Pressable,
  ScrollView,
} from "react-native";
import { useTimer } from "../../../context/TimerContext";
import { CountControl, AddSubButtons } from "../../";
import { Ionicons } from "@expo/vector-icons";

type DrawerProps = {
  children: ReactElement;
};

export const Drawer = ({ children }: DrawerProps) => {
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const {
    isRunning,
    timeRemaining,
    countOutTime,
    countInTime,
    setTimeRemaining,
  } = useTimer();

  const countOut = (id: string) => {
    const match = id.match(/^\d+/);
    if (match) {
      countOutTime({ id: parseInt(match[0], 10) });
    }
  };

  const countIn = (id: string) => {
    const match = id.match(/^\d+/);
    if (match) {
      countInTime({ id: parseInt(match[0], 10) });
    }
  };

  const rounds = (inter: string) => {
    setTimeRemaining(prev => ({
      ...prev,
      rounds:
        inter === "+"
          ? Math.max(prev.rounds + 1, 1)
          : Math.max(prev.rounds - 1, 1),
    }));
  };

  const intervals = (inter: string) => {
    setTimeRemaining(prev => ({
      ...prev,
      interval:
        inter === "+"
          ? Math.min(Math.max(prev.intervals + 1, 0), 10)
          : Math.min(Math.max(prev.intervals - 1, 0), 10),
    }));
  };

  const navigationView = () => (
    <ScrollView>
      <View style={styles.navigationContainer}>
        {/* round and intervals */}
        <AddSubButtons
          title={"Rounds"}
          onPress={rounds}
          value={timeRemaining.rounds}
        />
        <AddSubButtons
          title={"Interval"}
          onPress={intervals}
          value={timeRemaining.intervals}
          numberLabel={true}
        />

        {/* count in out */}
        <CountControl
          title='Count In'
          buttonLabels={["5sec", "10sec", "15sec"]}
          onPress={countIn}
          selected={`${timeRemaining.countIn.toString()}sec`}
        />
        <CountControl
          title='Count Out'
          buttonLabels={["5sec", "10sec", "15sec"]}
          onPress={countOut}
          selected={`${timeRemaining.countOut.toString()}sec`}
        />
      </View>
    </ScrollView>
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
    gap: 30,
    padding: 20,
    color: "white",
    backgroundColor: "#3b3a3a",
  },
});
