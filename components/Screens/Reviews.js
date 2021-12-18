import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ResturantIdContext } from "../../App";
import { db } from "../../Config/Firebase";
import Review from "./Review";

const Reviews = () => {
  const [id] = useContext(ResturantIdContext);
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const fetchData = () => {
    let array = [];
    db.collection("merchants")
      .doc(id.id)
      .collection("reviews")
      .limit(limit)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          array.push(doc.data());
        });
      })
      .then(() => setData(array))
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, [id, limit]);
  return (
    <FlatList
      style={{ backgroundColor: "white" }}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <Review message={item.message} rating={item.rating} uid={item.uid} />
      )}
      initialNumToRender={10}
      onEndReached={() => setLimit(limit + 10)}
      onEndReachedThreshold={0.01}
    />
  );
};

export default Reviews;

const styles = StyleSheet.create({});
