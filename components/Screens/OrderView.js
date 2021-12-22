import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CartContext, ResturantIdContext } from "../../App";
import color from "../Style/color";
import Extra from "./Extra";

const OrderView = () => {
  const { image, price, productName, id, extras, details } = useRoute().params;
  const [quantity, setQuantity] = useState(1);
  const navigation = useNavigation();
  const [cart, setCart] = useContext(CartContext);
  const [rid] = useContext(ResturantIdContext);
  const [extra, setExtra] = useState([]);
  const [extrasPrice, setExtrasPrice] = useState(0);
  const handleExtras = (id, name, quantity, selection) => {
    if (selection) {
      setExtra([...extra, { ...extras[id], quantity }]);
      setExtrasPrice(extrasPrice + extras[id].price * quantity);
    } else {
      setExtra(extra.filter((ex) => ex.name !== name));
      const item = extra.filter((e) => e.name === name);
      setExtrasPrice(extrasPrice - item[0].price * item[0].quantity);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.subContainer}>
          <View style={styles.subInternalContainer}>
            <Image style={styles.image} source={{ uri: image }} />
            <View style={styles.textContainer}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {productName}
              </Text>
              <Text>₱ {price}</Text>
            </View>
          </View>
          <View style={styles.quantity}>
            <Text
              style={styles.textSub}
              onPress={() => {
                if (quantity == 1) {
                  navigation.goBack();
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
        </View>
        <Text style={styles.detailHeading}>Item Details</Text>
        <ScrollView style={styles.details}>
          <Text>{details}</Text>
        </ScrollView>
        <Text style={styles.extrasHeading}>Add-Ons:</Text>
        {extras.map((extra, index) => (
          <Extra
            id={index}
            key={index}
            name={extra.name}
            price={extra.price}
            handleSelection={handleExtras}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.addToCart}
        onPress={() => {
          if (cart.id === rid.id) {
            const cartProducts = [
              ...cart?.products,
              {
                id: cart?.products.length,
                productName,
                price,
                image,
                quantity,
                extra,
              },
            ];
            const total = cart.total + price * quantity + extrasPrice;
            setCart({ ...cart, products: cartProducts, total });
            navigation.goBack();
          }
        }}
      >
        <Text style={styles.add}>Add to Order</Text>
        <View style={styles.totalContainer}>
          <Text style={styles.textCart}>
            ₱ {(price * quantity + extrasPrice).toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default OrderView;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  subContainer: {
    marginVertical: 10,
    marginHorizontal: 5,
    padding: 10,
    paddingVertical: 20,
    borderRadius: 2,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 0.1,
  },
  subInternalContainer: {
    flexDirection: "row",
  },
  image: {
    width: 80,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  textContainer: {
    justifyContent: "space-between",
    width: "50%",
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
  addToCart: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#FF8600",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignItems: "center",
  },
  add: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  textCart: {
    color: "#FF8600",
    fontWeight: "bold",
    fontSize: 16,
  },
  totalContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "white",
    borderRadius: 20,
    alignSelf: "center",
  },
  detailHeading: {
    margin: 5,
    marginHorizontal: 15,
    marginBottom: 0,
    fontWeight: "bold",
    fontSize: 18,
    color: "#FF8600",
  },
  extrasHeading: {
    margin: 5,
    marginBottom: 0,
    marginTop: 10,
    fontWeight: "bold",
  },
  details: {
    margin: 5,
    marginVertical: 0,
    padding: 10,
    paddingVertical: 0,
    borderRadius: 2,
    height: 100,
    borderWidth: 0.1,
  },
});
