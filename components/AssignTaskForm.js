import React, { useState, useEffect,useContext } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Dimensions
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Input from "./Input";
import SubmitButton from "./ui/SubmitButton";
// import Toast from "react-native-simple-toast";
import DateTimePicker from "@react-native-community/datetimepicker";
import BottomSheetDesign3 from "./BottomSheedDesign3";
import { assignedStore, storeTask } from "../store/http";
import useFonts from "../hooks/useFonts";
import { Svg, SvgXml } from "react-native-svg";
import { AuthContext } from "../store/auth-context";
import { Svg6 } from "./svgs/svgs";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "./config/theme";



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

function AssignTaskForm({ taskData, setTaskData, navigation,userId }) {

  const { theme } = useContext(ThemeContext)
  let activeColors = colors[theme.mode]
  
  useEffect(() => {
    const currentDate = new Date();
    setSelectedDate(currentDate);
    setEnteredDueDate(currentDate.toISOString().split("T")[0]);
  }, []); // Empty dependency array ensures that this effect runs only once, when the component mounts


  const addNewTask = (newTask) => {
    // Add the new task to taskData
    setTaskData((prevTaskData) => [...prevTaskData, newTask]);
   
    assignedStore(newTask,token)
    // navigation.goBack()

    // You may also want to handle any other logic, such as API calls to save the data.
  };

  
 async function validateForm() {
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
  const [storedUserid, setstoredUserid] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { token } = useContext(AuthContext);
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
  const getOptionStyle = (option) => {
    if (selectedOption === option || selectedPriority === option) {
      return styles.viewBoxBorder;
    } else {
      return styles.viewBox;
    }
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
    <View style={{ paddingTop: h(4),flex: 1, backgroundColor:activeColors.background }}>
      <ScrollView style={{ flex: 1, margin: 10,backgroundColor:activeColors.background }}>
        <View
          style={{
            margin: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.headingText,{color:activeColors.color}]}>Task Name</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Input
              label="Enter TaskName"
              secure={false}
              onUpdateValue={onChangeText.bind(this, "taskName")}

            />
          </View>
        </View>

        <View
          style={{

            margin: 8,
          }}
        >
          <View style={{ flex: 1}}>
            <Text style={[styles.headingText,{color:activeColors.color}]}>Task Phase</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Input
              label="Enter Phase"
              secure={false}
              onChangeText={onChangeText.bind(this, "taskPhase")}

            />

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
          <View style={{ flex: 1 }}>
            <Input
              label="Enter Type"
              secure={false}
              onChangeText={onChangeText.bind(this, "taskType")}
              value={enteredTaskType}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: 'space-between', margin: 8 }}>
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
                  { fontFamily: 'poppinsemi' },
                  {color:activeColors.color}
                ]}
              >
                Date Created
              </Text>

            </View>
            <Pressable onPress={showDatePicker}>
              <View style={{ flex: 0.7, flexDirection: 'row', alignItems: 'center' }}>
                <Input
                  label="Due Date"
                  editable={false}
                  secure={false}
                  onUpdateValue={onChangeText.bind(this, "dueDate")}
                  value={enteredDueDate}
                />
                <SvgXml xml={Svg6} width="20" height="20" style={{ marginLeft: w(-5) }} />
              </View>
            </Pressable>
          </View>
          <View
            style={{ flex: 1, marginLeft: w(3), marginTop: w(1) }}
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
                  { fontFamily: 'poppinsemi' },
                  {color:activeColors.color}
                ]}
              >
                Time Created
              </Text>

            </View>
            <Pressable >
              <View style={{ flex: 0.7, flexDirection: 'row', alignItems: 'center' }}>
                <Input
                  label="00:00"
                  editable={true}
                  secure={false}
                  onUpdateValue={onChangeText.bind(this, "estimatedTime")}
                  value={enteredEstimatedTime}
                />

              </View>
            </Pressable>
          </View>

        </View>
        <View
          style={{
            margin: 8,
          }}
        >
          <Pressable
            style={{
              flex: 1,
            }}
            onPress={toggleModal}
          >
            <View style={{ flex: 1 }}>

              <Text style={[styles.headingText, {color:activeColors.color}]}>Assign Task To</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Input
                label="Assgin to"
                editable={false}
                value={AssginedForItem.toString()}
                secure={false}
                onUpdateValue={onChangeText.bind(this, "taskName")}
              />

            </View>

          </Pressable>
          <ModalHandler />
        </View>

        {/* Yes BUtton */}
        <View
          style={{
            margin: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.headingText,{color:activeColors.color}]}>QC Documents Mandatory</Text>
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
              <Pressable onPress={() => handleOptionPress("Yes")}>
                <View style={getOptionStyle("Yes")}>
                  <Text style={styles.viewText}>Yes</Text>
                </View>
              </Pressable>
              <Pressable onPress={() => handleOptionPress("No")}>
                <View style={getOptionStyle("No")}>
                  <Text style={styles.viewText}>NO</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>

        <View
          style={{
            margin: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={[styles.headingText,{color:activeColors.color}]}>Priority</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                padding: 3,
                justifyContent: "flex-start",
              }}
            >
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Pressable onPress={() => handleOptionPressPriority("Low")}>
                  <View style={getOptionStyle("Low")}>
                    <Text style={styles.viewText}>Low</Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => handleOptionPressPriority("Medium")}>
                  <View style={getOptionStyle("Medium")}>
                    <Text style={styles.viewText}>Medium</Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => handleOptionPressPriority("High")}>
                  <View style={getOptionStyle("High")}>
                    <Text style={styles.viewText}>High</Text>
                  </View>
                </Pressable>
                {/* <Pressable onPress={() => handleOptionPressPriority("Critical")}>
                <View style={getOptionStyle("Critical")}>
                  <Text style={styles.viewText}>Critical</Text>
                </View>
              </Pressable> */}
              </ScrollView>
            </View>
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
          <View style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                padding: 3,
                justifyContent: "flex-start",
              }}
            >
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Pressable onPress={() => handleOptionPressPriority2("Low")}>
                  <View style={getOptionStyle2("Low")}>
                    <Text style={styles.viewText}>Low</Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => handleOptionPressPriority2("Medium")}>
                  <View style={getOptionStyle2("Medium")}>
                    <Text style={styles.viewText}>Medium</Text>
                  </View>
                </Pressable>
                <Pressable onPress={() => handleOptionPressPriority2("High")}>
                  <View style={getOptionStyle2("High")}>
                    <Text style={styles.viewText}>High</Text>
                  </View>
                </Pressable>
                {/* <Pressable onPress={() => handleOptionPressPriority("Critical")}>
                <View style={getOptionStyle("Critical")}>
                  <Text style={styles.viewText}>Critical</Text>
                </View>
              </Pressable> */}
              </ScrollView>
            </View>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 30,
          }}
        >
          <SubmitButton
          
            onPress={() => {
              if (validateForm()) {
                const newTask = {
                  userid: userId, // You may want to generate a unique ID
                  task_name: enteredTaskName,
                  assign_to: AssginedForItem.toString(),
                  status: "Pending",
                  task_phase: enteredTaskPhase,
                  task_created_date: enteredDueDate,
                  time_alot: enteredEstimatedTime,
                  qc_doc: selectedOption,
                  priority: selectedPriority,
                  task_type: enteredTaskType,
                  task_complexity: selectedComplexity,
                  // Add other properties based on your form fields 
                };
                addNewTask(newTask); 
                // Toast.showWithGravity(
                //   "Project Added Sucessfully.",
                //   Toast.SHORT,
                //   Toast.BOTTOM
                // );
              } else {
                // Toast.showWithGravity(
                //   "Please fill all details.",
                //   Toast.SHORT,
                //   Toast.BOTTOM
                // );
              }
            }}
            color={"#e5af54"}
          >
            {" "}
            Add Task
          </SubmitButton>
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
export default AssignTaskForm;

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
    color: "black", fontSize: 18, fontFamily: 'poppinsemi',
  }
});
