import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { assignedTasksFetch, fetchTasks, getTaks } from "../store/http";
import { useSearch } from "../store/search-redux";

const ProjectDetails = ({ item, navigation, storedProfile }) => {
  const header = item.task_name;
  function detailsHandler() {
    navigation.navigate("AssignedTaskDetails", {
      ID: item,
      storedProfile: storedProfile,
    });
  }

  if (item.id !== "placeholder") {
    return (
      <Pressable style={styles.itemContainer2} onPress={detailsHandler}>
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
            <Text style={styles.text2}>{header}</Text>
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

const AssignTaskFlatList = ({ navigation }) => {
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
          const tasks = await getTaks(response.userId, response.token);
          console.log("Daata", tasks);
          expenses = tasks;
        } else {
          const tasks = await getTaks(response.userId, response.token);
          console.log("Daata", tasks);
          expenses = tasks;
        }

        if (isMounted) {
          setTask(expenses);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        if (isMounted) {
          setIsFetching(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [storedProfile]);

  return (
    <FlatList
      data={task}
      renderItem={({ item }) => (
        <ProjectDetails
          item={item}
          navigation={navigation}
          storedProfile={storedProfile}
        />
      )}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      ListEmptyComponent={() => (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No data found</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

export default AssignTaskFlatList;
