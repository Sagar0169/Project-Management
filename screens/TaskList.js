import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import BackArrowHeader from '../components/BackArrowHeader';

export default function TaskList({navigation}) {
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
  
      function handlerBack() {
          navigation.goBack();
        }
  
       
  
        
    return (<>
     <View style={{paddingTop:h(4),flex:1,backgroundColor:"#4ec05a"}}>
        <BackArrowHeader backButton={handlerBack} title="Task List" color={"4ec05a"}/>
        <View style={{backgroundColor:'white', flex:1}}>
        
  
        </View>
      </View>
      </>
    )
  }