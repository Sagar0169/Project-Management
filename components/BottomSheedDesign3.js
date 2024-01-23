import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import SubmitButton from "./ui/SubmitButton";

const ProjectDetails = ({ item, handleSportSelection, isSelected }) => {
  const backgroundColor = isSelected ? "#e5af54" : "#f5f5f5";

  return (
    <Pressable
      onPress={() => handleSportSelection(item.projectName)}
      style={[styles.itemContainer2, { backgroundColor }]}
    >
      <View style={styles.itemContainer2Content}>
        <Text style={styles.text2}>{item.projectName}</Text>
      </View>
    </Pressable>
  );
};

const BottomSheetDesign3 = ({ handleSportSelection }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const members = [
    'Shreyash Jain (Android)', 'Nimish Sharma(Android)', 'Akshat Bansal (Android)',
    'Sagar (Android)', 'Rohit (Java)', 'Aman pandey(Java)', 'Atul (Java)',
    'Shubhra srivastava (php)', 'Yashika gupta (php)', 'Abhay sahani (Designer)',
    'Jitendar singh (Designer)'
  ];

  const toggleSelection = (projectName) => {
    // If the same item is selected again, unselect it
    const newSelectedItem = selectedItem === projectName ? null : projectName;
    setSelectedItem(newSelectedItem);
  };

  const projectData = members.map((projectName, index) => ({
    id: index.toString(),
    projectName,
  }));

  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Text style={styles.modalTitle}>Select Member</Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={projectData}
          renderItem={({ item }) => (
            <ProjectDetails
              item={item}
              handleSportSelection={toggleSelection}
              isSelected={selectedItem === item.projectName}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={{ alignItems: "center", marginTop: 10, marginBottom: 20 }}>
        <SubmitButton
          onPress={() => handleSportSelection(selectedItem)}
          color="black"
        >
          Add
        </SubmitButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer2: {
    flex: 1,
    elevation: 6,
    marginHorizontal: 20,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#e5af54",
  },
  itemContainer2Content: {
    flex: 1,
    marginStart: 8,
    marginVertical: 14,
  },
  text2: {
    color: "black",
    fontSize: 16,
    marginHorizontal: 4,
    fontWeight: "600",
  },
  modalTitle: {
    fontSize: 18,
    alignItems: "center",
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default BottomSheetDesign3;
