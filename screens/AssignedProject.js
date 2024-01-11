import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import BackArrowHeader from "../components/BackArrowHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import MilestonePage from "../components/MilestonePage";

export default function AssignedProject({ navigation }) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "Timesheet", title: "Timesheet" },
    { key: "Milestone", title: "Milestone" },
    { key: "Issues", title: "Issues" },
  ]);

  const Milestone = () => (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <MilestonePage/>
    </View>
  );

  const Issues = () => (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* Issues component content */}
    </View>
  );

  const Timesheet = () => (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      {/* Timesheet component content */}
    </View>
  );

  function handlerBack() {
    navigation.goBack();
  }

  const renderScene = SceneMap({
    Timesheet: Timesheet,
    Issues: Issues,
    Milestone: Milestone,
  });

  function renderTabBar(props) {
    return (
      <TabBar
        {...props}
        indicatorStyle={{
          backgroundColor: "#FFFFFF",
          borderBottomLeftRadius: index === 0 ? 8 : 0,
          borderBottomRightRadius: index === 1 ? 8 : 0,
        }}
        style={{
          backgroundColor: "#f5f5f5",
          height: 50,
          justifyContent: "center",
        }}
        labelStyle={{
          width: 90,
          color: "#FC4306",
          fontWeight: "bold",
          textAlign: "center",
        }}
        activeColor="#8e8cf3"
        inactiveColor="black"
      />
    );
  }
  return (
    <SafeAreaView style={{ backgroundColor: "#8e8cf3", flex: 1 }}>
      <BackArrowHeader backButton={handlerBack} title="Assigned Projects" color="#8e8cf3" />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 0, height: 0 }}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
