import { View, Text, Dimensions, FlatList } from 'react-native'
import React, { useContext, useState } from 'react'
import TimeSheetFlatListData from './TimeSheetFlatListData';

import { DataSet } from '../components/Data';
import { Context } from '../store/context';
import CustomModal from '../components/CustomModal';

export default function TimeSheetList() {

  const context=useContext(Context)
  const List=context.items
  console.log(List)
  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };



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
  function renderMealItem(itemData){
    const item=itemData.item
    const mealsDetails={
      id:item.id,
       project:item.project.title,
       task:item.task.title,
       activity:item.activity.title,
       workingHours:item.formattedWorkingHours,
       taskStatus:item.status.title,
      


       
  }
  // const mealFullDetails={

  // }
  // function onPressHandler(){
  //   navigation.navigate("MealsDetailsScreen",{...mealsDetails})
  // }
      return <TimeSheetFlatListData  {...mealsDetails} onPress={deleteHandler} />
  }
  function deleteHandler(id){
    context.deleteItem(id)
    setModalVisible(true)
    

  }

  return (
    <View style={{marginVertical:h(3),marginHorizontal:w(2)}}>
       <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#ccc',padding:w(1)}}>
        <Text style={{width:w(15.8),fontSize:dynamicFontSize*0.78}}>Project</Text>
        <Text style={{width:w(25.8),fontSize:dynamicFontSize*0.78}}>Task</Text>
        <Text style={{width:w(20.8),fontSize:dynamicFontSize*0.78}}>Activity</Text>
        <Text style={{width:w(12.8),fontSize:dynamicFontSize*0.78}}>Duration</Text>
        {/* <Text style={{width:w(15)}}>Description</Text> */}
        <Text style={{width:w(18.8),fontSize:dynamicFontSize*0.78}}>Status</Text>
       </View>
       {isModalVisible&& <CustomModal
        visible={isModalVisible}
        message="Deleted Successfully"
        onHide={hideModal}
      />}
       <FlatList data={List} keyExtractor={(item)=>item.id} renderItem={renderMealItem} scrollEnabled={false} />
    </View>
  )
}