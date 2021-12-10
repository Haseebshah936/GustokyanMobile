import React, { createContext, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginNavigator from "./components/Navigator/LoginNavigator";
import { LogBox } from "react-native";
import LoginForm from "./components/Login/LoginForm";

export const LoginContext = createContext(false);

export default function App() {
  LogBox.ignoreLogs(["Require cycle"]);
  const [login, setLogin] = useState(false);
  return (
    <LoginContext.Provider value={[login, setLogin]}>
      <NavigationContainer>
        <LoginNavigator />
      </NavigationContainer>
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
