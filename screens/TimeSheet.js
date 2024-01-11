import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import BackArrowHeader from "../components/BackArrowHeader";
import { StatusBar } from "expo-status-bar";
import { Calendar } from "react-native-calendars";
import DropDown from "../components/TimeSheet/DropDown";
import DashboardData from "../components/DashboardData";
import { Activity, Project } from "../components/Data";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format, differenceInMinutes } from "date-fns";
import SubmitButton from "../components/ui/SubmitButton";

export default function TimeSheet({ navigation }) {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showTimePicker2, setShowTimePicker2] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const [selectedTime2, setSelectedTime2] = useState(new Date());
  const showTimepickerr = () => {
    setShowTimePicker(true);
  };
  const showTimepickerr2 = () => {
    setShowTimePicker2(true);
  };

  // const handleTimeChange = (event, selected) => {
  //   setShowTimePicker(Platform.OS === 'ios');
  //   if (selected) {
  //     setSelectedTime(selected);
  //     // You can format the selected time as needed
  //   }
  // };
  const handleTimeChange = (event, selected) => {
    setShowTimePicker(false);
    if (selected) {
      setSelectedTime(selected);
      // You can format the selected time as needed
    }
  };
  const handleTimeChange2 = (event, selected) => {
    setShowTimePicker2(false);
    if (selected) {
      setSelectedTime2(selected);
      // You can format the selected time as needed
    }
  };
  const formattedTime = format(selectedTime, "HH:mm");
  const formattedTime2 = format(selectedTime2, "HH:mm");

  const formattedBillingHours = format(selectedTime2, "HH:mm");
  const workingHoursMinutes = differenceInMinutes(selectedTime2, selectedTime);
  // Convert working hours from minutes to hours
  const workingHoursHours = workingHoursMinutes / 60;
  const formattedWorkingHours = isNaN(workingHoursHours)
    ? "Invalid Time"
    : `${workingHoursHours.toFixed(2)}`;

  useEffect(() => {
    // This block of code will be executed when selectedDate changes
    console.log(selectedDate);
    console.log(formattedTime);
    console.log(formattedTime2);
    console.log(formattedWorkingHours);
    const workingHoursHours = parseFloat(formattedWorkingHours);

    if (isNaN(workingHoursHours) || workingHoursHours < 0) {
      // Set selectedTime2 to 00:00 if formattedWorkingHours is less than 0 or NaN
      setSelectedTime2(new Date(selectedTime.setHours(0, 0, 0, 0)));
    }
  }, [selectedDate, selectedTime, selectedTime2, formattedWorkingHours]);

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

  function handlerBack() {
    navigation.goBack();
  }

  const [selectedDate, setSelectedDate] = useState("");
  const onDayPress = (day) => {
    // Handle the selected date
    setSelectedDate(day.dateString);
  };

  const [project, setSelectedproject] = useState(null);
  const [taskGroup, setSelectedtaskGroup] = useState(null);
  const [task, setSelectedTask] = useState(null);
  const [issue, setSelectedIssue] = useState(null);
  const [activity, setSelectedActivity] = useState(null);
  const [status, setSelectedstatus] = useState(null);
  const scrollViewRef = useRef(null);
  const handleSelectCategory = (category) => {
    setSelectedproject(category);
    // Add any additional logic you want when a category is selected
    scrollViewRef.current.scrollTo({ y: 200, animated: true });
  };
  const handleSelectTaskGroup = (category) => {
    setSelectedtaskGroup(category);
    // Add any additional logic you want when a category is selected
    scrollViewRef.current.scrollTo({ y: 400, animated: true });
  };
  const handleSelectTask = (category) => {
    setSelectedTask(category);
    // Add any additional logic you want when a category is selected
    scrollViewRef.current.scrollTo({ y: 600, animated: true });
  };
  const handleSelectIssue = (category) => {
    setSelectedIssue(category);
    // Add any additional logic you want when a category is selected
    scrollViewRef.current.scrollTo({ y: 700, animated: true });
  };
  const handleSelectActivity = (category) => {
    setSelectedActivity(category);
    // Add any additional logic you want when a category is selected
    scrollViewRef.current.scrollTo({ y: 600, animated: true });
  };
  const handleSelectStatus = (category) => {
    setSelectedstatus(category);
    // Add any additional logic you want when a category is selected
    scrollViewRef.current.scrollTo({ y: 1200, animated: true });
  };

  const projectDropDownRef = useRef(null);
  const taskGroupDropDownRef = useRef(null);
  const taskDropDownRef = useRef(null);
  const issueDropDownRef = useRef(null);
  const activityDropDownRef = useRef(null);

  const scrollToItem = (ref) => {
    scrollViewRef.current.scrollTo({ y: ref, animated: true });
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        style={{ backgroundColor: "white", flex: 1 }}
      >
        <Calendar
          onDayPress={onDayPress}
          markedDates={{ [selectedDate]: { selected: true } }}
        />
        <Text style={{ alignSelf: "center", fontSize: dynamicFontSize * 1.3 }}>
          Fill All Details
        </Text>
        {/* Project */}
        <View
          style={{ flexDirection: "row", marginTop: w(2), marginBottom: w(1) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize * 0.9,
              marginTop: w(5),
              marginStart: w(1),
              width: w(20),
              textAlign: "right",
            }}
          >
            Project:
          </Text>
          <DropDown
            data={Project}
            selectValue={project}
            oneSelect={handleSelectCategory}
            hi={h(2)}
            wi={w(2)}
          />
        </View>
        {/* Task Group */}
        <View
          style={{ flexDirection: "row", marginTop: w(2), marginBottom: w(1) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize * 0.9,
              marginTop: w(5),
              marginStart: w(1),
              width: w(20),
              textAlign: "right",
            }}
          >
            Task Group:
          </Text>
          <DropDown
            data={DashboardData}
            selectValue={taskGroup}
            oneSelect={handleSelectTaskGroup}
            hi={h(2)}
            wi={w(2)}
          />
        </View>
        {/* Task */}
        
        <View
          style={{ flexDirection: "row", marginTop: w(2), marginBottom: w(1) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize * 0.9,
              marginTop: w(5),
              marginStart: w(1),
              width: w(20),
              textAlign: "right",
            }}
          >
            Task:
          </Text>
          {/* <TouchableWithoutFeedback onPress={()=>{scrollToItem(600)}}> */}
          <DropDown
            data={DashboardData}
            selectValue={task}
            oneSelect={handleSelectTask}
            // onPresss={scrollToItem(600)}
            hi={h(2)}
            wi={w(2)}
          />
          {/* </TouchableWithoutFeedback> */}
        </View>
        
        {/* Issue */}
        <View
          style={{ flexDirection: "row", marginTop: w(2), marginBottom: w(1) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize * 0.9,
              marginTop: w(5),
              marginStart: w(1),
              width: w(20),
              textAlign: "right",
            }}
          >
            Issue:
          </Text>
          <DropDown
            data={DashboardData}
            selectValue={issue}
            oneSelect={handleSelectIssue}
            hi={h(2)}
            wi={w(2)}
          />
        </View>
        {/* Activity */}
        <View
          style={{ flexDirection: "row", marginTop: w(2), marginBottom: w(1) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize * 0.9,
              marginTop: w(5),
              marginStart: w(1),
              width: w(20),
              textAlign: "right",
            }}
          >
            Activity:
          </Text>
          <DropDown
            data={Activity}
            selectValue={activity}
            oneSelect={handleSelectActivity}
            hi={h(2)}
            wi={w(2)}
          />
        </View>
        {/* From time */}
        <View
          style={{ flexDirection: "row", marginTop: w(2), marginBottom: w(1) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize * 0.9,
              marginTop: w(5),
              marginStart: w(1),
              width: w(20),
              textAlign: "right",
            }}
          >
            From Time:
          </Text>
          <TouchableOpacity
            style={{
              marginHorizontal: w(5),
              marginVertical: h(1),
              flex: 1,
              backgroundColor: "#8e8cf3",
              padding: w(4),
            }}
            onPress={showTimepickerr}
          >
            <TextInput
              placeholder="(hh:mm)"
              style={{ fontSize: dynamicFontSize * 0.8, color: "white" }}
              keyboardType="number-pad"
              value={formattedTime}
              editable={false}
            />
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              testID="timePicker"
              value={selectedTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange}
            />
          )}
        </View>
        {/* To time */}
        <View
          style={{ flexDirection: "row", marginTop: w(2), marginBottom: w(1) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize * 0.9,
              marginTop: w(5),
              marginStart: w(1),
              width: w(20),
              textAlign: "right",
            }}
          >
            To Time:
          </Text>
          <TouchableOpacity
            style={{
              marginHorizontal: w(5),
              marginVertical: h(1),
              flex: 1,
              backgroundColor: "#8e8cf3",
              padding: w(4),
            }}
            onPress={showTimepickerr2}
          >
            <TextInput
              placeholder="(hh:mm)"
              style={{ fontSize: dynamicFontSize * 0.8, color: "white" }}
              keyboardType="number-pad"
              value={formattedTime2}
              editable={false}
            />
          </TouchableOpacity>
          {showTimePicker2 && (
            <DateTimePicker
              testID="timePicker"
              value={selectedTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange2}
            />
          )}
        </View>
        {/* Working Hours */}
        <View
          style={{ flexDirection: "row", marginTop: w(2), marginBottom: w(1) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize * 0.9,
              marginTop: w(5),
              marginStart: w(1),
              width: w(20),
              textAlign: "right",
            }}
          >
            Working Hours:
          </Text>
          <TouchableOpacity
            style={{
              marginHorizontal: w(5),
              marginVertical: h(1),
              flex: 1,
              backgroundColor: "#8e8cf3",
              padding: w(4),
            }}
          >
            <TextInput
              placeholder="(hh:mm)"
              style={{ fontSize: dynamicFontSize * 0.8, color: "white" }}
              keyboardType="number-pad"
              value={formattedWorkingHours}
              editable={false}
            />
          </TouchableOpacity>
          {/* {showTimePicker && (
            <DateTimePicker
              testID="timePicker"
              value={selectedTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange}
            />
          )} */}
        </View>
        {/*Billing Hour */}
        <View
          style={{ flexDirection: "row", marginTop: w(2), marginBottom: w(1) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize * 0.9,
              marginTop: w(5),
              marginStart: w(1),
              width: w(20),
              textAlign: "right",
            }}
          >
            Billing Hours:
          </Text>
          <TouchableOpacity
            style={{
              marginHorizontal: w(5),
              marginVertical: h(1),
              flex: 1,
              backgroundColor: "#8e8cf3",
              padding: w(4),
            }}
          >
            <TextInput
              placeholder="(hh:mm)"
              style={{ fontSize: dynamicFontSize * 0.8, color: "white" }}
              keyboardType="number-pad"
              value={formattedWorkingHours}
              editable={false}
            />
          </TouchableOpacity>
          {/* {showTimePicker && (
            <DateTimePicker
              testID="timePicker"
              value={selectedTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange}
            />
          )} */}

        </View>
          {/*Description */}
        <View
          style={{ flexDirection: "row", marginTop: w(2), marginBottom: w(1) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize * 0.9,
              marginTop: w(5),
              marginStart: w(1),
              width: w(20),
              textAlign: "right",
            }}
          >
            Description:
          </Text>
          <View
            style={{
              marginHorizontal: w(5),
              marginVertical: h(1),
              flex: 1,
              backgroundColor: "#8e8cf3",
              
            }}
            
          >
            <TextInput
              placeholder=""
              style={{ fontSize: dynamicFontSize * 0.8, color: "white",padding: w(4),flex:1  ,maxHeight:h(10)}}
              numberOfLines={3}
              multiline={true}
              
              
             
            
            />
          </View>
          

        </View>
         {/* Task Status */}
         <View
          style={{ flexDirection: "row", marginTop: w(2), marginBottom: w(1) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize * 0.9,
              marginTop: w(5),
              marginStart: w(1),
              width: w(20),
              textAlign: "right",
            }}
          >
            Task Status:
          </Text>
          <DropDown
            data={Activity}
            selectValue={activity}
            oneSelect={handleSelectStatus}
            hi={h(2)}
            wi={w(2)}
          />
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-evenly',marginBottom:h(7),marginTop:h(5)}}>
          <SubmitButton color={"#8e8cf3"}>Add TimeSheet</SubmitButton>
          <SubmitButton color={"#8e8cf3"}>Cancel</SubmitButton>

        </View>
 
      </ScrollView>
    </>
  );
}
