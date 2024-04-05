import { Pressable, StyleSheet, Text, View,Dimensions } from 'react-native';
import { colors } from '../config/theme';
import { useContext } from "react";
import { ThemeContext } from '../../context/ThemeContext';





function SubmitButton({ children, onPress,color }) {
  
const {theme}=useContext(ThemeContext)
let activeColors=colors[theme.mode]
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
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed,{width:w(35), backgroundColor: activeColors.blackBg,}]}
      onPress={onPress}
    >
      <View>
        <Text style={[styles.buttonText , {color: activeColors.text}]}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 12,
   
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    
    fontSize: 16,
    fontWeight: '500'
  },
});
