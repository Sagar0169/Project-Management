import React, { useContext } from "react";
import { useState, useRef, useEffect } from "react";
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
import SubmitButton from "./ui/SubmitButton";
// import Toast from "react-native-simple-toast";

import BottomSheetDesign2 from "./BottomSheetDesign2";
import DropDown from "./TimeSheet/DropDown";
import { ProjectGroup, Status, TaskGroup, Tasks } from "./Data";
import CustomModal from "./CustomModal";
import Input from "./Input";
import { Svg, SvgXml } from "react-native-svg";
import { Svg6 } from "./svgs/svgs";
import BackArrowHeader from "./BackArrowHeader";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "./config/theme";

//CHANGE MULTIPLE SELECTION FROM BOTTOMSHEET2

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

function IssuesDetails({ navigation }) {
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const {theme}=useContext(ThemeContext)
  let activeColors=colors[theme.mode]
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
          {/* <BottomSheet sports={['Shreyash Jain (Android)', 'Nimish Sharma(Android)', 'Akshat Bansal (Android)', 'Sagar (Android)', 'Rohit (Java)', 'Aman pandey(Java)', 'Atul (Java)', 'Shubhra srivastava (php)', 'Yashika gupta (php)', 'Abhay sahani (Designer)', 'Jitendar singh (Designer)']} handleSportSelection={handleSportSelection} /> */}
          <BottomSheetDesign2 handleSportSelection={handleSportSelection} />
        </View>
      </Modal>
    );
  }
  const [enteredTaskName, setEnteredTaskName] = useState("");
  const [enteredTaskPhase, setEnteredTaskPhase] = useState("");
  const [enteredTaskType, setEnteredTaskType] = useState("");
  const [enteredDueDate, setEnteredDueDate] = useState("");
  const [enteredEstimatedTime, setEnteredEstimatedTime] = useState("");
  const [selectedProject, setSelectedproject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isEditEnabled, setIsEditEnabled] = useState(false);

  const handleSelectProject = (category) => {
    setSelectedproject(category);
    // Add any additional logic you want when a category is selected
  };
  const handleSelectTask = (category) => {
    setSelectedTask(category);
    // Add any additional logic you want when a category is selected
  };
  const handleSelectStatus = (category) => {
    setSelectedStatus(category);
    // Add any additional logic you want when a category is selected
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
  const handleOptionPress = (option) => {
    setSelectedOption(option);
  };
  const handleOptionPressPriority = (option) => {
    setSelectedPriority(option);
  };
  const getOptionStyle = (option) => {
    if (selectedOption === option || selectedPriority === option) {
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
  const hideModal = () => {
    setModalVisible2(false);
    setModalVisible3(false);
  };

  function handlerBack() {
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1, backgroundColor:activeColors.background, paddingTop: w(6) }}>
      <BackArrowHeader
        backButton={handlerBack}
        title="Issue Details"
        color={"#ffffff"}
        textColor="#2D2C2E"
      />

      <ScrollView style={{ flex: 1, margin: 10 }}>
        <View
          style={{
            margin: 8,
          }}
        >
          <View>
            <Text style={{ color: activeColors.color, fontSize: dynamicFontSize * 1 }}>
              Project{" "}
            </Text>
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
                  backgroundColor:activeColors.blackBgg,
                  borderBottomColor: "#DCDCDC",
                  fontSize: 16,
                  color: activeColors.color,
                  width: "100%",
                }}
              >
                Project Name
              </TextInput>
            </View>
          </View>
        </View>
        <View
          style={{
            margin: 8,
          }}
        >
          <View>
            <Text style={{ color: activeColors.color, fontSize: dynamicFontSize * 1 }}>
              Project Task
            </Text>
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
              Project Task Name
            </TextInput>
          </View>
        </View>
        <View
          style={{
            margin: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ color: activeColors.color, fontSize: dynamicFontSize * 1 }}>
              Title
            </Text>
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
              Project Title
            </TextInput>
          </View>
        </View>

        <View
          style={{
            margin: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ color:activeColors.color, fontSize: dynamicFontSize * 1 }}>
              Description
            </Text>
            <ScrollView
              style={{
                borderWidth: 1,
                borderColor: "#8A96D3",
                borderRadius: 1,
                marginVertical: 8,
                backgroundColor: activeColors.blackBgg,
                paddingVertical: w(1),
                paddingHorizontal: w(1),
              }}
            >
              <Text
                style={{
                  fontSize: dynamicFontSize * 0.8,
                  textAlign: "left",
                  color: activeColors.color,
                  height: 100,
                }}
              >
                There are varieties of ways in which history can be organized,
                including chronologically, culturally, territorially, and
                thematically. These divisions are not mutually exclusive, and
                significant intersections are present. It is possible for
                historians to concern themselves with both the very specific and
                the very general, though the trend has been toward
                specialization. The area called Big History resists this
                specialization, and searches for universal patterns or trends.
                History has often been studied with some practical or
                theoretical aim, but may be studied out of simple intellectual
                curiosity.
              </Text>
            </ScrollView>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ color:activeColors.color, fontSize: dynamicFontSize * 1 }}>
              Task Type
            </Text>
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
                Project Task Type
              </TextInput>
            </View>
          </View>
        </View>
        <View
          style={{
            margin: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ color: activeColors.color, fontSize: dynamicFontSize * 1 }}>
              Status
            </Text>
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
              Project status
            </TextInput>
          </View>
        </View>
        <View style={{ marginHorizontal: 8 }}>
          <Text style={{ color: activeColors.color, fontSize: dynamicFontSize * 1 }}>
            Created by
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              borderWidth: 1,
              borderColor: "#8A96D3",
              borderRadius: 1,
              paddingVertical: 10,
              paddingHorizontal: 8,
              marginVertical: 8,
              backgroundColor: activeColors.blackBgg,
              flexDirection: "row", // Add this line to align items horizontally
              alignItems: "center",
            }}
          >
            <Text style={{ color:activeColors.color, fontSize: dynamicFontSize * 0.8 }}>
              Super Admin
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 8,
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
                  {
                    maxWidth: w(30),
                    marginEnd: w(5),
                    color: activeColors.color,
                    fontSize: dynamicFontSize * 1,
                  },
                ]}
              >
                Date Created
              </Text>
            </View>
            <Pressable>
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
                  Project Date
                </TextInput>
                <SvgXml
                  xml={Svg6}
                  width="20"
                  height="20"
                  style={{ marginLeft: w(-5) }}
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
                  {
                    maxWidth: w(30),
                    marginEnd: w(5),
                    color: activeColors.color,
                    fontSize: dynamicFontSize * 1,
                  },
                ]}
              >
                Time Created
              </Text>
            </View>
            <Pressable>
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
                  Project Time Created
                </TextInput>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Yes BUtton */}

        <View style={{ marginHorizontal: 8, marginVertical: 6 }}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.headingText,{color:activeColors.color}]}>Issue Test Phase</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {/* #####################################################fix this##################################33 */}
            <Pressable>
              <View style={styles.viewBox}>
                <Text style={styles.viewText}>Review</Text>
              </View>
            </Pressable>
            <Pressable>
              <View style={styles.viewBox}>
                <Text style={styles.viewText}>Testing</Text>
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
            {/* #####################################################fix this##################################33 */}
            <Pressable>
              <View style={styles.viewBox}>
                <Text style={styles.viewText}>Low</Text>
              </View>
            </Pressable>
            <Pressable>
              <View style={styles.viewBox}>
                <Text style={styles.viewText}>Medium</Text>
              </View>
            </Pressable>
            <Pressable>
              <View style={styles.viewBox}>
                <Text style={styles.viewText}>High</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View style={{ margin: 8 }}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.headingText,{color:activeColors.color}]}>Severity</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {/* #####################################################fix this##################################33 */}
            <Pressable>
              <View style={styles.viewBox}>
                <Text style={styles.viewText}>Severity</Text>
              </View>
            </Pressable>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <SubmitButton
            onPress={() => {
              if (validateForm()) {
                // Toast.showWithGravity(
                //     "Project Added Sucessfully.",
                //     Toast.SHORT,
                //     Toast.BOTTOM
                // );
                setModalVisible(true);
              } else {
                // Toast.showWithGravity(
                //     "Please fill all details.",
                //     Toast.SHORT,
                //     Toast.BOTTOM
                // );
                setModalVisible3(true);
              }
            }}
            color={"#8e8cf3"}
          >
            {" "}
            Add Issue
          </SubmitButton>
        </View>

        {/* Toast */}
        {isModalVisible2 && (
          <CustomModal
            visible={isModalVisible2}
            message="New Issue Created."
            onHide={hideModal}
          />
        )}
        {isModalVisible3 && (
          <CustomModal
            visible={isModalVisible3}
            message="Please fill all details."
            onHide={hideModal}
          />
        )}
      </ScrollView>
    </View>
  );
}
export default IssuesDetails;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#e5af54",
  },
  viewBox: {
    backgroundColor: "#f5f5f5",
    elevation: 2,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  viewBoxBorder: {
    backgroundColor: "#f5f5f5",
    elevation: 2,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: "black",
  },

  viewText: {
    color: "#8e8cf3",
    fontSize: 20,
    marginHorizontal: 4,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-end",
  },
  headingText: {
    color: "black",
    fontSize: dynamicFontSize * 1,
  },
});
