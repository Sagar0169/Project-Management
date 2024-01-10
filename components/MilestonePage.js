import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";


const lineChartData = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      data: [
        { value: 20, year: 2020 },
        { value: 45, year: 2021 },
        { value: 28, year: 2022 },
        { value: 80, year: 2023 },
        { value: 99, year: 2024 },
      ],
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
        yAxisSuffix="%" // This adds a "%" suffix to y-axis values
        chartConfig={chartConfig}
        bezier // Use bezier interpolation
        style={{ marginVertical: 8, borderRadius: 16 }}
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
    
  },
});
