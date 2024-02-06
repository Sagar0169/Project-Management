import React from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../Utilities/Colors";

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
const DropDown = ({ data, selectValue, oneSelect,hi,wi ,onPresss}) => {
    
  
      function handlerBack() {
          navigation.goBack();
        }
  

  const [option, setOption] = React.useState(false);

  const selectOption = () => {
    setOption(!option);
  };

  const oneSelectItem = (val) => {
    setOption(false);
    oneSelect(val);
  };

  return (
    <View style={{  marginVertical: h(1),flex:1 }}>
      <TouchableOpacity style={styles.dropDownStyle} onPress={selectOption}>
        <Text style={{color:Colors.timesheetHint}}>{!!selectValue ? selectValue.title : "Select Category"}</Text>
        <Image
          source={require("../../assets/Images/left.png")}
          style={{
            transform: [{ rotate: option ? "90deg" : "270deg" }],
            height:hi,width:wi
          }}
        ></Image>
      </TouchableOpacity>

      {option && (
        <View style={styles.openDropDown}>
          {data.map((val, i) => {
            return (
              <TouchableOpacity
                key={i}
                onPress={() => oneSelectItem(val)}
                style={{
                  ...styles.optionContainer,
                //   backgroundColor:
                //     val &&val.id === selectValue.id ? "pink" : "white",
                }}
              >
                {/* <Image
                  source={val.image}
                  style={styles.optionImage}
                /> */}
                <Text style={styles.optionText}>{val.title}</Text>
                {/* <Text style={{ marginLeft: 'auto' }}>{val.count}</Text> */}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropDownStyle: {
    backgroundColor: "rgba(80, 99, 191, 0.21)",
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
    borderBottomEndRadius:  w(2),
    borderBottomStartRadius:  w(2),
  },
  optionContainer: {
    padding:  w(2),
    borderRadius:  w(2),
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth:  w(0.1),
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
