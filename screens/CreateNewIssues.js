import { View, Dimensions } from "react-native";
import BackArrowHeader from "../components/BackArrowHeader";
import { useNavigation } from "@react-navigation/native";
import CreateNewIssuesForm from "../components/CreateNewIssuesForm";

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
  return width * value;
}
function h(value) {
  const height = Dimensions.get("window").height / 100; // now height is 1% of screen height
  return height * value;
}

function CreateNewIssues({ navigation }) {
  return (
    <View style={{ paddingTop: h(4), flex: 1, backgroundColor: "white" }}>
      <BackArrowHeader
        backButton={() => {
          navigation.goBack();
        }}
        title="Create Issue"
        color={"white"}
      />
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <CreateNewIssuesForm />
      </View>
    </View>
    </View>
  );
}
export default CreateNewIssues;
