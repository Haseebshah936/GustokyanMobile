import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { CartContext } from "../../App";
import OrderedProduct from "./OrderedProduct";

const PlaceOrder = () => {
  const [cart, setCart] = useContext(CartContext);
  console.log(cart);
  return (
    <View style={styles.container}>
      {/* <OrderedProduct /> */}
      <FlatList
        data={cart?.products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <OrderedProduct
            id={item.id}
            img={item.image}
            price={item.price}
            productName={item.productName}
            quantity={item.quantity}
            extra={item.extra}
          />
        )}
      />
      <View style={styles.total}>
        <Text style={styles.text}>Total</Text>
        <Text style={styles.text}>₱ {cart?.total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

export default PlaceOrder;
const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    backgroundColor: "white",
    height: "50%",
  },
  total: {
    flexDirection: "row",
    borderTopWidth: 0.2,
    justifyContent: "space-between",
    padding: 5,
    paddingRight: 15,
  },
  text: {
    fontWeight: "bold",
  },
});
