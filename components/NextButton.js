import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import Svg, { G, Circle } from "react-native-svg";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../Utilities/Colors";
import SubmitButton from "./ui/SubmitButton";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "./config/theme";

const NextButton = ({ percentage, scrollTo, buttonText }) => {
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);
  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;

      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });
    return () => {
      progressAnimation.removeAllListeners();
    };
  }, [percentage]);

  return (
    <View
      style={[styles.container, { backgroundColor: activeColors.background }]}
    >
      <SubmitButton onPress={scrollTo} color={Colors.black}>
        {buttonText}
      </SubmitButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white", // Add a background color for debugging
  },
  button: {
    position: "absolute",
    backgroundColor: Colors.darkBlue,
    borderRadius: 100,
    padding: 20,
  },
});

export default NextButton;
