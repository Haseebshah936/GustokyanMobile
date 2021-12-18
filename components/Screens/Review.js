import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { db } from "../../Config/Firebase";
import color from "../Style/color";

const Review = ({ message, rating, uid }) => {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    db.collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // Convert to City object
          setUrl(doc.data().photo);
          setName(doc.data().name);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        {!url ? (
          <Image
            style={styles.img}
            source={require("../../assets/holder.png")}
          />
        ) : (
          <Image
            style={styles.img}
            source={{ uri: url, width: 100, height: 100 }}
          />
        )}
        <Text style={styles.name}>{name}</Text>
      </View>
      <AirbnbRating
        showRating={false}
        size={14}
        isDisabled
        count={5}
        defaultRating={rating}
        starContainerStyle={styles.rating}
      />

      <ScrollView style={{ height: 120 }}>
        <Text style={styles.message}>{message}</Text>
      </ScrollView>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginVertical: 5,
    alignItems: "flex-start",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    elevation: 10,
    shadowColor: "grey",
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  subContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 15,
  },
  rating: {
    marginBottom: 5,
  },
  message: {
    marginLeft: 4,
    fontSize: 12,
  },
});
