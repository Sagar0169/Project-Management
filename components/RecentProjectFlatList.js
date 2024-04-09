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
import { useContext, useEffect, useRef } from "react";
import { Colors } from "../Utilities/Colors";
import { SvgXml } from "react-native-svg";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "./config/theme";

function RecentProjectFlatList({ item }) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const {theme}=useContext(ThemeContext)
  let activeColors=colors[theme.mode]
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
    item.priority === "Low"
      ? Colors.lowPriority
      : item.priority === "High"
      ? Colors.highPriority
      : Colors.mediumPriority;
  const complexityColor =
    item.priority === "Low"
      ? Colors.lowComplexity
      : item.priority === "High"
      ? Colors.highComplexity
      : Colors.mediumComplexity;

  const calendarIcon = `<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_28_12)">
<path d="M3.66542 3.56733H3.88002C4.20616 3.56733 4.47053 3.30287 4.47053 2.97683V1.34729V0.737765C4.47053 0.411722 4.20616 0.147293 3.88002 0.147293H3.66542C3.33932 0.147293 3.07495 0.411722 3.07495 0.737765V1.34732V2.97683C3.07495 3.30287 3.33932 3.56733 3.66542 3.56733Z" fill="#5063BF"/>
<path d="M11.2395 3.5527H11.4541C11.7802 3.5527 12.0445 3.28827 12.0445 2.96219V1.19263V0.723101C12.0445 0.397089 11.7802 0.13266 11.4541 0.13266H11.2395C10.9133 0.13266 10.6489 0.397089 10.6489 0.723101V1.19263V2.96216C10.649 3.28827 10.9134 3.5527 11.2395 3.5527Z" fill="#5063BF"/>
<path d="M14.0401 1.34729H12.5246V3.11682C12.5246 3.70711 12.0444 4.03269 11.4541 4.03269H11.2395C10.6493 4.03269 10.169 3.55245 10.169 2.96216V1.34729H4.95059V2.97679C4.95059 3.56708 4.47039 4.04732 3.8801 4.04732H3.6655C3.07525 4.04732 2.59505 3.56708 2.59505 2.97679V1.34729H0.959973C0.430652 1.34729 0 1.77794 0 2.30729V13.9073C0 14.4367 0.430652 14.8673 0.959973 14.8673H14.0401C14.5694 14.8673 15 14.4367 15 13.9073V2.30729C15.0001 1.77797 14.5694 1.34729 14.0401 1.34729ZM14.0401 13.9073H0.960004L0.959973 5.14728H14.0402L14.0407 13.9073C14.0407 13.9073 14.0405 13.9073 14.0401 13.9073Z" fill="#5063BF"/>
<path d="M7.99555 8.08566H9.71924C9.78757 8.08566 9.84296 8.03027 9.84296 7.96194V6.46937C9.84296 6.40104 9.78757 6.34564 9.71924 6.34564H7.99555C7.92722 6.34564 7.87183 6.40104 7.87183 6.46937V7.96194C7.87183 8.03027 7.92722 8.08566 7.99555 8.08566Z" fill="#5063BF"/>
<path d="M10.8085 8.08566H12.5322C12.6006 8.08566 12.656 8.03027 12.656 7.96194V6.46937C12.656 6.40104 12.6006 6.34564 12.5322 6.34564H10.8085C10.7402 6.34564 10.6848 6.40104 10.6848 6.46937V7.96194C10.6848 8.03027 10.7402 8.08566 10.8085 8.08566Z" fill="#5063BF"/>
<path d="M2.36957 10.5292H4.09323C4.16156 10.5292 4.21696 10.4738 4.21696 10.4055V8.91288C4.21696 8.84455 4.16156 8.78915 4.09323 8.78915H2.36957C2.30125 8.78915 2.24585 8.84455 2.24585 8.91288V10.4055C2.24585 10.4738 2.30125 10.5292 2.36957 10.5292Z" fill="#5063BF"/>
<path d="M5.18256 10.5292H6.90622C6.97455 10.5292 7.02994 10.4738 7.02994 10.4055V8.91288C7.02994 8.84455 6.97455 8.78915 6.90622 8.78915H5.18256C5.11424 8.78915 5.05884 8.84455 5.05884 8.91288V10.4055C5.05884 10.4738 5.11424 10.5292 5.18256 10.5292Z" fill="#5063BF"/>
<path d="M7.99555 10.5292H9.71921C9.78754 10.5292 9.84293 10.4738 9.84293 10.4055V8.91288C9.84293 8.84455 9.78754 8.78915 9.71921 8.78915H7.99555C7.92722 8.78915 7.87183 8.84455 7.87183 8.91288V10.4055C7.87183 10.4738 7.92722 10.5292 7.99555 10.5292Z" fill="#5063BF"/>
<path d="M10.8085 10.5292H12.5322C12.6006 10.5292 12.656 10.4738 12.656 10.4055V8.91288C12.656 8.84455 12.6006 8.78915 12.5322 8.78915H10.8085C10.7402 8.78915 10.6848 8.84455 10.6848 8.91288V10.4055C10.6848 10.4738 10.7402 10.5292 10.8085 10.5292Z" fill="#5063BF"/>
<path d="M4.0932 11.2327H2.36957C2.30125 11.2327 2.24585 11.2881 2.24585 11.3564V12.849C2.24585 12.9174 2.30125 12.9727 2.36957 12.9727H4.09323C4.16156 12.9727 4.21696 12.9174 4.21696 12.849V11.3564C4.21693 11.2881 4.16153 11.2327 4.0932 11.2327Z" fill="#5063BF"/>
<path d="M6.90622 11.2327H5.18256C5.11424 11.2327 5.05884 11.2881 5.05884 11.3564V12.849C5.05884 12.9174 5.11424 12.9727 5.18256 12.9727H6.90622C6.97455 12.9727 7.02994 12.9174 7.02994 12.849V11.3564C7.02994 11.2881 6.97455 11.2327 6.90622 11.2327Z" fill="#5063BF"/>
<path d="M9.71924 11.2327H7.99555C7.92722 11.2327 7.87183 11.2881 7.87183 11.3564V12.849C7.87183 12.9174 7.92722 12.9727 7.99555 12.9727H9.71924C9.78757 12.9727 9.84296 12.9174 9.84296 12.849V11.3564C9.84296 11.2881 9.78757 11.2327 9.71924 11.2327Z" fill="#5063BF"/>
<path d="M12.5322 11.2327H10.8085C10.7402 11.2327 10.6848 11.2881 10.6848 11.3564V12.849C10.6848 12.9174 10.7402 12.9727 10.8085 12.9727H12.5322C12.6006 12.9727 12.656 12.9174 12.656 12.849V11.3564C12.656 11.2881 12.6006 11.2327 12.5322 11.2327Z" fill="#5063BF"/>
</g>
<defs>
<clipPath id="clip0_28_12">
<rect width="15" height="15" fill="white"/>
</clipPath>
</defs>
</svg>
`;



  return (
    <Animated.View style={[styles.item, { transform: [{ translateY }] }]}>
      <Pressable style={styles.borderContainer}>
        <View
          style={{ flex: 1, paddingVertical: w(4), paddingHorizontal: w(2),backgroundColor: activeColors.background  }}
        >
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <View style={{ width: w(80), marginBottom: 8 }}>
              <Text
                style={{ color: Colors.black, fontWeight: "500", fontSize: 16,color:activeColors.color }}
              >
                {item.project_name}
              </Text>
            </View>
            <Ionicons size={20} name="ellipsis-vertical" color="#5063BF" />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 6,
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  color: Colors.white,
                  marginEnd: 6,
                  borderRadius: 6,
                  overflow: "hidden",
                  paddingHorizontal: 16,
                  paddingVertical: 6,
                  backgroundColor: priorityColor,
                }}
              >
                {item.priority}
              </Text>
              <Text
                style={{
                  color: Colors.white,
                  marginEnd: 6,
                  borderRadius: 6,
                  overflow: "hidden",
                  paddingHorizontal: 16,
                  paddingVertical: 6,
                  backgroundColor: complexityColor,
                }}
              >
                {item.priority}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <SvgXml
                xml={calendarIcon}
                width="20"
                height="20"
                style={{ margin: 4 }}
              />
              <Text style={{ marginHorizontal: 6, color: "#181818",color:activeColors.color  }}>
                {item.due_date}
              </Text>
            </View>
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
    overflow: "hidden",
    borderRadius: w(4),
    backgroundColor: "white",

    elevation: 6, //This all down four used to give shadow in IOS
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  text: {
    fontSize: 16,
    color: Colors.black,
  },
});
