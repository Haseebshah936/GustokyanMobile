import React, { createContext, useEffect, useState } from "react";
import { Alert, SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginNavigator from "./components/Navigator/LoginNavigator";
import { LogBox } from "react-native";
import LoginForm from "./components/Login/LoginForm";
import { auth, db } from "./Config/Firebase";
import { set } from "react-native-reanimated";
import { array } from "yup";

export const LoginContext = createContext(false);
export const ResturantIdContext = createContext("");
export const CartContext = createContext({});
export const Categories = createContext([]);
export const UserData = createContext([]);

export default function App() {
  LogBox.ignoreLogs([
    "Require cycle",
    "Setting a timer for a long period of time",
  ]);
  const [login, setLogin] = useState(false);
  const [rid, setRID] = useState();
  const [cart, setCart] = useState({ id: "", products: [], total: 0 });
  const [categories, setCategories] = useState([]);
  const [userData, setUserData] = useState({});
  const [userOrders, setuserOrders] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        if (user.emailVerified) {
          setLogin(user);
        } else {
          user
            .sendEmailVerification()
            .then(() => {
              alert("An Email Verification link is sent");
            })
            .catch((err) => alert(err));
        }
        // ...
      } else {
        setLogin(false);
      }
    });
  }, []);

  const getOrdersData = (id) => {
    const array = [];
    db.collection("users")
      .doc(id)
      .collection("orders")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          array.push(doc.data());
        });
      });
    setuserOrders(array);
  };

  const getProfileData = (id) => {
    // alert(auth.currentUser.uid);

    db.collection("users")
      .doc(id)
      .onSnapshot((doc) => {
        setUserData(doc.data());
      });
  };

  useEffect(() => {
    if (login) {
      getOrdersData(login.uid);
      getProfileData(login.uid);
    }
  }, [login]);
  return (
    <LoginContext.Provider value={[login, setLogin]}>
      <ResturantIdContext.Provider value={[rid, setRID]}>
        <UserData.Provider
          value={[userData, setUserData, userOrders, setuserOrders]}
        >
          <CartContext.Provider value={[cart, setCart]}>
            <Categories.Provider value={[categories, setCategories]}>
              <NavigationContainer>
                <LoginNavigator />
              </NavigationContainer>
            </Categories.Provider>
          </CartContext.Provider>
        </UserData.Provider>
      </ResturantIdContext.Provider>
      {/* <LoginForm /> */}
    </LoginContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
