import { View,Image,Text,StyleSheet, Dimensions } from "react-native";

import LoginForm from "../components/LoginForm";

function Login(){
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
    return width*value
  }
  function h(value) {
    const height = Dimensions.get("window").height / 100; // now height is 1% of screen height
    return height*value
  }
    return(

      
        <View style={{flex:1, marginTop:40}}>
            <View >
            <Text style={{  textAlign:'center',color:'#F09D49', marginTop:25 ,fontSize:dynamicFontSize*1.7 ,fontWeight:700}} >
             PROJECT MANAGEMENT SYSTEM
            </Text>
            </View>
            

       
        <View  style={{ marginTop:40,backgroundColor:'blue', height:h(30 ),width:w(98),borderRadius:20,borderColor:'black', borderWidth:2 }}>
        <View style={{marginTop:20,marginHorizontal:10}}>
        <LoginForm/>
        </View>
        </View>
        </View>
        )
}
export default Login