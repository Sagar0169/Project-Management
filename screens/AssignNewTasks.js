import { StyleSheet, View,TouchableOpacity } from "react-native";
import BackArrowHeaderWhite from "../components/BackArrowHeaderWhite";
import AssignTaskForm from "../components/AssignTaskForm";

function AssignNewTask(){
return(

    <View style={styles.rootContainer}>
      <BackArrowHeaderWhite
        showSearch='false'
        filter={true}
        title="New Task"
        color="#e5af54"
        backButton={() => navigation.goBack()}
      />
       <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
       <AssignTaskForm/>
      </View>
      </View>
)

}
export default AssignNewTask
const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      paddingTop: 40,
      backgroundColor: "#e5af54",
    }})