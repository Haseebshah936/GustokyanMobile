import React, { useContext } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LoginContext } from "../../App";
import color from "../Style/color";
import Resturant from "./Resturant";
import Constants from "expo-constants";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    resturnat: "Food on Way",
    location: "https://goo.gl/maps/XB91aV4KSDDDAwo6A",
    logo: "https://www.journeymexico.com/wp-content/uploads/2013/06/costa-baja-la-paz-111.jpg",
  },
  {
    resturnat: "Food on Way",
    location: "https://goo.gl/maps/XB91aV4KSDDDAwo6A",
    logo: "https://www.journeymexico.com/wp-content/uploads/2013/06/costa-baja-la-paz-111.jpg",
  },
  {
    resturnat: "Food on Way",
    location: "https://goo.gl/maps/XB91aV4KSDDDAwo6A",
    logo: "https://www.journeymexico.com/wp-content/uploads/2013/06/costa-baja-la-paz-111.jpg",
  },
  {
    resturnat: "Food on Way",
    location: "https://goo.gl/maps/XB91aV4KSDDDAwo6A",
    logo: "https://www.journeymexico.com/wp-content/uploads/2013/06/costa-baja-la-paz-111.jpg",
  },
  {
    resturnat: "Food on Way",
    location: "https://goo.gl/maps/XB91aV4KSDDDAwo6A",
    logo: "https://www.journeymexico.com/wp-content/uploads/2013/06/costa-baja-la-paz-111.jpg",
  },
];

const Header = ({ navigation }) => {
  return (
    <View style={styles.headerConatiner}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.openDrawer()}
      >
        <Octicons name="three-bars" size={24} color="black" />
      </TouchableOpacity>
      <TextInput placeholder="Search" style={styles.searchInput} />
      <TouchableOpacity activeOpacity={0.5}>
        <MaterialIcons name="settings" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const RestaurantList = () => {
  const [login, setLogin] = useContext(LoginContext);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Resturant
            ResturantName={item.resturnat}
            location={item.location}
            logo={item.logo}
          />
        )}
        // ListHeaderComponent={Header}
      />

      {/* <Button
        title="LogOut"
        color={color.primary}
        onPress={() => setLogin(false)}
      /> */}
      <StatusBar style={"dark"} />
    </SafeAreaView>
  );
};

export default RestaurantList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerConatiner: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
    borderBottomWidth: 0.15,
    elevation: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },

  searchInput: {
    backgroundColor: "white",
    borderWidth: 0.3,
    marginVertical: 5,
    marginBottom: 12,
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 25,
    width: "70%",
    color: "black",
  },
});
