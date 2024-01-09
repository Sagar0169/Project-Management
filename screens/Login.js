import { View,Image,Text,StyleSheet, Dimensions,Pressable } from "react-native";

import LoginForm from "../components/LoginForm";
import Button from "../components/ui/Button";
import SvgSelector from "../components/SvgSelector";

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

      
        <View style={{flex:1, marginTop:50,alignItems:'center'}}>
            <View >
            <Text style={{  textAlign:'center',color:'#171716', marginTop:25 ,fontSize:dynamicFontSize*1.7 ,fontWeight:700}} >
             PROJECT MANAGEMENT SYSTEM
            </Text>
            </View>
            
         
       
        <View  style={{ marginTop:40,backgroundColor:'white', padding:10,width:w(98),borderRadius:20,borderColor:'black', borderWidth:3,  }}>
        
       
        <View >
            <Text style={{  textAlign:'center',color:'#171716', marginTop:20 ,fontSize:dynamicFontSize*1.7 ,fontWeight:700}} >
             LOGIN
            </Text>
            </View>
        <View style={{marginTop:20,marginHorizontal:5}}>
        <LoginForm/>
        </View>
        <View>
        <Pressable >
      <View style={{flexDirection:'row', justifyContent:'flex-end', padding:10}}>
        <Text  style={{fontSize:16}} >forget Password?</Text>
      </View>
    </Pressable>
        </View>
        <View style={{  marginTop:20,alignItems:'center'}}>
        <Button>SUBMIT</Button>
        </View>

        
        </View>
        
        </View>
        )
}
export default Login