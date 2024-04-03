import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getEmp } from "../store/http";
import { getProjects } from "../store/http";
import SubmitButton from "./ui/SubmitButton";
import BackArrowHeader from "../components/BackArrowHeader";
const ITEMS_PER_PAGE = 10;

const ProjectDetails = ({ item, handleSportSelection, isSelected }) => {
  const backgroundColor = isSelected ? "#E9EEFF" : "#f5f5f5";

  return (
    <Pressable
      onPress={() => handleSportSelection(item.project_name, item.emp_id)}
      style={[styles.itemContainer2]}
    >
      <View
        style={[
          {
            flexDirection: "row",
            flex: 1,
            alignItems: "center",

            borderColor: isSelected ? "#E9EEFF" : "#E9EEFF",
            backgroundColor,
          },
        ]}
      >
        <View
          style={{
            flex: 1,
            marginStart: 8,
            marginVertical: 14,
          }}
        >
          <Text style={styles.text2}>{item.project_name}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const BottomSheetProjectList = ({ handleSportSelection, onBack }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemIDs, setSelectedItemIDs] = useState([]);

  const [task, setTask] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [storedProfile, setStoreProfile] = useState("");

  const [sportsData, setSportsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

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
    console.log("COunter",page)
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      setLoading(true);
      const loginRespone = await AsyncStorage.getItem("user");
      const response = JSON.parse(loginRespone);
      console.log("Page", page);
      const data = await getProjects(
        response.userId,
        response.token,
        response.emp_id,
        ITEMS_PER_PAGE,
        page
      );
      console.log("DAAAAAAAAAAta", data.length);

      if (data && data.length > 0 && !refreshing) {
        console.log("Helloooooooooo");
        setSportsData((prevData) => [...prevData, ...data]);

        // Update the page only if the data length is equal to the limit
        setPage((prevPage) =>
          data.length === ITEMS_PER_PAGE ? prevPage + 1 : null
        );
      } else {
        // console.warn("No more data available");
        setPage(null);
      }
    } catch (error) {
      console.error("Error fetching sports data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const fetchDataRefresh = async () => {
    try {
      setLoading(true);
      const loginRespone = await AsyncStorage.getItem("user");
      const response = JSON.parse(loginRespone);
      const data = await getProjects(
        response.userId,
        response.token,
        response.emp_id,
        ITEMS_PER_PAGE,
        1
      );
      console.log(data);
      if (data && data.length > 0) {
        console.log("Refreshiiiiiiing");
        setSportsData([...data]); // Replace existing data with the refreshed data

        // Update the page only if the data length is equal to the limit
        setPage((prevPage) =>
          data.length === ITEMS_PER_PAGE ? prevPage + 1 : null
        );
      } else {
        console.warn("No more data available");
        setPage(null);
      }
    } catch (error) {
      console.error("Error fetching sports data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleEndReached = () => {
    if (!loading && page !== null) {
      fetchData();
    }
  };

  const onRefresh = () => {
    // Set refreshing to true and fetch new data when the user pulls to refresh
    // console.log(refreshing);
    setRefreshing(true);
    // console.log(refreshing);
    console.log(page);
    setPage(1);
    console.log(page);
    setSportsData([]); // Clear existing data
    fetchDataRefresh();
  };
  const duplicateLastItemIfNeeded = () => {
    const itemCount = sportsData.length;
    if (itemCount % 2 === 1) {
      // Use a placeholder for the duplicated item
      const placeholderItem = { id: "placeholder", name: "", image: "" };
      return [...sportsData, placeholderItem];
    }
    return sportsData;
  };

  const toggleSelection = (projectName, projectid) => {
    // Check if the item is already selected
    if (selectedItems === projectid) {
      // If the clicked project is already selected, deselect it
      setSelectedItems([]);
      setSelectedItemIDs([]);
    } else {
      // Deselect all other items and select the clicked project
      setSelectedItems([projectName]);
      setSelectedItemIDs([projectid]);
    }
  };

  // Generate project data with random project names

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
          flexDirection: "row",
          marginEnd: 20,
        }}
      >
        <Pressable onPress={onBack}>
          <View
            style={{
              backgroundColor: "white",
              alignItems: "flex-start",
              marginLeft: 10,
            }}
          >
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
        <View style={{ flex: 9, alignItems: "center" }}>
          <Text style={styles.modalTitle}>Select Project</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={duplicateLastItemIfNeeded()}
          renderItem={({ item }) => (
            <ProjectDetails
              item={item}
              handleSportSelection={toggleSelection}
              isSelected={selectedItems.includes(item.project_name)}
            />
          )}
          keyExtractor={(item, index) => `${item}-${index}`}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={() =>
            // Render a loader component when loading more data

            !refreshing &&
            loading &&
            page !== null && <ActivityIndicator size="large" color="#0000ff" />
          }
          ListEmptyComponent={() => (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No data found</Text>
            </View>
          )}
        />
      </View>
      <View style={{ alignItems: "center", marginTop: 10, marginBottom: 20 }}>
        <SubmitButton
          onPress={() => handleSportSelection(selectedItems, selectedItemIDs)}
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
    backgroundColor: "#E9EEFF",
    flex: 1,
    elevation: 6,
    marginHorizontal: 20,
    marginVertical: 12,

    borderColor: "#E9EEFF",
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
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    marginBottom: 16,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
    color: "#666666",
  },
});

export default BottomSheetProjectList;
