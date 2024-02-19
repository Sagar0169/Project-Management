import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import OnBoarding from "./components/OnBoarding";
import AddNewProjects from "./screens/AddNewProjects";
import AssignNewTask from "./screens/AssignNewTasks";
import AssignTask from "./screens/AssignTask";
import AssignedProject from "./screens/AssignedProject";
import AssignedTaskDetails from "./screens/AssignedTaskDetails";
import DashBoard from "./screens/DashBoard";
import Login from "./screens/Login";
import Projectlist from "./screens/Projectlist";
import TaskList from "./screens/TaskList";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import CheckInLayout from "./screens/CheckInLayout";
import CreateNewIssues from "./screens/CreateNewIssues";
import IssuesProject from "./screens/IssuesProject";
import Music from "./screens/Music";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import ContextProvider from "./store/context";
import { SearchProvider } from "./store/search-redux";

const Stack = createNativeStackNavigator();

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      try {
        // Prevent native splash screen from auto-hiding
        await SplashScreen.preventAutoHideAsync();

        const storedToken = await AsyncStorage.getItem("token");

        console.log(storedToken);
        if (storedToken) {
          authCtx.authenticate(storedToken);
        }

        setIsTryingLogin(false);
      } catch (e) {
        console.error("Error during app initialization:", e);
      } finally {
        // Hide the splash screen
        await SplashScreen.hideAsync();
      }
    }

    fetchToken();
  }, []);

  return <Navigation />;
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnBoarding} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
      <Stack.Screen
        name="AssignNewTask"
        component={AssignNewTask}
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="CreateNewIssues"
        component={CreateNewIssues}
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="CheckIn/Out"
        component={CheckInLayout}
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_right",
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.isAuthenticated)

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="transparent" />
      <AuthContextProvider>
        <ContextProvider>
          <SearchProvider>
            <Root />
          </SearchProvider>
        </ContextProvider>
      </AuthContextProvider>
    </>
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
