import { View, Text, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { DataSet } from '../components/Data'

export default function TimeSheetFlatListData({project,id,task,activity,workingHours,taskStatus,del}) {
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
    <TouchableWithoutFeedback >   
       <View style={{flexDirection:'row',alignItems:"center",marginVertical:h(0.8)}}>
      <Text style={{width:w(15.8),fontSize:dynamicFontSize*0.78}}>{project}</Text>
      <Text style={{width:w(25.8),fontSize:dynamicFontSize*0.78}}>{task}</Text>
      <Text style={{width:w(20.8),fontSize:dynamicFontSize*0.78}}>{activity}</Text>
      <Text style={{width:w(12.8),fontSize:dynamicFontSize*0.78,textAlign:'center'}}>{workingHours}</Text>
      <Text style={{width:w(18.8),fontSize:dynamicFontSize*0.78}}>{taskStatus}</Text>
    </View>
    </TouchableWithoutFeedback>

  )
}