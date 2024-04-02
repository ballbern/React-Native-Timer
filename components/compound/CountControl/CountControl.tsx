import React, { useRef } from "react";
import {
  StyleSheet,
  DrawerLayoutAndroid,
  Text,
  View,
  Pressable,
} from "react-native";

type CountControlProps = {
  title: string;
};

export const CountControl = ({ title }: CountControlProps) => {
  const drawer = useRef<DrawerLayoutAndroid>(null);

  return (
    <View style={{ marginTop: 10 }}>
      <Text style={{ marginBottom: 10, color: "white" }}>{title}:</Text>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <Pressable onPress={() => drawer.current?.closeDrawer()}>
          <Text style={{ color: "white" }}>5sec</Text>
        </Pressable>
        <Pressable onPress={() => drawer.current?.closeDrawer()}>
          <Text style={{ color: "white" }}>10sec</Text>
        </Pressable>
        <Pressable onPress={() => drawer.current?.closeDrawer()}>
          <Text style={{ color: "white" }}>15sec</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navigationContainer: {},
});
