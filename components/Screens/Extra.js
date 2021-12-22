import React, { useState } from "react";
import { StyleSheet, Text, View, CheckBox } from "react-native";
import color from "../Style/color";

const Extra = ({ id, name, price, handleSelection = () => {} }) => {
  const [isSelected, setSelection] = useState(false);
  const [quantity, setQuantity] = useState(1);
  return (
    <View style={styles.container}>
      <Text style={{ width: "25%" }}>{name}</Text>
      <View style={styles.quantity}>
        <Text
          style={styles.textSub}
          onPress={() => {
            if (quantity == 1) {
            } else {
              setQuantity(quantity - 1);
            }
          }}
        >
          -
        </Text>
        <Text style={styles.text}>{quantity}</Text>
        <Text
          style={styles.textAdd}
          onPress={() => {
            setQuantity(quantity + 1);
          }}
        >
          +
        </Text>
      </View>
      <Text>₱ {price}</Text>
      <CheckBox
        value={isSelected}
        onValueChange={() => {
          setSelection(!isSelected);
          handleSelection(id, name, quantity, !isSelected);
        }}
        style={styles.checkbox}
      />
    </View>
  );
};

export default Extra;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    paddingVertical: 5,
    margin: 0,
  },
  quantity: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 80,
    backgroundColor: color.primary,
    borderRadius: 20,
    alignItems: "center",
    opacity: 0.8,
  },
  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  textSub: {
    color: "white",
    opacity: 0.8,
    fontSize: 30,
  },
  textAdd: {
    opacity: 0.8,
    color: "white",
    fontSize: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
});
