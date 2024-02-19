import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import SvgSelector from "../SvgSelector";
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

export default function CheckInDetails({
  id,
  date,
  checkInTime,
  location,
  remarks,
  checkOut,
  isCheckedIn,
  place,
}) {
  console.log("cc" + isCheckedIn);
  return (
    <View style={{borderWidth:w(0.2),backgroundColor:"rgba(80, 99, 191, 0.21)",marginHorizontal:w(3.4),marginTop:h(0.1),borderRadius:w(2),padding:w(3)}}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row" }}>
          {isCheckedIn && (
            <>
              <Text style={{fontWeight: "700",color:"#45BE27"}}>Check In:</Text>
              <Text style={{ marginStart: 5 }}>{checkInTime}</Text>
            </>
          )}
          {!isCheckedIn && (
            <>
              <Text style={{fontWeight: "700",color:"#DC1010"}}>Check Out:</Text>
              <Text style={{ marginStart: 5 }}>{checkOut}</Text>
            </>
          )}
        </View>
        <View style={{ flexDirection: "row" }}>
          {/* <Text style={styles.heading}>Location:</Text> */}
          <SvgSelector h={15} w={15}name={"location2"}/>
          <Text style={{ marginStart: 5 }}>{location}</Text>
        </View>
      </View>
      <View style={{ marginTop: 5 }}>
        <Text style={styles.heading}>Place Name:</Text>
        <Text>{place}</Text>
      </View>
      {/* <Text>{id}</Text> */}
      <View style={{}}></View>
    </View>
  );
}
const styles = StyleSheet.create({
  heading: {
    fontWeight: "700",
  },
});