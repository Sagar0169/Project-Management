import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BackArrowHeader from "../components/BackArrowHeader";
import { updateAssignedTaskStatus } from "../store/http";

export default function AssignedTaskDetails({ route }) {
  const item = route.params.ID;
  const storedProfile = route.params.storedProfile;
  const [isEditing, setEditing] = useState(false);
  const [editedStatus, setEditedStatus] = useState(route.params.ID.Status);
  console.log(storedProfile);
  const navigation = useNavigation();
  const isDeveloper = storedProfile === "Developer";

  const startEditing = () => {
    setEditing(true);
  };

  const statusChangeHandler = () => {
    // Only allow developers to change the status
    if (isDeveloper) {
      startEditing();
    } else {
      // Show a message or perform some action indicating that the user doesn't have permission
    }
  };

  const finishEditing = async () => {
    try {
      // Update the status in Firebase
      await updateAssignedTaskStatus(item.id, editedStatus);

      // End editing
      setEditing(false);
    } catch (error) {
      console.error("Error updating status in Firebase:", error);
      // Handle error
    }
  };

  const cancelEditing = () => {
    // Cancel editing and revert to the original status
    setEditing(false);
    setEditedStatus(item.Status);
  };

  const handleStatusChange = (text) => {
    setEditedStatus(text);
  };

  const color =
    editedStatus === "Completed"
      ? "#f6bb54"
      : editedStatus === "In Progress"
      ? "#9d9bff"
      : "#f5f5f5";

  return (
    <View style={styles.rootContainer}>
      <BackArrowHeader
        filter={true}
        title="Assigned Tasks Details"
        color="#e5af54"
        backButton={() => navigation.goBack()}
      />
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <View
          style={{
            margin: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontSize: 22, fontWeight: "500", textAlign: "center" }}
          >
            {item.title}
          </Text>
        </View>
        <View style={{ margin: 10, flexDirection: "row" }}>
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
            <Text style={{ color: "#666666" }}>Assigned To</Text>
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
              <Text style={{ marginHorizontal: 6, color: "#181818" }}>
                {item.Assigned}
              </Text>
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
            <Text style={{ color: "#666666" }}>Created By</Text>
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
              <Text style={{ marginHorizontal: 6, color: "#181818" }}>
                {item.Created}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView style={{ flex: 1, margin: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              margin: 8,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ color: "#666666", fontSize: 26 }}>Form Title</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "#666666",
                  fontSize: 16,
                  textAlign: "left",
                }}
              >
                {item.FormTitle}
              </Text>
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
            {isEditing ? (
              <View style={{ flex: 1 }}>
                <TextInput
                  style={{
                    backgroundColor: color,
                    borderRadius: 20,
                    fontSize: 22,
                    borderWidth: 1,
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    textAlign: "center",
                  }}
                  value={editedStatus}
                  onChangeText={handleStatusChange}
                />
                <View style={{ flexDirection: "row", marginTop: 8 }}>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={finishEditing}
                  >
                    <Text style={styles.editButtonText}>Done</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={cancelEditing}
                  >
                    <Text style={styles.editButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <Pressable
                onPress={statusChangeHandler}
                style={{ flex: 1, backgroundColor: color, borderRadius: 20 }}
              >
                <Text
                  style={{
                    color: "#666666",
                    fontSize: 22,
                    borderRadius: 20,
                    borderWidth: 1,
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    textAlign: "center",
                  }}
                >
                  {editedStatus}
                </Text>
              </Pressable>
            )}
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
              <Text
                style={{
                  color: "#666666",
                  fontSize: 16,
                  textAlign: "left",
                }}
              >
                {item.TaskPhase}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
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
              <Text style={{ color: "#666666" }}>Estimated Start Date</Text>
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
                <Text style={{ marginHorizontal: 6, color: "#181818" }}>
                  {item.StartDate}
                </Text>
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
                <Text style={{ marginHorizontal: 6, color: "#181818" }}>
                  `{item.time} hr`
                </Text>
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
                <Text style={styles.viewText}>{item.Qc}</Text>
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
                justifyContent: "flex-start",
              }}
            >
              <View style={styles.viewBoxBorder}>
                <Text style={styles.viewText}>{item.Priority}</Text>
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
              <Text style={{ color: "#666666", fontSize: 22 }}>Task Type</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "#666666",
                  fontSize: 16,
                  textAlign: "left",
                }}
              >
                {item.TaskType}
              </Text>
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
                <Text style={styles.viewText}>{item.TaskComplexity}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

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
});
