import { View, Text, Dimensions, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackArrowHeader from '../components/BackArrowHeader';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CheckIn } from '../components/Data';
import ChecklistData from '../components/ChecklistData';
import * as Location from "expo-location";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
  reverseGeocodeAsync,
} from "expo-location";
import { getAddress } from '../store/search-redux';
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
export default function CheckInLayout({navigation}) {
//   const [location, setLocation] = useState('');
// const [locationPermissionInformation, requestPermission] =
//   useForegroundPermissions();

//   useEffect(() => {
//     async function verifyPermissions() {

//       if (
//         locationPermissionInformation===null
//       ) {
//         const permissionResponse = await requestPermission();
//         return permissionResponse.granted;
//       }
//       if (
//         locationPermissionInformation.status === PermissionStatus.UNDETERMINED
//       ) {
//         const permissionResponse = await requestPermission();
//         return permissionResponse.granted;
//       }
//       if (locationPermissionInformation.status === PermissionStatus.DENIED) {
//         // Alert.alert("Permissions Denied, Go Back");
//         // return false;
//         const permissionResponse = await requestPermission();
//         return permissionResponse.granted;
//       }
//       return true;
//     }

//     async function locationHandler() {
//       const hasPermission = await verifyPermissions();
//       if (!hasPermission) {
//         return;
//       }
//       const resultedLoc = await getCurrentPositionAsync();
//       console.log(resultedLoc);
//       // setLocation(resultedLoc)
//       const response = await reverseGeocodeAsync({
//         latitude: resultedLoc.coords.latitude,
//         longitude: resultedLoc.coords.longitude,
//       });
//       console.log("data" + response[0]);
//       // const locationFinal = getAddress(
//       //   resultedLoc.coords.latitude,
//       //   resultedLoc.coords.longitude
//       // );
//       // setLocation(locationFinal);
//       // console.log(location._j)
//     }
//     locationHandler();
//   }, []);
const [address, setAddress] = useState("");

  useEffect(() => {
    // Get current location
    const getCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          console.error("Location permission denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        console.log("loc" + reverseGeocode[0]?.name);
        // Build address from available components
        const addressComponents = [
          reverseGeocode[0]?.name,

          reverseGeocode[0]?.street,
          reverseGeocode[0]?.district,
          reverseGeocode[0]?.city,
          reverseGeocode[0]?.region,
          reverseGeocode[0]?.country,
        ];

        const formattedAddress = addressComponents.filter(Boolean).join(", ");
        setAddress(formattedAddress);
        console.log("loc" + JSON.stringify(reverseGeocode, null, 2));
        console.log("loc" + formattedAddress);
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };
    // Verify camera permissions

    // Get current location and verify camera permissions
    getCurrentLocation();
  }, []);




  function renderMealItem(itemData){
    const item=itemData.item
    const mealsDetails={
      // id:item.id,
      //  project:item.project.title,
      //  task:item.task.title,
      //  activity:item.activity.title,
      //  workingHours:item.formattedWorkingHours,
      //  taskStatus:item.status.title,
      


       
  }
  // const mealFullDetails={

  // }
  // function onPressHandler(){
  //   navigation.navigate("MealsDetailsScreen",{...mealsDetails})
  // }
      return <ChecklistData  {...mealsDetails}  />
  }

   function handleAddTaskPress()  {
    getCurrentLocation();
    // if(location._j)
    //   console.log(location._j)
  }
  return (
    <View style={styles.rootContainer}>
    <BackArrowHeader color={"black"} title={"Check In/Out"} backButton={()=>navigation.goBack()}/>
    <View style={{flex:1,backgroundColor:"white"}}>
      <View style={{}}>
      <FlatList data={CheckIn} keyExtractor={(item)=>item.id} renderItem={renderMealItem}/>
        
      
    {address&&<Text >{address}</Text>}

   
  
      </View>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: "#000000" }]}
        onPress={()=>handleAddTaskPress}
      >
        <MaterialCommunityIcons name="plus" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
    </View>

  )
}
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#000",
  }
  ,
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  }
  ,
});