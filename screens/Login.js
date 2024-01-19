import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";

import LoginForm from "../components/LoginForm";
import SubmitButton from "../components/ui/SubmitButton";
import SvgSelector from "../components/SvgSelector";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../Utilities/Colors";
import { Strings } from "../Utilities/Strings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeTask } from "../store/http";
import TasksData from "../components/TasksData";

function Login() {
  const { width, height } = Dimensions.get("window");

  const navigation = useNavigation();

  function dashboardHandler() {
    navigation.navigate("Dashboard");
    // storeTask(TasksData)
    // navigation.navigate("AudioFile");
  }

  const handleLoginValidation = (email, password) => {
    // Basic email validation
    if (!email.trim()) {
      alert("Email cannot be empty");
      return false;
    }

    // Basic password validation
    if (!password.trim()) {
      alert("Password cannot be empty");
      return false;
    }

    // More advanced email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format");
      return false;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return false;
    }

    return true;
  };

  const handleLoginFormSubmit = async (email, password) => {
    if (handleLoginValidation(email, password)) {
      // Your login logic here

      // Store the profile information in AsyncStorage
      if (email === "sagarpathak8826@gmail.com") {
        try {
          await AsyncStorage.setItem("profile", "super admin");
          console.log("Profile stored successfully");
        } catch (error) {
          console.error("Error storing profile:", error);
        }
      }
      else{
        try {
          await AsyncStorage.setItem("profile", "Developer");
          console.log("Profile stored successfully");
        } catch (error) {
          console.error("Error storing profile:", error);
        }
      }

      alert("Login successful!");
      dashboardHandler();
    }
  };
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
  return (
    <View style={{ flex: 1, marginTop: 50, alignItems: "center" }}>
      <View>
        <Text
          style={{
            textAlign: "center",
            color: Colors.loginBlue,
            marginTop: 25,
            fontSize: dynamicFontSize * 1.7,
            fontWeight: 700,
          }}
        >
          {Strings.project_management_system}
        </Text>
      </View>

      <View
        style={{
          marginTop: 40,
          backgroundColor: Colors.white,
          padding: 10,
          width: w(98),
          borderRadius: 20,
          borderColor: "black",
          borderWidth: 3,
        }}
      >
        <View>
          <Text
            style={{
              textAlign: "center",
              color: Colors.loginBlue,
              marginTop: 20,
              fontSize: dynamicFontSize * 1.7,
              fontWeight: 700,
            }}
          >
            LOGIN
          </Text>
        </View>
        <View style={{ marginTop: 20, marginHorizontal: 5 }}>
          <LoginForm onSubmit={handleLoginFormSubmit} />
          {/* change onSubmit to handlerLoginFormSubmit for validation */}
        </View>
      </View>
    </View>
  );
}
export default Login;
