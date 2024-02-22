import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useSearch } from "../store/search-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setStatus } from "../store/http";

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

export default function UpdateStatus({ route,navigation }) {
    const id = route.params.ID;
    console.log("ID", id);
  const [enteredTaskName, setEnteredTaskName] = useState("");
  const { searchQuery, setSearchQuery } = useSearch();
  const [task, setTask] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [storedProfile, setStoreProfile] = useState("");

  const fetchStoredProfile = useCallback(async () => {
    try {
      setStoreProfile(await AsyncStorage.getItem("profile"));

      if (storedProfile !== null) {
        console.log("Stored Profile:", storedProfile);
      } else {
        console.log("Profile not found in AsyncStorage");
      }
    } catch (error) {
      console.error("Error fetching profile from AsyncStorage:", error);
    }
  }, [storedProfile]);

  useEffect(() => {
    fetchStoredProfile();
  }, [fetchStoredProfile]);

  const fetchData = async () => {
    setIsFetching(true);

    try {
      let expenses;
      const loginRespone = await AsyncStorage.getItem("user");
      const response = JSON.parse(loginRespone);
      console.log("userIDDDDD",response.userId)
      if (storedProfile === "super admin") {
        const tasks = await setStatus(
          response.userId,
          response.token,
          id,
          enteredTaskName
        );
        if (searchQuery) {
          expenses = tasks.filter((item) =>
            item.assign_to.toLowerCase().includes(searchQuery.toLowerCase())
          );
        } else {
          expenses = tasks;
        }
        expenses = tasks;
      } else {
        const tasks = await setStatus(
          response.userId,
          response.token,
          id,
          enteredTaskName
        );
       if(tasks == 1){
        navigation.navigate('Assigntask')
       }
      }

      setTask(expenses);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsFetching(false);
    }
  };

  function handlePressStatus(status) {
    setEnteredTaskName(status);
    console.log(status);
  }
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={styles.headingText}>Status</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Pressable
            onPress={() => handlePressStatus("Pending")}
            style={{
              backgroundColor: "#9A9A9A",
              padding: 8,
              borderRadius: 5,
              marginHorizontal: 4,
            }}
          >
            <Text style={styles.viewText}>Pending</Text>
          </Pressable>
          <Pressable
            onPress={() => handlePressStatus("In Progress")}
            style={{
              backgroundColor: "#9A9A9A",
              padding: 8,
              borderRadius: 5,
              marginHorizontal: 4,
            }}
          >
            <Text style={styles.viewText}>In Progress</Text>
          </Pressable>
          <Pressable
            onPress={() => handlePressStatus("Completed")}
            style={{
              backgroundColor: "#9A9A9A",
              padding: 8,
              borderRadius: 5,
              marginHorizontal: 4,
            }}
          >
            <Text style={styles.viewText}>Completed</Text>
          </Pressable>
          <Pressable
            onPress={fetchData}
            style={{
              marginHorizontal: w(2),
              borderRadius: w(2),
              borderWidth: 1,
              paddingHorizontal: w(2),
              paddingVertical: w(1),
            }}
          >
            <Text>Save</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
