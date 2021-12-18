import * as React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { LoginContext } from "../../App";
import ResturantStackNavigator from "./ResturantStackNavigator";
import { auth } from "../../Config/Firebase";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const [login, setLogin] = React.useContext(LoginContext);
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={() => auth.signOut()} />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen name="Home" component={ResturantStackNavigator} />
    </Drawer.Navigator>
  );
}
