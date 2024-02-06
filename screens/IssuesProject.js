import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import BackArrowHeader from "../components/BackArrowHeader";
import { Colors } from "../Utilities/Colors";
import NoticesFlatList from "../components/NoticesFlatList";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const IssuesProject = ({ navigation }) => {
  const { width, height } = Dimensions.get("window");

  // Calculate a scaling factor based on the screen width
  const scaleFactor = width / 375; // Adjust 375 based on your design reference width

  // Define the base font size for your design
  const baseFontSize = 16;

  // Calculate the dynamic font size
  const dynamicFontSize = baseFontSize * scaleFactor;
  // const fontSize=FontSize font={16}
  function w(value) {
    const width = Dimensions.get("window").width / 100; // now width is 1% of screen width
    return width * value;
  }
  function h(value) {
    const height = Dimensions.get("window").height / 100; // now height is 1% of screen height
    return height * value;
  }

  const handleAddTaskPress = () => {
    navigation.navigate("CreateNewIssues");
    
  };
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <NoticesFlatList navigation={navigation} />
      <Pressable
        style={[styles.addButton, { backgroundColor: "#5063BF" }]}
        onPress={handleAddTaskPress}
      >
        <MaterialCommunityIcons name="plus" size={30} color="#fff" />
      </Pressable>
    </View>
  );
};

export default IssuesProject;

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
