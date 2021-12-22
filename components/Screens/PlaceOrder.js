import React, { useContext } from "react";
import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { CartContext } from "../../App";
import OrderedProduct from "./OrderedProduct";
import { RadioButton } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

const PlaceOrder = () => {
  const [cart, setCart] = useContext(CartContext);
  const [checked, setChecked] = useState("first");
  const [payment, setPayment] = useState("");
  const [info, setInfo] = useState("");
  const [rl, setUrl] = useState("");
  return (
    <View style={styles.container}>
      <View style={{ height: "55%" }}>
        <View style={styles.extras}>
          <Text
            style={{
              width: "35%",
              color: "#FF8600",
              fontSize: 16,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Items
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "#FF8600",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Qty.
          </Text>
          <Text
            style={{
              width: "20%",
              color: "#FF8600",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Price
          </Text>
        </View>
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
          <Text style={styles.text}>Convenience Fee</Text>
          <Text style={styles.text}>₱ 10.00</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.dinin}>
          <RadioButton
            value="first"
            status={checked === "first" ? "checked" : "unchecked"}
            color="#FF8600"
            onPress={() => setChecked("first")}
          />
          <Text style={{ color: "black" }}>DINE-IN</Text>
          <RadioButton
            value="second"
            status={checked === "second" ? "checked" : "unchecked"}
            onPress={() => setChecked("second")}
            color="#FF8600"
          />
          <Text style={{ color: "black" }}>TAKEOUT</Text>
        </View>
        <View style={styles.paymentContainer}>
          <Text style={styles.paymentHeading}>PAYMENT OPTIONS</Text>
          <View style={styles.options}>
            <RadioButton
              value="first"
              status={checked === "first" ? "checked" : "unchecked"}
              color="#FF8600"
              onPress={() => setChecked("first")}
            />
            <Text style={styles.optionText}>DINE-IN</Text>
          </View>
          <View style={styles.options}>
            <RadioButton
              value="first"
              status={checked === "first" ? "checked" : "unchecked"}
              color="#FF8600"
              onPress={() => setChecked("first")}
            />
            <Text style={styles.optionText}>DINE-IN</Text>
          </View>
          <View style={styles.options}>
            <RadioButton
              value="first"
              status={checked === "first" ? "checked" : "unchecked"}
              color="#FF8600"
              onPress={() => setChecked("first")}
            />
            <Text style={styles.optionText}>DINE-IN</Text>
          </View>
          <View style={styles.options}>
            <RadioButton
              value="first"
              status={checked === "first" ? "checked" : "unchecked"}
              color="#FF8600"
              onPress={() => setChecked("first")}
            />
            <Text style={styles.optionText}>DINE-IN</Text>
          </View>

          <View style={styles.info}>
            <Text style={styles.infoHeading}>
              Table or Room No./ Additional Notes:
            </Text>
            <TextInput
              numberOfLines={5}
              multiline={true}
              style={styles.infoInput}
              value={info}
              onChangeText={setInfo}
            />
          </View>
          <TouchableOpacity activeOpacity={0.6} style={styles.selfieContainer}>
            <View style={styles.selfieTextContainer}>
              <Text style={styles.selfieContainerHeading}>Take a Selfie</Text>
              <Text style={styles.selfieText}>
                To Validate your Order Click Here.
              </Text>
            </View>
            <View style={styles.selfiebtn}>
              <FontAwesome name="camera" size={28} color="#339E03" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {}}
        style={styles.placeOrder}
        activeOpacity={0.6}
      >
        <Text style={styles.text1}>Place Order</Text>
        <View style={styles.subContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.textCart}>
              ₱ {(cart?.total + 10).toFixed(2)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PlaceOrder;
const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.2,
    backgroundColor: "white",
    flex: 1,
    justifyContent: "space-between",
  },
  total: {
    flexDirection: "row",
    borderTopWidth: 0.2,
    justifyContent: "space-between",
    padding: 10,
    paddingRight: 30,
  },
  text: {
    fontWeight: "bold",
    color: "black",
  },
  dinin: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    borderWidth: 0.1,
    borderRadius: 25,
    paddingHorizontal: 20,
    margin: 10,
  },
  placeOrder: {
    backgroundColor: "#FF8600",
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 20,
    paddingRight: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text1: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  totalContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "white",
    borderRadius: 20,
    alignSelf: "center",
    marginRight: 5,
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropDown: {
    borderWidth: 0.2,
    width: "100%",
    margin: 10,
    alignSelf: "center",
    borderRadius: 0,
  },
  textCart: {
    color: "tomato",
    fontWeight: "bold",
    fontSize: 16,
  },
  extras: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 10,
  },
  paymentContainer: {
    padding: 10,
    paddingVertical: 0,
  },
  paymentHeading: {
    color: "#FF8600",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontWeight: "bold",
    fontSize: 14,
  },
  info: {
    padding: 5,
  },
  infoHeading: {
    alignSelf: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoInput: {
    fontSize: 14,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#F3F3F3",
    borderRadius: 20,
    textAlignVertical: "top",
  },
  selfieContainer: {
    backgroundColor: "#339E03",
    paddingVertical: 7,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    borderRadius: 28,
  },
  selfieTextContainer: {
    width: "70%",
  },
  selfieContainerHeading: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  selfieText: {
    textAlign: "center",
    fontSize: 14,
    color: "white",
  },
  selfiebtn: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
});
