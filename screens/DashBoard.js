import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DashboardData from "../components/DashboardData";
import RecentProjectFlatList from "../components/RecentProjectFlatList";
import TasksData from "../components/TasksData";
import { Colors } from "../Utilities/Colors";
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

export default function DashBoard({ navigation }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const animateList = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false, // Set to true if possible for better performance
    }).start();
  };

  useEffect(() => {
    animateList();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0], // Adjust the values based on your desired animation
  });
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [taskNumber, setTaskNumber] = useState(TasksData.length);
  console.log(taskNumber);
  useEffect(() => {
    setTaskNumber(TasksData.length);
  }, [TasksData]);

  const selectPriority = (priority) => {
    setSelectedPriority(priority);
  };

  const CurvedGridItem = ({ navigation, item, taskNumber }) => {
    if (item.title === "Assigned Tasks" || item.title === "Project List") {
      item.count = taskNumber;
    }
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
    <ScrollView style={{ paddingTop: h(4), flex: 1 }}>
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
      <View style={{ flex: 1, marginHorizontal: 8, marginVertical: 8 }}>
        <Text
          style={{
            fontSize: 18,
            color: Colors.black,
            fontWeight: "600",
            margin: 8,
          }}
        >
          Project Summary
        </Text>
        <View>
          <FlatList
            data={DashboardData}
            scrollEnabled={false}
            numColumns={2}
            renderItem={({ item }) => (
              <CurvedGridItem
                navigation={navigation}
                item={item}
                taskNumber={taskNumber}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={{ marginBottom: w(8) }}>
          <Text
            style={{
              fontSize: 18,
              color: Colors.black,
              fontWeight: "600",
              margin: 8,
            }}
          >
            Recent Ongoing Projects
          </Text>
          <FlatList
            data={TasksData.slice(0, 5)}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <RecentProjectFlatList
                item={item}
                onSelect={selectPriority}
                isSelected={selectedPriority && selectedPriority.id === item.id}
              />
            )}
            keyExtractor={(item) => item.id}
            // Set the following props to allow vertical scrolling
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 15,
    overflow: "hidden",
    borderColor: Colors.black,
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
    backgroundColor: Colors.black,
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
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 35,
    alignSelf: "flex-start", // Align the text to the left
  },
  text2: {
    color: Colors.black,
    fontWeight: "400",
    fontSize: 18,
    marginHorizontal: 6,
    alignSelf: "flex-start", // Align the text to the left
  },
});
