import React, { useContext, useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../Utilities/Colors";
import { colors } from "../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

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
const DropDown = ({ data, selectValue, oneSelect, hi, wi, onPresss,from }) => {
  const {theme}=useContext(ThemeContext)
    let active=colors[theme.mode]
  function handlerBack() {
    navigation.goBack();
  }

  const [option, setOption] = React.useState(false);

  const selectOption = () => {
    setOption(!option);
  };

  const oneSelectItem = (val) => {
    setOption(false);
    // console.log(val)
    oneSelect(val);
  };
 

  return (
    <View style={{  marginVertical: h(1),flex:1 }}>
      <TouchableOpacity style={{
         backgroundColor: active.blackBg,
         minHeight: 40,
         borderTopEndRadius: w(1),
         borderTopStartRadius: w(1),
         borderBottomStartRadius: w(1),
         borderBottomEndRadius: w(1),
         flexDirection: "row",
         alignItems: "center",
         justifyContent: "space-between",
         padding: w(4),
         
         width: "100%",
      }} onPress={selectOption}>
        <Text style={{color:active.text}}>{!!selectValue ? selectValue.project_name : "Select Category"}</Text>
        <Image
          source={require("../../assets/Images/left.png")}
          style={{
            transform: [{ rotate: option ? "90deg" : "270deg" }],
            height: hi,
            width: wi,
          }}
        ></Image>
      </TouchableOpacity>

      {option && (
  <View style={{
    backgroundColor: active.background,
    padding: w(2),
    borderBottomEndRadius: w(2),
    borderBottomStartRadius: w(2),
  }}>
    {data.map((val) => (
      <TouchableOpacity
        key={val.id}
        onPress={() => oneSelectItem(val)}
        style={{padding: w(2),
          borderRadius: w(2),
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: w(0.1),
          borderBottomColor:active.color
        }}
      >
        <Text style={{
          flex: 1,
          marginLeft: 0,
          color:active.color
        }}>{val.title}</Text>
      </TouchableOpacity>
    ))}
  </View>
)}
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownStyle: {
    backgroundColor: "ccc",
    minHeight: 40,
    borderTopEndRadius: w(1),
    borderTopStartRadius: w(1),
    borderBottomStartRadius: w(1),
    borderBottomEndRadius: w(1),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: w(4),
    
    width: "100%",
  },
  openDropDown: {
    backgroundColor: "white",
    padding: w(2),
    borderBottomEndRadius: w(2),
    borderBottomStartRadius: w(2),
  },
  optionContainer: {
    padding: w(2),
    borderRadius: w(2),
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: w(0.1),
  },
  optionImage: {
    width: w(20),
    height: w(20),
    marginRight: 0,
  },
  optionText: {
    flex: 1,
    marginLeft: 0,
  },
});

export default DropDown;
