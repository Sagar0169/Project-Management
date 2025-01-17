import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Animated,
} from "react-native";
import React, { useContext } from "react";
import { Colors } from "../Utilities/Colors";
import { colors } from "./config/theme";
import { ThemeContext } from "../context/ThemeContext";

export default function Paginator({ data, scrollX }) {
  const { width } = useWindowDimensions();
  const {theme}=useContext(ThemeContext)
  let activeColors=colors[theme.mode]
  return (
    <View
      style={{ flexDirection: "row", height: 64, justifyContent: "center" }}
    >
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            style={[styles.dot,{backgroundColor:activeColors.onboard}, { width: dotWidth, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    marginTop: 8,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.darkPurple,
    marginHorizontal: 8,
  },
});
