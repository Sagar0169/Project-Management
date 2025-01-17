import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import BackArrowHeader from "../components/BackArrowHeader";
import { StatusBar } from "expo-status-bar";
import { Calendar } from "react-native-calendars";
import DropDown from "../components/TimeSheet/DropDown";
import DashboardData from "../components/DashboardData";
import {
  Activity,
  Issue,
  Project,
  Status,
  TaskGroup,
  Tasks,
} from "../components/Data";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format, differenceInMinutes } from "date-fns";
import SubmitButton from "../components/ui/SubmitButton";
import { Context } from "../store/context";
import TimeSheetList from "./TimeSheetList";
import { Colors } from "../Utilities/Colors";
import { getProjectList, getTimeSheetIssueList, getTimeSheetTaskList, postAddTimeSheet } from "../store/http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomModal from "../components/CustomModal";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../components/config/theme";

export default function TimeSheet({ navigation }) {
  // context
  const context = useContext(Context);
  console.log(context.items[4]);
  //theme
  const {theme}=useContext(ThemeContext)
  let activeColors=colors[theme.mode]
  async function addTimeSheetHandler() {
    if (
      project &&
      taskGroup &&
      task &&
      issue &&
      activity &&
      description &&
      status &&
      selectedDate
    ) {
      const loginRespone = await AsyncStorage.getItem("user");
    const response = JSON.parse(loginRespone);
    // authCtx.authenticate(response.token);
    console.log(response.userId);
      // const response_data=await postAddTimeSheet(
      //   response.userId,response.emp_id,project,task,issue,activity,formattedTime,formattedTime2,formattedWorkingHours,formattedWorkingHours,description,status,response.token)
      
      const response_data=await postAddTimeSheet(
        response.userId,response.emp_id,projectId,taskId,issueId,activity,formattedTime,formattedTime2,formattedWorkingHours,formattedWorkingHours,description,status,selectedDate,response.token)
      
        console.log(response_data)








      // const id = `id_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
      // context.addItem({
      //   id,
      //   selectedDate,
      //   project,
      //   taskGroup,
      //   task,
      //   issue,
      //   activity,
      //   formattedTime,
      //   formattedTime2,
      //   formattedWorkingHours,
      //   formattedWorkingHours,
      //   description,
      //   status,
      // });
      // console.log(context.items[0]);
    } else {
      console.log("fill completely");
      showModal()
    }
  }

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

// Format working hours in hours and minutes
const formattedWorkingHours = isNaN(workingHoursHours)
  ? 'Invalid Time'
  : format(new Date().setHours(0, workingHoursMinutes), 'HH:mm');
  // const projectList = [];
  const [projectList, setProjectL] = useState([]);
  const [issueList, setIssueL] = useState([]);

  const [taskList, setTaskL] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {

    async function list(){
      const loginRespone = await AsyncStorage.getItem("user");
      const response = JSON.parse(loginRespone);
      // authCtx.authenticate(response.token);
      console.log(response.userId);
        // const response_data=await postAddTimeSheet(
        //   response.userId,response.emp_id,project,task,issue,activity,formattedTime,formattedTime2,formattedWorkingHours,formattedWorkingHours,description,status,response.token)
        
        const response_data=await getProjectList(
          response.userId,response.emp_id,response.token)

          const response_data_issue=await getTimeSheetIssueList(
            response.userId,1,response.emp_id,response.token)
           
            const response_data_task=await getTimeSheetTaskList(
              response.userId,1,response.emp_id,response.token)

          if(response_data._result!=null){
            const list=response_data._result.map(item => {
              return { id: item.id, title: item.project_name };
          });
          setProjectL(list)
          console.log("projectList-->>")
  
            console.log(projectList)
          }

          if(response_data_issue._result!=null){
            const list2=response_data_issue._result.map(item => {
              return { id: item.id, title: item.issue_test_phase };
          });
          setIssueL(list2)
          // console.log(projectList)
          console.log("IssueList-->>")
  
            console.log(issueList)
          }
          if(response_data_task._result!=null){
            const list3=response_data_task._result.map(item => {
              return { id: item.id, title: item.task_name };
          });
          setTaskL(list3)
          // console.log(projectList)
          console.log("TaskList-->>")
  
            console.log(taskList)
          }

          
          
           
        
          // console.log("------>Api Data"+response_data)
    }

    list()

    // This block of code will be executed when selectedDate changes
    console.log(selectedDate);
    // const today = new Date();
    formattedSelectedDate = format(new Date(selectedDate), 'dd-MM-yyyy');
    setSelectedDate(formattedSelectedDate);

    console.log(formattedTime);
    console.log(formattedTime2);
    console.log(formattedWorkingHours);
    const workingHoursHours = parseFloat(formattedWorkingHours);

    if (isNaN(workingHoursHours) || workingHoursHours < 0) {
      // Set selectedTime2 to 00:00 if formattedWorkingHours is less than 0 or NaN
      setSelectedTime2(new Date(selectedTime.setHours(0, 0, 0, 0)));
    }
  }, [formattedWorkingHours]);

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

  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const onDayPress = (day) => {
    // Handle the selected date
    setSelectedDate(day.dateString);
  };

  const today=format(new Date(), 'yyyy-MM-dd')

  const [project, setSelectedproject] = useState(null);
  const [projectId, setSelectedprojectId] = useState(null);

  const [taskGroup, setSelectedtaskGroup] = useState(null);
  const [task, setSelectedTask] = useState(null);
  const [taskId, setSelectedTaskId] = useState(null);

  const [issue, setSelectedIssue] = useState(null);
  const [issueId, setSelectedIssueId] = useState(null);

  const [activity, setSelectedActivity] = useState(null);
  const [status, setSelectedstatus] = useState(null);
  const [description, setSelecteddescription] = useState(null);
  const scrollViewRef = useRef(null);

  const handleSelectCategory = (val) => {
    setSelectedproject(val);
    setSelectedprojectId(val.id)
    console.log(project)
    console.log(projectId)
    // Add any additional logic you want when a category is selected
    scrollViewRef.current.scrollTo({ y: 200, animated: true });
  };

  const handleSelectTaskGroup = (category) => {
    setSelectedtaskGroup(category);
    // Add any additional logic you want when a category is selected
    scrollViewRef.current.scrollTo({ y: 400, animated: true });
  };
  const handleSelectTask = (val) => {
    setSelectedTask(val);
    setSelectedTaskId(val.id);
    console.log(task)
    console.log(taskId)

    // Add any additional logic you want when a category is selected
    scrollViewRef.current.scrollTo({ y: 600, animated: true });
  };
  const handleSelectIssue = (val) => {
    setSelectedIssue(val);
    setSelectedIssueId(val.id)
    console.log(issue)
    console.log(issueId)


    // Add any additional logic you want when a category is selected
    scrollViewRef.current.scrollTo({ y: 700, animated: true });
  };
  const handleSelectActivity = (val) => {
    setSelectedActivity(val);
    console.log(activity)

    // Add any additional logic you want when a category is selected
    scrollViewRef.current.scrollTo({ y: 800, animated: true });
  };
  const handleSelectStatus = (val) => {
    setSelectedstatus(val);
    console.log(status)
    // Add any additional logic you want when a category is selected
    scrollViewRef.current.scrollTo({ y: 1200, animated: true });
  };
  const handleSelectDesciption = (category) => {
    setSelecteddescription(category);
    // Add any additional logic you want when a category is selected
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
        style={{ backgroundColor: activeColors.background, flex: 1 }}
      >
        <Calendar
          onDayPress={onDayPress}
          markedDates={{ [selectedDate]: { selected: true } }}
          maxDate={today.toString().split('T')[0]} // Set minDate to the current dat
          theme={{
            backgroundColor: activeColors.background, // Background color
            calendarBackground: activeColors.background, // Calendar background color
            textSectionTitleColor: activeColors.blackbg, // Text color for month title
            selectedDayBackgroundColor: activeColors.blackBg, // Background color for selected day
            selectedDayTextColor: activeColors.text, // Text color for selected day
            todayTextColor: activeColors.blackBg, // Text color for today's date
            dayTextColor: activeColors.color, // Text color for other days
            textDisabledColor: activeColors.hint2, // Text color for disabled days
            arrowColor: activeColors.color, // Color of arrows for switching between months
            monthTextColor: activeColors.color,
            'stylesheet.calendar.header': {
              dayHeader: {
                color: activeColors.color, // Text color for day header (Sun, Mon, etc.)
              },}
             // Text color for month label
            
          }}
        />
        <Text style={{ alignSelf: "flex-start", fontSize: dynamicFontSize * 1.5 ,marginStart:w(3),marginTop:h(1),color:activeColors.text}}>
          Fill All Details
        </Text>
        {/* Project */}
        <View
          style={{ flexDirection: "column", marginTop: w(2), marginBottom: w(1),marginHorizontal:w(2) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize ,
              marginTop: w(5),
              marginStart: w(5),
              color:activeColors.color
              
              // width: w(20),
              // textAlign: "right",
            }}
          >
            Project:
          </Text>
          <DropDown
            data={projectList}
            selectValue={project}
            oneSelect={handleSelectCategory}
            hi={h(2)}
            wi={w(2)}
            from={"project"}
          />
        </View>
        {/* Task Group */}
        <View
          style={{ flexDirection: "column", marginTop: w(2), marginBottom: w(1),marginHorizontal:w(2)  }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize ,
              marginTop: w(5),
              marginStart: w(5),
              color:activeColors.color
              // width: w(20),
              // textAlign: "right",
            }}
          >
            Task Group:
          </Text>
          <DropDown
            data={TaskGroup}
            selectValue={taskGroup}
            oneSelect={handleSelectTaskGroup}
            hi={h(2)}
            wi={w(2)}
          />
        </View>
        {/* Task */}

        <View
          style={{ flexDirection: "column", marginTop: w(2), marginBottom: w(1), marginHorizontal:w(2) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize ,
              marginTop: w(5),
              marginStart: w(5),
              color:activeColors.color
              // width: w(20),
              // textAlign: "right",
            }}
          >
            Task:
          </Text>
          {/* <TouchableWithoutFeedback onPress={()=>{scrollToItem(600)}}> */}
          <DropDown
            data={taskList}
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
          style={{ flexDirection: "column", marginTop: w(2), marginBottom: w(1),marginHorizontal:w(2) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize ,
              marginTop: w(5),
              marginStart: w(5),
              color:activeColors.color
              
              // width: w(20),
              // textAlign: "right",
              
            }}
          >
            Issue:
          </Text>
          <DropDown
            data={issueList}
            selectValue={issue}
            oneSelect={handleSelectIssue}
            hi={h(2)}
            wi={w(2)}
          />
        </View>
        {/* Activity */}
        <View
          style={{ flexDirection: "column", marginTop: w(2), marginBottom: w(1),marginHorizontal:w(2) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize ,
              marginTop: w(5),
              marginStart: w(5),
              color:activeColors.color
              // width: w(20),
              // textAlign: "right",
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
          style={{ flexDirection: "column", marginTop: w(2), marginBottom: w(1) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize ,
              marginTop: w(5),
              marginStart: w(5),
              color:activeColors.color
              // width: w(20),
              // textAlign: "right",
            }}
          >
            From Time:
          </Text>
          <TouchableOpacity
            style={{
              marginHorizontal: w(5),
              marginVertical: h(1),
              flex: 1,
              backgroundColor: activeColors.blackBg,
              padding: w(4),
            }}
            onPress={showTimepickerr}
          >
            <TextInput
              placeholder="(hh:mm)"
              style={{ fontSize: dynamicFontSize * 0.8, color: activeColors.text }}
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
              onChange={()=>handleTimeChange}
            />
          )}
        </View>
        {/* To time */}
        <View
          style={{ flexDirection: "column", marginTop: w(2), marginBottom: w(1) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize ,
              marginTop: w(5),
              marginStart: w(5),
              color:activeColors.color
              // width: w(20),
              // textAlign: "right",
            }}
          >
            To Time:
          </Text>
          <TouchableOpacity
            style={{
              marginHorizontal: w(5),
              marginVertical: h(1),
              flex: 1,
              backgroundColor: activeColors.blackBg,
              padding: w(4),
            }}
            onPress={showTimepickerr2}
          >
            <TextInput
              placeholder="(hh:mm)"
              style={{ fontSize: dynamicFontSize * 0.8, color:Colors.timesheetHint ,color:activeColors.text }}
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
          style={{ flexDirection: "column", marginTop: w(2), marginBottom: w(1) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize ,
              marginTop: w(5),
              marginStart: w(5),
              color:activeColors.color
              // width: w(20),
              // textAlign: "right",
            }}
          >
            Working Hours:
          </Text>
          <TouchableOpacity
            style={{
              marginHorizontal: w(5),
              marginVertical: h(1),
              flex: 1,
              backgroundColor: activeColors.blackBg,
              padding: w(4),
            }}
          >
            <TextInput
              placeholder="(hh:mm)"
              style={{ fontSize: dynamicFontSize * 0.8, color: Colors.timesheetHint ,color:activeColors.text}}
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
          style={{ flexDirection: "column", marginTop: w(2), marginBottom: w(1) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize ,
              marginTop: w(5),
              marginStart: w(5),
              color:activeColors.color
              // width: w(20),
              // textAlign: "right",
            }}
          >
            Billing Hours:
          </Text>
          <TouchableOpacity
            style={{
              marginHorizontal: w(5),
              marginVertical: h(1),
              flex: 1,
              backgroundColor: activeColors.blackBg,
              padding: w(4),
            }}
          >
            <TextInput
              placeholder="(hh:mm)"
              style={{ fontSize: dynamicFontSize * 0.8, color: Colors.timesheetHint, color:activeColors.text}}
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
          style={{ flexDirection: "column", marginTop: w(2), marginBottom: w(1) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize ,
              marginTop: w(5),
              marginStart: w(5),
              color:activeColors.color
              // width: w(20),
              // textAlign: "right",
            }}
          >
            Description:
          </Text>
          <View
            style={{
              marginHorizontal: w(5),
              marginVertical: h(1),
              padding: w(4),
              flex: 1,
              backgroundColor: activeColors.blackBg,
            }}
          >
            <TextInput
              placeholder=""
              style={{
                fontSize: dynamicFontSize * 0.8,
                maxHeight:h(10),
                flex: 1,
                color:activeColors.text
                
              }}
              numberOfLines={3}
              multiline={true}
              
              onChangeText={handleSelectDesciption}
              value={description}
            />
          </View>
        </View>
        {/* Task Status */}
        <View
          style={{ flexDirection: "column", marginTop: w(2), marginBottom: w(1) ,marginHorizontal:w(2) }}
        >
          <Text
            style={{
              fontSize: dynamicFontSize ,
              marginTop: w(5),
              marginStart: w(5),
              color:activeColors.color
              // width: w(20),
              // textAlign: "right",
            }}
          >
            Task Status:
          </Text>
          <DropDown
            data={Status}
            selectValue={status}
            oneSelect={handleSelectStatus}
            hi={h(2)}
            wi={w(2)}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: h(1),
            marginTop: h(5),
          }}
        >
          <SubmitButton color={"#5063BF"} onPress={addTimeSheetHandler}>
            Add TimeSheet
          </SubmitButton>
          <SubmitButton color={"#5063BF"}>Cancel</SubmitButton>
        </View>
        <Text
          style={{
            // alignSelf: "center",
            fontSize: dynamicFontSize * 1.2,
            marginTop: h(2),
            marginStart:w(2),
            fontWeight: "600",
            color:activeColors.color
          }}
        >
          Daily Work
        </Text>

        <TimeSheetList selectedDate={selectedDate} active={activeColors}/>
        {isModalVisible&& <CustomModal
        visible={isModalVisible}
        message="Fill Completely"
        onHide={hideModal}
        active={activeColors}
      />}
      </ScrollView>
    </>
  );
}
