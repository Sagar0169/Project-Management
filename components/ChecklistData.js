import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native'
import React from 'react'
import CheckInDetails from './CheckIn/CheckInDetails';
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

export default function ChecklistData({id,data,date}) {
  function renderMealItem(itemData){
    const item=itemData.item
    const mealsDetails={
     id:item.id,
     date:item.date,
     checkInTime:item.checkInTime,
     location:item.location,
     remarks:item.remarks,
     checkOut:item.checkOut,
     isCheckedIn:item.isCheckedIn,
     place:item.placeName


      


       
  }
  // const mealFullDetails={

  // }
  // function onPressHandler(){
  //   navigation.navigate("MealsDetailsScreen",{...mealsDetails})
  // }
      return <CheckInDetails  {...mealsDetails}  />
  }
  return (
    <View style={styles.rootContainer}>
<Text style={{marginTop:h(1),paddingStart:w(3),fontSize:dynamicFontSize}}>{date}</Text>
      <View style={{}}>
      <FlatList data={data} keyExtractor={(item)=>item.id} renderItem={renderMealItem}/>

      </View>
<Text></Text>
      
    </View>
  )
}
const styles=StyleSheet.create({
  rootContainer:{
    flex:1,
    marginVertical:h(1)
    // borderWidth:1,
    // borderColor:'black'
  }
})