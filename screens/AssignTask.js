import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import AssignTaskFlatList from "../components/AssignTaskFlatList";
import BackArrowHeaderWhite from "../components/BackArrowHeaderWhite";

export default function AssignTask({navigation}) {
  // const navigation = useNavigation();
  return (
    <View style={styles.rootContainer}>
      <BackArrowHeaderWhite
        searchTitle="Assigned Tasks"
        filter={true}
        title="Assigned Tasks"
        color="#e5af54"
        backButton={() => navigation.goBack()}
      />
      <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
        <AssignTaskFlatList navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#e5af54",
  },
});
