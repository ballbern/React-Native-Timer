import { useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

type CountControlProps = {
  title: string;
  buttonLabels: string[];
  selected: string;
  onPress: (id: string) => void;
};

export const CountControl = ({
  title,
  buttonLabels,
  selected,
  onPress,
}: CountControlProps) => {
  const [selectedButton, setSelectedButton] = useState<string | null>(selected);

  const click = (id: string) => {
    setSelectedButton(id);
    onPress(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>{title}:</Text>
      <View style={styles.buttonContainer}>
        {buttonLabels.map(label => (
          <Pressable
            style={[
              styles.button,
              (selectedButton === label || selected === label) &&
                styles.selectedButton,
            ]}
            onPress={() => click(label)}
          >
            <Text
              style={[
                styles.text,
                (selectedButton === label || selected === label) &&
                  styles.selectedText,
              ]}
            >
              {label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 40 },
  text: { color: "white", fontSize: 15, fontWeight: "800" },
  selectedText: { color: "#3b3a3a" },
  textTitle: { marginBottom: 10, color: "white", fontWeight: "bold" },
  buttonContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#525151",
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedButton: { backgroundColor: "#e1dddd" },
});
