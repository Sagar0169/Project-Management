import { StyleSheet, View, TouchableOpacity } from "react-native";
import BackArrowHeaderWhite from "../components/BackArrowHeaderWhite";
import AssignTaskForm from "../components/AssignTaskForm";

import { useState } from "react";
import TasksData from "../components/TasksData";
import BackArrowHeader from "../components/BackArrowHeader";


function AssignNewTask({navigation,route}) {
  // const navigation = useNavigation()
  const { userId } = route.params;
  
  const [taskData, setTaskData] = useState(TasksData);


  return (
    <View style={styles.rootContainer}>
      {/* <BackArrowHeaderWhite
        showSearch="false"
        filter={true}
        title="New Task"
        color="white"
        backButton={() => navigation.goBack()}
      /> */}
      <BackArrowHeader
        title={"New Task"}
        backButton={() => navigation.goBack()}
        color={"white"}
      />
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <AssignTaskForm taskData={taskData} setTaskData={setTaskData} navigation={navigation} userId={userId} />
      </View>
    </View>
  );
}
export default AssignNewTask;
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "white",
  },
});
