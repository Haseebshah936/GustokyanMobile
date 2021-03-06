import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CartContext } from "../../App";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Inter_100Thin } from "@expo-google-fonts/inter";

const OrderedProduct = ({
  id = "",
  productName = "Product",
  img = "Image",
  quantity = 1,
  price = 0,
  extra = [],
}) => {
  const [cart, setCart] = useContext(CartContext);
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.btn}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              const cartProducts = cart?.products.filter((p) => p.id !== id);
              let cost = 0;
              extra.map((e) => (cost = cost + e.price * e.quantity));
              const total = cart.total - price * quantity - cost;
              setCart({ ...cart, products: cartProducts, total });
              if (cartProducts.length === 0) {
                navigation.goBack();
              }
            }}
          >
            <MaterialIcons name="delete" size={24} color="tomato" />
          </TouchableOpacity>
          <Text style={styles.name}>{productName}</Text>
        </View>
        <Text style={styles.quantity}>{quantity}</Text>
        <Text style={styles.price}>
          {quantity === "Quantity"
            ? price.toFixed(2)
            : "₱ " + (quantity * price).toFixed(2)}
        </Text>
        {/* {img === "Image" ? (
          <Text style={styles.name}>{img}</Text>
        ) : (
          <Image
            style={styles.img}
            source={{ uri: img, width: "90%", height: 50 }}
          />
        )} */}
      </View>
      {extra.length !== 0 && <Text style={styles.heading}>Add-Ons</Text>}
      {extra.map((ex, i) => (
        <View style={styles.extras} key={i}>
          <Text style={{ width: "35%" }}>{ex.name}</Text>
          <Text>{ex.quantity}</Text>
          <Text style={{ width: "20%" }}>
            ₱ {parseFloat(ex.price).toFixed(2)}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default OrderedProduct;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    borderBottomColor: "black",
    borderBottomWidth: 0.2,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  btn: {
    flexDirection: "row",
    width: "35%",
  },
  img: {
    flex: 1,
    width: "90%",
    resizeMode: "contain",
  },
  name: {
    // flex: 1,
    color: "black",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  quantity: {
    alignSelf: "center",
    // flex: 1,
    color: "black",
    justifyContent: "flex-end",
  },
  price: {
    alignSelf: "center",
    // flex: 1,
    color: "black",
    width: "20%",
  },
  extras: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 15,
    marginHorizontal: 10,
  },
});
