import React, { useContext, useEffect } from "react";
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
import { SvgXml } from "react-native-svg";
import { colors } from "./config/theme";
import { ThemeContext } from "../context/ThemeContext";

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
  const {theme}=useContext(ThemeContext)
  let activeColors=colors[theme.mode]
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

  const person = `
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_43_855)">
<path d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#415EB3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.289 12.8516H9.71477C9.6679 12.8516 9.62884 12.8281 9.6054 12.7891L9.24993 12.1953C9.21477 12.1328 9.23431 12.0547 9.2929 12.0195C9.3554 11.9844 9.43352 12.0039 9.46868 12.0625L9.78899 12.5938H10.2187L10.539 12.0625C10.5741 12.0039 10.6523 11.9805 10.7148 12.0195C10.7773 12.0547 10.7929 12.1328 10.7577 12.1953L10.4023 12.7891C10.371 12.8281 10.332 12.8516 10.289 12.8516Z" fill="#FFFFFE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.78128 7.54297C7.72659 7.54297 7.67581 7.50781 7.66018 7.45312C7.40237 6.65625 7.42581 5.96484 7.72268 5.39062C8.03518 4.79297 8.56643 4.48828 8.96096 4.33593C9.85159 3.99218 10.8282 4.11328 11.125 4.58984C11.6641 4.65234 12.1289 4.97265 12.3789 5.45703C12.6836 6.04297 12.6289 6.75781 12.2305 7.41797C12.1953 7.47656 12.1172 7.49609 12.0547 7.46093C11.9961 7.42578 11.9766 7.34765 12.0117 7.28515C12.3633 6.70312 12.4141 6.08203 12.1485 5.57422C11.9258 5.14843 11.5117 4.87109 11.0313 4.83984C10.9844 4.83593 10.9414 4.80859 10.9219 4.76562C10.7578 4.40625 9.90237 4.24218 9.0469 4.57422C8.49612 4.78515 7.28518 5.48437 7.89846 7.375C7.9219 7.4414 7.88284 7.51562 7.81643 7.53515C7.80862 7.53515 7.7969 7.54297 7.78128 7.54297Z" fill="#FFFFFE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.27722 11.0351L9.03113 12.4375C9.19519 12.0898 9.44129 11.7695 9.76941 11.4844C9.39441 11.2773 8.96863 10.9375 8.72644 10.6484L8.27722 11.0351ZM9.04675 12.8672C8.99988 12.8672 8.95691 12.8398 8.93347 12.8008L8.00379 11.0664C7.97644 11.0117 7.98816 10.9492 8.03504 10.9101L8.66394 10.3711C8.69129 10.3476 8.72644 10.3359 8.7616 10.3398C8.79675 10.3437 8.828 10.3633 8.85144 10.3945C9.0741 10.7109 9.6366 11.1562 10.0546 11.3476C10.0936 11.3672 10.1249 11.4062 10.1288 11.4492C10.1327 11.4922 10.1171 11.5391 10.0819 11.5664C9.63269 11.9141 9.328 12.3242 9.17175 12.7851C9.15613 12.832 9.11316 12.8672 9.06238 12.8711C9.05457 12.8672 9.04675 12.8672 9.04675 12.8672Z" fill="#FFFFFE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.47277 8.42969C8.49621 8.42969 8.52356 8.4375 8.54309 8.44922C8.57434 8.46875 8.59387 8.5 8.59778 8.53125C8.79699 9.58594 9.48059 9.96094 10.0001 9.96094C10.5236 9.96094 11.2032 9.58594 11.4025 8.53125C11.4103 8.4961 11.4298 8.46875 11.4571 8.44922C11.4845 8.42969 11.5236 8.42578 11.5548 8.4336C11.8517 8.5 12.0353 8.29297 12.1017 8.19922C12.2501 7.99219 12.2853 7.71875 12.1876 7.5625C12.0978 7.42188 11.9103 7.42188 11.7657 7.44922C11.7267 7.45703 11.6915 7.44531 11.6603 7.42188C11.629 7.39844 11.6134 7.36328 11.6134 7.32422C11.6134 6.90625 11.5001 6.55078 11.2931 6.32422C11.1876 6.20703 11.0157 6.1836 10.879 6.26953C10.422 6.56641 9.59777 6.78516 8.79699 6.60547C8.63684 6.57031 8.48059 6.65625 8.4259 6.8086C8.37512 6.95313 8.37121 7.11719 8.38293 7.32031C8.38684 7.35938 8.37121 7.39844 8.33996 7.42188C8.30871 7.44922 8.26965 7.45703 8.23059 7.45313C8.08996 7.42578 7.89856 7.42578 7.80871 7.56641C7.71106 7.71875 7.74621 7.99219 7.89465 8.20313C7.96106 8.29688 8.14465 8.50391 8.44153 8.4375C8.45324 8.42969 8.46106 8.42969 8.47277 8.42969ZM10.0001 10.2148C9.62512 10.2148 9.26184 10.0664 8.97277 9.79688C8.68371 9.52735 8.48059 9.15235 8.37121 8.69922C8.10949 8.71485 7.85949 8.58594 7.68762 8.34375C7.48059 8.05078 7.44153 7.66406 7.59778 7.42188C7.66418 7.32031 7.81653 7.16797 8.12512 7.17578C8.12121 7.00781 8.13684 6.85938 8.18762 6.71485C8.28528 6.44141 8.57434 6.28516 8.85559 6.34766C9.58606 6.51172 10.3282 6.31641 10.7423 6.04688C10.9806 5.89063 11.2931 5.9336 11.4845 6.14453C11.7071 6.39453 11.84 6.75391 11.8634 7.17188C12.1798 7.15625 12.3321 7.3125 12.3986 7.41797C12.5509 7.65625 12.5157 8.04688 12.3087 8.33985C12.1368 8.58203 11.8907 8.70703 11.6251 8.69531C11.5197 9.14844 11.3126 9.52735 11.0236 9.79297C10.7423 10.0703 10.3712 10.2148 10.0001 10.2148Z" fill="#FFFFFE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.74609 10.5898C8.67578 10.5898 8.61719 10.5312 8.61719 10.4609V9.30859C8.61719 9.23828 8.67578 9.17969 8.74609 9.17969C8.81641 9.17969 8.875 9.23828 8.875 9.30859V10.4609C8.87109 10.5312 8.8125 10.5898 8.74609 10.5898Z" fill="#FFFFFE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.2539 10.5898C11.1836 10.5898 11.125 10.5312 11.125 10.4609V9.30859C11.125 9.23828 11.1836 9.17969 11.2539 9.17969C11.3242 9.17969 11.3828 9.23828 11.3828 9.30859V10.4609C11.3867 10.5312 11.3281 10.5898 11.2539 10.5898Z" fill="#FFFFFE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.2344 11.4844C10.5586 11.7695 10.8086 12.0859 10.9727 12.4375L11.7266 11.0351L11.2773 10.6523C11.0352 10.9375 10.6094 11.2734 10.2344 11.4844ZM10.957 12.8672C10.9531 12.8672 10.9492 12.8672 10.9453 12.8672C10.8945 12.8633 10.8516 12.8281 10.8359 12.7812C10.6797 12.3203 10.3711 11.9101 9.92578 11.5625C9.89063 11.5351 9.87109 11.4922 9.87891 11.4453C9.88281 11.4023 9.91406 11.3633 9.95313 11.3437C10.3711 11.1562 10.9336 10.7109 11.1563 10.3906C11.1758 10.3594 11.2109 10.3398 11.2461 10.3359C11.2813 10.332 11.3164 10.3437 11.3438 10.3672L11.9727 10.9062C12.0195 10.9453 12.0313 11.0117 12.0039 11.0625L11.0703 12.7969C11.0469 12.8359 11 12.8672 10.957 12.8672Z" fill="#FFFFFE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 15.1328C9.9766 15.1328 9.94926 15.125 9.92582 15.1094C9.27347 14.6523 8.75004 14.0273 8.4141 13.3086C8.07426 12.5898 7.92582 11.7891 7.98832 10.9961C7.99222 10.9258 8.05472 10.8711 8.12504 10.8789C8.19535 10.8828 8.25004 10.9453 8.24222 11.0156C8.12504 12.5352 8.82816 14.0234 10.0743 14.9023C10.1328 14.9414 10.1446 15.0234 10.1055 15.082C10.0782 15.1133 10.0391 15.1328 10 15.1328Z" fill="#FFFFFE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.0001 15.1328C9.961 15.1328 9.92193 15.1133 9.89459 15.0781C9.85553 15.0195 9.86725 14.9414 9.92584 14.8984C11.1719 14.0195 11.8751 12.5312 11.7579 11.0117C11.754 10.9414 11.8047 10.8789 11.8751 10.875C11.9454 10.8711 12.0079 10.9219 12.0118 10.9922C12.0704 11.7852 11.9258 12.5859 11.586 13.3047C11.2501 14.0234 10.7266 14.6484 10.0782 15.1055C10.0547 15.1211 10.0235 15.1328 10.0001 15.1328Z" fill="#FFFFFE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 15.8633C9.92969 15.8633 9.87109 15.8047 9.87109 15.7344V15C9.87109 14.9297 9.92969 14.8711 10 14.8711C10.0703 14.8711 10.1289 14.9297 10.1289 15V15.7344C10.125 15.8047 10.0742 15.8633 10 15.8633Z" fill="#FFFFFE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.2421 14.457C9.23038 14.457 9.21866 14.457 9.20694 14.4531C9.14054 14.4336 9.10147 14.3633 9.121 14.293L9.58975 12.6836C9.60929 12.6172 9.6796 12.5781 9.74991 12.5977C9.81632 12.6172 9.85538 12.6875 9.83585 12.7578L9.3671 14.3672C9.35147 14.418 9.30069 14.457 9.2421 14.457Z" fill="#FFFFFE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.7577 14.457C10.703 14.457 10.6523 14.4219 10.6366 14.3633L10.1679 12.7539C10.1483 12.6875 10.1874 12.6133 10.2538 12.5938C10.3202 12.5742 10.3944 12.6133 10.414 12.6797L10.8827 14.2891C10.9023 14.3555 10.8632 14.4297 10.7968 14.4492C10.7812 14.4531 10.7655 14.457 10.7577 14.457Z" fill="#FFFFFE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.625 13.8984H12.3203C12.25 13.8984 12.1914 13.8398 12.1914 13.7695C12.1914 13.6992 12.25 13.6406 12.3203 13.6406H13.625C13.6953 13.6406 13.7539 13.6992 13.7539 13.7695C13.75 13.8437 13.6914 13.8984 13.625 13.8984Z" fill="#FFFFFE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.0234 15.8633H5.97266C5.54687 15.8633 5.19922 15.5156 5.19922 15.0898V13.418C5.19922 12.8281 5.375 12.2656 5.69531 11.8281C6.04297 11.3555 6.52344 11.0703 7.08594 11.0039L8.17188 10.875C8.24219 10.8672 8.30469 10.918 8.3125 10.9883C8.32031 11.0586 8.26953 11.1211 8.19922 11.1289L7.11328 11.2578C6.01953 11.3867 5.44922 12.4414 5.44922 13.418V15.0898C5.44922 15.375 5.67969 15.6094 5.96875 15.6094H14.0234C14.3086 15.6094 14.543 15.3789 14.543 15.0898V13.418C14.543 12.2695 13.8594 11.3828 12.8789 11.2578L11.8711 11.1289C11.8008 11.1211 11.75 11.0547 11.7617 10.9844C11.7695 10.9141 11.8359 10.8633 11.9062 10.875L12.9141 11.0039C13.4766 11.0742 13.957 11.3633 14.3047 11.832C14.625 12.2656 14.8008 12.832 14.8008 13.418V15.0898C14.8008 15.5156 14.4531 15.8633 14.0234 15.8633Z" fill="#FFFFFE"/>
</g>
<defs>
<clipPath id="clip0_43_855">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
</svg>

`;
  return (
    <ScrollView style={[styles.container,{backgroundColor:activeColors.background}]} showsVerticalScrollIndicator={false}>
      {projectData.map((item, index) => (
        <View key={index} style={[styles.barContainer,{backgroundColor:activeColors.background}]}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={[styles.projectName,{color:activeColors.color}]}>{item.projectName}</Text>
          </View>
          <View style={styles.projectInfoContainer}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                marginHorizontal: 8,
              }}
            >
              <SvgXml xml={person} width="30" height="30" />
              <Text
                style={{
                  color:activeColors.color,
                  fontSize: 16,
                  marginHorizontal: 8,
                }}
              >
                Team Lead Name
              </Text>
            </View>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View
              style={{
                backgroundColor: "#e0e0e0",
                height: 25,
                width: screenWidth - 250,
                marginVertical: 8,
                marginHorizontal: 8,
                // ...getRiskStyles(item.riskPriority),
              }}
            >
              <Animated.View
                style={{
                  backgroundColor: "#62963AF2",
                  height: "100%",
                  width: animatedValues[index].interpolate({
                    inputRange: [0, 0.2, 1],
                    outputRange: ["20%", "20%", "100%"],
                  }),
                  position: "relative",
                }}
              >
                <View style={styles.targetPercentage}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 10,
                      fontWeight: "bold",
                      marginStart: 10,
                      width: "auto",
                    }}
                  >
                    {Math.round(projectData[index].progress * 100)}%
                  </Text>
                </View>
              </Animated.View>
            </View>
            <View style={{ marginHorizontal: 8 }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "row", width: 100 }}>
                  <Text style={{ color:activeColors.color }}>Kick off Date</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{color:activeColors.color}}>: 11/07/2023</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "row", width: 100 }}>
                  <Text style={{color:activeColors.color }}>Wrap-Up Date</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{color:activeColors.color}}>: 11/07/2023</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 8,
    backgroundColor: "white",
  },
  barContainer: {
    marginBottom: 10,
    marginTop: 5,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    backgroundColor: "white",
    elevation: 20,
    paddingVertical: 8,
    shadowColor: "#8F8989",
    marginHorizontal: 12,
  },
  projectInfoContainer: {
    flexDirection: "row",
    justifyContent: "center",
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
    justifyContent: "center",
  },
});

export default HorizontalBarChart;
