import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Alert
} from "react-native";


import LoginForm from "../components/LoginForm";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../Utilities/Colors";
import { Strings } from "../Utilities/Strings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState,useContext } from "react";
import { useEffect } from "react";

import useFonts from "../hooks/useFonts";
import { lineRightSvg } from "../components/svgs/svgs";
import { AuthContext } from "../store/auth-context";
import { login } from "../store/http";


function Login() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isAuthenticating,setIsAuthenticating]=useState(false)
  const[storedProfile,setStoreProfile]=useState("");
  // const[user_type,setuser_type]=useState("");
  useEffect(() => {
      const loadFonts = async () => {
        await useFonts();
        setFontsLoaded(true);
      };
  
      loadFonts();
    }, []);
    if (!fontsLoaded) {
      // Return a loading state or null while fonts are loading
      return null;
    } 
  const { width, height } = Dimensions.get("window");

 

  function dashboardHandler() {
    navigation.navigate("Dashboard");
    // navigation.navigate("Music");
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
      try {
        const _resultflag = await login(email, password);

        if (_resultflag === 0) {
          // User type is null, indicating invalid credentials
          Alert.alert(
            'Invalid Credentials!',
            'The email or password you entered is incorrect. Please try again.'
          );
          return;
        }
        const loginRespone=await AsyncStorage.getItem("user")
        const response = JSON.parse(loginRespone);
        authCtx.authenticate(response.token);

        

      
        // authCtx.authenticate(user_type);

        if (response.usertype === "Admin") {
          try {
            await AsyncStorage.setItem("profile", "super admin");
            setStoreProfile(await AsyncStorage.getItem("user"))
           
          } catch (error) {
            console.error("Error storing profile:", error);
          }
        }
        else{
          if(response.usertype==="TeamLead"){
          try {
            await AsyncStorage.setItem("profile", "TeamLead");
            // console.log("Profile stored successfully");
          } catch (error) {
            console.error("Error storing profile:", error);
          }
        }
        else{
          if(response.usertype==="Developer"){
          try {
            await AsyncStorage.setItem("profile", "Developer");
            // console.log("Profile stored successfully");
          } catch (error) {
            console.error("Error storing profile:", error);
          }
        }
  
        
      
      }
       
        }
        
  
        alert("Login successful!");
        dashboardHandler();
        
      } catch (error) {
        Alert.alert(
          'Authentication failed!',
          'Could not log you in. Please check your credentials or try again later!'
        );
        setIsAuthenticating(false);
      }
      
      // Store the profile information in AsyncStorage
     
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
    <View style={{ flex: 1, marginTop: 50, alignItems: "center", backgroundColor:'white' }}>
      <View>
        <View style={{justifyContent:'center', alignItems:'center'}}>
        <SvgXml xml={lineRightSvg} width="190" height="110" style={{ margin: 4 }} />
        </View>
      
        <Text
          style={{
            textAlign: "center",
            color: "#5063BF",
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
         
          padding: 10,
          width: w(98),
        
        }}
      >
        <View>
          <Text
            style={{
              textAlign: "left",
              color: Colors.loginBlue,
              marginTop: 20,
              fontSize: dynamicFontSize * 1.7,
              fontWeight: 700,
              fontFamily:'sanFrancisco'
            }}
          >
            Log in
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
