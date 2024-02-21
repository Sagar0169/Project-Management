import React, { useState, useEffect } from "react";
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
} from "react-native";
// import Toast from "react-native-simple-toast";
import DateTimePicker from "@react-native-community/datetimepicker";
import { assignedStore, storeTask } from "../store/http";
import useFonts from "../hooks/useFonts";
import { Svg, SvgXml } from "react-native-svg";
import Input from "../components/Input";
import SubmitButton from "../components/ui/SubmitButton";
import BottomSheetDesign3 from "../components/BottomSheedDesign3";
import { Svg6 } from "../components/svgs/svgs";
import BackArrowHeaderWhite from "../components/BackArrowHeaderWhite";

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
  useEffect(() => {
    const currentDate = new Date();
    setSelectedDate(currentDate);
    setEnteredDueDate(currentDate.toISOString().split("T")[0]);
  }, []); // Empty dependency array ensures that this effect runs only once, when the component mounts

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
  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };
  const handleOptionPressPriority = (option) => {
    setSelectedPriority(option);
  };
  const handleOptionPressPriority2 = (option) => {
    setselectedComplexity(option);
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
    <View style={{ flex: 1, backgroundColor: "white", paddingTop: w(5) }}>
      <BackArrowHeaderWhite
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
            <Text style={styles.headingText}>Assigned To</Text>
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
                backgroundColor: "#E9EEFF",
                borderBottomColor: "#DCDCDC",
                fontSize: 16,
                color: "#404040",
                width: "100%",
              }}
            >
              {item.assign_to}
            </Text>
          </View>
        </View>

        <View
          style={{
            margin: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.headingText}>Created By</Text>
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
                backgroundColor: "#E9EEFF",
                borderBottomColor: "#DCDCDC",
                fontSize: 16,
                color: "#404040",
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
            <Text style={styles.headingText}>Form Title</Text>
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
                backgroundColor: "#E9EEFF",
                borderBottomColor: "#DCDCDC",
                fontSize: 16,
                color: "#404040",
                width: "100%",
              }}
            >
              {item.task_name}
            </Text>
          </View>
        </View>

        <View
          style={{
            margin: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.headingText}>Task Phase</Text>
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
                backgroundColor: "#E9EEFF",
                borderBottomColor: "#DCDCDC",
                fontSize: 16,
                color: "#404040",
                width: "100%",
              }}
            >
              {item.task_phase}
            </Text>
          </View>
        </View>

        <View
          style={{
            margin: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.headingText}>Task Type</Text>
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
                backgroundColor: "#E9EEFF",
                borderBottomColor: "#DCDCDC",
                fontSize: 16,
                color: "#404040",
                width: "100%",
              }}
            >
              {item.task_type}
            </Text>
          </View>
        </View>

        {/* //Status */}

        <View
          style={{
            margin: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.headingText}>Status</Text>
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
            </View>
          </View>
        </View>

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
                  <Text
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 8,
                      backgroundColor: "#E9EEFF",
                      borderBottomColor: "#DCDCDC",
                      fontSize: 16,
                      color: "#404040",
                      width: "100%",
                    }}
                  >
                    {item.task_created_date}
                  </Text>
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
                  { fontFamily: "poppinsemi" },
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
                  <Text
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 8,
                      backgroundColor: "#E9EEFF",
                      borderBottomColor: "#DCDCDC",
                      fontSize: 16,
                      color: "#404040",
                      width: "100%",
                    }}
                  >
                    {item.time_alot}
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Yes BUtton */}
        <View style={{ margin: 8 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headingText}>QC Documents Mandatory</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Pressable>
              <View style={getOptionStyle(item.qc_doc)}>
                <Text style={styles.viewText}>Yes</Text>
              </View>
            </Pressable>
            <Pressable>
              <View
                style={getOptionStyle(item.qc_doc === "Yes" ? "No" : "Yes")}
              >
                <Text style={styles.viewText}>NO</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View style={{ margin: 8 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headingText}>Priority</Text>
          </View>
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
                backgroundColor: item.priority == "Low" ? "#50BF54" : "#9A9A9A",
                padding: 8,
                borderRadius: 5,
                marginHorizontal: 4,
              }}
            >
              <Text style={styles.viewText}>Low</Text>
            </View>
            <View
              style={{
                backgroundColor:
                  item.priority == "Medium" ? "#50BF54" : "#9A9A9A",
                padding: 8,
                borderRadius: 5,
                marginHorizontal: 4,
              }}
            >
              <Text style={styles.viewText}>Medium</Text>
            </View>
            <View
              style={{
                backgroundColor:
                  item.priority == "High" ? "#50BF54" : "#9A9A9A",
                padding: 8,
                borderRadius: 5,
                marginHorizontal: 4,
              }}
            >
              <Text style={styles.viewText}>High</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            margin: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.headingText}>Task Complexity</Text>
          </View>
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
                  item.task_complexity == "Low" ? "#50BF54" : "#9A9A9A",
                padding: 8,
                borderRadius: 5,
                marginHorizontal: 4,
              }}
            >
              <Text style={styles.viewText}>Low</Text>
            </View>
            <View
              style={{
                backgroundColor:
                  item.task_complexity == "Medium" ? "#50BF54" : "#9A9A9A",
                padding: 8,
                borderRadius: 5,
                marginHorizontal: 4,
              }}
            >
              <Text style={styles.viewText}>Medium</Text>
            </View>
            <View
              style={{
                backgroundColor:
                  item.task_complexity == "High" ? "#50BF54" : "#9A9A9A",
                padding: 8,
                borderRadius: 5,
                marginHorizontal: 4,
              }}
            >
              <Text style={styles.viewText}>High</Text>
            </View>
          </View>
        </View>
      </ScrollView>

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
});
