import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import React from "react";
import { Colors } from "../Utilities/Colors";

export default function OnBoardingItem({ item }) {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.container, { width }]}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
      />
      <View style={{ flex: 0.3 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    justifyContent: "center",
    width:'100%',
    height:300,
    resizeMode:'center'
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
