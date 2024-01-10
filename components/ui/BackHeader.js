import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

export default function BackHeader({ title, backButton, showArrow }) {
  return (
    <SafeAreaView style={{backgroundColor:'#d68eeb'}}>
    <LinearGradient
      style={{
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center", // Center the content horizontally
        paddingHorizontal: 16,
      }}
      colors={["#d68eeb", "#d68eeb"]}
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
              tintColor:'white'
            }}
            source={require('../../assets/Images/left.png')}
          />
        </Pressable>
      )}

      <Text
        style={{
          fontSize: 24,
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          marginHorizontal: 8,
        }}
      >
        {title}
      </Text>
    </LinearGradient>
    </SafeAreaView>
  );
}