import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  Pressable,
  Keyboard,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Yup from "yup";

import { Formik } from "formik";
import ErrorMessage from "./ErrorMessage";

import Constants from "expo-constants";

import { Ionicons } from "@expo/vector-icons";
import styles from "../Style/styles";

import color from "../Style/color";
import { LoginContext } from "../../App";
import { auth } from "../../Config/Firebase";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

function LoginForm({ navigation }) {
  const [email, setEmail] = useState("");
  const [visible, setVisible] = useState(false);
  const [login, setLogin] = useContext(LoginContext);
  const sendResetEmail = (email) => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset email sent");
        // ..
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  };
  const handleSubmit = (email, password) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {})
      .catch((error) => {
        alert(error.code);
      });
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <View style={styles.loginTextTopContainer}>
        <Text style={styles.loginText}>Login</Text>
      </View>
      <View style={styles.imgAndInputContainer}>
        <Image
          source={require("../../assets/icon.png")}
          style={styles.imageLogo}
        />
        <View style={{ width: "100%" }}>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => handleSubmit(values.email, values.password)}
            validationSchema={validationSchema}
          >
            {({
              handleChange,
              handleSubmit,
              errors,
              setFieldTouched,
              touched,
            }) => (
              <>
                <View style={styles.loginContainer}>
                  <View style={styles.loginInputContainer}>
                    <Ionicons
                      style={styles.icon}
                      name="person-outline"
                      size={22}
                      color="black"
                    />
                    <TextInput
                      onChangeText={handleChange("email")}
                      style={styles.loginInput}
                      placeholder={"Email"}
                      clearButtonMode="always"
                      keyboardType={"email-address"}
                      onBlur={() => setFieldTouched("email")}
                    />
                  </View>
                  <ErrorMessage error={errors.email} visible={touched.email} />
                  <View style={styles.loginInputContainer}>
                    <MaterialIcons
                      style={styles.icon}
                      name="lock"
                      size={22}
                      color="black"
                    />

                    <TextInput
                      onChangeText={handleChange("password")}
                      style={styles.loginInput}
                      placeholder={"Password"}
                      clearButtonMode="always"
                      secureTextEntry
                      onBlur={() => setFieldTouched("password")}
                    />
                  </View>
                  <ErrorMessage
                    error={errors.password}
                    visible={touched.password}
                  />
                </View>
                <TouchableOpacity style={styles.submitButton} activeOpacity={1}>
                  <Text
                    onPress={() => {
                      handleSubmit();
                      Keyboard.dismiss();
                    }}
                    style={styles.submitButtonText}
                  >
                    LOGIN
                  </Text>
                </TouchableOpacity>
                <Text
                  onPress={() => setVisible(!visible)}
                  style={{
                    textDecorationLine: "underline",
                    alignSelf: "center",
                    paddingTop: 5,
                    color: color.secondry,
                  }}
                >
                  Forget Password
                </Text>
              </>
            )}
          </Formik>
        </View>
      </View>
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.googleLogin}
          activeOpacity={0.6}
          onPress={() => setLogin(true)}
        >
          <Image
            style={styles.googleLogo}
            source={require("../../assets/googleLogo.png")}
          />
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View> */}
      <TouchableOpacity style={[styles.loginTextBottomContainer]}>
        <Text
          style={[styles.signupText]}
          onPress={() => navigation.navigate("Register")}
        >
          Sign Up
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
        }}
      >
        <Pressable
          style={styl.centeredView2}
          onPress={() => Keyboard.dismiss()}
        >
          <View style={styl.modalView}>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                height: 50,
                marginLeft: 15,
                justifyContent: "center",
                borderColor: color.primary,
              }}
            >
              <TextInput
                style={styl.textStyle}
                onChangeText={(text) => setEmail(text)}
                placeholder={"Email"}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: 15,
              }}
            >
              <TouchableHighlight
                style={{ ...styl.openButton, backgroundColor: color.primary }}
                onPress={() => {
                  setVisible(!visible);
                }}
              >
                <Text style={styl.modalText}>Close</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styl.openButton, backgroundColor: color.primary }}
                onPress={() => {
                  sendResetEmail(email);
                }}
              >
                <Text style={styl.modalText}>Send</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Pressable>
      </Modal>
      <StatusBar style={"auto"} hidden />
    </Pressable>
  );
}

const styl = StyleSheet.create({
  centeredView2: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  modalView: {
    flex: 1,
    margin: 40,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: "black",
  },
  textStyle1: {
    color: "black",
    marginLeft: 15,
  },
  modalText: {
    color: "white",
    marginLeft: 15,
    marginRight: 15,
  },
});

export default LoginForm;
