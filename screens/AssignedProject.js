import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import BackArrowHeader from "../components/BackArrowHeader";
import MilestonePage from "../components/MilestonePage";
import TimeSheet from "./TimeSheet";
import IssuesProject from "./IssuesProject";
import { ThemeContext } from "../context/ThemeContext";
import { colors } from "../components/config/theme";
import { useContext } from "react";

export default function AssignedProject({ navigation }) {
  const { theme } = useContext(ThemeContext)
  let activeColors = colors[theme.mode]
  const { width } = Dimensions.get("window");
  const [selectedTab, setSelectedTab] = useState("TIMESHEET");

  function handlerBack() {
    navigation.goBack();
  }

  const renderComponent = () => {
    switch (selectedTab) {
      case "TIMESHEET":
        return <TimeSheet />;
      case "MILESTONE":
        return <MilestonePage />;
      case "ISSUES":
        return <IssuesProject navigation={navigation} />;
      default:
        return null;
    }
  };

  return (
    <View style={{ paddingTop: 20, flex: 1, backgroundColor: activeColors.background }}>
      <BackArrowHeader
        backButton={handlerBack}
        title="Assigned Projects"
        color={"#ffffff"}
        textColor="#2D2C2E"
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          backgroundColor: "#F7F5F5",
          height: 50,
          margin:4        
        }}
      >
        {["TIMESHEET", "MILESTONE", "ISSUES"].map((tab) => (
          <TouchableWithoutFeedback
            key={tab}
            onPress={() => setSelectedTab(tab)}
          >
            <View
              style={[
                styles.tab,
                {
                  backgroundColor: selectedTab === tab ? "#5063BF" : "#8EDFEB",
                },
              ]}
            >
              <Text
                style={{
                  color: selectedTab === tab ? "#FFFFFF" : "#FFFFFF",
                  fontWeight: "bold",
                }}
              >
                {tab}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>

      <View style={{ backgroundColor: "white", flex: 1 }}>
        {renderComponent()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 8,
  },
});
