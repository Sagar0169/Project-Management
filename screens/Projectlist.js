import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackArrowHeader from "../components/BackArrowHeader";
import BackArrowHeaderWhite from "../components/BackArrowHeaderWhite";
import { useNavigation } from "@react-navigation/native";
import ProjectListFlatList from "../components/ProjectListFlatList";

export default function Projectlist() {
    const navigation = useNavigation()
  return (
    <View style={styles.rootContainer}>
      <BackArrowHeaderWhite
        searchTitle="Project List"
        filter={true}
        title="Project List"
        color="#ffffff"
        backButton={() => navigation.goBack()}
      />
      <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
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
