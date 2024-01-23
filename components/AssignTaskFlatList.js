import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import { assignedTasksFetch, fetchTasks } from "../store/http";
import { useSearch } from "../store/search-redux";

const ProjectDetails = ({ item, navigation, storedProfile }) => {
  const header = storedProfile === "Developer" ? item.title : item.Assigned;
  function detailsHandler() {
    navigation.navigate("AssignedTaskDetails", { ID: item });
  }

  if (item.id !== "placeholder") {
    return (
      <Pressable style={styles.itemContainer2} onPress={detailsHandler}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            borderColor: "#000000",
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
        if (storedProfile === "super admin") {
          const tasks = await fetchTasks();
          const assignedTasks = await assignedTasksFetch();

          // Merge the two arrays
          expenses = [...tasks, ...assignedTasks];
        } else {
          expenses = await assignedTasksFetch();
        }

        if (isMounted) {
          
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
  }, [storedProfile, task]);

  const filteredData = task.filter((item) =>
    item.Assigned.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <FlatList
      data={filteredData}
      renderItem={({ item }) => (
        <ProjectDetails
          item={item}
          navigation={navigation}
          storedProfile={storedProfile}
        />
      )}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      ListEmptyComponent={() => (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#e5af54" />
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
    backgroundColor: "#f5f5f5",
    flex: 1,
    elevation: 6,
    marginHorizontal: 20,
    marginVertical: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#e5af54",
  },
  viewBox: {
    backgroundColor: "#f5f5f5",
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
    color: "#E6CCA1",
    fontSize: 16,
    marginHorizontal: 4,
    fontWeight: "600",
  },
});

export default AssignTaskFlatList;
