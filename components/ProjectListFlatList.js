import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import TasksData from "./TasksData";
import { useSearch } from "../store/search-redux";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProjects } from "../store/http";

const ProjectDetails = ({ item }) => {
  const navigation = useNavigation()
  function navigationPdf(){
    navigation.navigate('Pdf')
  }
  if (item.id !== "placeholder") {
    return (
      <Pressable  onPress={navigationPdf}
      style={styles.itemContainer2}>
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

  const fetchData = useCallback(async () => {
    setIsFetching(true);

    try {
      let expenses;
      const loginRespone = await AsyncStorage.getItem("user");
      const response = JSON.parse(loginRespone);
      if (storedProfile === "super admin") {
        const tasks = await getProjects(
          response.userId,
          response.token,
          response.emp_id
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
        const tasks = await getProjects(
          response.userId,
          response.token,
          response.emp_id
        );
        console.log("Daata", tasks);
        expenses = tasks;
      }

      setTask(expenses);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsFetching(false);
    }
  }, [storedProfile,searchQuery]);

  useEffect(() => {
    let isMounted = true;

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchData]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [fetchData])
  );
  const handleRefresh = () => {
    // Manually trigger refresh when needed
    fetchData();
  };

  const generateRandomProjectName = () => {
    const adjectives = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"];
    const nouns = ["Project", "Task", "Assignment", "Job", "Mission"];
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective} ${randomNoun}`;
  };

  // Generate project data with random project names
  const projectData = Array.from({ length: 20 }, (_, index) => ({
    projectName: generateRandomProjectName(),
    progress: Math.random(),
    riskPriority: index % 3 === 0 ? "low" : index % 3 === 1 ? "medium" : "high",
  }));

  useEffect(() => {
    return () => {
      setSearchQuery("");
    };
  }, []);

  const filteredData = TasksData.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <FlatList
      data={task}
      renderItem={({ item }) => <ProjectDetails item={item} />}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      refreshing={isFetching}
      onRefresh={handleRefresh}
      ListEmptyComponent={() => (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No Data Found</Text>
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
