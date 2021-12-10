import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import color from "../Style/color";

export default function Resturant({
  id = "",
  logo = "",
  location = "",
  ResturantName = "",
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Menu")}
      >
        <Image
          style={styles.logo}
          source={{ uri: logo, width: "100%", height: 200 }}
        />
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <View>
          <Text style={styles.resturnatName}>{ResturantName}</Text>
        </View>
        <TouchableOpacity
          style={styles.locationBtn}
          activeOpacity={0.6}
          onPress={() => Linking.openURL(location)}
        >
          <Text style={styles.locationText}>Open Location in Maps</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    elevation: 0.5,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 5,
    backgroundColor: "white",
    shadowColor: "grey",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    margin: 10,
  },
  logo: {
    alignSelf: "center",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    alignItems: "center",
  },
  resturnatName: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
  locationBtn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: color.primary,
    borderRadius: 10,
  },
  locationText: {
    color: "white",
    fontWeight: "bold",
  },
});
