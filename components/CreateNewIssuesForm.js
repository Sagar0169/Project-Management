import { useNavigation } from "@react-navigation/native";
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
import Toast from "react-native-simple-toast";

import BottomSheetDesign2 from "./BottomSheetDesign2";
import AssignedForData from "./AssignedForData";
import DropDown from "./TimeSheet/DropDown";
import { ProjectGroup, Status, TaskGroup, Tasks } from "./Data";



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
            </Modal>)
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
                        <Text style={{ color: "#666666", fontSize: 26 }}>Project </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <DropDown
                            data={ProjectGroup}
                            selectValue={selectedProject}
                            oneSelect={handleSelectProject}
                            hi={h(2)}
                            wi={w(2)}
                        />
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
                        <Text style={{ color: "#666666", fontSize: 26 }}>Project Task</Text>
                    </View>
                    <View style={{ flex: 1 }}>
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
                        flexDirection: "row",
                        alignItems: "center",
                        margin: 8,
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Text style={{ color: "#666666", fontSize: 26 }}>Title</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TextInput
                            onChangeText={onChangeText.bind(this, "taskName")}
                            placeholder="Enter Title"
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
                        <Text style={{ color: "#666666", fontSize: 26 }}>Description</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TextInput

                            multiline={true}
                            onChangeText={onChangeText.bind(this, "taskPhase")}
                            placeholder="Enter Phase"
                            numberOfLines={4}
                            style={{
                                color: "#666666",
                                fontSize: 16,
                                textAlign: "left",
                                borderRadius: 3,
                                borderWidth: 1,
                                padding: 5,
                                borderColor: '#666666',
                                paddingVertical: w(1),
                                flex: 1,
                                maxHeight: h(10),
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
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
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
                <View style={{ marginVertical: 8, flexDirection: "row" }}>
                 

                        <View
                            style={{
                                flex:.5,
                                justifyContent: 'center',
                                margin: 4,
                                borderWidth: 2,
                                paddingVertical: 8,
                                paddingHorizontal: 8,
                                borderRadius: 10,
                                borderColor: "#eaeaea",
                            }}
                        >
                            <Text style={{ color: "#666666" }}>Created by</Text>

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
                                <Text style={{ color: "#666666" }}>Super Admin</Text>
                            </View>

                        </View>
                  

                </View>

                <View style={{ flexDirection: "row", marginVertical: 8, }}>
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
                        <Text style={{ color: "#666666" }}>Date Created</Text>
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
                            <TextInput onChangeText={onChangeText.bind(this, "dueDate")} placeholder="enter Due Date" style={{ marginHorizontal: 6, color: "#181818" }}>

                            </TextInput>
                        </View>
                    </View>
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
                        <Text style={{ color: "#666666" }}>Time Created</Text>
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
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                            <Pressable onPress={() => handleOptionPressPriority("Low")} >
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
                    }} color={"#8e8cf3"}> Add Issue</SubmitButton></View>
            </ScrollView>
        </View>
    )
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
