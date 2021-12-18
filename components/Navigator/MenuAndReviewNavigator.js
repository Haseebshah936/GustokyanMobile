import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ResturantMenu from "../Screens/ResturantMenu";
import Reviews from "../Screens/Reviews";
import color from "../Style/color";

const Tab = createMaterialTopTabNavigator();

export default function MenuAndReviewNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: color.primary,
        inactiveTintColor: "black",
        indicatorStyle: { backgroundColor: color.primary, height: 2 },
        labelStyle: { fontSize: 12, fontWeight: "bold" },
      }}
    >
      <Tab.Screen name="Menu" component={ResturantMenu} />
      <Tab.Screen name="Reviews" component={Reviews} />
    </Tab.Navigator>
  );
}
