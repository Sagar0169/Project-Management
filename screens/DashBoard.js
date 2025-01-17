import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Animated,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { Colors } from "../Utilities/Colors";
import DashboardData from "../components/DashboardData";
import RecentProjectFlatList from "../components/RecentProjectFlatList";
import TasksData from "../components/TasksData";
import { AuthContext } from "../store/auth-context";
import { Logout, getProjects, getTaks } from "../store/http";
import { colors } from "../components/config/theme";
import { ThemeContext } from "../context/ThemeContext";
const ITEMS_PER_PAGE = 10;

const { width, height } = Dimensions.get("window");

// Calculate a scaling factor based on the screen width
const scaleFactor = width / 375; // Adjust 375 based on your design reference width

// Define the base font size for your design
const baseFontSize = 16;

// Calculate the dynamic font size
const dynamicFontSize = baseFontSize * scaleFactor;
// const fontSize=FontSize font={16}
function w(value) {
  const width = Dimensions.get("window").width / 100; // now width is 1% of screen width
  return width * value;
}
function h(value) {
  const height = Dimensions.get("window").height / 100; // now height is 1% of screen height
  return height * value;
}

export default function DashBoard({ navigation }) {
  const {theme}=useContext(ThemeContext)
let activeColors=colors[theme.mode]
  const authCtx = useContext(AuthContext);

  const handleLogout = async () => {
    // const loginRespone = await AsyncStorage.getItem("user");
    // const response = JSON.parse(loginRespone);
    // authCtx.logout();
    // const logout = await Logout(response.userId, response.token);
    // if (logout._resultflag == 1) {
    //   authCtx.logout();
    // }
    // else {
    //   console.log(logout.message)
    // }
  };
  const lineRightSvg = `
  <svg
    width="26"
    height="11"
    viewBox="0 0 26 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 11H26V7.33333H0V11ZM0 3.66667H16.25V0H0V3.66667Z"
      fill="#6980D1"
    />
  </svg>
`;
  const bellIcon = `
  <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 25C11.375 25 12.5 23.8462 12.5 22.4359H7.5C7.5 23.8462 8.625 25 10 25ZM17.5 17.3077V10.8974C17.5 6.96154 15.4625 3.66667 11.875 2.79487V1.92308C11.875 0.858974 11.0375 0 10 0C8.9625 0 8.125 0.858974 8.125 1.92308V2.79487C4.55 3.66667 2.5 6.94872 2.5 10.8974V17.3077L0 19.8718V21.1538H20V19.8718L17.5 17.3077ZM15 18.5897H5V10.8974C5 7.71795 6.8875 5.12821 10 5.12821C13.1125 5.12821 15 7.71795 15 10.8974V18.5897Z" fill="#6980D1"/>
  </svg>
`;

  const [storedProfile, setStoreProfile] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const [sportsData, setSportsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchStoredProfile();
  }, [fetchStoredProfile]);
  useEffect(() => {
    console.log("COunter", page);
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

  

  const fetchStoredProfile = async () => {
    try {
      const loginRespone = await AsyncStorage.getItem("user");
      const response = JSON.parse(loginRespone);
      const tasks = await getTaks(
        response.userId,
        response.token,
        response.emp_id
      );

      if (tasks === 0) {
        console.log("Daata", tasks);
        handleLogout();
      }
      setStoreProfile(await AsyncStorage.getItem("profile"));
      console.log(await AsyncStorage.getItem("token"));

      if (storedProfile !== null) {
        // If the value exists in AsyncStorage
        console.log("Stored Profile:", storedProfile);
        // Do something with the storedProfile value, such as updating your state.
      } else {
        // If the value doesn't exist in AsyncStorage
        console.log("Profile not found in AsyncStorage");
      }
    } catch (error) {
      console.error("Error fetching profile from AsyncStorage:", error);
    }
  };
  fetchStoredProfile();

  const animatedValue = useRef(new Animated.Value(0)).current;

  const animateList = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false, // Set to true if possible for better performance
    }).start();
  };

  useEffect(() => {
    animateList();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0], // Adjust the values based on your desired animation
  });
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [taskNumber, setTaskNumber] = useState(TasksData.length);
  console.log(taskNumber);
  useEffect(() => {
    setTaskNumber(TasksData.length);
  }, [TasksData]);

  const selectPriority = (priority) => {
    setSelectedPriority(priority);
  };

  const CurvedGridItem = ({ navigation, item, taskNumber, storedProfile }) => {
    let header = item.title;
    if (item.title === "Assigned Tasks") {
      header = storedProfile === "Developer" ? "Your Tasks" : item.title;
      item.count = taskNumber;
    }
    if (item.title === "Project List") {
      item.count = taskNumber;
    }
    function navigationHandler() {
      if (item.title === "Add New Projects") {
        navigation.navigate("AddNewProjects");
      }
      if (item.title === "Project List") {
        navigation.navigate("Projectlist");
      }
      if (item.title === "Assigned Projects") {
        navigation.navigate("AssignedProject");
      }
      if (item.title === "Assigned Tasks") {
        navigation.navigate("Assigntask");
      }
      if (item.title === "Check In/Out") {
        navigation.navigate("CheckIn/Out");
      }
    }
    if (item.id !== "placeholder") {
      return (
        <Pressable onPress={navigationHandler} style={styles.itemContainer}>
          <LinearGradient
            colors={[item.color, item.color]}
            style={styles.gradient}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: w(4),
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: w(4),
                  backgroundColor: "white",
                  borderRadius: w(20),
                  marginVertical: 4,
                  paddingVertical: w(4),
                }}
              >
                <SvgXml xml={item.lineRightSvg} width="40" height="40" />
              </View>
              <View
                style={{ borderRadius: 8, marginTop: w(6), marginStart: w(2) }}
              >
                <Text
                  style={{
                    color: item.textColor,
                    fontSize: dynamicFontSize * 1, // Use RFValue for dynamic font size
                    fontWeight: "bold",
                  }}
                >
                  {item.count}
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontSize: dynamicFontSize * 1, // Use RFValue for dynamic font size
                    fontWeight: "bold",
                    width: w(20),
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </Pressable>
      );
    } else {
      return <View style={styles.hiddenItem}></View>;
    }
  };

  const duplicateLastItemIfNeeded = () => {
    const itemCount = DashboardData.length;
    const lastItem = DashboardData[itemCount - 1];

    if (itemCount % 2 === 1) {
      // Duplicate the last item
      const duplicatedItem = { ...lastItem, id: "placeholder" };
      return [...DashboardData, duplicatedItem];
    }

    return DashboardData;
  };

  return (
    <ScrollView style={{ paddingTop: h(4), flex: 1, backgroundColor: activeColors.background }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 14,
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <View
            style={{
              backgroundColor: "#E9EEFF",
              borderRadius: w(8),
              padding: w(2),
            }}
          >
            <SvgXml
              xml={lineRightSvg}
              width="20"
              height="20"
              style={{ margin: 4 }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <SvgXml xml={bellIcon} width="20" height="20" style={{ margin: 4 }} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, marginHorizontal: 8, marginVertical: 2 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: dynamicFontSize * 1.2,
            color: "#2D2C2E",
            marginHorizontal: 8,
            marginVertical: 8,
            color:activeColors.color
          }}
        >
          Dashboard
        </Text>
        <Text
          style={{
            fontSize: dynamicFontSize,
            color: "#878787",
            fontWeight: "600",
            marginHorizontal: 8,
            marginVertical: 2,
            color:activeColors.color
          }}
        >
          Project Summary
        </Text>
        <View>
          <FlatList
            data={duplicateLastItemIfNeeded()}
            scrollEnabled={false}
            numColumns={2}
            renderItem={({ item }) => (
              <CurvedGridItem
                navigation={navigation}
                item={item}
                taskNumber={taskNumber}
                storedProfile={storedProfile}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={{ marginBottom: w(8) }}>
          <Text
            style={{
              fontSize: dynamicFontSize,
              color: "grey",
              fontWeight: "600",
              margin: 8,
              color:activeColors.color
            }}
          >
            Recent Ongoing Projects
          </Text>
          <FlatList
            data={sportsData.slice(8, 14)}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <RecentProjectFlatList
                item={item}
                onSelect={selectPriority}
                isSelected={selectedPriority && selectedPriority.id === item.id}
              />
            )}
            keyExtractor={(item) => item.id}
            // Set the following props to allow vertical scrolling
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hiddenItem: {
    flex: 1,
    margin: 8,
    borderRadius: 15,
    overflow: "hidden",
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 8, //This all down four used to give shadow in IOS
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
    borderWidth: 2,
    borderColor: "grey",
  },
  textContainer: {
    flexDirection: "row", // Arrange items in a column
    justifyContent: "space-between",
    alignItems: "center",
    margin: 6,
  },
  gradient: {
    flex: 1,
    borderRadius: 15,
    backgroundColor: Colors.black,
    width: "100%",
    height: 150,
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
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 35,
    alignSelf: "flex-start", // Align the text to the left
  },
  text2: {
    color: Colors.black,
    fontWeight: "400",
    fontSize: 18,
    marginHorizontal: 6,
    alignSelf: "flex-start", // Align the text to the left
  },
});
