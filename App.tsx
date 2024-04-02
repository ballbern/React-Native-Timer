import { StyleSheet, StatusBar } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useCallback, useEffect } from "react";
import { Main, Drawer } from "./components";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";
import { TimerProvider } from "./context/TimerContext";

SplashScreen.preventAutoHideAsync();

async function lockScreenOrientation() {
  await ScreenOrientation.lockAsync(
    ScreenOrientation.OrientationLock.LANDSCAPE
  );
}

export default function App() {
  useEffect(() => {
    lockScreenOrientation();
  }, []);

  const [fontsLoaded, fontError] = useFonts({
    "Anton-Regular": require("./assets/fonts/Anton-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TimerProvider>
      <View style={styles.app} onLayout={onLayoutRootView}>
        <Drawer>
          <>
            <StatusBar hidden />
            <Main />
          </>
        </Drawer>
      </View>
    </TimerProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#242424",
  },
});
