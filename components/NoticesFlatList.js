import React, { useContext } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import moviesData from "./moviesData";
import { colors } from "./config/theme";
import { ThemeContext } from "../context/ThemeContext";

const NoticesItem = ({ navigation, item }) => {
  const {theme}=useContext(ThemeContext)
  let activeColors=colors[theme.mode]
  function detailsHandler() {
    navigation.navigate("IssuesDetails", { ID: item });
  }
  if (item.id !== "placeholder") {
    return (
      <Pressable onPress={detailsHandler} style={[styles.itemContainer2,{backgroundColor:activeColors.blackBgg}]}>
        <Text numberOfLines={3} ellipsizeMode="tail" style={[styles.text,{color:activeColors.color}]}>
          {item.title} 
        </Text>
        <Pressable onPress={detailsHandler} style={styles.viewBox}>
          <Text style={[styles.viewText,{color:activeColors.color}]}>View</Text>
        </Pressable>
      </Pressable>
    );
  } else {
    return <View style={styles.itemContainer}></View>;
  }
};

const NoticesFlatList = ({ navigation, state, data, image }) => {
  return (                 
    <FlatList
      data={moviesData}
      renderItem={({ item }) => (
        <NoticesItem navigation={navigation} item={item} />
      )}
      keyExtractor={(item, index) => `${item.id}-${index}`}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 15,
    overflow: "hidden",
  },
  itemContainer2: {
    backgroundColor: "#f5f5f5",
    flexDirection: "row", // Updated
    justifyContent: "space-between", // Updated
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 12,
    paddingVertical: 2,
    borderRadius: 8,
  },

  gradient: {
    flex: 1,
    borderRadius: 15,
    alignItems: "center",
    paddingVertical: 20,
    justifyContent: "center",
  },
  image: {
    width: 55,
    height: 55,
    resizeMode: "contain",
    marginBottom: 8,
  },
  image2: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 8,
  },
  text: {
    width: "60%",
    color: "#5164BFA6",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
    paddingVertical: 20,
  },
  text2: {
    color: "black",
    fontWeight: "bold",
  },
  viewBox: {
    backgroundColor: "#f5f5f5",
    elevation: 2,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginHorizontal: 8,
  },
  viewText: {
    color: "#B8B7EB",
    fontSize: 16,
    marginHorizontal: 4,
    fontWeight: "600",
  },
});

export default NoticesFlatList;
