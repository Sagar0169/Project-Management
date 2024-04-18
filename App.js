import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import IssuesDetails from "./components/IssuesDetails";
import OnBoarding from "./components/OnBoarding";
import { CustomDrawer } from "./components/drawer/CustomDrawer";
import { ThemeContext } from "./context/ThemeContext";
import AddNewProjects from "./screens/AddNewProjects";
import AssignNewTask from "./screens/AssignNewTasks";
import AssignTask from "./screens/AssignTask";
import AssignedProject from "./screens/AssignedProject";
import AssignedTaskDetails from "./screens/AssignedTaskDetails";
import CheckInLayout from "./screens/CheckInLayout";
import CreateNewIssues from "./screens/CreateNewIssues";
import DashBoard from "./screens/DashBoard";
import IssuesProject from "./screens/IssuesProject";
import Login from "./screens/Login";
import Music from "./screens/Music";
import Projectlist from "./screens/Projectlist";
import TaskList from "./screens/TaskList";
import UpdateStatus from "./screens/UpdateStatus";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import ContextProvider from "./store/context";
import { SearchProvider } from "./store/search-redux";
import CompanySite from "./screens/CompanySite";

let name;
let type;
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const loginRespone = await AsyncStorage.getItem("user");
        const response = JSON.parse(loginRespone);
        console.log("name&type", response);
        name = response.name;
        type = response.usertype;
      } catch {}
    };
    getUserDetails();

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
function DrawerHandler() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => (
        <CustomDrawer {...props} name={name} type={type} />
      )}
    >
      <Drawer.Screen name="DashBoardScreen" component={DashBoard} />
    </Drawer.Navigator>
  );
}
function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DrawerHandler} />
      <Stack.Screen name="CompanySite" component={CompanySite} />

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
        name="IssuesDetails"
        component={IssuesDetails}
        options={{
          headerShown: false,
          presentation: "modal",
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
      <Stack.Screen
        name="UpdateStatus"
        component={UpdateStatus}
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
  console.log(authCtx.isAuthenticated);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  const [theme,setTheme]=useState({mode:"light"})

  const updateTheme=(newTheme)=>{
    if(!newTheme)
    {
      mode = theme.mode ==="light"?"dark":"light"
      newTheme={mode}
    }
    setTheme(newTheme);
  };
  return (
    <>
        <StatusBar style={theme}/>
      <AuthContextProvider>
        <ContextProvider>
          <SearchProvider>
            <ThemeContext.Provider value={{ theme, updateTheme }}>
              <Root />
            </ThemeContext.Provider>
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
