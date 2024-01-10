import { Pressable, View, Text, Touchable,Image, ImageBackground,Dimensions,StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackHeader from "./ui/BackHeader";
function AddNewProjectFrom(){

    const navigation = useNavigation()
    
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
      return width * value;
    }
    function h(value) {
      const height = Dimensions.get("window").height / 100; // now height is 1% of screen height
      return height * value;
    }
    return(
      
    
        <View>
        <BackHeader title={"Add New Project"} backButton={()=> navigation.goBack()}/>
        <View style={styles.container} >
            <Text style={styles.textStyle}>Add Project</Text>
            <Text></Text>
        </View>
        </View>
   
        
        
    )
}
export default AddNewProjectFrom

const styles = StyleSheet.create({
    container:{
        padding:10,

    },
    textStyle:{
        fontSize:18,
        fontWeight:'600'
    }
})