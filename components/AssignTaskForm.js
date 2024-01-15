import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useState } from "react";
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
import TasksData from "../components/TasksData";

import BottomSheetDesign2 from "./BottomSheetDesign2";
import AssignedForData from "./AssignedForData";

function AssignTaskForm() {
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
  const [isModalVisible, setModalVisible] = useState(false);
  const [AssginedForItem, setAssginedForItem] = useState("");
const [taskName, setTaskName] = useState("");
  const [taskPhase, setTaskPhase] = useState("");
  const [taskType, setTaskType] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estimatedHours, setEstimatedHours] = useState("");
  const [Assigned, setAssignedTo] = useState('');
  const [qcDocumentsMandatory, setQCDocumentsMandatory] = useState("");
  const [priority, setPriority] = useState("");
  const [taskComplexity, setTaskComplexity] = useState("");
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSportSelection = (sport) => {
    setAssignedTo(sport)
    setAssginedForItem(sport);
    toggleModal();
  };
  const addAssignedForItem = () => {
    const newTask = {
          id: Math.random().toString(),
          taskName,
      taskPhase,
      taskType,
      dueDate,
      estimatedHours,
      Assigned,
      qcDocumentsMandatory,
      priority,
      taskComplexity,
    };

    // Update TasksData with the new task
    TasksData.push(newTask);

    // Reset form state
    setTaskName("");
    setTaskPhase("");
    setTaskType("");
    setDueDate("");
    setEstimatedHours("");
    setAssignedTo("");
    setQCDocumentsMandatory("");
    setPriority("");
    setTaskComplexity("");

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
              placeholder="Enter TaskName"
value={taskName}
              onChangeText={setTaskName}
              style={{
                color: "#666666",
                fontSize: 16,
                textAlign: "left",
                borderRadius: 3,
                borderWidth: 1,
                padding: 5,
                borderColor: "#666666",
              }}
            ></TextInput>
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
              placeholder="Enter Phase"
value={taskPhase}
              onChangeText={setTaskPhase}
              style={{
                color: "#666666",
                fontSize: 16,
                textAlign: "left",
                borderRadius: 3,
                borderWidth: 1,
                padding: 5,
                borderColor: "#666666",
              }}
            ></TextInput>
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
              placeholder="Enter Type"
value={taskType}
              onChangeText={setTaskType}
              style={{
                color: "#666666",
                fontSize: 16,
                textAlign: "left",
                borderRadius: 3,
                borderWidth: 1,
                padding: 5,
                borderColor: "#666666",
              }}
            ></TextInput>
          </View>
        </View>

        <View style={{ flexDirection: "row", marginVertical: 8 }}>
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
              <TextInput
                placeholder="enter Due Date"
value={dueDate}
                onChangeText={setDueDate}
                style={{ marginHorizontal: 6, color: "#181818" }}
              ></TextInput>
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
              <TextInput
                placeholder="Time"
value={estimatedHours}
                onChangeText={setEstimatedHours}
                style={{ marginHorizontal: 6, color: "#181818" }}
              ></TextInput>
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 8, flexDirection: "row" }}>
          <Pressable
            style={{
              flex: 1,
            }}
            onPress={toggleModal}
          >
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
          <TextInput
            placeholder={AssginedForItem.toString()}
            value={Assigned}
            style={{
              marginHorizontal: 6,
              color: "#181818",
              fontSize: 16,
              flex: 1,
            }}
          />
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
            <View style={styles.viewBox}>
              <Text style={styles.viewText}>Yes</Text>
            </View>
            <View style={styles.viewBox}>
              <Text style={styles.viewText}>NO</Text>
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
              <View style={styles.viewBox}>
                <Text style={styles.viewText}>Low</Text>
              </View>
              <View style={styles.viewBox}>
                <Text style={styles.viewText}>Medium</Text>
              </View>
              <View style={styles.viewBox}>
                <Text style={styles.viewText}>High</Text>
              </View>
              <View style={styles.viewBox}>
                <Text style={styles.viewText}>Critical</Text>
              </View>
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
            <Pressable onPress={addAssignedForItem}style={styles.viewBox}>
              <Text style={styles.viewText}>Task Complexity</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
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
