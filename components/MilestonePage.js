import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";

const lineChartData = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      data: [20, 45, 28, 80, 99],
    },
  ],
};

const barChartData = {
  labels: ["Project A", "Project B", "Project C", "Project D", "Project E"],
  datasets: [
    {
      data: [30, 45, 60, 75, 90],
    },
  ],
};

const pieChartData = [
  {
    name: "Completed",
    value: 30,
    color: "#4CAF50",
  },
  {
    name: "In Progress",
    value: 50,
    color: "#FFC107",
  },
  {
    name: "Not Started",
    value: 20,
    color: "#F44336",
  },
];

export default MilestonePage = () => {
  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={lineChartData}
        width={300}
        height={200}
        yAxisLabel="Progress"
        chartConfig={chartConfig}
      />

      {/* <BarChart
        data={barChartData}
        width={300}
        height={200}
        yAxisLabel="Progress"
        chartConfig={chartConfig}
      />

      <PieChart
        data={pieChartData}
        width={300}
        height={200}
        chartConfig={chartConfig}
        accessor="value"
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
