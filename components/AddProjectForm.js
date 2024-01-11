import { Pressable, Modal, View, Text, Touchable, Image, ImageBackground, Dimensions, StyleSheet, FlatList, ScrollView, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import BackHeader from "./ui/BackHeader";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome6 } from '@expo/vector-icons';
import Input from "./Input";
import BottomSheet from "./ui/BottomSheet";
import PriorityData from "./PriorityData";
import AssignedForData from "./AssignedForData";
import PriorityItem from "./PriorityItem";
import SubmitButton from "./ui/SubmitButton"
import AssignedForItem from "./AssginedForItem";
import BottomSheetDesign2 from "./BottomSheetDesign2";
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






function AddNewProjectFrom() {

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState(null);

    const selectPriority = (priority) => {
        setSelectedPriority(priority);
      };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleSportSelection = (sport) => {
        addAssignedForItem(sport);
        toggleModal();
    };

    const navigation = useNavigation()


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
    const addPriorityItem = () => {
        // Add a new priority item to the state
        const newPriorityItem = { id: Math.random().toString(), title: "New Priority", color: "#ffffff" };
        setPriorityItems((prevItems) => [...prevItems, newPriorityItem]);
    };
    const addAssignedForItem = (sport) => {
        // Check if the item already exists in the list
        const isDuplicate = AssginedForItem.some(item => item.title === sport);

        if (!isDuplicate) {
            // Add a new assigned for item to the state
            const newAssignedForItem = { id: Math.random().toString(), title: sport, color: "#ffffff" };
            setAssginedForItem((prevItems) => [...prevItems, newAssignedForItem]);
        }

        toggleModal();
    };
    return (
    //MAIN

        <View style={{ backgroundColor: 'white', flex: 1 }}>

            <BackHeader title={"Add New Project"} backButton={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container} >
                    <View>
                        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                            <Ionicons name="list-circle-sharp" size={30} color="#5cd669"
                            />
                            <Text style={styles.textStyle}>New Project</Text>
                        </View>
                        <Input
                            label="Project Name"
                            secure={false}
                            onUpdateValue={onChangeText.bind(this, "projectName")}
                            value={enteredProjectName}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: w(5) }}  //DUE DATE

                    >
                        <View style={{ flex: .3, flexDirection: 'row', paddingTop: 10, marginTop: w(2), }}>
                            <Ionicons name="calendar" size={30} color="#f5b955"
                            />
                            <Text style={[styles.textStyle, { maxWidth: w(30), marginEnd: w(5) }]}>Due Date</Text>

                        </View>
                        <View style={{ flex: .7, maxWidth: w(70), marginStart: w(2) }}>
                            <Input
                                label="Due Date"

                                secure={false}
                                onUpdateValue={onChangeText.bind(this, "dueDate")}
                                value={enteredDueDate}
                            />
                        </View>
                    </View>


                    <View style={{ marginTop: w(5) }}   //ASSIGNED FOR   
                    >
                        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                            <Ionicons name="person-circle" size={38} color="#9d9bff" />
                            <Text style={[styles.textStyle, { marginTop: w(1) }]}>Assigned for</Text>
                        </View>
                        <ScrollView horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: w(1) }}>
                            <Pressable >
                                <View style={{ borderRadius: w(50), borderWidth: 2, width: w(6), marginLeft: 2 }}>
                                    <Ionicons name="people-outline" size={25} color="black" />
                                </View>
                            </Pressable>
                            <View style={{ flex: 1 }}>
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
                            
                            <Pressable onPress={toggleModal} style={{ marginHorizontal: w(1) }}>
                                <Ionicons name="add-circle" size={34} color="black" />
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
                                <BottomSheetDesign2 handleSportSelection={handleSportSelection}/>
                            </View>
                        </Modal>
                    </View>


                    <View style={{ marginTop: w(5) }}              //PRIORITY 
                    >
                        <View style={{ flexDirection: 'row', paddingTop: 10, }}>
                            <Ionicons name="md-flag" size={28} color="#5cd669"
                            />
                            <Text style={styles.textStyle}>Priority</Text>
                        </View>

                        <ScrollView horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                            <View style={{ flexDirection: 'row', marginTop: w(5), alignItems: 'center' }}>
                                <View style={{ flex: 1 }}>
                                    <FlatList
                                        data={priorityItems}
                                        horizontal
                                        scrollEnabled={false}
                                        showsHorizontalScrollIndicator={false}
                                        pagingEnabled
                                        bounces={false}
                                        renderItem={({ item }) => <PriorityItem item={item} onSelect={selectPriority}
                                        isSelected={selectedPriority && selectedPriority.id === item.id}
                                        />}
                                        keyExtractor={(item) => item.id}
                                    />
                                </View>
                            
                            </View>
                        </ScrollView>

                    </View>
                    <View style={{ marginTop: w(5) }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                            <Ionicons name="attach-sharp" size={32} color="#ffa5a5"
                                style={{ transform: [{ rotate: '90deg' }] }}
                            />
                            <Text style={styles.textStyle}>Attachments</Text>
                        </View>
                        <View style={[styles.borderContainer,{marginTop:w(5)}]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="document" size={30} color="#F32323" />
                                <Text style={{ fontSize: dynamicFontSize * 1 }}> Requirements</Text>
                            </View>

                        </View>
                        <View style={[styles.borderContainer, { marginTop: w(5) }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="document" size={30} color="#F32323" />
                                <Text style={{ fontSize: dynamicFontSize * 1 }}> SRS</Text>
                            </View>

                        </View>
                        <View style={[styles.borderContainer, { marginTop: w(5) }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="document" size={30} color="#F32323" />
                                <Text style={{ fontSize: dynamicFontSize * 1 }}> Documentation</Text>
                            </View>
                        </View>

                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: w(5) }}>
                    <SubmitButton> Add Project</SubmitButton>

                </View>

            </ScrollView>






        </View>



    )
}
export default AddNewProjectFrom

const styles = StyleSheet.create({
    container: {
        padding: 10,

    },
    textStyle: {
        marginLeft: 5,
        fontSize: dynamicFontSize * 1,
        fontWeight: '500'
    },
    borderContainer: {
        padding: w(3),
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: w(4),
        justifyContent: 'center',
        backgroundColor: 'white',

    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
    },
})