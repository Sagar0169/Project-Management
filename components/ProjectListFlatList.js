import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import TasksData from "./TasksData";
import { useSearch } from "../store/search-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProjects } from "../store/http";

// Declare ITEMS_PER_PAGE as a global constant
const ITEMS_PER_PAGE = 10;

const ProjectDetails = ({ item }) => {
  const navigation = useNavigation();
  function navigationPdf() {
    // navigation.navigate('Pdf')
  }
  if (item.id !== "placeholder") {
    return (
      <Pressable onPress={navigationPdf} style={styles.itemContainer2}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
          }}
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
          <Pressable style={styles.viewBox}>
            <Text style={styles.viewText}>View</Text>
          </Pressable>
        </View>
      </Pressable>
    );
  } else {
    return <View style={styles.itemContainer}></View>;
  }
};

const ProjectListFlatList = ({}) => {
  const { searchQuery, setSearchQuery } = useSearch();
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
  return (
    <FlatList
      data={duplicateLastItemIfNeeded()}
      renderItem={({ item }) => <ProjectDetails item={item} />}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.1}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListFooterComponent={() =>
        // Render a loader component when loading more data

        !refreshing &&
        loading && <ActivityIndicator size="large" color="#0000ff" />
      }
      ListEmptyComponent={() => (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No data found</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    fontSize: 18,
    color: "#666666",
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 15,
    overflow: "hidden",
  },
  itemContainer2: {
    backgroundColor: "#E9EEFF",
    flex: 1,
    elevation: 6,
    marginHorizontal: 20,
    marginVertical: 12,
    paddingVertical: 4,
  },
  viewBox: {
    backgroundColor: "#5063BF",
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
    color: "#FAFAFA",
    fontSize: 16,
    marginHorizontal: 4,
    fontWeight: "600",
  },
});

export default ProjectListFlatList;
