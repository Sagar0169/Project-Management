import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native'
import React, { useContext } from 'react'
import CheckInDetails from './CheckIn/CheckInDetails';
import { ThemeContext } from '../context/ThemeContext';
import { colors } from './config/theme';
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
  const {theme}=useContext(ThemeContext)
  let active=colors[theme.mode]
  function renderMealItem(itemData){
    const item=itemData.item
    const mealsDetails={
     id:item.id,
     date:item.checkinoutdate,
     checkInTime:item.check_in_time,
     location:item.location,
    //  remarks:item.remarks,
     checkOut:item.check_out_time,
     isCheckedIn:item.check_in_status,
     place:item.place_name


      


       
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
<Text style={{marginVertical:h(0.5),paddingStart:w(3),fontSize:dynamicFontSize,color:active.color}}>{date}</Text>
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
    marginVertical:h(0.2)
    // borderWidth:1,
    // borderColor:'black'
  }
})