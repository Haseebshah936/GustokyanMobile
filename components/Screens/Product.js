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
            navigation.navigate("Customize Order", {
              image,
              price,
              productName,
              id,
              extras,
              details,
            })
          }
        >
          <Text style={styles.locationText}>GustoKoYan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    margin: 10,
    borderWidth: Platform.OS === "android" ? 0.1 : 0.2,
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
