import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import DashboardData from "../components/DashboardData";

export default function DashBoard({ navigation }) {
  const CurvedGridItem = ({ navigation, item }) => {
    function navigationHandler() {
      if (item.title === "Add New Projects") {
        navigation.navigate("AddNewProjects");
      }
      if (item.title === "Project List") {
        navigation.navigate("Projectlist");
      }
      if (item.title === "Assigned Projects") {
        navigation.navigate("AssignedProject");
      }
      if (item.title === "Assigned Tasks") {
        navigation.navigate("Assigntask");
      }
    }
    return (
      <Pressable onPress={navigationHandler} style={styles.itemContainer}>
        <LinearGradient
          colors={[item.color, item.color]} // Change colors as per your preference
          style={styles.gradient}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{item.count}</Text>
            <Ionicons size={24} name="ellipsis-horizontal-circle-outline" />
          </View>
          <Text style={styles.text2}>{item.title}</Text>
          <Image
            source={item.image}
            style={{ width: "100%", height: 100, resizeMode: "cover" }}
          />
        </LinearGradient>
      </Pressable>
    );
  };

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 14,
          marginVertical: 8,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
          }}
        >
          Dashboard
        </Text>
        <Ionicons size={20} name="notifications-outline" />
      </View>
      <View
        style={{
          marginHorizontal: 8,
          marginVertical: 8,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "black",
            fontWeight: "600",
            margin: 8,
          }}
        >
          Project Summary
        </Text>
        <FlatList
          data={DashboardData}
          numColumns={2}
          renderItem={({ item }) => (
            <CurvedGridItem navigation={navigation} item={item} />
          )}
          scrollEnabled={false}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 15,
    overflow: "hidden",
    borderColor: "black",
    borderWidth: 2, // Set the border width to the desired value
  },
  textContainer: {
    flexDirection: "row", // Arrange items in a column
    justifyContent: "space-between",
    alignItems: "center",
    margin: 6,
  },
  gradient: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: "black",
    width: "100%",
    height: 150,
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
    color: "black",
    fontWeight: "bold",
    fontSize: 35,
    alignSelf: "flex-start", // Align the text to the left
  },
  text2: {
    color: "black",
    fontWeight: "400",
    fontSize: 18,
    marginHorizontal: 6,
    alignSelf: "flex-start", // Align the text to the left
  },
});
