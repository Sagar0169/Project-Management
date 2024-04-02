import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image
} from "react-native";
import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getEmp } from "../store/http";
import { getProjects } from "../store/http";
import SubmitButton from "./ui/SubmitButton";
import BackArrowHeader from "../components/BackArrowHeader";



const ProjectDetails = ({ item,handleSportSelection,isSelected }) => {
  const backgroundColor = isSelected ? "#E9EEFF" : "#f5f5f5";
 
    return (
      <Pressable
      onPress={() => handleSportSelection(item.project_name,item.emp_id)}
      style={[styles.itemContainer2, ]}
    >
      <View
        style={[{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          
          borderColor: isSelected ? "#E9EEFF" : "#E9EEFF",
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
          <Text style={styles.text2}>{item.project_name}</Text>
        </View>
      </View>
    </Pressable>
  
    );

};


const BottomSheetProjectList = ({handleSportSelection,onBack}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemIDs, setSelectedItemIDs] = useState([]);

  

  const [task, setTask] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [storedProfile, setStoreProfile] = useState("");

  const fetchStoredProfile = useCallback(async () => {
    try {
      setStoreProfile(await AsyncStorage.getItem("profile"));

      if (storedProfile !== null) {
        console.log("Stored Profile:", storedProfile);
      } else {
        console.log("Profile not found in AsyncStorage");
      }
    } catch (error) {
      console.error("Error fetching profile from AsyncStorage:", error);
    }
  }, [storedProfile]);

  useEffect(() => {
    fetchStoredProfile();
  }, [fetchStoredProfile]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsFetching(true);

      try {
        
        let expenses;
        const loginRespone = await AsyncStorage.getItem("user");
        const response = JSON.parse(loginRespone);
        if (storedProfile === "super admin") {
          const tasks = await getProjects(
            response.userId,
            response.token,
            response.emp_id
          );
          
          expenses = tasks;
        } else {
          const tasks = await getProjects(
            response.userId,
            response.token,
            response.emp_id
          );
          
          expenses = tasks;
        }

        if (isMounted) {
          setTask(expenses);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        if (isMounted) {[]
          setIsFetching(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [storedProfile]);

  const toggleSelection = (projectName, projectid) => {
    // Check if the item is already selected
    if (selectedItems === projectName) {
      // If the clicked project is already selected, deselect it
      setSelectedItems(null);
      setSelectedItemIDs(null);
    } else {
      // Select the clicked project
      setSelectedItems(projectName);
      setSelectedItemIDs(projectid);
    }
  };

  // Generate project data with random project names


  
 
  return (
    <View style={{flex:1}}>
      
       <View style={{ alignItems: 'center', justifyContent:'space-between',marginTop:10, flexDirection:'row', marginEnd:20 }}>
        <Pressable onPress={onBack}>

        
        <View style={{backgroundColor:'white', alignItems:'flex-start', marginLeft:10}}>
        <Image
            style={{
              width: 40,
              height: 40,
              resizeMode: "cover",
                
            }}
            source={require("../assets/Images/leftArrow.png")}
          />
      
        </View>
        </Pressable>
      <View style={{ flex:9 ,alignItems:'center'}}>
      <Text style={styles.modalTitle}>Select Project</Text>
      </View>
          
        </View>
      
   <View style={{flex:1}}>
   <FlatList
      data={task}
      renderItem={({ item }) =>    
      <ProjectDetails
      item={item}
      handleSportSelection={toggleSelection}
      isSelected={selectedItems.includes(item.project_name)}
    />}
    keyExtractor={(item, index) => `${item}-${index}`}

    />
   </View>
   <View style={{ alignItems: 'center',marginTop:10, marginBottom:20 }}>
          <SubmitButton onPress={() => handleSportSelection(selectedItems,selectedItemIDs)} color='black'>Add</SubmitButton>
        </View>
   
     </View>
  );
};

const styles = StyleSheet.create({

  itemContainer2: {
    backgroundColor: "#E9EEFF",
    flex: 1,
    elevation: 6,
    marginHorizontal: 20,
    marginVertical: 12,
    
   
    borderColor:'#E9EEFF'
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
    justifyContent:'center',
    alignItems: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
},
});

export default BottomSheetProjectList;