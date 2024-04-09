import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import BackArrowHeader from "../components/BackArrowHeader";
import BackArrowHeaderWhite from "../components/BackArrowHeaderWhite";
import { useNavigation } from "@react-navigation/native";
import ProjectListFlatList from "../components/ProjectListFlatList";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../components/config/theme";

export default function Projectlist() {
    const navigation = useNavigation()
    const {theme}=useContext(ThemeContext)
let activeColors=colors[theme.mode]
  return (
    <View style={[styles.rootContainer,{backgroundColor:activeColors.background}]}>
      <BackArrowHeaderWhite
        searchTitle="Project List"
        filter={true}
        title="Project List"
        color="#ffffff"
        backButton={() => navigation.goBack()}
      />
      <View style={{ flex: 1, backgroundColor: activeColors.background }}>
        <ProjectListFlatList/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#ffffff",
  },
});
