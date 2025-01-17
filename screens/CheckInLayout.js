import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import BackArrowHeaderCopy from "../components/BackArrowHeader copy";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CheckIn } from "../components/Data";
import ChecklistData from "../components/ChecklistData";
import * as Location from "expo-location";
import { getCheckInList, postCheckIn } from "../store/http";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
  reverseGeocodeAsync,
} from "expo-location";
import { getAddress } from "../store/search-redux";
import { fetchCheckIn, storeCheckIn } from "../store/http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../components/config/theme";
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
export default function CheckInLayout({ navigation }) {
  const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  // Function to get the current time in 'HH:mm' format
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };
  const [loading, setLoading] = useState(true);
  const [getAdd, setAddTrue] = useState(false);
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [checkedIn, setCheckedIn] = useState(true);
  const [checkedInNumeric, setCheckedInNumeric] = useState(1);
  const [fetch, setFetch] = useState(false);

  const {theme}=useContext(ThemeContext)
  let active=colors[theme.mode]

  function checkIn() {
    if(checkedInNumeric==1){
    setCheckedIn(true);}
    else if(checkedIn==0){
      setCheckedIn(false)
    }
    console.log("status of checkedin"+checkedIn)
  }

  useEffect(() => {
    // Fetch CheckIn data when the component mounts
    // const fetchData = async () => {
    //   const data = await fetchCheckIn();
    //   // Handle the fetched data as needed
    //   console.log(data)
    // };
    setLoading(true);
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
        setState(reverseGeocode[0]?.city);
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
        //CheckIn List Api
        
        try{
          const loginRespone = await AsyncStorage.getItem("user");
        const response = JSON.parse(loginRespone);
        // authCtx.authenticate(response.token);
        const _resultflag = await getCheckInList(
          response.userId,
          response.token
        );
        // console.log(_resultflag._result);
        setCheckInList(_resultflag._result)
        console.log(_resultflag.checkinstatus)

        if(_resultflag.checkinstatus==1){
          setCheckedIn(false);}
          else if(_resultflag.checkinstatus==0){
            setCheckedIn(true)
          }
        
          if(_resultflag.checkinstatus==1){
            setCheckedInNumeric(0)
          }
          else if(_resultflag.checkinstatus==0){
            setCheckedInNumeric(1)
      
          }
          
        
        
        
          console.log("status of checkedin"+checkedIn)
        
        // const reversedCheckInList = [_resultflag].reverse(); // Reverse the 
        // console.log("status"+reversedCheckInList[0])
        console.log("list"+checkedInNumeric)

        }
        catch(err){
console.log("Error in Fetching CheckIn List"+err)
        }
       

        //
        setLoading(false);
        // console.log("loc" + JSON.stringify(reverseGeocode, null, 2));
        console.log("loc" + formattedAddress);
      } catch (error) {
        console.error("Error getting location:", error);
      }
    };
    getCurrentLocation();

    // fetchData();
  }, [fetch]);

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
      setState(reverseGeocode[0]?.city);
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
      setAddTrue(true);
      console.log("loc" + JSON.stringify(reverseGeocode, null, 2));
      console.log("loc" + formattedAddress);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  function renderMealItem(itemData) {
    const reversedCheckInList = [...itemData.item.data].reverse(); // Reverse the order
    const item = itemData.item;
    const mealsDetails = {
      data: reversedCheckInList,
      date: item.date,
      id: item.id,
      //  project:item.project.title,
      //  task:item.task.title,
      //  activity:item.activity.title,
      //  workingHours:item.formattedWorkingHours,
      //  taskStatus:item.status.title,
    };
    // const mealFullDetails={

    // }
    // function onPressHandler(){
    //   navigation.navigate("MealsDetailsScreen",{...mealsDetails})
    // }
    return <ChecklistData {...mealsDetails} />;
  }

  // const handleAddTaskPress = async () => {
  //   getCurrentLocation();
  //   setCheckedIn(!checkedIn);

  //   // Prepare data to be stored
  //   const currentDate = getCurrentDate(); // Use utility function to get current date
  //   const currentTime = getCurrentTime(); // Use utility function to get current time

  //   const checkInData = {
  //     date: currentDate,
  //     data: [
  //       {
  //         id: '1',
  //         date: '',
  //         checkInTime: checkedIn ? currentTime : '', // Use current time for check-in, empty for check-out
  //         location: address,
  //         remarks: '',
  //         checkOut: checkedIn ? '' : currentTime, // Use current time for check-out, empty for check-in
  //         isCheckedIn: checkedIn,
  //       },
  //       // Add more items as needed
  //     ],
  //     id: 't3', // You may need to generate a unique ID or use a different logic for this
  //   };

  //   // Store the data in Firebase
  //   setCheckInList((prevList) => [...prevList, checkInData]);
  //   // const id = await storeCheckIn(checkInData);
  //   // console.log('Data stored with ID:', id);
  // }
  const handleAddTaskPress = async () => {
    // {!getAdd&&setLoading(true);}
    // {!getAdd&&await getCurrentLocation();}
    
    // if(checkedInNumeric==1){
    //   setCheckedInNumeric(0)
    // }
    // else{
    //   setCheckedInNumeric(1)

    // }

    const currentDate = getCurrentDate();
    const currentTime = getCurrentTime();

    // Check if a check-in with the current date already exists
    // const existingCheckInIndex = checkInList.findIndex(
    //   (item) => item.date === currentDate
    // );

    // If it exists, update the existing entry

    const loginRespone = await AsyncStorage.getItem("user");
    const response = JSON.parse(loginRespone);
    // authCtx.authenticate(response.token);
    console.log(response.userId);

    if (checkedIn) {
    }
    console.log(
      response.userId,
      checkedInNumeric,
      currentTime,
      address,
      currentDate,
      state,
      response.token
    );
    const _resultflag2 = await postCheckIn(
      response.userId,
      checkedInNumeric,
      currentTime,
      address,
      currentDate,
      state,
      response.token
    );
    console.log(_resultflag2);

    // setCheckedIn(!checkedIn);
    setFetch(!fetch)
    
    
  

    // existingCheckIn.data.push({
    //   id: String(existingCheckIn.data.length + 1),
    //   date: '',
    //   checkInTime: checkedIn ? currentTime : '',
    //   location: state,
    //   remarks: '',
    //   checkOut: checkedIn ? '' : currentTime,
    //   isCheckedIn: checkedIn,
    //   placeName:address
    // });

    // Update the state with the modified list
    

    // const id = await storeCheckIn(checkInList)
    //    console.log('Data stored with ID:', id);
  };

  const [checkInList, setCheckInList] = useState([]);


  const generateCustomId = (item) => {
    const randomNumber = Math.floor(Math.random() * 1000); // Adjust the range as needed
    const currentDate = new Date().toISOString().replace(/[:.]/g, ''); // Remove colons and dots from the date

    return `${randomNumber}_${currentDate}_${item.user_id}_${item.id}`;
  };

  return (
    <View style={{flex: 1,
      paddingTop: 40,
      backgroundColor: active.background,}}>
      <BackArrowHeaderCopy
        color={active.background}
        title={"Check In/Out"}
        backButton={() => navigation.goBack()}
      />
      <View style={{ flex: 1, backgroundColor: active.background }}>
        <View
          style={{
            // borderWidth:1,
            // borderColor:'black',
            marginHorizontal: w(1),
            marginTop: h(1),
            borderRadius: w(5),
          }}
        >
          {/* <FlatList data={checkInList} keyExtractor={(item)=>item.id} renderItem={renderMealItem}/> */}
          {loading ? (
            <ActivityIndicator
              size="large"
              color={active.color}
              style={styles.loader}
            />
          ) : (
            <FlatList
              data={checkInList}
              keyExtractor={generateCustomId}
              renderItem={renderMealItem}
            />
          )}

          {/* {address&&<Text >{address}</Text>} */}
        </View>

        {!loading && (
          <>
            {checkedIn && (
              <TouchableOpacity
                style={[styles.addButton, { backgroundColor: active.blackBg }]}
                onPress={handleAddTaskPress}
              >
                <Text
                  style={{
                    color: active.text,
                    fontSize: dynamicFontSize * 0.9,
                    fontWeight: "800",
                  }}
                >
                  Check In
                </Text>
                {/* <MaterialCommunityIcons name="plus" size={30} color="#fff" /> */}
              </TouchableOpacity>
            )}
            {!checkedIn && (
              <TouchableOpacity
                style={[styles.addButton, { backgroundColor: active.blackBg }]}
                onPress={handleAddTaskPress}
              >
                <Text
                  style={{
                    color: active.text,
                    fontSize: dynamicFontSize * 0.9,
                    fontWeight: "800",
                  }}
                >
                  Check Out
                </Text>
                {/* <MaterialCommunityIcons name="plus" size={30} color="#fff" /> */}
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "white",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 120,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});
