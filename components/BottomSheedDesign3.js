import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import SubmitButton from "./ui/SubmitButton";
import { useSearch } from "../store/search-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getEmp } from "../store/http";

const ProjectDetails = ({ item, handleSportSelection, isSelected }) => {
  const backgroundColor = isSelected ? "#E9EEFF" : "#f5f5f5";

  return (
    <Pressable
      onPress={() => handleSportSelection(item.name)}
      style={[styles.itemContainer2, { backgroundColor }]}
    >
      <View style={styles.itemContainer2Content}>
        <Text style={styles.text2}>{item.name}</Text>
      </View>
    </Pressable>
  );
};

const BottomSheetDesign3 = ({ handleSportSelection }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const members = [
    'Shreyash Jain (Android)', 'Nimish Sharma(Android)', 'Akshat Bansal (Android)',
    'Sagar (Android)', 'Rohit (Java)', 'Aman pandey(Java)', 'Atul (Java)',
    'Shubhra srivastava (php)', 'Yashika gupta (php)', 'Abhay sahani (Designer)',
    'Jitendar singh (Designer)'
  ];

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

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsFetching(true);

      try {
        
        let expenses;
        const loginRespone = await AsyncStorage.getItem("user");
        const response = JSON.parse(loginRespone);
        if (storedProfile === "super admin") {
          const tasks = await getEmp(response.userId, response.token);
          console.log("Daata", tasks);
          expenses = tasks;
        } else {
          const tasks = await getEmp(response.userId, response.token);
          console.log("Daata", tasks);
          expenses = tasks;
        }

        if (isMounted) {
          setTask(expenses);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        if (isMounted) {[]
          setIsFetching(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [storedProfile]);


  const toggleSelection = (projectName) => {
    // If the same item is selected again, unselect it
    const newSelectedItem = selectedItem === projectName ? null : projectName;
    setSelectedItem(newSelectedItem);
  };

  const projectData = members.map((projectName, index) => ({
    id: index.toString(),
    projectName,
  }));

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Text style={styles.modalTitle}>Select Member</Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={task}
          renderItem={({ item }) => (
            <ProjectDetails
              item={item}
              handleSportSelection={toggleSelection}
              isSelected={selectedItem === item.name}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={{ alignItems: "center", marginTop: 10, marginBottom: 20 }}>
        <SubmitButton
          onPress={() => handleSportSelection(selectedItem)}
          color="black"
        >
          Add
        </SubmitButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer2: {
    flex: 1,
    elevation: 6,
    marginHorizontal: 20,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#E9EEFF",
  },
  itemContainer2Content: {
    flex: 1,
    marginStart: 8,
    marginVertical: 14,
  },
  text2: {
    color: "black",
    fontSize: 16,
    marginHorizontal: 4,
    fontWeight: "600",
  },
  modalTitle: {
    fontSize: 18,
    alignItems: "center",
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default BottomSheetDesign3;
