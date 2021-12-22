import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantList from "../Screens/RestaurantList";
import MenuAndReviewNavigator from "./MenuAndReviewNavigator";
import { ResturantIdContext } from "../../App";
import OrderView from "../Screens/OrderView";
import PlaceOrder from "../Screens/PlaceOrder";
import OrderScreen from "../Screens/OrderScreen";
import Profile from "../Screens/Profile";

const Stack = createStackNavigator();

function ResturantStackNavigator(props) {
  const [id] = useContext(ResturantIdContext);
  return (
    <Stack.Navigator mode={"modal"} initialRouteName="Main">
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
      <Stack.Screen name="Customize Order" component={OrderView} />
      <Stack.Screen name="Place Order" component={PlaceOrder} />
      <Stack.Screen name="Orders" component={OrderScreen} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default ResturantStackNavigator;
