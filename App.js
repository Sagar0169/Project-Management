import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./screens/Login";
import OnBoarding from "./components/OnBoarding";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Header } from "react-native/Libraries/NewAppScreen";
import DashBoard from "./screens/DashBoard";
import AddNewProjects from "./screens/AddNewProjects";
import AssignedProject from "./screens/AssignedProject";
import Projectlist from "./screens/Projectlist";
import AssignTask from "./screens/AssignTask";
import TimeSheet from "./screens/TimeSheet";
import TaskList from "./screens/TaskList";
import AssignedTaskDetails from "./screens/AssignedTaskDetails";
import AssignNewTask from "./screens/AssignNewTasks";

import ContextProvider from "./store/context";
import { SearchProvider } from "./store/search-redux";
import IssuesProject from "./screens/IssuesProject";
import Music from "./screens/Music";
import CreateNewIssues from "./screens/CreateNewIssues";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <SearchProvider>
        <ContextProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={OnBoarding} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Dashboard" component={DashBoard} />
            <Stack.Screen
              name="AssignedProject"
              component={AssignedProject}
              options={{
                headerShown: false,
                presentation: "modal",
                animation: "slide_from_left",
              }}
            />
            <Stack.Screen
              name="Projectlist"
              component={Projectlist}
              options={{
                headerShown: false,
                presentation: "modal",
                animation: "slide_from_right",
              }}
            />
            <Stack.Screen
              name="Assigntask"
              component={AssignTask}
              options={{
                headerShown: false,
                presentation: "modal",
                animation: "slide_from_left",
              }}
            />
            <Stack.Screen
              name="AddNewProjects"
              component={AddNewProjects}
              options={{
                headerShown: false,
                presentation: "modal",
                animation: "slide_from_right",
              }}
            />

            <Stack.Screen name="TaskList" component={TaskList} />
            <Stack.Screen
              name="AssignedTaskDetails"
              component={AssignedTaskDetails}
              options={{
                headerShown: false,
                presentation: "modal",
                animation: "slide_from_right",
              }}
            />
            <Stack.Screen
              name="Issues"
              component={IssuesProject}
              options={{
                headerShown: false,
                presentation: "modal",
                animation: "slide_from_right",
              }}
            />
            <Stack.Screen
              name="Music"
              component={Music}
              options={{
                headerShown: false,
                presentation: "modal",
                animation: "slide_from_right",
              }}
            />
            <Stack.Screen name="AssignNewTask" component={AssignNewTask} />
            <Stack.Screen name="CreateNewIssues" component={CreateNewIssues} />
          </Stack.Navigator>
        </ContextProvider>
      </SearchProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
