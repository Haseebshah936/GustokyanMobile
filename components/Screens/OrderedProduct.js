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
  quantity = "Quantity",
  price = "Price",
  extra = [],
}) => {
  const [cart, setCart] = useContext(CartContext);
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btn}
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
        <Text style={styles.quantity}>{quantity}</Text>
        <Text style={styles.price}>
          {quantity === "Quantity" ? price : "₱ " + quantity * price}
        </Text>
        {img === "Image" ? (
          <Text style={styles.name}>{img}</Text>
        ) : (
          <Image
            style={styles.img}
            source={{ uri: img, width: "90%", height: 50 }}
          />
        )}
      </View>
      {extra.length !== 0 && <Text style={styles.heading}>Extras</Text>}
      {extra.map((ex, i) => (
        <View style={styles.extras} key={i}>
          <Text style={{ width: "25%" }}>{ex.name}</Text>
          <Text>₱ {ex.price}</Text>
          <Text>{ex.quantity}</Text>
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
    padding: 5,
  },
  btn: {
    flex: 1,
  },
  img: {
    flex: 1,
    width: "90%",
    resizeMode: "contain",
  },
  name: {
    flex: 1.5,
    color: "black",
    alignSelf: "center",
    fontWeight: "bold",
  },
  quantity: {
    alignSelf: "center",
    flex: 0.5,
    color: "black",
  },
  price: {
    alignSelf: "center",
    flex: 1,
    color: "black",
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
