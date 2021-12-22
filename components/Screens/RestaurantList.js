import React, { useContext, useEffect, useState } from "react";
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
  ActivityIndicator,
  Text,
  Image,
} from "react-native";
import { LoginContext } from "../../App";
import color from "../Style/color";
import Resturant from "./Resturant";
import Constants from "expo-constants";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../Config/Firebase";
import { set } from "react-native-reanimated";
import { borderColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
const data1 = [
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

const RestaurantList = () => {
  const [login, setLogin] = useContext(LoginContext);
  const navigation = useNavigation();
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [searchables, setSearchables] = useState([]);
  const [limit, setLimit] = useState(10);
  const [reload, setReload] = useState(false);
  const [again, setAgain] = useState(true);
  const [city, setCity] = useState("");
  const [noData, setNoData] = useState(false);
  const [resturantName, setresturantName] = useState("");

  const fetchData = async () => {
    let array = [];
    if (data.length === 0) {
      db.collection("merchants")
        .orderBy("rating", "asc")
        .limit(limit)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            array.push(doc.data());
          });
        })
        .then(() => {
          setData(array);
          setSearchables(array);
          setLoaded(true);
          setNoData(false);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    } else {
      db.collection("merchants")
        .orderBy("id")
        .startAfter(data[data.length - 1].id)
        .limit(limit)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            array.push(doc.data());
          });
        })
        .then(() => {
          setData([...data, ...array]);
          setSearchables(array);
          setLoaded(true);
          setNoData(false);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  };

  const searchByCity = () => {
    let array = [];
    setLoaded(false);
    setNoData(false);
    if (city !== "" && resturantName !== "") {
      db.collection("merchants")
        .where("city", "==", city.toLowerCase())
        .where("resturantName", "==", resturantName)
        .limit(limit)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            array.push(doc.data());
          });
        })
        .then(() => {
          setData(array);
          setLoaded(true);
          if (array.length === 0) {
            setData([]);
            setNoData(true);
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    } else if (city !== "") {
      db.collection("merchants")
        .where("city", "==", city.toLowerCase())
        .limit(limit)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            array.push(doc.data());
          });
        })
        .then(() => {
          setData(array);
          setLoaded(true);
          if (array.length === 0) {
            setData([]);
            setNoData(true);
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    } else {
      db.collection("merchants")
        .where("resturantName", "==", resturantName)
        .limit(limit)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            array.push(doc.data());
          });
        })
        .then(() => {
          setData(array);
          setLoaded(true);
          if (array.length === 0) {
            setData([]);
            setNoData(true);
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  };

  useEffect(() => {
    if (city !== "" || resturantName !== "") {
      searchByCity();
    } else {
      fetchData();
    }
  }, [limit, again]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerConatiner}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.openDrawer()}
        >
          <Octicons name="three-bars" size={24} color="black" />
        </TouchableOpacity>
        <TextInput
          value={resturantName}
          onChangeText={(text) => setresturantName(text)}
          placeholder="Search Resturant"
          style={styles.searchInput}
        />
        <TouchableOpacity activeOpacity={0.5}>
          <MaterialIcons
            onPress={() => {
              setLimit(10);
              setData([]);
              setAgain(!again);
            }}
            name="search"
            size={26}
            color="black"
          />
        </TouchableOpacity>
      </View>

      {loaded ? (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            item.activated && (
              <Resturant
                id={item?.id}
                ResturantName={item?.resturantName}
                location={item?.location}
                logo={item?.image}
                rating={item?.rating}
                categories={item?.categories}
              />
            )
          }
          refreshing={reload}
          onRefresh={() => {
            setLoaded(false);
            setData(searchables);
            setAgain(!again);
            setCity("");
            setresturantName("");
            setLimit(10);
          }}
          initialNumToRender={1}
          onEndReached={() => {
            data.length >= limit && setLimit(limit + 10);
          }}
          onEndReachedThreshold={0.01}
        />
      ) : (
        <ActivityIndicator
          style={styles.activityIndicator}
          size={"large"}
          color={color.primary}
        />
      )}
      {noData && (
        <Text style={styles.activityIndicator}>
          No Resturants for this city
        </Text>
      )}

      {/* <Button
        title="LogOut"
        color={color.primary}
        onPress={() => setLogin(false)}
      /> */}
      <View style={styles.headerConatiner1}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-circle-outline" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("Orders")}
        >
          <EvilIcons name="bell" size={32} color="black" />
        </TouchableOpacity>
        <TextInput
          value={city}
          onChangeText={(text) => setCity(text)}
          placeholder="Search City"
          style={styles.searchInput1}
        />
        <TouchableOpacity activeOpacity={0.5}>
          <MaterialIcons
            onPress={() => {
              setLimit(10);
              setData([]);
              setAgain(!again);
            }}
            name="search"
            size={26}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <StatusBar style={"dark"} hidden />
    </SafeAreaView>
  );
};

export default RestaurantList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  headerConatiner: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#FF8000",
    borderBottomWidth: 0.15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  searchInput: {
    backgroundColor: "white",
    fontSize: 15,
    paddingVertical: Platform.OS === "android" ? 5 : 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    width: "70%",
    color: "black",
  },
  activityIndicator: {
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    color: "black",
  },
  headerConatiner1: {
    backgroundColor: "#A9A9A9",
    borderBottomWidth: 0.15,
    elevation: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  searchInput1: {
    backgroundColor: "white",
    fontSize: 12,
    paddingVertical: Platform.OS === "android" ? 2 : 6,
    paddingHorizontal: 15,
    borderRadius: 25,
    width: "60%",
    color: "black",
  },
  profile: {
    padding: 5,
    borderWidth: 0.1,
    borderColor: "lightgray",
    height: 40,
    width: 40,
  },
});
