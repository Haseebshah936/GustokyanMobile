import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CartContext, Categories, ResturantIdContext } from "../../App";
import { db } from "../../Config/Firebase";
import color from "../Style/color";
import Product from "./Product";
import DropDownPicker from "react-native-dropdown-picker";
const ResturantMenu = () => {
  const [id] = useContext(ResturantIdContext);
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [cart, setCart] = useContext(CartContext);
  const [categories, setCategories] = useContext(Categories);
  const [visible, setVisible] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  const navigation = useNavigation();

  const fetchData = (category = categories[0].value) => {
    let array = [];
    db.collection("merchants")
      .doc(id.id)
      .collection("products")
      .where("available", "==", true)
      .where("category", "==", category)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          array.push(doc.data());
        });
      })
      .then(() => {
        setData(array);
        setLoaded(true);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  useEffect(() => {
    setValue(categories[0].value);
    fetchData();
  }, [id]);
  return (
    <View style={styles.container}>
      <View>
        <DropDownPicker
          open={open}
          value={value}
          items={categories}
          setOpen={setOpen}
          setValue={setValue}
          onChangeValue={(value) => {
            fetchData(value);
          }}
          style={styles.dropDown}
          textStyle={styles.textStyle}
          containerStyle={styles.containerStyle}
          dropDownContainerStyle={styles.dropDownContainerStyle}
        />
        {loaded ? (
          <FlatList
            style={styles.sub}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Product
                id={item.id}
                image={item.image}
                price={item.price}
                productName={item.productName}
                extras={item?.extras}
                details={item?.details}
              />
            )}
          />
        ) : (
          <ActivityIndicator
            style={styles.activityIndicator}
            size={"large"}
            color={color.primary}
          />
        )}
        {cart?.total !== 0 ? (
          <TouchableOpacity
            style={styles.placeOrder}
            activeOpacity={0.6}
            onPress={() => navigation.navigate("placeOrder")}
          >
            <Text style={styles.text}>Place Order</Text>
            <View style={styles.subContainer}>
              <View style={styles.totalContainer}>
                <Text style={styles.textCart}>₱ {cart?.total}</Text>
              </View>
              {/* <TouchableOpacity
              activeOpacity={0.6}
              onPress={() =>
                Alert.alert(
                  "Confirmation",
                  "This action will make your cart empty.",
                  [
                    { text: "cancel" },
                    {
                      text: "OK",
                      onPress: () =>
                      setCart({ ...cart, products: [], total: 0 }),
                    },
                  ]
                  )
              }
            >
            <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity> */}
            </View>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

export default ResturantMenu;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
  },
  activityIndicator: {
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    color: "black",
  },
  placeOrder: {
    backgroundColor: color.secondry,
    alignItems: "center",
    padding: 10,
    paddingHorizontal: 20,
    paddingRight: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
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
  sub: {},
  textStyle: { textTransform: "capitalize", fontWeight: "bold" },
  containerStyle: { width: "95%" },
  dropDownContainerStyle: { borderWidth: 0.2, alignSelf: "center" },
});
