import React from "react";
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

function CreateNewIssuesForm() {
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [isModalVisible3, setModalVisible3] = useState(false);

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


    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>





            <ScrollView style={{ flex: 1, margin: 10 }}>
                <View
                    style={{


                        margin: 8,
                    }}
                >
                    <View >
                        <Text style={{ color: "black", fontSize: 26 }}>Project </Text>
                        <View >
                            <DropDown
                                data={ProjectGroup}
                                selectValue={selectedProject}
                                oneSelect={handleSelectProject}
                                hi={h(2)}
                                wi={w(2)}
                            />
                        </View>
                    </View>

                </View>
                <View
                    style={{

                        margin: 8,
                    }}
                >
                    <View >
                        <Text style={{ color: "black", fontSize: 26 }}>Project Task</Text>
                    </View>
                    <View >
                        <DropDown
                            data={Tasks}
                            selectValue={selectedTask}
                            oneSelect={handleSelectTask}
                            hi={h(2)}
                            wi={w(2)}
                        />
                    </View>
                </View>
                <View
                    style={{

                        margin: 8,
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: "black", fontSize: 26 }}>Title</Text>
                    </View>
                    <View style={{ marginHorizontal: w(1) }}>
                        <Input
                            label="Enter Title"
                            secure={false}
                            onUpdateValue={onChangeText.bind(this, "taskName")}
                            value={enteredTaskName}
                        />
                    </View>
                </View>


                <View
                    style={{

                        margin: 8,
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: "black", fontSize: 26 }}>Description</Text>
                        <View style={{ marginHorizontal: w(1) }}>
                            <TextInput
                                multiline={true}
                                onChangeText={onChangeText.bind(this, "taskPhase")}
                                numberOfLines={4}
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#8A96D3',
                                    borderRadius: 1,
                                    marginVertical: 8,
                                    backgroundColor: '#E9EEFF',
                                    flexDirection: 'row', // Add this line to align items horizontally
                                    alignItems: 'center',
                                    fontSize: dynamicFontSize * .8,
                                    textAlign: "left",
                                    paddingVertical: w(1),
                                    flex: 1,
                                    maxHeight: h(10),
                                }}
                            >
                            </TextInput>

                        </View>
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
                        <Text style={{ color: "#666666", fontSize: 26 }}>Task Type</Text>
                        <View style={{ marginHorizontal: w(1) }}>
                            <Input
                                label="Enter Type"
                                secure={false}
                                onUpdateValue={onChangeText.bind(this, "taskType")}
                                value={enteredTaskType}
                            />
                        </View>
                    </View>

                </View>
                <View
                    style={{

                        margin: 8,
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: "#666666", fontSize: 26 }}>Status</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <DropDown
                            data={Status}
                            selectValue={selectedStatus}
                            oneSelect={handleSelectStatus}
                            hi={h(2)}
                            wi={w(2)}
                        />
                    </View>
                </View>
                <View style={{ margin: 8 }}>



                    <Text style={{ color: "#5063BF", fontSize: dynamicFontSize * 1 }}>Created by</Text>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: '#8A96D3',
                            borderRadius: 1,
                            paddingVertical: 10,
                            paddingHorizontal: 8,
                            marginVertical: 8,
                            backgroundColor: '#E9EEFF',
                            flexDirection: 'row', // Add this line to align items horizontally
                            alignItems: 'center',
                        }}
                    >

                        <Text style={{ color: "#666666", fontSize: dynamicFontSize * .8 }}>Super Admin</Text>
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

                                    { maxWidth: w(30), marginEnd: w(5) },

                                ]}
                            >
                                Date Created
                            </Text>

                        </View>
                        <Pressable >
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

                                    { maxWidth: w(30), marginEnd: w(5) },

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

        {/* Yes BUtton */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            margin: 8,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#666666", fontSize: 22 }}>
              Issue Test Phase
            </Text>
          </View>
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
                <Text style={styles.viewText}>Review</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handleOptionPress("No")}>
              <View style={getOptionStyle("No")}>
                <Text style={styles.viewText}>Testing</Text>
              </View>
            </Pressable>
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
            <Text style={{ color: "#666666", fontSize: 22 }}>Priority</Text>
          </View>
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
              <Pressable onPress={() => handleOptionPressPriority("Critical")}>
                <View style={getOptionStyle("Critical")}>
                  <Text style={styles.viewText}>Critical</Text>
                </View>
              </Pressable>
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
                        <Text style={{ color: "#666666", fontSize: 22 }}>
                            Severity
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "flex-start",
                        }}
                    >
                        <View style={styles.viewBox}>
                            <Text style={styles.viewText}>
                                Severity</Text>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 40 }}>
                    <SubmitButton onPress={() => {
                        if (validateForm()) {
                            // Toast.showWithGravity(
                            //     "Project Added Sucessfully.",
                            //     Toast.SHORT,
                            //     Toast.BOTTOM
                            // );
                            setModalVisible(true)
                        } else {
                            // Toast.showWithGravity(
                            //     "Please fill all details.",
                            //     Toast.SHORT,
                            //     Toast.BOTTOM
                            // );
                            setModalVisible3(true)
                        }
                    }} color={"#8e8cf3"}> Add Issue</SubmitButton></View>

                {/* Toast */}
                {isModalVisible2 && <CustomModal
                    visible={isModalVisible2}
                    message="New Issue Created."
                    onHide={hideModal}
                />}
                {isModalVisible3 && <CustomModal
                    visible={isModalVisible3}
                    message="Please fill all details."
                    onHide={hideModal}
                />}

            </ScrollView>
        </View>
   
  );
}
export default CreateNewIssuesForm;

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
});
