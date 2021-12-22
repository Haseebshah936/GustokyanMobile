import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const FAQs = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>FAQs</Text>
    </SafeAreaView>
  );
};

export default FAQs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
