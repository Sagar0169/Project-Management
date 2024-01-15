import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import DashboardData from "../components/DashboardData";
import PriorityItem from "../components/PriorityItem";
import AssignTask from "./AssignTask";
import AssignTaskFlatList from "../components/AssignTaskFlatList";
import ProjectListFlatList from "../components/ProjectListFlatList";
import TasksData from "../components/TasksData";

export default function DashBoard({ navigation }) {
  const [selectedPriority, setSelectedPriority] = useState(null);

  const selectPriority = (priority) => {
    setSelectedPriority(priority);
  };

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
          style={styles.gradient}
        >
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
        <Text
          style={{
            fontSize: 18,
            color: "black",
            fontWeight: "600",
            margin: 8,
          }}
        >
          Recent Ongoing Projects
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 8 }}
        >
          <FlatList
            data={DashboardData}
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            renderItem={({ item }) => (
              <PriorityItem
                item={item}
                onSelect={selectPriority}
                isSelected={selectedPriority && selectedPriority.id === item.id}
              />
            )}
            keyExtractor={(item) => item.id}
          /> 
        </ScrollView>

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
