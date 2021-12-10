import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Menu from "../Screens/Menu";
import Reviews from "../Screens/Reviews";

const Tab = createMaterialTopTabNavigator();

export default function MenuAndReviewNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Menu" component={Menu} />
      <Tab.Screen name="Reviews" component={Reviews} />
    </Tab.Navigator>
  );
}
