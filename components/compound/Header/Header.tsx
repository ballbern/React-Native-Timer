import { StyleSheet, View } from "react-native";
import { Button } from "../../";

export const Header = () => {
  const startTimer = () => {
    alert("startTimer");
  };

  const stopTimer = () => {
    alert("stopTimer");
  };

  return (
    <View style={styles.header}>
      <Button title='start' onPress={startTimer} />
      <Button title='reset' onPress={stopTimer} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 0.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
