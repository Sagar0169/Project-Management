import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import TasksData from "./TasksData";

const ProjectDetails = ({ item,navigation }) => {
  // const navigation = useNavigation();
  function detailsHandler() {
    navigation.navigate("AssignedTaskDetails", { ID: item });
  }
  if (item.id !== "placeholder") {
    return (
      <Pressable style={styles.itemContainer2}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            borderColor: "#000000",
          }}
        >
          <View
            style={{
              flex: 1,
              marginStart: 8,
              marginVertical: 14,
            }}
          >
            <Text style={styles.text2}>{item.Assigned}</Text>
          </View>
          <Pressable onPress={detailsHandler} style={styles.viewBox}>
            <Text style={styles.viewText}>View</Text>
          </Pressable>
        </View>
      </Pressable>
    );
  } else {
    return <View style={styles.itemContainer}></View>;
  }
};

const AssignTaskFlatList = ({navigation}) => {
  const generateRandomProjectName = () => {
    const adjectives = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"];
    const nouns = ["Project", "Task", "Assignment", "Job", "Mission"];
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`;
  };

  // Generate project data with random project names
  const projectData = Array.from({ length: 20 }, (_, index) => ({
    projectName: generateRandomProjectName(),
    progress: Math.random(),
    riskPriority: index % 3 === 0 ? "low" : index % 3 === 1 ? "medium" : "high",
  }));
  return (
    <FlatList
      data={TasksData}
      renderItem={({ item }) => <ProjectDetails item={item} navigation={navigation} />}
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
    flex: 1,
    elevation: 6,
    marginHorizontal: 20,
    marginVertical: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#e5af54",
  },
  viewBox: {
    backgroundColor: "#f5f5f5",
    elevation: 2,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginHorizontal: 8,
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
    width: 200,
    color: "black",
    fontSize: 12,
    marginHorizontal: 6,
    marginEnd: 8,
  },
  text2: {
    color: "black",
    fontSize: 16,
    marginHorizontal: 4,
    fontWeight: "600",
  },
  viewText: {
    color: "#E6CCA1",
    fontSize: 16,
    marginHorizontal: 4,
    fontWeight: "600",
  },
});

export default AssignTaskFlatList;
