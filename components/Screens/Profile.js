import React, { useContext, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserData } from "../../App";
import { auth, db } from "../../Config/Firebase";
import styles from "../Style/styles";
import { TextInput } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const [userData] = useContext(UserData);
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNo);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.container, { justifyContent: "center" }]}>
      <View style={[styles.loginContainer]}>
        <View style={styles.profileContainer}>
          <TouchableWithoutFeedback
            style={styles.profilePic}
            activeOpacity={0.6}
          >
            {userData.photo === "../../assets/holder.png" ? (
              <Image
                style={{
                  overflow: "hidden",
                  borderRadius: 20,
                  width: 120,
                  height: 120,
                }}
                resizeMethod={"resize"}
                source={require("../../assets/holder.png")}
              />
            ) : (
              <Image
                style={{ overflow: "hidden" }}
                resizeMethod={"resize"}
                source={{
                  width: 120,
                  height: 120,
                  uri: userData.photo,
                }}
              />
            )}
          </TouchableWithoutFeedback>
          <View style={{ flex: 0.9 }}>
            <View style={styles.productContainer}>
              <Ionicons
                style={styles.icon}
                name="person-outline"
                size={22}
                color="black"
              />
              <Text style={styles.loginInput}>{userData.name}</Text>
            </View>
          </View>
        </View>
        <View style={styles.loginInputContainer}>
          <Ionicons
            style={styles.icon}
            name="card-outline"
            size={22}
            color="black"
          />
          <Text style={styles.loginInput}>{userData.email}</Text>
        </View>
        <View
          style={[
            styles.loginInputContainer,
            { marginTop: 20, marginBottom: 15 },
          ]}
        >
          <Ionicons
            style={styles.icon}
            name="call-outline"
            size={22}
            color="black"
          />

          <TextInput
            style={[styles.loginInput, { paddingBottom: 5, paddingLeft: 5 }]}
            value={phoneNumber}
            keyboardType="phone-pad"
            onChangeText={(t) => setPhoneNumber(t)}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.submitButton} activeOpacity={1}>
        <Text
          onPress={() => {
            if (phoneNumber !== "" && phoneNumber !== userData.phoneNo) {
              db.collection("users")
                .doc(auth.currentUser.uid)
                .update({
                  phoneNo: phoneNumber,
                })
                .catch((error) => {
                  console.error("Error updating document: ", error);
                });
              navigation.goBack();
            }
          }}
          style={styles.submitButtonText}
        >
          Submit
        </Text>
      </TouchableOpacity>
      <StatusBar hidden style={"inverted"} />
    </SafeAreaView>
  );
};

export default Profile;
