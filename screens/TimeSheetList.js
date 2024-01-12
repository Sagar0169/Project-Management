import { View, Text, Dimensions } from 'react-native'
import React from 'react'

export default function TimeSheetList() {
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

  return (
    <View style={{marginTop:h(3),borderWidth:1,marginHorizontal:w(5)}}>
       <View style={{flexDirection:'row'}}>
        <Text>Project</Text>
        <Text>Task</Text>
        <Text>Activity</Text>
        <Text>Duration</Text>
        <Text>Description</Text>
        <Text>Status</Text>
       </View>
    </View>
  )
}