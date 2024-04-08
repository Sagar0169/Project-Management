import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "./config/theme";
import { useContext } from "react";

export default function BackArrowHeader({ title, backButton, showArrow ,color,textColor}) {
    
const {theme}=useContext(ThemeContext)
let activeColors=colors[theme.mode]
  return (
    <LinearGradient
      style={{
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center", // Center the content horizontally
        paddingHorizontal: 16,
      }}
      colors={[activeColors.background, activeColors.background]}
    
    >
      {showArrow ? null : ( // If showArrow is true, don't render the Pressable
        <Pressable
          style={{
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            padding: 15,
          }}
          onPress={backButton}
          hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <Image
            style={{
              width: 40,
              height: 40,
              resizeMode: "cover",
              
                
            }}
            source={require("../assets/Images/leftArrow.png")}
          />
        </Pressable>
      )}

      <Text
        style={{
          fontSize: 24,
          color: activeColors.color,
          fontWeight: "600",
          textAlign: "center",
          
          marginHorizontal: 8,
        }}
      >
        {title}
      </Text>
    </LinearGradient>
  );
}
