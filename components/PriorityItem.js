import { useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";

function PriorityItem({ item, onSelect, isSelected  }){
    const [backgroundColor, setBackgroundColor] = useState('#9A9A9A');
    const [textBgColor, setTextBgColor] = useState('black');
    const handlePress = () => {
        // Change the background color to item.color on press
        onSelect(item);
        setBackgroundColor('#5063BF');
        setTextBgColor('white')
      };
      
    
    return(
        <Pressable onPress={handlePress}>
        {/* <View style={{...styles.borderContainer,backgroundColor}}> */}
        <View style={[styles.borderContainer, { backgroundColor: isSelected ? item.color : '#9A9A9A' }]}>
            <Text style={{color:isSelected? textBgColor:'#FFFFFF'}}>
                {item.title}
            </Text>

        </View>
    </Pressable>

    )

}
export default PriorityItem;
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
    padding: w(2),
    margin: w(1),
    
    borderRadius: w(1),
    justifyContent: "center",
    backgroundColor: "#9A9A9A",
  },
  text: {
    fontSize: 16,
    color: "black",
  },
});
