import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
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
import { useCallback,useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getEmp } from "../store/http";
import { getProjects } from "../store/http";
import { useSearch } from "../store/search-redux";
import SubmitButton from "./ui/SubmitButton";
import { assignedTasksFetch, fetchTasks, getTaks } from "../store/http";
import { colors
} from "./config/theme";
import { ThemeContext } from "../context/ThemeContext";
import CustomModal from "./CustomModal";
const ITEMS_PER_PAGE = 10;

const ProjectDetails = ({ item, handleSportSelection, isSelected }) => {
 
  const {theme}=useContext(ThemeContext)
  let activeColors=colors[theme.mode]
  const backgroundColor = isSelected ? activeColors.selected : activeColors.itemBg;

  return (
    <Pressable
      onPress={() => handleSportSelection([item.project_name, item.id])}
      style={[styles.itemContainer2]}
    >
      <View
        style={[
          {
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            borderColor: isSelected ? "#E9EEFF" : activeColors.itemBg,
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
          <Text style={[styles.text2,{color:activeColors.color}]}>{item.project_name}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const BottomSheetProjectList = ({ handleSportSelection, onBack }) => {
  const {theme}=useContext(ThemeContext)
  let activeColors=colors[theme.mode]
  const { searchQuery, setSearchQuery } = useSearch();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemIDs, setSelectedItemIDs] = useState([]);

  const [sportsData, setSportsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

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
    fetchData();
  }, []);

  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const loginRespone = await AsyncStorage.getItem("user");
      const response = JSON.parse(loginRespone);
      console.log("Pagesss", page);

      const data = await getProjects(
        response.userId,
        response.token,
        response.emp_id,
        ITEMS_PER_PAGE,
        page
      );
      // console.log("DAAAAAAAAAAta", data.length);

      if (data && data.length > 0 && !refreshing) {
        // console.log("Helloooooooooo");
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
      const data = await getTaks(
        response.userId,
        response.token,
        response.emp_id,
        ITEMS_PER_PAGE,
        1
      );
      console.log(data);
      if (data && data.length > 0) {
        // console.log("Refreshiiiiiiing");
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


  const toggleSelection = (projectName, projectid) => {
    // Check if the item is already selected
    if (selectedItems === projectName) {
      // If the clicked project is already selected, deselect it
      setSelectedItems(null);
      setSelectedItemIDs(null);
    } else {
      // Select the clicked project
      setSelectedItems(projectName);
      setSelectedItemIDs(projectid);
    }
  };

  // Generate project data with random project names

  return (
    <View style={{ flex: 1 ,backgroundColor:activeColors.background}}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 10,
          flexDirection: "row",
          marginEnd: 20,
          backgroundColor:activeColors.background
        }}
      >
        <Pressable onPress={onBack}>
          <View
            style={{
              backgroundColor: activeColors.background,
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
          <Text style={[styles.modalTitle,{color:activeColors.color}]}>Select Project</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={sportsData}
          renderItem={({ item }) => (
            <ProjectDetails
              item={item}
              handleSportSelection={toggleSelection}
              isSelected={selectedItems.includes(item.id)}
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
          onPress={() => {
            if(selectedItems.length>0)
            {
              handleSportSelection(selectedItems)
            }
            else{
              setModalVisible(true)
            }
          }}
          color="black"
        >
          Add
        </SubmitButton>
      </View>
      {isModalVisible&& <CustomModal
        visible={isModalVisible}
        message="Please Select a Project"
        onHide={hideModal}
      />}
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
