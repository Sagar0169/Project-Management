import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View
} from "react-native";
import moviesData from "./moviesData";
import { colors } from "./config/theme";
import { ThemeContext } from "../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getIssues,
  getTaks,
} from "../store/http";
const ITEMS_PER_PAGE = 10;

const NoticesItem = ({ navigation, item }) => {
  const {theme}=useContext(ThemeContext)
  let activeColors=colors[theme.mode]
  function detailsHandler() {
    navigation.navigate("IssuesDetails", { ID: item });
  }
  if (item.id !== "placeholder") {
    return (
      <Pressable onPress={detailsHandler} style={[styles.itemContainer2,{backgroundColor:activeColors.blackBgg}]}>
        <Text numberOfLines={3} ellipsizeMode="tail" style={[styles.text,{color:activeColors.color}]}>
          {item.title} 
        </Text>
        <Pressable onPress={detailsHandler} style={[styles.viewBox,{backgroundColor:activeColors.background}]}>
          <Text style={[styles.viewText,{color:activeColors.color}]}>View</Text>
        </Pressable>
      </Pressable>
    );
  } else {
    return <View style={styles.itemContainer}></View>;
  }
};

const NoticesFlatList = ({ navigation, state, data, image }) => {
  const [task, setTask] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [storedProfile, setStoreProfile] = useState("");
  const [sportsData, setSportsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const {theme}=useContext(ThemeContext)
let activeColors=colors[theme.mode]

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

  const fetchData = async () => {
    try {
      setLoading(true);
      const loginRespone = await AsyncStorage.getItem("user");
      const response = JSON.parse(loginRespone);
      console.log("Pagesss", response.userId);

      const data = await getIssues(
        response.userId,
        response.token,
        
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
      const data = await getIssues(
        response.userId,
        response.token,
      
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
      renderItem={({ item }) => (
        <NoticesItem navigation={navigation} item={item} />
      )}
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
          <Text style={[styles.noDataText,{color:activeColors.color}]}>No data found</Text>
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
    backgroundColor: "#f5f5f5",
    flexDirection: "row", // Updated
    justifyContent: "space-between", // Updated
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 12,
    paddingVertical: 2,
    borderRadius: 8,
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
    width: "60%",
    color: "#5164BFA6",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 8,
    paddingVertical: 20,
  },
  text2: {
    color: "black",
    fontWeight: "bold",
  },
  viewBox: {
    backgroundColor: "#f5f5f5",
    elevation: 2,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginHorizontal: 8,
  },
  viewText: {
    color: "#B8B7EB",
    fontSize: 16,
    marginHorizontal: 4,
    fontWeight: "600",
  },
});

export default NoticesFlatList;
