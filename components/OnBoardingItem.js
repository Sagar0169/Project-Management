import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import React, { useContext } from "react";
import { SvgXml } from "react-native-svg";
import { Colors } from "../Utilities/Colors";
import { colors } from "./config/theme";
import { ThemeContext } from "../context/ThemeContext";

export default function OnBoardingItem({ item }) {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      {item.id === "1" ? (
        <Image source={item.image} style={styles.image} />
      ) : (
        <SvgXml
          xml={item.svg}
          width="100%"
          height={250}
          style={{ margin: 4 }}
        />
      )}
      <View style={{ flex: 0.3 }}>
        <Text style={[styles.title, { color: activeColors.onboard }]}>
          {item.title}
        </Text>
        <Text style={[styles.description, { color: activeColors.onboard }]}>
          {item.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    justifyContent: "center",
    width: "70%",
    height: 300,
    resizeMode: "contain",
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 10,
    color: Colors.darkPurple,
    textAlign: "center",
  },
  description: {
    fontWeight: "800",
    color: Colors.darkPurple,
    textAlign: "center",
    paddingHorizontal: 64,
  },
});
