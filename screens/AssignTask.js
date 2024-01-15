import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View,TouchableOpacity } from "react-native";
import AssignTaskFlatList from "../components/AssignTaskFlatList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BackArrowHeaderWhite from "../components/BackArrowHeaderWhite";

export default function AssignTask({navigation}) {
  // const navigation = useNavigation();
  const handleAddTaskPress = () => {
    // Handle the action when the "+" button is pressed
    // For example, you can navigate to a screen to add a new task
    navigation.navigate("AssignNewTask");
    console.log("pressed")
  };
  return (
    <View style={styles.rootContainer}>
      <BackArrowHeaderWhite
        searchTitle="Assigned Tasks"
        filter={true}
        title="Assigned Tasks"
        color="#e5af54"
        backButton={() => navigation.goBack()}
      />
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <AssignTaskFlatList navigation={navigation} />
      </View>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: "#e5af54" }]}
        onPress={handleAddTaskPress}
      >
        <MaterialCommunityIcons name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#e5af54",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,  // Make the button circular by setting borderRadius to half of width and height
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
