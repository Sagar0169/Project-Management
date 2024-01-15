import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import SubmitButton from "./ui/SubmitButton";
import DashboardData from "./DashboardData";


const ProjectDetails = ({ item,handleSportSelection,isSelected }) => {
  const backgroundColor = isSelected ? "#D58EEB91" : "#f5f5f5";
 
    return (
      <Pressable
      onPress={() => handleSportSelection(item.projectName)}
      style={[styles.itemContainer2, ]}
    >
      <View
        style={[{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          
          borderColor: isSelected ? "#4ec05a" : "#d68eeb",
          backgroundColor 
        }]}
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
  const [selectedItems, setSelectedItems] = useState([]);
  const members = ['Shreyash Jain (Android)', 'Nimish Sharma(Android)', 'Akshat Bansal (Android)', 'Sagar (Android)', 'Rohit (Java)', 'Aman pandey(Java)', 'Atul (Java)', 'Shubhra srivastava (php)', 'Yashika gupta (php)', 'Abhay sahani (Designer)', 'Jitendar singh (Designer)'];
  let lastMemberIndex = -1;
  const generateRandomProjectName = () => {
   
      lastMemberIndex = (lastMemberIndex + 1) % members.length;

     
      return members[lastMemberIndex];

  };

  const toggleSelection = (projectName) => {
    // Check if the item is already selected
    if (selectedItems.includes(projectName)) {
      // Item is selected, remove it from the selection
      setSelectedItems((prevSelected) =>
        prevSelected.filter((item) => item !== projectName)
      );
    } else {
      // Item is not selected, add it to the selection
      setSelectedItems((prevSelected) => [...prevSelected, projectName]);
    }
  };

  // Generate project data with random project names
  const projectData = Array.from({ length:11 }, (_, index) => ({
    projectName: generateRandomProjectName(),

  }));
  return (
    <View style={{flex:1}}>
       <View style={{ alignItems: 'center',marginTop:10 }}>
          <Text style={styles.modalTitle}>Select Members</Text>
        </View>
   <View style={{flex:1}}>
   <FlatList
      data={projectData}
      renderItem={({ item }) =>    
      <ProjectDetails
      item={item}
      handleSportSelection={toggleSelection}
      isSelected={selectedItems.includes(item.projectName)}
    />}
      keyExtractor={(item, index) => `${item.id}-${index}`}
    />
   </View>
   <View style={{ alignItems: 'center',marginTop:10, marginBottom:20 }}>
          <SubmitButton onPress={() => handleSportSelection(selectedItems)} color='black'>Add</SubmitButton>
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