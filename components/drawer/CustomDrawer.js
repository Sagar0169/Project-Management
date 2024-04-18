import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, Image, Text, View, ScrollView, Switch } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

// import { AuthContext } from "../store/auth-context";
import { AppUtil } from "../../Utilities/AppUtils";
import { Colors } from "../../Utilities/Colors";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../store/auth-context";
import SvgSelector from "../SvgSelector";
import { ThemeContext } from "../../context/ThemeContext";
import { colors } from "../config/theme";



export const CustomDrawer = (props) => {

  const { name, type } = props;

  const authCtx = useContext(AuthContext);
  const { theme, updateTheme } = useContext(ThemeContext)
  let activeColors = colors[theme.mode]
  const [themeEnabled, setThemeEnabled] = useState(theme.mode === "dark");

  const handleChangeTheme = () => {
    updateTheme();
    setThemeEnabled((previousState) => !previousState);
    // Handle theme change logic here
  };

  const handleLogout = async () => {
    const loginRespone = await AsyncStorage.getItem("user");
    const response = JSON.parse(loginRespone);
    authCtx.logout();
    // const logout = await Logout(response.userId, response.token);
    // if (logout._resultflag == 1) {
    //   authCtx.logout();
    // }
    // else {
    //   console.log(logout.message)
    // }
  };

  const handleCheckIn = async () => {
    props.navigation.navigate("CheckIn/Out")
  
  };
  const handleCompanyView = async () => {
    props.navigation.navigate("CompanySite")

  };
  const handleBranchView = async () => {
    props.navigation.navigate("CompanySite")

  };

  const handleAssignedTask = async () => {
  
  };

  const handleProjectTask = async () => {
  
  };
  

  // const AuthCtx=useContext(AuthContext)
  // const isAuthenticated=AuthCtx.isAuthenticated
  function logoutHandler() {
    // AuthCtx.logout()
    return;
  }
  // let name=props.name;
  // let type=props.type;
  useEffect(() => {
    console.log("--------->>>>>>", name, type)
    // const getUserDetails = async() => {

    // try{
    //   const loginRespone=await AsyncStorage.getItem("user")
    //   const response = JSON.parse(loginRespone);
    //   console.log("name&type",response)
    //   name=response.name
    //   type=response.usertype

    // }catch{
    // }
    // }
    // getUserDetails()
  }, [name, type])
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: activeColors.drawerBg,
        paddingTop: AppUtil.getHP(4),
      }}
    >
      <View style={{ flex: 0.20 }}>
        <LinearGradient
          style={{ flex: 1, backgroundColor: "#FFFFFF", width: "100%" }}
          colors={[activeColors.drawerBg, activeColors.drawerBg]}
        >

          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 15,
              alignItems: 'center',
              marginTop: AppUtil.getHP(5),
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>

                <Image
                  style={{ width: AppUtil.getWP(9), height: AppUtil.getWP(9), borderRadius: AppUtil.getWP(4) }}
                  source={require("../../assets/Images/blueArrow.png")}
                />

              </TouchableOpacity>

              <View style={{ marginStart: 10 }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 19,
                    fontWeight: "600",
                  }}
                >
                  {name}
                </Text>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 17,
                    fontWeight: "400",
                  }}
                >
                  {type}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("EditProfile")}
            >
              <Image
                style={{ width: AppUtil.getWP(15), height: AppUtil.getWP(15), borderRadius: AppUtil.getWP(8) }}
                source={require("../../assets/Images/profile.png")}
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      <ScrollView
        style={{ flex: 0.83, backgroundColor: activeColors.background, padding: 10 }}
      >
        {/* <TouchableOpacity
          onPress={() => props.navigation.navigate("WelcomeScreen")}
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            marginTop: 5,
            alignItems: "center",
          }}
        >
          <Image
            style={{ marginEnd: 7, marginBottom: 9 }}
            source={require("../../assets/Images/userProfile.png")}
          />
          <Text style={{fontWeight:'600'}}>User Profile</Text>
        </TouchableOpacity> */}



        {/* Dashboard */}
         <TouchableOpacity onPress={() => props.navigation.closeDrawer()} style={{flexDirection:'row',borderBottomWidth:1,marginTop:12,alignItems:'center'}}>
         <View style={{marginEnd:7,marginBottom:9}} >
        <SvgSelector  name={"dashboard"} w={AppUtil.getWP(5)} h={AppUtil.getWP(5)}/>
        </View>
          {/* <Image style={{marginEnd:7,marginBottom:9}} source={require('../../assets/Images/dashboard.png')}/> */}
          <Text style={{ fontWeight: '600', color: activeColors.color }}>Dashboard</Text>
        </TouchableOpacity>

        {/* Assigned TaskList */}
        <TouchableOpacity onPress={handleAssignedTask} style={{ flexDirection: 'row', borderBottomWidth: 1, marginTop: 12, alignItems: 'center' }}>
          <View style={{ marginEnd: 7, marginBottom: 9 }} >
            <SvgSelector name={"assignedTask"} w={AppUtil.getWP(5)} h={AppUtil.getWP(5)} />
          </View>
          <Text style={{ fontWeight: '600', color: activeColors.color }}>Assigned Task List</Text>
        </TouchableOpacity>

        {/*  ProjectList */}
        <TouchableOpacity onPress={handleProjectTask} style={{ flexDirection: 'row', borderBottomWidth: 1, marginTop: 12, alignItems: 'center' }}>
          <View style={{ marginEnd: 7, marginBottom: 9 }} >
            <SvgSelector name={"projectList"} w={AppUtil.getWP(5)} h={AppUtil.getWP(5)} />
          </View>
          <Text style={{ fontWeight: '600', color: activeColors.color }}>Project List</Text>
        </TouchableOpacity>

        {/* CheckIn/CheckOut */}
        <TouchableOpacity onPress={handleCheckIn} style={{ flexDirection: 'row', borderBottomWidth: 1, marginTop: 12, alignItems: 'center' }}>
          <View style={{ marginEnd: 7, marginBottom: 9 }} >
            <SvgSelector name={"checkIn"} w={AppUtil.getWP(5)} h={AppUtil.getWP(5)} />
          </View>
          <Text style={{ fontWeight: '600', color: activeColors.color }}>CheckIn/CheckOut</Text>
        </TouchableOpacity>

        {/* Company */}
        <TouchableOpacity onPress={handleCompanyView} style={{ flexDirection: 'row', borderBottomWidth: 1, marginTop: 12, alignItems: 'center' }}>
          <View style={{ marginEnd: 7, marginBottom: 9 }} >
            <SvgSelector name={"company"} w={AppUtil.getWP(5)} h={AppUtil.getWP(5)} />
          </View>
          <Text style={{ fontWeight: '600', color: activeColors.color }}>Company</Text>
        </TouchableOpacity>

        {/* Branch */}
        <TouchableOpacity onPress={handleBranchView} style={{ flexDirection: 'row', borderBottomWidth: 1, marginTop: 12, alignItems: 'center' }}>
          <View style={{ marginEnd: 7, marginBottom: 9 }} >
            <SvgSelector name={"branch"} w={AppUtil.getWP(5)} h={AppUtil.getWP(5)} />
          </View>
          <Text style={{ fontWeight: '600', color: activeColors.color }}>Branch</Text>
        </TouchableOpacity>

        {/* Change Theme */}
        <TouchableOpacity style={{ flexDirection: 'row', borderBottomWidth: 1, marginTop: 12, alignItems: 'center' }}>
          <View style={{ marginEnd: 7, marginBottom: 9 }} >
            <SvgSelector name={"theme"} w={AppUtil.getWP(5)} h={AppUtil.getWP(5)} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: '600', color: activeColors.color }}>Change Theme</Text>

          </View>
          <View style={{}}>
            <Switch value={themeEnabled} onValueChange={handleChangeTheme} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={{flexDirection:'row',borderBottomWidth:1,marginTop:12,alignItems:'center'}}>
          <View style={{marginEnd:7,marginBottom:9}} >
        <SvgSelector  name={"logout"} w={AppUtil.getWP(5)} h={AppUtil.getWP(5)}/>
        </View>
          <Text style={{fontWeight:'600'}}>Logout</Text>
        </TouchableOpacity>
      
      </ScrollView>
    </View>
  );
};
