import React, { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Modal,
    TextInput,
} from "react-native";
import Toast from "react-native-simple-toast";
import DateTimePicker from "@react-native-community/datetimepicker";
import BottomSheetDesign2 from "./BottomSheetDesign2";
import BottomSheetDesign3 from "./BottomSheedDesign3";
import SubmitButton from "./ui/SubmitButton";




//CHANGE MULTIPLE SELECTION FROM BOTTOMSHEET2
// give todays date before hand


function AssignTaskForm() {
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
            </Modal>)
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
    const [AssginedForItem, setAssginedForItem] = useState('');
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

    return (
        <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>





            <ScrollView style={{ flex: 1, margin: 10 }}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        margin: 8,
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: "#666666", fontSize: 26 }}>Task Name</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            onChangeText={onChangeText.bind(this, "taskName")}
                            placeholder="Enter TaskName"
                            style={{
                                color: "#666666",
                                fontSize: 16,
                                textAlign: "left",
                                borderRadius: 3,
                                borderWidth: 1,
                                padding: 5,
                                borderColor: '#666666'
                            }}
                        >
                        </TextInput>
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
                        <Text style={{ color: "#666666", fontSize: 26 }}>Task Phase</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            onChangeText={onChangeText.bind(this, "taskPhase")}
                            placeholder="Enter Phase"
                            style={{
                                color: "#666666",
                                fontSize: 16,
                                textAlign: "left",
                                borderRadius: 3,
                                borderWidth: 1,
                                padding: 5,
                                borderColor: '#666666'
                            }}
                        >
                        </TextInput>
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
                    </View>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            onChangeText={onChangeText.bind(this, "taskType")}
                            placeholder="Enter Type"
                            style={{
                                color: "#666666",
                                fontSize: 16,
                                textAlign: "left",
                                borderRadius: 3,
                                borderWidth: 1,
                                padding: 5,
                                borderColor: '#666666'
                            }}
                        >
                        </TextInput>
                    </View>
                </View>

                <View style={{ flexDirection: "row", marginVertical: 8, }}>
                    <Pressable onPress={showDatePicker}>
                        <View
                            style={{
                                flex: 1,
                                margin: 4,
                                borderWidth: 2,
                                paddingVertical: 8,
                                paddingHorizontal: 8,
                                borderRadius: 10,
                                borderColor: "#eaeaea",
                            }}
                        >
                            <Text style={{ color: "#666666" }}>Due Date</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    source={require("../assets/Images/calendar.png")}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        resizeMode: "contain",
                                        margin: 4,
                                    }}
                                />
                                <TextInput editable={false} value={enteredDueDate} onChangeText={onChangeText.bind(this, "dueDate")} placeholder="enter Due Date" style={{ marginHorizontal: 6, color: "#181818" }}>
                                
                                </TextInput>
                            </View>
                        </View>
                    </Pressable>
                    <View
                        style={{
                            flex: 1,
                            margin: 4,
                            borderWidth: 2,
                            paddingVertical: 8,
                            paddingHorizontal: 8,
                            borderRadius: 10,
                            borderColor: "#eaeaea",
                        }}
                    >
                        <Text style={{ color: "#666666" }}>Estimated Hours</Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                        >
                            <Image
                                source={require("../assets/Images/watch.png")}
                                style={{
                                    width: 20,
                                    height: 20,
                                    resizeMode: "contain",
                                    margin: 4,
                                }}
                            />
                            <TextInput onChangeText={onChangeText.bind(this, "estimatedTime")} placeholder="Time" style={{ marginHorizontal: 6, color: "#181818" }}>

                            </TextInput>
                        </View>
                    </View>
                </View>
                <View style={{ marginVertical: 8, flexDirection: "row" }}>
                    <Pressable style={{
                        flex: 1,
                    }} onPress={toggleModal} >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                margin: 4,
                                borderWidth: 2,
                                paddingVertical: 8,
                                paddingHorizontal: 8,
                                borderRadius: 10,
                                borderColor: "#eaeaea",
                            }}
                        >

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    source={require("../assets/Images/user.png")}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        resizeMode: "contain",
                                        margin: 4,
                                    }}
                                />
                            </View>
                            <Text style={{ color: "#666666" }}>Assign Task To</Text>
                        </View>
                    </Pressable>
                    <ModalHandler />
                    <TextInput placeholder={AssginedForItem.toString()} style={{ marginHorizontal: 6, color: "#181818", fontSize: 16, flex: 1 }} />
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
                            QC Documents Mandatory
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
                            Task Complexity
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
                                Task Complexity</Text>
                        </View>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 40 }}>
                    <SubmitButton onPress={() => {
                        if (validateForm()) {
                            Toast.showWithGravity(
                                "Project Added Sucessfully.",
                                Toast.SHORT,
                                Toast.BOTTOM
                            );
                        } else {
                            Toast.showWithGravity(
                                "Please fill all details.",
                                Toast.SHORT,
                                Toast.BOTTOM
                            );
                        }
                    }} color={"#e5af54"}> Add Project</SubmitButton></View>
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
        color: "#DFA242",
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
