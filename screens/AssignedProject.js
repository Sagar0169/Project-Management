import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import BackArrowHeader from "../components/BackArrowHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import MilestonePage from "../components/MilestonePage";
import TimeSheet from "./TimeSheet";

export default function AssignedProject({ navigation }) {
  const { width, height } = Dimensions.get("window");

  // Calculate a scaling factor based on the screen width
  const scaleFactor = width / 375; // Adjust 375 based on your design reference width

  // Define the base font size for your design
  const baseFontSize = 16;

  // Calculate the dynamic font size
  const dynamicFontSize = baseFontSize * scaleFactor;
  // const fontSize=FontSize font={16}
  function w(value) {
    const width = Dimensions.get("window").width / 100; // now width is 1% of screen width
    return width*value
  }
  function h(value) {
    const height = Dimensions.get("window").height / 100; // now height is 1% of screen height
    return height*value
  }


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
   <TimeSheet/>
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
    <View style={{paddingTop:h(4),flex:1,backgroundColor:"#8e8cf3"}}>

      <BackArrowHeader backButton={handlerBack} title="Assigned Projects" color={"#8e8cf3"} />
      <View style={{backgroundColor:'white', flex:1}}>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: 0, height: 0 }}
        renderTabBar={renderTabBar}
      />
</View>

    </View>
  );
}

const styles = StyleSheet.create({});
