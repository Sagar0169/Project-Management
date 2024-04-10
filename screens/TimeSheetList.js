import { View, Text, Dimensions, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import TimeSheetFlatListData from './TimeSheetFlatListData';

import { DataSet } from '../components/Data';
import { Context } from '../store/context';
import CustomModal from '../components/CustomModal';
import { Colors } from '../Utilities/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTimeSheetList } from '../store/http';
import { format } from 'date-fns';

export default function TimeSheetList({selectedDate}) {

  const context=useContext(Context)
  const List=context.items
  const filteredList = List.filter(item => {
    // Assuming item.selectedDate is in the format 'yyyy-MM-dd'
    return item.selectedDate === selectedDate;
  });
  console.log("fl"+filteredList)
  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };
  const [Timelist, setList] = useState([]);

  useEffect(()=>{
    async function list(){
      const loginRespone = await AsyncStorage.getItem("user");
      const response = JSON.parse(loginRespone);
      // authCtx.authenticate(response.token);
      console.log("emp"+response.emp_id);
        // const response_data=await postAddTimeSheet(
        //   response.userId,response.emp_id,project,task,issue,activity,formattedTime,formattedTime2,formattedWorkingHours,formattedWorkingHours,description,status,response.token)
        
        const response_data=await getTimeSheetList(
          response.userId,1,selectedDate,response.emp_id,response.token)

          // setList(response_data);

        //   const createdDate = new Date(response_data[0].created).toLocaleDateString();
        //   // console.log(createdDate)
        //   const dateObject = new Date(selectedDate);

        //   const formattedDate = dateObject.toLocaleDateString('en-GB', {
        //     day: '2-digit',
        //     month: 'numeric',
        //     year: 'numeric'
        // });


      //   const list1=response_data.map(item => {
      //   const createdDate = new Date(item.created).toLocaleDateString();
      //   console.log(createdDate)
          // console.log(formattedDate)
      //   if(createdDate==formattedDate){
      //     // console.log(createdDate)
      //     // console.log(formattedDate)


      //     return { 
          
      //       id:item.id,
      //       project:item.project.project_name,
      //       task:item.task.task_name,
      //       activity:item.activity,
      //       workingHours:item.working_hours,
      //       taskStatus:item.task_status,
      //     };
      //   }
      //   else{
      //     return null
      //   }
      // });
if(response_data!=null){


      const filteredList = response_data.reduce((accumulator, item) => {
        // const createdDate = new Date(item.created).toLocaleDateString();
        
        // if (createdDate === formattedDate) {
            accumulator.push({
                id: item.id,
                project: item.project.project_name,
                task: item.task.task_name,
                activity: item.activity,
                workingHours: item.working_hours,
                taskStatus: item.task_status,
            });
        // }
        return accumulator;
    }, []);
    
    setList(filteredList);

  }else {
    setList()
  }
      // setList(list1)


      console.log(Timelist)

      //   const filteredItems = response_data.filter(item => {
      //     // Assuming item.created is in the format "yyyy-MM-dd"
      //     const createdDate = new Date(item.created).toLocaleDateString();
      //     // const selectedDateString = format(selectedDate, 'dd/MM/yyyy');     
      //     return createdDate === formattedDate;
      // });
      //     console.log(filteredItems)

          
        //    const list=response_data._result.map(item => {
        //     return { id: item.id, title: item.project_name };
        // });
        // setProjectL(list)
        // console.log(projectList)

          // console.log(projectList)
        
          // console.log("------>Api Data"+response_data)
    }

    list()

  },[selectedDate])

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
      id:generateRandomId(),
       project:item.project,
       task:item.task,
       activity:item.activity,
       workingHours:item.workingHours,
       taskStatus:item.taskStatus,
      


       
  }
  console.log(item.project)
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
  const generateRandomId = () => {
    const randomNumber = Math.floor(Math.random() * 1000000); // Generate a random number
    const timestamp = Date.now(); // Get the current timestamp
    return `${randomNumber}_${timestamp}`; // Concatenate the random number and timestamp
  };

  return (
    <View style={{marginVertical:h(3),marginHorizontal:w(2)}}>
       <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#2A45CE',padding:w(1)}}>
        <Text style={{width:w(15.8),fontSize:dynamicFontSize*0.78,color:Colors.white,textAlign:'center'}}>Project</Text>
        <Text style={{width:w(25.8),fontSize:dynamicFontSize*0.78,color:Colors.white,textAlign:'center'}}>Task</Text>
        <Text style={{width:w(20.8),fontSize:dynamicFontSize*0.78,color:Colors.white,textAlign:'center'}}>Activity</Text>
        <Text style={{width:w(12.8),fontSize:dynamicFontSize*0.78,color:Colors.white,textAlign:'center'}}>Duration</Text>
        {/* <Text style={{width:w(15)}}>Description</Text> */}
        <Text style={{width:w(18.8),fontSize:dynamicFontSize*0.78,color:Colors.white,textAlign:'center'}}>Status</Text>
       </View>
       {isModalVisible&& <CustomModal
        visible={isModalVisible}
        message="Deleted Successfully"
        onHide={hideModal}
      />}
       <FlatList data={Timelist} keyExtractor={(item)=>generateRandomId()} renderItem={renderMealItem} scrollEnabled={false} />
    </View>
  )
}