import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
// import Toast from "react-native-simple-toast";
import DateTimePicker from "@react-native-community/datetimepicker";
import { assignedStore, deleteTask, storeTask } from "../store/http";
import useFonts from "../hooks/useFonts";
import { Svg, SvgXml } from "react-native-svg";
import Input from "../components/Input";
import SubmitButton from "../components/ui/SubmitButton";
import BottomSheetDesign3 from "../components/BottomSheedDesign3";
import { Svg6 } from "../components/svgs/svgs";
import BackArrowHeaderWhite from "../components/BackArrowHeaderWhite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSearch } from "../store/search-redux";
import Toast from "react-native-toast-message";
import { colors } from "../components/config/theme";
import { ThemeContext } from "../context/ThemeContext";

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

//CHANGE MULTIPLE SELECTION FROM BOTTOMSHEET2
// give todays date before hand

function AssignedTaskDetails({ route, taskData, setTaskData, navigation }) {
  const item = route.params.ID;
  console.log("Task ID", item);
  const {theme}=useContext(ThemeContext)
let activeColors=colors[theme.mode]
  useEffect(() => {
    const currentDate = new Date();
    setSelectedDate(currentDate);
    setEnteredDueDate(currentDate.toISOString().split("T")[0]);
  }, []); // Empty dependency array ensures that this effect runs only once, when the component mounts

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

  const addNewTask = (newTask) => {
    // Add the new task to taskData
    setTaskData((prevTaskData) => [...prevTaskData, newTask]);
    assignedStore(newTask);
    navigation.goBack();

    // You may also want to handle any other logic, such as API calls to save the data.
  };

  function validateForm() {
    // Check if enteredProjectName, enteredDueDate, and AssginedForItem have values
    if (
      enteredTaskName.trim() !== "" &&
      enteredDueDate.trim() !== "" &&
      enteredTaskPhase.trim() !== "" &&
      enteredTaskType.trim() !== "" &&
      enteredEstimatedTime.trim() !== "" &&
      selectedOption !== null &&
      selectedPriority !== null &&
      AssginedForItem.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  function ModalHandler() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          toggleModal();
        }}
      >
        <View style={[styles.modalContainer]}>
          <BottomSheetDesign3 handleSportSelection={handleSportSelection} />
        </View>
      </Modal>
    );
  }
  const [enteredTaskName, setEnteredTaskName] = useState("");
  const [enteredTaskPhase, setEnteredTaskPhase] = useState("");
  const [enteredTaskType, setEnteredTaskType] = useState("");
  const [enteredDueDate, setEnteredDueDate] = useState("");
  const [enteredEstimatedTime, setEnteredEstimatedTime] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [qcDocStatus, setQcDocStatus] = useState(item.qc_doc);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleDateChange = (event, selectedDate) => {
    hideDatePicker();
    if (selectedDate) {
      setSelectedDate(selectedDate);
      setEnteredDueDate(selectedDate.toISOString().split("T")[0]); // Update the input text with the selected date
    }
  };

  function onChangeText(inputType, enteredValue) {
    switch (inputType) {
      case "taskName":
        setEnteredTaskName(enteredValue);
        break;
      case "dueDate":
        setEnteredDueDate(enteredValue);
        break;
      case "taskPhase":
        setEnteredTaskPhase(enteredValue);
        break;
      case "taskType":
        setEnteredTaskType(enteredValue);
        break;
      case "estimatedTime":
        setEnteredEstimatedTime(enteredValue);
        break;
    }
  }
  const [isModalVisible, setModalVisible] = useState(false);
  const [AssginedForItem, setAssginedForItem] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [selectedComplexity, setselectedComplexity] = useState(null);
  const { searchQuery, setSearchQuery } = useSearch();
  const [task, setTask] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };
  const handleOptionPressPriority = (option) => {
    if (isEditEnabled) {
    setSelectedPriority(option);
    }
  };
  const handleOptionPressPriority2 = (option) => {
    if (isEditEnabled) {
    setselectedComplexity(option);
    }
  };
  const handleQcDocStatusChange = (status) => {
    if (isEditEnabled) {
      getOptionStyle(status);
      setQcDocStatus(status);
    }
  };
  const getOptionStyle = (status) => {
    return {
      backgroundColor: status === "Yes" ? "#50BF54" : "#9A9A9A",
      // Add other styling properties as needed
      padding: 8,
      borderRadius: 5,
      marginHorizontal: 4,
    };
  };
  const getOptionStyle2 = (option) => {
    if (selectedComplexity === option) {
      return styles.viewBoxBorder;
    } else {
      return styles.viewBox;
    }
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const getPriorityStyle = (priority) => {
    return {
      backgroundColor:
        priority === "High" ? "#50BF54" : "Low" ? "#50BF54" : "#9A9A9A",
      padding: 8,
      borderRadius: 5,
      marginHorizontal: 4,
    };
  };

  const fetchData = useCallback(async () => {
    setIsFetching(true);

    try {
      let expenses;
      const loginRespone = await AsyncStorage.getItem("user");
      const response = JSON.parse(loginRespone);
      console.log(response.token);
      if (storedProfile === "super admin") {
        const tasks = await deleteTask(
          response.userId,
          response.id,
          response.token
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
        const tasks = await deleteTask(
          response.userId,
          response.id,
          response.token
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
  }, [storedProfile, searchQuery]);

  const handleDeleteItem = () => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              // Make API request to delete the item
              const loginRespone = await AsyncStorage.getItem("user");
              const response = JSON.parse(loginRespone);

              await deleteTask(response.userId, item.id, response.token);

              // If you want to navigate back after deletion

              navigation.goBack();
            } catch (error) {
              console.error("Error deleting task:", error);
              // Handle error appropriately
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleSportSelection = (sport) => {
    setAssginedForItem(sport);
    toggleModal();
  };
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    const loadFonts = async () => {
      await useFonts();
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);
  if (!fontsLoaded) {
    // Return a loading state or null while fonts are loading
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: activeColors.background, paddingTop: w(5) }}>
      <BackArrowHeaderWhite
        deleteCall={handleDeleteItem}
        showDelete={true}
        showSearch={true}
        filter={true}
        title="Tasks Details"
        color="#ffffff"
        backButton={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginVertical: 10, marginHorizontal: 6 }}
      >
        <View
          style={{
            margin: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.headingText,{color:activeColors.color}]}>Assigned To</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#8A96D3",
              borderRadius: 1,
              marginVertical: 8,
              backgroundColor: "#E9EEFF",
              flexDirection: "row", // Add this line to align items horizontally
              alignItems: "center",
            }}
          >
            <TextInput
              editable={isEditEnabled}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 8,
                backgroundColor: activeColors.blackBgg,
                borderBottomColor: "#DCDCDC",
                fontSize: 16,
                color: activeColors.color,
                width: "100%",
              }}
            >
              {item.assign_to}
            </TextInput>
          </View>
        </View>

        <View
          style={{
            margin: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.headingText,{color: activeColors.color}]}>Created By</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#8A96D3",
              borderRadius: 1,
              marginVertical: 8,
              backgroundColor: "#E9EEFF",
              flexDirection: "row", // Add this line to align items horizontally
              alignItems: "center",
            }}
          >
            <Text
              style={{
                paddingVertical: 10,
                paddingHorizontal: 8,
                backgroundColor: activeColors.blackBgg,
                borderBottomColor: "#DCDCDC",
                fontSize: 16,
                color:  activeColors.color,
                width: "100%",
              }}
            >
              Soumaya Ranjan
            </Text>
          </View>
        </View>
        <View
          style={{
            margin: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.headingText,{color:activeColors.color}]}>Form Title</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#8A96D3",
              borderRadius: 1,
              marginVertical: 8,
              backgroundColor: "#E9EEFF",
              flexDirection: "row", // Add this line to align items horizontally
              alignItems: "center",
            }}
          >
            <TextInput
              editable={isEditEnabled}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 8,
                backgroundColor: activeColors.blackBgg,
                borderBottomColor: "#DCDCDC",
                fontSize: 16,
                color: activeColors.color,
                width: "100%",
              }}
            >
              {item.task_name}
            </TextInput>
          </View>
        </View>

        <View
          style={{
            margin: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.headingText,{color:activeColors.color}]}>Task Phase</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#8A96D3",
              borderRadius: 1,
              marginVertical: 8,
              backgroundColor: "#E9EEFF",
              flexDirection: "row", // Add this line to align items horizontally
              alignItems: "center",
            }}
          >
            <TextInput
              editable={isEditEnabled}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 8,
                backgroundColor: activeColors.blackBgg,
                borderBottomColor: "#DCDCDC",
                fontSize: 16,
                color: activeColors.color,
                width: "100%",
              }}
            >
              {item.task_phase}
            </TextInput>
          </View>
        </View>

        <View
          style={{
            margin: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.headingText,{color:activeColors.color}]}>Task Type</Text>
          </View>
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              borderColor: "#8A96D3",
              borderRadius: 1,
              marginVertical: 8,
              backgroundColor: "#E9EEFF",
              flexDirection: "row", // Add this line to align items horizontally
              alignItems: "center",
            }}
          >
            <TextInput
              editable={isEditEnabled}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 8,
                backgroundColor: activeColors.blackBgg,
                borderBottomColor: "#DCDCDC",
                fontSize: 16,
                color:activeColors.color,
                width: "100%",
              }}
            >
              {item.task_type}
            </TextInput>
          </View>
        </View>

        {/* //Status */}

        <View
          style={{
            margin: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.headingText,{color:activeColors.color}]}>Status</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <View
                style={{
                  backgroundColor:
                    item.status == "Pending" ? "#50BF54" : "#9A9A9A",
                  padding: 8,
                  borderRadius: 5,
                  marginHorizontal: 4,
                }}
              >
                <Text style={styles.viewText}>Pending</Text>
              </View>
              <View
                style={{
                  backgroundColor:
                    item.status == "In Progress" ? "#50BF54" : "#9A9A9A",
                  padding: 8,
                  borderRadius: 5,
                  marginHorizontal: 4,
                }}
              >
                <Text style={styles.viewText}>In Progress</Text>
              </View>
              <View
                style={{
                  backgroundColor:
                    item.status == "Completed" ? "#50BF54" : "#9A9A9A",
                  padding: 8,
                  borderRadius: 5,
                  marginHorizontal: 4,
                }}
              >
                <Text style={styles.viewText}>Completed</Text>
              </View>
              {storedProfile === "Developer" && (
                <Pressable
                  onPress={() =>
                    navigation.navigate("UpdateStatus", { ID: item.id })
                  }
                  style={{
                    marginHorizontal: w(2),
                    borderRadius: w(2),
                    borderWidth: 1,
                    paddingHorizontal: w(2),
                    paddingVertical: w(1),
                  }}
                >
                  <Text>Edit</Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
        {/* FOR DATE CREATED UPDATE THE CURRENT DATE WHEN THE EDIT BUTTON IS CLICKED */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 6,
          }}
        >
          <View
            style={{ flex: 1, marginTop: w(1) }} //DUE DATE
          >
            <View
              style={{
                flex: 0.3,

                paddingTop: 10,
                marginTop: w(2),
              }}
            >
              <Text
                style={[
                  styles.headingText,
                  { maxWidth: w(30), marginEnd: w(5) },
                  { fontFamily: "poppinsemi" },
                  {color:activeColors.color}
                ]}
              >
                Date Created
              </Text>
            </View>
            <Pressable>
              <View
                style={{
                  flex: 0.7,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: "#8A96D3",
                    borderRadius: 1,
                    marginVertical: 8,
                    backgroundColor: "#E9EEFF",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    editable={isEditEnabled}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 8,
                      backgroundColor: activeColors.blackBgg,
                      borderBottomColor: "#DCDCDC",
                      fontSize: 16,
                      color: activeColors.color,
                      width: "100%",
                    }}
                  >
                    {item.task_created_date}
                  </TextInput>
                </View>
                <SvgXml
                  xml={Svg6}
                  width="20"
                  height="20"
                  style={{ marginLeft: w(-5), marginEnd: w(4) }}
                />
              </View>
            </Pressable>
          </View>
          <View style={{ flex: 1, marginLeft: w(3), marginTop: w(1) }}>
            <View
              style={{
                flex: 0.3,
                paddingTop: 10,
                marginTop: w(2),
              }}
            >
              <Text
                style={[
                  styles.headingText,
                  { maxWidth: w(30), marginEnd: w(5) },
                  { fontFamily: "poppinsemi" },{color:activeColors.color}
                ]}
              >
                Time Alloted
              </Text>
            </View>
            <Pressable>
              <View
                style={{
                  flex: 0.7,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: "#8A96D3",
                    borderRadius: 1,
                    marginVertical: 8,
                    backgroundColor: "#E9EEFF",
                    flexDirection: "row", // Add this line to align items horizontally
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    editable={isEditEnabled}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 8,
                      backgroundColor: activeColors.blackBgg,
                      borderBottomColor: "#DCDCDC",
                      fontSize: 16,
                      color: activeColors.color,
                      width: "100%",
                    }}
                  >
                    {item.time_alot}
                  </TextInput>
                </View>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Yes BUtton */}
        <View style={{ margin: 8 }}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.headingText,{color:activeColors.color}]}>QC Documents Mandatory</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {/* to handle pressable on is enable i used a usestate with default value set to the value received from backend hence by default it will show the value that was stored in db */}
            <Pressable onPress={() => handleQcDocStatusChange("Yes")}>
              <View style={getOptionStyle(qcDocStatus)}>
                <Text style={styles.viewText}>Yes</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handleQcDocStatusChange("No")}>
              <View
                style={getOptionStyle(qcDocStatus === "Yes" ? "No" : "Yes")}>
                <Text style={styles.viewText}>NO</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View style={{ margin: 8 }}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.headingText,{color:activeColors.color}]}>Priority</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Pressable onPress={ ()=> handleOptionPressPriority("Low")}>
              
            
            <View
              style={{
                backgroundColor: selectedPriority == "Low" ? "#50BF54" : "#9A9A9A",
                padding: 8,
                borderRadius: 5,
                marginHorizontal: 4,
              }}
            >
              <Text style={styles.viewText}>Low</Text>
            </View>
            </Pressable>
            <Pressable onPress={ ()=> handleOptionPressPriority("Medium")}>
            <View
              style={{
                backgroundColor:
                selectedPriority == "Medium" ? "#50BF54" : "#9A9A9A",
                padding: 8,
                borderRadius: 5,
                marginHorizontal: 4,
              }}
            >
              <Text style={styles.viewText}>Medium</Text>
            </View>
            </Pressable>
            <Pressable onPress={()=> handleOptionPressPriority("High")}>
            <View
              style={{
                backgroundColor:
                selectedPriority == "High" ? "#50BF54" : "#9A9A9A",
                padding: 8,
                borderRadius: 5,
                marginHorizontal: 4,
              }}
            >
              <Text style={styles.viewText}>High</Text>
            </View>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            margin: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.headingText,{color:activeColors.color}]}>Task Complexity</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
              <Pressable onPress={ ()=> handleOptionPressPriority2("Low")}>
            <View
              style={{
                backgroundColor:
                  selectedComplexity == "Low" ? "#50BF54" : "#9A9A9A",
                padding: 8,
                borderRadius: 5,
                marginHorizontal: 4,
              }}
            >
              <Text style={styles.viewText}>Low</Text>
            </View>
            </Pressable>
            <Pressable onPress={ ()=> handleOptionPressPriority2("Medium")}>
            <View
              style={{
                backgroundColor:
                selectedComplexity == "Medium" ? "#50BF54" : "#9A9A9A",
                padding: 8,
                borderRadius: 5,
                marginHorizontal: 4,
              }}
            >
              <Text style={styles.viewText}>Medium</Text>
            </View>
            </Pressable>
            <Pressable onPress={ ()=> handleOptionPressPriority2("High")}>
            <View
              style={{
                backgroundColor:
                selectedComplexity == "High" ? "#50BF54" : "#9A9A9A",
                padding: 8,
                borderRadius: 5,
                marginHorizontal: 4,
              }}
            >
              <Text style={styles.viewText}>High</Text>
            </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {storedProfile !== "Developer" && (
        <>
          <TouchableOpacity
            style={[styles.addButton, { backgroundColor: "#5063Bf" }]}
            onPress={() => setIsEditEnabled(!isEditEnabled)}
          >
            {isEditEnabled ? (
              <MaterialCommunityIcons
                name="content-save"
                size={30}
                color="white"
              />
            ) : (
              <MaterialCommunityIcons name="pencil" size={30} color="white" />
            )}
          </TouchableOpacity>
        </>
      )}

      {isDatePickerVisible && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}
export default AssignedTaskDetails;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#e5af54",
  },
  viewBox: {
    backgroundColor: "#9A9A9A",
    elevation: 2,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 3,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  viewBoxBorder: {
    backgroundColor: "#50BF54",
    elevation: 2,
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 3,
    marginHorizontal: 8,
    marginVertical: 8,
  },

  viewText: {
    color: "white",
    fontSize: 18,
    marginHorizontal: 4,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    Content: "flex-end",
  },
  headingText: {
    color: "black",
    fontSize: 18,
    fontFamily: "poppinsemi",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
