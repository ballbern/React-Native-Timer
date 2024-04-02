import { Button } from "../../";
import { View, StyleSheet } from "react-native";

export const Footer = () => {
  const setTimeRemaining = (time: number) => {
    alert(`setTimeRemaining: ${time}`);
  };

  return (
    <View style={styles.footer}>
      <Button
        title='3 minutes'
        onPress={() => setTimeRemaining(180)}
        hitSlop={{ top: 30, bottom: 30, left: 200, right: 30 }}
      />
      <Button title='5 minutes' onPress={() => setTimeRemaining(300)} />
      <Button title='10 minutes' onPress={() => setTimeRemaining(600)} />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: "relative",
    flex: 0.2,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
