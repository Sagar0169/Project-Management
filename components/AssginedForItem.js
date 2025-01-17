import { Pressable, View, Text, Touchable, Image, ImageBackground, Dimensions, StyleSheet,TouchableNativeFeedback } from "react-native";
import { useState,useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "./config/theme";


function AssignedForItem({ item }){
    const {theme}=useContext(ThemeContext)
let activeColors=colors[theme.mode]
    const [backgroundColor, setBackgroundColor] = useState(activeColors.inputBg);
    const handlePress = () => {
        // Change the background color to item.color on press
        setBackgroundColor(activeColors.balckBg);
      };
    
    
    return(
        <Pressable onPress={handlePress}>
        <View style={[styles.borderContainer,{backgroundColor:activeColors.inputBg}]}>
            <Text style={{color:activeColors.color}}>
                Name:- {item.title}  
            </Text>
            <Text style={{color:activeColors.color}}>
                  Id:-{item.id}
            </Text>

        </View>
    </Pressable>
    )

}
export default AssignedForItem
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

const styles = StyleSheet.create({
   
    borderContainer: {

        padding: w(3),
        margin:w(1),
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: w(1),
        justifyContent: 'center',
     

    },
})