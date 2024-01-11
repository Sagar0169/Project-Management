import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';
import OnBoarding from './components/OnBoarding';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import DashBoard from './screens/DashBoard';
import AddNewProjects from './screens/AddNewProjects';
import AssignedProject from './screens/AssignedProject';
import TimeSheet from './screens/TimeSheet';
import TaskList from './screens/TaskList';


const Stack=createNativeStackNavigator();
export default function App() {

  return (
   <NavigationContainer>
  
  <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Onboarding" component={OnBoarding}/>
      <Stack.Screen name='Login' component={Login}/>
      <Stack.Screen name='Dashboard' component={DashBoard}/>
      <Stack.Screen name='AssignedProject' component={AssignedProject}/>
      <Stack.Screen name='TimeSheet' component={TimeSheet}/>
      <Stack.Screen name='TaskList' component={TaskList}/>
    </Stack.Navigator>
   </NavigationContainer>
  
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
