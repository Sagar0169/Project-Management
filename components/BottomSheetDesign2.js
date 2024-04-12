import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image
} from "react-native";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getEmp } from "../store/http";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "./config/theme";
import { useContext } from "react";
import SubmitButton from "./ui/SubmitButton";



const ProjectDetails = ({ item, handleSportSelection, isSelected }) => {
  const { theme } = useContext(ThemeContext)
  let activeColors = colors[theme.mode]
  const backgroundColor = isSelected ? activeColors.selected : activeColors.itemBg;

  return (
    <Pressable
      onPress={() => handleSportSelection(item.name, item.emp_id)}
      style={[styles.itemContainer2,]}
    >
      <View
        style={[{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",

          borderColor: isSelected ? "#E9EEFF" : "#E9EEFF",
          backgroundColor
        }]}
      >
        <View
          style={{
            flex: 1,
            marginStart: 8,
            marginVertical: 14,
          }}
        >
          <Text style={[styles.text2, { color: activeColors.color }]}>{item.name}</Text>
        </View>
      </View>
    </Pressable>

  );

};


const BottomSheetDesign2 = ({ handleSportSelection,onBack }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemIDs, setSelectedItemIDs] = useState([]);



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

          expenses = tasks;
        } else {
          const tasks = await getEmp(response.userId, response.token);

          expenses = tasks;
        }

        if (isMounted) {
          setTask(expenses);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        if (isMounted) {
          []
          setIsFetching(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [storedProfile]);

  const toggleSelection = (projectName, projectid) => {
    // Check if the item is already selected
    if (selectedItems.some((item) => item.name === projectName)) {
      // Item is selected, remove it from the selection
      setSelectedItems((prevSelected) =>
        prevSelected.filter((item) => item.name !== projectName)
      );

      // Remove corresponding projectid from selectedItemIDs
      setSelectedItemIDs((prevSelectedIDs) =>
        prevSelectedIDs.filter((id) => id !== projectid)
      );
    } else {
      // Item is not selected, add it to the selection
      setSelectedItems((prevSelected) => [...prevSelected, projectName]);

      // Add corresponding projectid to selectedItemIDs
      setSelectedItemIDs((prevSelectedIDs) => [...prevSelectedIDs, projectid]);
    }
  };

  // Generate project data with random project names


  const { theme } = useContext(ThemeContext)
  let activeColors = colors[theme.mode]

  return (
    <View style={{ flex: 1, backgroundColor: activeColors.background }}>
      <Pressable onPress={onBack}>


        <View style={{ backgroundColor: activeColors.background, alignItems: 'flex-start', marginLeft: 10 }}>
          <Image
            style={{
              width: 40,
              height: 40,
              resizeMode: "cover",

            }}
            source={require("../assets/Images/leftArrow.png")}
          />

        </View>
      </Pressable>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Text style={[styles.modalTitle, { color: activeColors.color }]}>Select Members</Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={task}
          renderItem={({ item }) =>
            <ProjectDetails
              item={item}
              handleSportSelection={toggleSelection}
              isSelected={selectedItemIDs.includes(item.emp_id)}
            />}
          keyExtractor={(item, index) => `${item}-${item.emp_id}`}

        />
      </View>
      <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
        <SubmitButton onPress={() => handleSportSelection(selectedItems, selectedItemIDs)} color='black'>Add</SubmitButton>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  itemContainer2: {
    backgroundColor: "#E9EEFF",
    flex: 1,
    elevation: 6,
    marginHorizontal: 20,
    marginVertical: 12,


    borderColor: '#E9EEFF'
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
  modalTitle: {
    fontSize: 18,

    alignItems: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default BottomSheetDesign2;