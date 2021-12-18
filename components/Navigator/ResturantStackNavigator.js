import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantList from "../Screens/RestaurantList";
import MenuAndReviewNavigator from "./MenuAndReviewNavigator";
import { ResturantIdContext } from "../../App";
import OrderView from "../Screens/OrderView";
import PlaceOrder from "../Screens/PlaceOrder";

const Stack = createStackNavigator();

function ResturantStackNavigator(props) {
  const [id] = useContext(ResturantIdContext);
  return (
    <Stack.Navigator mode={"modal"}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Main"
        component={RestaurantList}
      />
      <Stack.Screen
        options={{ headerTitle: id?.ResturantName }}
        name="Menu"
        component={MenuAndReviewNavigator}
      />
      <Stack.Screen name="orderView" component={OrderView} />
      <Stack.Screen name="placeOrder" component={PlaceOrder} />
    </Stack.Navigator>
  );
}

export default ResturantStackNavigator;
