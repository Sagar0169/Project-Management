import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Pressable } from "react-native";
import AssignTaskFlatList from "../components/AssignTaskFlatList";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BackArrowHeaderWhite from "../components/BackArrowHeaderWhite";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AssignTask({ navigation }) {
  // const navigation = useNavigation();
  const [storedProfile, setStoreProfile] = useState("");
  const [storedUserId, setstoredUserId] = useState("");
  const [storedToken, setstoredToken] = useState("");


  const handleAddTaskPress = () => {
    navigation.navigate("AssignNewTask",{ userId: storedUserId});
    console.log(storedUserId);
  };
  const handleEditPress = () => {
    navigation.navigate("AssignNewTask",{ userId: storedUserId});
    console.log(storedUserId);
  };

  const fetchStoredProfile = useCallback(async () => {
    try {
      const loginRespone = await AsyncStorage.getItem("user");
      
      const response = JSON.parse(loginRespone);
      
      if (response.userId !== null) {
        setstoredUserId(response.userId);
        
      }
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

  return (
    <View style={styles.rootContainer}>
      <BackArrowHeaderWhite
        searchTitle="Assigned Tasks"
        filter={true}
        title="Assigned Tasks"
        color="#ffffff"
        backButton={() => navigation.goBack()}
      />
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
        <AssignTaskFlatList navigation={navigation} storedProfile={storedProfile}/>
      </View>
      {storedProfile !== "Developer" && (
        <>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: "#5063Bf" }]}
          onPress={handleAddTaskPress}
        > 

         
          <MaterialCommunityIcons name="plus" size={30} color="#fff" />
        </TouchableOpacity>
       
        
        </>
        
        
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#ffffff",
  },
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
