import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  Image,
} from "react-native";
import Input from "./Input";

// Function to generate random project names
const generateRandomProjectName = () => {
  const adjectives = ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"];
  const nouns = ["Project", "Task", "Assignment", "Job", "Mission"];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective} ${randomNoun}`;
};

// Generate project data with random project names
const projectData = Array.from({ length: 20 }, (_, index) => ({
  projectName: generateRandomProjectName(),
  progress: Math.random(),
  riskPriority: index % 3 === 0 ? "low" : index % 3 === 1 ? "medium" : "high",
}));

const HorizontalBarChart = () => {
  const screenWidth = Dimensions.get("window").width;
  const animatedValues = projectData.map(() => new Animated.Value(0));

  useEffect(() => {
    // Start filling animation when the component mounts
    const animations = animatedValues.map((animatedValue, index) => {
      return Animated.timing(animatedValue, {
        toValue: projectData[index].progress,
        duration: 1000,
        useNativeDriver: false,
      });
    });

    Animated.stagger(100, animations).start();
  }, []);

  const getRiskStyles = (riskPriority) => {
    switch (riskPriority) {
      case "high":
        return { borderColor: "red", borderWidth: 2 };
      case "medium":
        return { borderColor: "orange", borderWidth: 2 };
      case "low":
        return { borderColor: "green", borderWidth: 2 };
      default:
        return {};
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1 }}>
        {projectData.map((item, index) => (
          <View key={index} style={styles.barContainer}>
            <Text style={styles.projectName}>{item.projectName}</Text>
            <View style={styles.projectInfoContainer}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius:10,
                  }}
                  source={require("../assets/Images/male.png")}
                  resizeMode="contain"
                />
                <Text>Team Lead Name</Text>
              </View>
            </View>
            <View style={styles.projectInfoContainer}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text>12/10/2023</Text>
                  <Text>Kickoff Date</Text>
                </View>
                <View>
                  <Text>12/10/2024</Text>
                  <Text>Wrap-Up Date</Text>
                </View>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#e0e0e0",
                height: 25,
                width: screenWidth - 50,
                borderRadius: 5,
                marginVertical: 8,
                marginHorizontal: 8,
                ...getRiskStyles(item.riskPriority),
              }}
            >
              <Animated.View
                style={{
                  backgroundColor: "rgb(134, 65, 244)",
                  height: "100%",
                  borderRadius: 4,
                  width: animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                  position: "relative",
                }}
              >
                <View style={styles.targetPercentage}>
                  <Text
                    style={{ color: "white", fontSize: 12, fontWeight: "bold",marginStart:8 }}
                  >
                    {Math.round(projectData[index].progress * 100)}%
                  </Text>
                </View>
              </Animated.View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 8,
  },
  barContainer: {
    alignItems: "center",
    marginBottom: 10,
    marginTop: 5,
    paddingHorizontal: 18,
    paddingVertical: 20,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#A39090",
  },
  projectInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectName: {
    fontWeight: "500",
    fontSize: 18,
    marginLeft: 5,
  },
  targetPercentage: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    textAlignVertical: "center",
    justifyContent:'center',
  },
  
});

export default HorizontalBarChart;
