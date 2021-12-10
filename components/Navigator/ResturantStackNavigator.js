import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RestaurantList from "../Screens/RestaurantList";
import Menu from "../Screens/Menu";
import MenuAndReviewNavigator from "./MenuAndReviewNavigator";

const Stack = createStackNavigator();

function ResturantStackNavigator(props) {
  return (
    <Stack.Navigator headerMode={"none"} mode={"modal"}>
      <Stack.Screen name="Main" component={RestaurantList} />
      <Stack.Screen name="Menu" component={MenuAndReviewNavigator} />
    </Stack.Navigator>
  );
}

export default ResturantStackNavigator;
