import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SigninNavigator from "./SigninNavigator";
import { LoginContext } from "../../App";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

function LoginNavigator(props) {
  const [login] = useContext(LoginContext);

  // useEffect(() => {
  //   console.log(store)
  //   dispatch(loginFailure());
  //   console.log
  // });
  return (
    <Stack.Navigator headerMode={"none"} mode={"modal"}>
      {login ? (
        <Stack.Screen name="Main" component={DrawerNavigator} />
      ) : (
        <Stack.Screen name="Login" component={SigninNavigator} />
      )}
    </Stack.Navigator>
  );
}

export default LoginNavigator;
