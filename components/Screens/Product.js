import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import { AirbnbRating, Rating } from "react-native-ratings";
import { setDisabled } from "react-native/Libraries/LogBox/Data/LogBoxData";
import { CartContext, ResturantIdContext } from "../../App";
import color from "../Style/color";

export default function Product({
  id = "",
  image = "",
  productName = "",
  price = 0,
  extras = [],
  details = "",
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{ uri: image, width: "100%", height: 200 }}
      />

      <View style={styles.subContainer}>
        <View style={{ alignItems: "flex-start" }}>
          <Text style={styles.resturnatName}>{productName}</Text>
          <Text style={styles.price}>₱ {price}</Text>
        </View>
        <TouchableOpacity
          style={styles.locationBtn}
          activeOpacity={0.6}
          onPress={() =>
            navigation.navigate("orderView", {
              image,
              price,
              productName,
              id,
              extras,
              details,
            })
          }
        >
          <Text style={styles.locationText}>Select</Text>
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
    marginVertical: 5,
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
    fontSize: 18,
    marginBottom: 2,
  },
  locationBtn: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    backgroundColor: color.primary,
    borderRadius: 10,
  },
  locationText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    color: "black",
    fontWeight: "bold",
    fontSize: 14,
  },
});
