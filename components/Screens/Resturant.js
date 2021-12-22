import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Alert,
} from "react-native";
import { AirbnbRating, Rating } from "react-native-ratings";
import { setDisabled } from "react-native/Libraries/LogBox/Data/LogBoxData";
import { CartContext, Categories, ResturantIdContext } from "../../App";
import color from "../Style/color";

export default function Resturant({
  id = "",
  logo = "",
  location = "",
  ResturantName = "",
  rating = 3,
  categories,
}) {
  const navigation = useNavigation();
  const [rid, setRID] = useContext(ResturantIdContext);
  const [cart, setCart] = useContext(CartContext);
  const [category, setCategory] = useContext(Categories);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (
            cart?.id !== id &&
            cart?.id !== "" &&
            cart?.products.length !== 0
          ) {
            Alert.alert(
              "Confirmation",
              "All the item in the cart will be removed",
              [
                { text: "cancel" },
                {
                  text: "OK",
                  onPress: () => {
                    navigation.navigate("Menu");
                    setRID({ id, ResturantName });
                    setCart({ id, products: [], total: 0 });
                    setCategory(
                      categories.map((c) => ({
                        label: c,
                        value: c,
                      }))
                    );
                  },
                },
              ]
            );
          } else {
            navigation.navigate("Menu");
            setCategory(
              categories.map((c, i) => ({
                label: c,
                value: c,
              }))
            );
            setRID({ id, ResturantName });
            setCart({ ...cart, id });
          }
        }}
      >
        <Image
          style={styles.logo}
          source={{ uri: logo, width: "100%", height: 200 }}
        />
      </TouchableOpacity>
      <View style={styles.subContainer}>
        <View style={{ width: "45%", alignItems: "flex-start" }}>
          <Text style={styles.resturnatName}>{ResturantName}</Text>
          <Rating readonly startingValue={rating} imageSize={15} />
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.menuBtn}
            activeOpacity={0.6}
            onPress={() => {
              if (
                cart?.id !== id &&
                cart?.id !== "" &&
                cart?.products.length !== 0
              ) {
                Alert.alert(
                  "Confirmation",
                  "All the item in the cart will be removed",
                  [
                    { text: "cancel" },
                    {
                      text: "OK",
                      onPress: () => {
                        navigation.navigate("Menu");
                        setRID({ id, ResturantName });
                        setCart({ id, products: [], total: 0 });
                        setCategory(
                          categories.map((c) => ({
                            label: c,
                            value: c,
                          }))
                        );
                      },
                    },
                  ]
                );
              } else {
                navigation.navigate("Menu");
                setCategory(
                  categories.map((c, i) => ({
                    label: c,
                    value: c,
                  }))
                );
                setRID({ id, ResturantName });
                setCart({ ...cart, id });
              }
            }}
          >
            <Text style={styles.locationText}>MENU</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.locationBtn}
            activeOpacity={0.6}
            onPress={() => Linking.openURL(location)}
          >
            <Text style={styles.locationText}>MAP</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 18,
    marginBottom: 2,
  },
  menuBtn: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: "#47AB74",
    borderRadius: 40,
    margin: 5,
  },
  locationBtn: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    backgroundColor: "#FF7519",
    borderRadius: 40,
    margin: 5,
  },
  locationText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
  buttons: {
    flexDirection: "row",
  },
});
