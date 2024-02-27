import {
  Pressable,
  Modal,
  View,
  Text,
  Dimensions,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
  Platform,
  ToastAndroid,
} from "react-native";
import { AVPlaybackStatus, Video } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Input from "./Input";
import PriorityData from "./PriorityData";
import useFonts from "../hooks/useFonts";
// import Toast from "react-native-simple-toast";
import * as DocumentPicker from "expo-document-picker";
import AssignedForData from "./AssignedForData";
import PriorityItem from "./PriorityItem";
import SubmitButton from "./ui/SubmitButton";
import AssignedForItem from "./AssginedForItem";
import BottomSheetDesign2 from "./BottomSheetDesign2";
import BackArrowHeader from "./BackArrowHeader";
import CustomModal from "./CustomModal";
import * as FileSystem from 'expo-file-system';
import { Svg, SvgXml } from "react-native-svg";
import { Svg1, Svg2, Svg3, Svg4, Svg5, Svg6 } from "./svgs/svgs";
import axios from "axios";
import { addProject, uploadFile } from "../store/http";
import { AuthContext } from "../store/auth-context";
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

//WORK ON MULTIPLE SELECTION

function AddNewProjectFrom() {
  const { token } = useContext(AuthContext);
  async function readFileContent(uri) {
    try {
      const fileContent = await FileSystem.readAsStringAsync(uri);
      return fileContent;
    } catch (error) {
      console.error('Error reading file content:', error);
      throw error;
    }
  }

  const getFileName = (uri) => {
    // Extract file name from the URI
    const parts = uri.split('/');
    return parts[parts.length - 1];
  };
  const navigation = useNavigation();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [isModalVisible4, setModalVisible4] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedSrs, setSelectedSrs] = useState(null);
  const [selectedRequirement, setselectedRequirement] = useState(null);
  const [selectedDocument, setselectedDocument] = useState(null);




  const handleDocumentPress = async (documentType, open) => {
    if (documentType === "srs") {
      try {
        const result = await DocumentPicker.getDocumentAsync({
          type: "application/pdf",
        });
        const loginRespone = await AsyncStorage.getItem("user")
        const token = JSON.parse(loginRespone);
      
        
        if (!result.canceled && !open) {
          const formData = new FormData();
          formData.append('userid', token.userId);
          formData.append('attach', {
            uri: result.assets[0].uri,
            name: getFileName(result.assets[0].uri),
            type: 'application/pdf', // Set the correct MIME type for PDF
          });
          uploadFile(formData, token.token)

          setSelectedSrs(result.assets[0].name);
        }
      } catch (err) {
        setModalVisible4(true)
        console.error("Error picking document:");

      }
    } else {
      if (documentType === "documentation") {
        try {
          const result = await DocumentPicker.getDocumentAsync({
            type: "application/pdf",
          });

          if (!result.canceled && !open) {
            // const formData = new FormData();
            // formData.append('userid', token.userId);
            // formData.append('attach', {
            //   uri: result.assets[0].uri,
            //   name: getFileName(result.assets[0].uri),
            //   type: 'application/pdf', // Set the correct MIME type for PDF
            // });
            // uploadFile(formData, token.token)
            setselectedDocument(result.assets[0].name);
          } else {
            if (open && result.assets[0].uri) {
              const source = { uri: result.assets[0].uri };
              // Linking.openURL(result.assets[0].uri);
              return (
                <Video
                  source={source}
                  resizeMode="contain"
                  useNativeControls
                  style={{ width: "90%", height: 300 }}
                />
              );
            } else {
              setModalVisible4(true)
              console.log("Document picker cancelled", result.assets);
            }
          }
        } catch (err) {
          setModalVisible4(true)
          console.error("Error picking document:");
        }
      }
      else {
        try {
          const result = await DocumentPicker.getDocumentAsync({
            type: "application/pdf",
          });

          if (!result.canceled && !open) {
            // const formData = new FormData();
            // formData.append('userid', token.userId);
            // formData.append('attach', {
            //   uri: result.assets[0].uri,
            //   name: getFileName(result.assets[0].uri),
            //   type: 'application/pdf', // Set the correct MIME type for PDF
            // });
            // uploadFile(formData, token.token)
            
            setselectedRequirement(result.assets[0].name);
          } else {
            if (open && result.assets[0].uri) {
              const source = { uri: result.assets[0].uri };
              // Linking.openURL(result.assets[0].uri);
              return (
                <Video
                  source={source}
                  resizeMode="contain"
                  useNativeControls
                  style={{ width: "90%", height: 300 }}
                />
              );
            } else {
              setModalVisible4(true)
              console.log("Document picker cancelled", result.assets);
            }
          }
        } catch (err) {
          setModalVisible4(true)
          console.error("Error picking document:");
        }
      }
    }

  };

  const showModal = () => {
    setModalVisible2(true);
  };

  const hideModal = () => {
    setModalVisible2(false);
    setModalVisible3(false);
    setModalVisible4(false)
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateChange = (event, selectedDate) => {
    hideDatePicker();
    if (selectedDate) {
      setSelectedDate(selectedDate);
      setEnteredDueDate(selectedDate.toISOString().split("T")[0]); // Update the input text with the selected date
    }
  };

  const [selectedPriority, setSelectedPriority] = useState(null);

  const selectPriority = (priority) => {
    setSelectedPriority(priority);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [selectedId, setSelectedId] = useState([]);
  const handleSportSelection = (sport, id) => {
    setSelectedId(id)
    addAssignedForItem(sport, id);
    toggleModal();
  };

  const [enteredProjectName, setEnteredProjectName] = useState("");
  const [enteredDueDate, setEnteredDueDate] = useState("");
  const [priorityItems, setPriorityItems] = useState(PriorityData);
  const [AssginedForItem, setAssginedForItem] = useState(AssignedForData);

  function onChangeText(inputType, enteredValue) {
    switch (inputType) {
      case "projectName":
        setEnteredProjectName(enteredValue);
        break;
      case "dueDate":
        setEnteredDueDate(enteredValue);
        break;
    }
  }
 async function validateForm() {
  const loginRespone = await AsyncStorage.getItem("user")
  const response = JSON.parse(loginRespone);
  
    // Check if enteredProjectName, enteredDueDate, and AssginedForItem have values
    if (
      enteredProjectName.trim() !== "" &&
      enteredDueDate.trim() !== "" &&
      AssginedForItem.length > 0
    ) {
      const newProject = {
        userid: response.userId, // You may want to generate a unique ID
        emp_id: selectedId,
        project_name: enteredProjectName,
        status: "Started",
        due_date: enteredDueDate,
        priority: selectedPriority.title,

      }
      addProject(token,newProject)


      return true;
    } else {
      return false;
    }
  }
  const addAssignedForItem = (sports, ids) => {
    sports.forEach((sport, index) => {
      // Check if the item already exists in the list
      const isDuplicate = AssginedForItem.some((item) => item.title === sport);

      if (!isDuplicate) {
        // Add a new assigned for item to the state with the corresponding id
        const newAssignedForItem = {
          id: ids[index],
          title: sport,
          color: "#ffffff",
        };
        console.log("assigned item", newAssignedForItem);
        setAssginedForItem((prevItems) => [...prevItems, newAssignedForItem]);
      } else {
        ToastAndroid.show("This member already selected", ToastAndroid.SHORT);
      }
    });

    toggleModal();
  };



  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    const loadFonts = async () => {
      await useFonts();
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);
  if (!fontsLoaded) {
    // Return a loading state or null while fonts are loading
    return null;
  }
  return (
    //MAIN

    <View style={{ paddingTop: h(4), flex: 1, backgroundColor: "white" }}>
      <BackArrowHeader
        title={"Add New Project"}
        backButton={() => navigation.goBack()}
        color={"white"}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        <View style={styles.container}>
          <View>
            <View style={{ flexDirection: "row", paddingTop: 10 }}>
              <Text style={[styles.textStyle, { fontFamily: "poppinsemi" }]}>
                New Project
              </Text>
            </View>
            <Input
              label="Project Name"
              secure={false}
              onChangeText={onChangeText.bind(this, "projectName")}
              value={enteredProjectName}
            />
          </View>
          <View
            style={{ marginTop: w(1) }} //DUE DATE
          >
            <View
              style={{
                flex: 0.3,

                paddingTop: 10,
                marginTop: w(2),
              }}
            >
              <Text
                style={[
                  styles.textStyle,
                  { maxWidth: w(30), marginEnd: w(5) },
                  { fontFamily: "poppinsemi" },
                ]}
              >
                Due Date
              </Text>
            </View>
            <Pressable onPress={showDatePicker}>
              <View
                style={{
                  flex: 0.7,
                  maxWidth: w(100),
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Input
                  label="Due Date"
                  editable={false}
                  secure={false}
                  onChangeText={onChangeText.bind(this, "dueDate")}
                  value={enteredDueDate}
                />
                <SvgXml
                  xml={Svg6}
                  width="20"
                  height="20"
                  style={{ marginLeft: w(-8) }}
                />
              </View>
            </Pressable>
          </View>

          <View
            style={{ marginTop: w(5) }} //ASSIGNED FOR
          >
            <View style={{ paddingTop: 10 }}>
              <Text
                style={[
                  styles.textStyle,
                  { marginTop: w(1) },
                  { fontFamily: "poppinsemi" },
                ]}
              >
                Assigned for
              </Text>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: w(1),
                }}
              >
                <Pressable style={{ marginEnd: w(1) }}>
                  <View
                    style={{
                      width: w(6),
                      marginLeft: 2,
                    }}
                  >
                    <SvgXml
                      xml={Svg1}
                      width="40"
                      height="40"
                      style={{ margin: 4 }}
                    />
                  </View>
                </Pressable>
                <View style={{ flex: 1, marginLeft: w(3) }}>
                  <FlatList
                    data={AssginedForItem}
                    horizontal
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    renderItem={({ item }) => <AssignedForItem item={item} />}
                    keyExtractor={(item) => item.id}
                  />
                </View>

                <Pressable
                  onPress={toggleModal}
                  style={{ marginHorizontal: w(1) }}
                >
                  <SvgXml
                    xml={Svg2}
                    width="40"
                    height="40"
                    style={{ margin: 4 }}
                  />
                </Pressable>
              </View>
            </ScrollView>

            <Modal
              animationType="slide"
              transparent={true}
              visible={isModalVisible}
              onRequestClose={() => {
                toggleModal();
              }}
            >
              <View style={[styles.modalContainer]}>
                {/* <BottomSheet sports={['Shreyash Jain (Android)', 'Nimish Sharma(Android)', 'Akshat Bansal (Android)', 'Sagar (Android)', 'Rohit (Java)', 'Aman pandey(Java)', 'Atul (Java)', 'Shubhra srivastava (php)', 'Yashika gupta (php)', 'Abhay sahani (Designer)', 'Jitendar singh (Designer)']} handleSportSelection={handleSportSelection} /> */}
                <BottomSheetDesign2
                  handleSportSelection={handleSportSelection}
                />
              </View>
            </Modal>
          </View>

          <View
            style={{ marginTop: w(5) }} //PRIORITY
          >
            <View style={{ flexDirection: "row", paddingTop: 10 }}>
              <Text style={[styles.textStyle, { fontFamily: "poppinsemi" }]}>
                Priority
              </Text>
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  flexDirection: "row",
                  marginTop: w(5),
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 1 }}>
                  <FlatList
                    data={priorityItems}
                    horizontal
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    renderItem={({ item }) => (
                      <PriorityItem
                        item={item}
                        onSelect={selectPriority}
                        isSelected={
                          selectedPriority && selectedPriority.id === item.id
                        }
                      />
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
          <View style={{ marginTop: w(5) }}>
            <View style={{ flexDirection: "row", paddingTop: 10 }}>
              <Text style={[styles.textStyle, { fontFamily: "poppinsemi" }]}>
                Attachments
              </Text>
            </View>
            <TouchableOpacity
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: w(5),
              }}

            >
              <SvgXml xml={Svg3} width="55" height="55" />

              <Text
                style={{
                  fontFamily: "poppinsemi",
                  fontSize: dynamicFontSize * 1,
                }}
              >
                Browse files to upload
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.borderContainerDocument2, { marginTop: w(5) }]}
              onPress={() => handleDocumentPress("srs")}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <SvgXml xml={Svg4} width="30" height="30" />
                {selectedSrs && (
                  <Text style={{ fontSize: dynamicFontSize * 1 }}>
                    {selectedSrs}
                  </Text>
                )}

                {!selectedSrs && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text>No Selected File - </Text>
                    <SvgXml xml={Svg5} width="30" height="30" />
                  </View>
                )}
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={[styles.borderContainerDocument2, { marginTop: w(5) }]}
              onPress={() => handleDocumentPress("requirements")}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <SvgXml xml={Svg4} width="30" height="30" />
                {selectedRequirement && (
                  <Text style={{ fontSize: dynamicFontSize * 1 }}>
                    {selectedRequirement}
                  </Text>
                )}
                {!selectedRequirement && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text>No Selected File - </Text>
                    <SvgXml xml={Svg5} width="30" height="30" />
                  </View>
                )}
              </View>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              style={[styles.borderContainerDocument2, { marginTop: w(5) }]}
              onPress={() => handleDocumentPress("documentation")}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <SvgXml xml={Svg4} width="30" height="30" />
                {selectedDocument && (
                  <Text style={{ fontSize: dynamicFontSize * 1 }}>
                    {selectedDocument}
                  </Text>
                )}
                {!selectedDocument && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text>No Selected File - </Text>
                    <SvgXml xml={Svg5} width="30" height="30" />
                  </View>
                )}
              </View>
            </TouchableOpacity> */}

            {/* <TouchableOpacity
                            style={[styles.borderContainerDocument3, { marginTop: w(5) }]}
                            onPress={() => handleDocumentPress("Documentation")}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="document" size={30} color="#F3B523" />
                                {selectedDocument && (<Text style={{ fontSize: dynamicFontSize * 1 }}>{selectedDocument}</Text>
                                )}
                            </View>
                        </TouchableOpacity> */}
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: w(5),
          }}
        >
          <SubmitButton
            onPress={() => {
              if (validateForm()) {

                setModalVisible2(true);
              } else {
                setModalVisible3(true);
              }
            }}
            color={"#d68eeb"}
          >
            {" "}
            Add Project
          </SubmitButton>
        </View>
        {isModalVisible2 && (
          <CustomModal
            visible={isModalVisible2}
            message="Project Added Sucessfully."
            onHide={hideModal}
          />
        )}
        {isModalVisible3 && (
          <CustomModal
            visible={isModalVisible3}
            message="Please fill all details."
            onHide={hideModal}
          />
        )}
         {isModalVisible4 && (
          <CustomModal
            visible={isModalVisible3}
            message="Document not selected"
            onHide={hideModal}
          />
        )}
      </ScrollView>

      {isDatePickerVisible && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}
export default AddNewProjectFrom;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  textStyle: {
    marginLeft: 5,
    fontSize: dynamicFontSize * 1,
    fontWeight: "500",
  },
  borderContainer: {
    padding: w(3),
    borderWidth: 2,
    borderColor: "black",
    borderRadius: w(4),
    justifyContent: "center",
    backgroundColor: "white",
  },
  borderContainerDocument1: {
    padding: 20, // Replace with your desired padding
    borderWidth: 1,
    borderColor: "transparent", // Set transparent border color
    borderRadius: 10, // Replace with your desired border radius
    justifyContent: "center",
    backgroundColor: "#F0DFDF",
    position: "relative", // Required for absolute positioning
  },
  dashedBorder: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  borderContainerDocument2: {
    padding: w(3),
    borderWidth: 1,

    borderColor: "black",
    borderRadius: w(1),
    justifyContent: "center",
    backgroundColor: "#E9EEFF",
  },
  borderContainerDocument3: {
    padding: w(3),
    borderWidth: 1,

    borderColor: "black",
    borderRadius: w(1),
    justifyContent: "center",
    backgroundColor: "#FAF3E3",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "flex-end",
  },
});
