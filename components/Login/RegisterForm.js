import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  Dimensions,
  Keyboard,
  Pressable,
  Modal,
  Button,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  ImagePickerIOS,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Yup from "yup";
import { Formik } from "formik";
import ErrorMessage from "./ErrorMessage";
import styles from "../Style/stylesRegister";
// import { auth, phoneAuthProvider, phoneProvider } from "../../firebase";
import Constants from "expo-constants";
import firebase from "firebase";
import color from "../Style/color";
import { auth, db, storage } from "../../Config/Firebase";
// import { firebaseConfig } from "../../APIKeys";
// import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

const validationSchema = Yup.object().shape({
  userName: Yup.string().required().label("User Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
  phoneNo: Yup.string().required().label("Phone No"),
});

const hold =
  "https://firebasestorage.googleapis.com/v0/b/todo-64931.appspot.com/o/icon-animation-1.gif?alt=media&token=0a4b467c-53a8-47d1-b4ad-5ece7abed641";

function RegisterForm({ navigation }) {
  const [uri, setUri] = useState(false);

  const uploadImage = async (id) => {
    if (uri) {
      const response = await fetch(uri);
      const blob = await response.blob();
      let ref = storage.ref().child("ProfileImages/" + id + id);
      await ref.put(blob);
      return ref.getDownloadURL();
    }
    return "../../assets/holder.png";
  };

  const handleSubmit = (email, userName, password, phoneNo) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        id = userCredential.user.uid;
        uploadImage(id).then((url) => {
          db.collection("users")
            .doc(id)
            .set({
              name: userName,
              photo: url,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              id,
              phoneNo,
              email,
            })
            .then(() => {
              console.log("Document successfully written!");
              auth.signOut();
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
          navigation.navigate("Login");
        });
      })
      .catch((error) => {
        alert(error.code);
      });
  };
  return (
    <SafeAreaView onPress={() => Keyboard.dismiss()} style={styles.container}>
      <>
        <View style={styles.loginTextTopContainer}>
          <Text style={styles.loginText}>Sign Up</Text>
        </View>
        <View>
          <Formik
            initialValues={{
              userName: "",
              email: "",
              password: "",
              phoneNo: "",
            }}
            onSubmit={(values) => {
              handleSubmit(
                values.email,
                values.userName,
                values.password,
                values.phoneNo
              );
            }}
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
                  <View style={styles.profileContainer}>
                    <TouchableOpacity
                      style={styles.profilePic}
                      activeOpacity={0.6}
                      onPress={async () => {
                        const { cancelled, uri } =
                          await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            quality: 0.1,
                          });
                        if (!cancelled) {
                          setUri(uri);
                        }
                      }}
                    >
                      {uri ? (
                        <Image
                          resizeMethod={"resize"}
                          style={{
                            overflow: "hidden",
                            borderRadius: 20,
                            marginLeft: 5,
                          }}
                          source={{
                            width: 120,
                            height: 120,
                            uri: uri,
                          }}
                        />
                      ) : (
                        <Image
                          resizeMethod={"resize"}
                          style={{
                            overflow: "hidden",
                            width: 120,
                            height: 120,
                            borderRadius: 20,
                          }}
                          source={require("../../assets/imageLoad.gif")}
                        />
                      )}
                    </TouchableOpacity>
                    <View style={{ flex: 0.9 }}>
                      <View style={styles.productContainer}>
                        <Ionicons
                          style={styles.icon}
                          name="person-outline"
                          size={22}
                          color="black"
                        />
                        <TextInput
                          onChangeText={handleChange("userName")}
                          style={styles.loginInput}
                          placeholder={"User Name"}
                          clearButtonMode="always"
                          keyboardType={"default"}
                          onBlur={() => setFieldTouched("userName")}
                        />
                      </View>
                      <ErrorMessage
                        error={errors.userName}
                        visible={touched.userName}
                        size={12}
                      />
                    </View>
                  </View>
                  <View style={styles.loginInputContainer}>
                    <Ionicons
                      style={styles.icon}
                      name="call-outline"
                      size={22}
                      color="black"
                    />
                    <TextInput
                      onChangeText={handleChange("phoneNo")}
                      style={styles.loginInput}
                      placeholder={"Phone Number"}
                      autoCompleteType="tel"
                      textContentType="telephoneNumber"
                      clearButtonMode="always"
                      keyboardType={"phone-pad"}
                      onBlur={() => setFieldTouched("phoneNo")}
                    />
                  </View>
                  <ErrorMessage
                    error={errors.phoneNo}
                    visible={touched.phoneNo}
                  />
                  <View style={styles.loginInputContainer}>
                    <Ionicons
                      style={styles.icon}
                      name="card-outline"
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
                    }}
                    style={styles.submitButtonText}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
        <View style={styles.loginTextBottomContainer}>
          {/* <View style={styles.loginTextBottomContainerBigCircle} />
          <View style={styles.loginTextBottomContainerSmallCircle} /> */}
          <Text
            style={[styles.signupText]}
            onPress={() => {
              navigation.navigate("Login");
              console.log(Dimensions.get("window").height);
              console.log(Dimensions.get("screen").height);
            }}
          >
            Login
          </Text>
        </View>
      </>
      <StatusBar style={"auto"} hidden />
    </SafeAreaView>
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

export default RegisterForm;
