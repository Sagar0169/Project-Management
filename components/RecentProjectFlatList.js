import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef } from "react";
import { Colors } from "../Utilities/Colors";

function RecentProjectFlatList({ item }) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const animateList = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false, // Set to true if possible for better performance
    }).start();
  };

  useEffect(() => {
    animateList();
  }, []);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0], // Adjust the values based on your desired animation
  });
  const priorityColor =
    item.Priority === "Low"
      ? Colors.lowPriority
      : item.Priority === "High"
      ? Colors.highPriority
      : Colors.mediumPriority;
  const complexityColor =
    item.TaskComplexity === "Low"
      ? Colors.lowComplexity
      : item.TaskComplexity === "High"
      ? Colors.highComplexity
      : Colors.mediumComplexity;
  return (
    <Animated.View style={[styles.item, { transform: [{ translateY }] }]}>
      <Pressable style={styles.borderContainer}>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <View style={{ width: w(80) }}>
            <Text style={{ color: Colors.black, fontWeight: "500", fontSize: 16 }}>
              {item.title}
            </Text>
          </View>
          <Ionicons size={24} name="ellipsis-horizontal-outline" />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            marginTop: 6,
          }}
        >
          <Text
            style={{
              color: Colors.black,
              marginEnd: 6,
              borderRadius: 18,
              borderWidth: 2,
              overflow:'hidden',
              paddingHorizontal: 16,
              paddingVertical: 6,
              backgroundColor: priorityColor,
            }}
          >
            {item.Priority}
          </Text>
          <Text
            style={{
              color: Colors.black,
              marginEnd: 6,
              borderRadius: 18,
              borderWidth: 2,
              overflow:'hidden',
              paddingHorizontal: 16,
              paddingVertical: 6,
              backgroundColor: complexityColor,
            }}
          >
            {item.TaskComplexity}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../assets/Images/calendar.png")}
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
                margin: 4,
              }}
            />
            <Text style={{ marginHorizontal: 6, color: "#181818" }}>
              {item.StartDate}
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons size={20} name="link-outline" />
            <Text style={{ marginHorizontal: 4 }}>3</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
export default RecentProjectFlatList;
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
    margin: w(1),
    borderWidth: 2,
    overflow:'hidden',
    borderColor: "black",
    borderRadius: w(6),
    backgroundColor: "white",
    padding: w(3),
  },
  text: {
    fontSize: 16,
    color: Colors.black,
  },
});
