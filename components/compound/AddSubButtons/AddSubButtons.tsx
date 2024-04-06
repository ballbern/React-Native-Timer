import React, { useState } from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { FontAwesome6, Entypo } from "@expo/vector-icons";
import { Font } from "../../primitive/Font/Font";

type AddSubButtonsProps = {
  title: string;
  numberLabel?: boolean;
};

export const AddSubButtons = ({ title, numberLabel }: AddSubButtonsProps) => {
  const [value, setValue] = useState(1);

  const updateValue = (inter: string): void => {
    setValue(value => (inter === "+" ? value + 1 : value - 1));
  };

  return (
    <View>
      <Text style={styles.textTitle}>{title}:</Text>
      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button]} onPress={() => updateValue("-")}>
          <Entypo name='minus' size={24} color='white' />
        </Pressable>
        <Pressable style={[styles.button]} onPress={() => updateValue("+")}>
          <FontAwesome6 name='add' size={24} color='white' />
        </Pressable>
        <Text style={styles.addSubNumber}>
          {value}
          {numberLabel && <Font style={{ fontSize: 12 }}>mins</Font>}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  addSubNumber: {
    fontSize: 35,
    color: "white",
    alignSelf: "center",
    paddingLeft: 20,
    width: "33%",
  },
});
