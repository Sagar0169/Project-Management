import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";

const ProjectDetails = ({ item,handleSportSelection }) => {
 
    return (
      <Pressable onPress={() => handleSportSelection(item.projectName)} style={styles.itemContainer2}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignItems: "center",
            borderColor: "#4ec05a",
          }}
        >
          <View
            style={{
              flex: 1,
              marginStart: 8,
              marginVertical: 14,
            }}
          >
            <Text style={styles.text2}>{item.projectName}</Text>
          </View>
        </View>
      </Pressable>
    );

};

const BottomSheetDesign2 = ({handleSportSelection}) => {
  const generateRandomProjectName = () => {
    const adjectives = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"];
    const members = ['Shreyash Jain (Android)', 'Nimish Sharma(Android)', 'Akshat Bansal (Android)', 'Sagar (Android)', 'Rohit (Java)', 'Aman pandey(Java)', 'Atul (Java)', 'Shubhra srivastava (php)', 'Yashika gupta (php)', 'Abhay sahani (Designer)', 'Jitendar singh (Designer)'];
    // const nouns = ["Project", "Task", "Assignment", "Job", "Mission"];
    const randomAdjective =
      members[Math.floor(Math.random() * members.length)];
    // const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${randomAdjective}`;
  };

  // Generate project data with random project names
  const projectData = Array.from({ length: 20 }, (_, index) => ({
    projectName: generateRandomProjectName(),
    progress: Math.random(),
    riskPriority: index % 3 === 0 ? "low" : index % 3 === 1 ? "medium" : "high",
  }));
  return (
    <View style={{flex:1}}>
       <View style={{ alignItems: 'center',marginTop:10 }}>
          <Text style={styles.modalTitle}>Select Members</Text>
        </View>
   <View style={{flex:1}}>
   <FlatList
      data={projectData}
      renderItem={({ item }) => <ProjectDetails item={item} handleSportSelection={handleSportSelection} />}
      keyExtractor={(item, index) => `${item.id}-${index}`}
    />
   </View>
   
     </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 15,
    overflow: "hidden",
  },
  itemContainer2: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    elevation: 6,
    marginHorizontal: 20,
    marginVertical: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor:'#d68eeb'
  },
  gradient: {
    flex: 1,
    borderRadius: 15,
    alignItems: "center",
    paddingVertical: 20,
    justifyContent: "center",
  },
  image: {
    width: 55,
    height: 55,
    resizeMode: "contain",
    marginBottom: 8,
  },
  image2: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 8,
  },
  text: {
    width: 200,
    color: "black",
    fontSize: 12,
    marginHorizontal: 6,
    marginEnd: 8,
  },
  text2: {
    color: "black",
    fontSize: 16,
    marginHorizontal: 4,
    fontWeight: "600",
  },
  modalTitle: {
    fontSize: 18,

    alignItems: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
},
});

export default BottomSheetDesign2;