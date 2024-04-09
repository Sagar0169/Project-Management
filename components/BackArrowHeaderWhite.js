import React, { useContext, useState } from "react";
import { View, Text, Pressable, Image, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useSearch } from "../store/search-redux";
import { colors } from "./config/theme";
import { ThemeContext } from "../context/ThemeContext";

export default function BackArrowHeaderWhite({
  title,
  backButton,
  showArrow,
  showDelete,
  searchTitle,
  showSearch,
  color,
  deleteCall,
}) {
  const { searchQuery, setSearchQuery } = useSearch();
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  return (
    <LinearGradient
      style={{
        paddingVertical: 20,
        paddingHorizontal: 16,
        zIndex: 1,
      }}
      colors={[activeColors.background, activeColors.background]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          {showArrow ? null : (
            <Pressable
              onPress={backButton}
              hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <Image
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: "cover",
                  tintColor:activeColors.color,
                }}
                source={require("../assets/Images/left.png")}
              />
            </Pressable>
          )}
        </View>

        <Text
          style={{
            fontSize: 24,
            color: activeColors.color,
            fontWeight: "bold",
            textAlign: "center",
            marginHorizontal: 8,
            
          }}
        >
          {title}
        </Text>
        <View>
          {showDelete ? (
            <Pressable
              onPress={deleteCall}
              hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <Ionicons
                name="trash-outline"
                style={{ width: 20, height: 20, marginTop: 2, marginStart: 5 }}
                size={20}
                color="black"
              />
            </Pressable>
          ) : null}
        </View>
      </View>
      {showSearch ? null : (
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: "3%",
            backgroundColor: activeColors.blackBgg,
            marginBottom: 2,
            borderRadius: 30,
            padding: 8,
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 20,
            zIndex: 2,
          }}
        >
          <TextInput
            placeholder={`Search The ${searchTitle} Name`}
            placeholderTextColor={activeColors.inputbg}
            style={{ flex: 1, marginHorizontal: 6 }}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <Ionicons
            name="search"
            style={{ width: 20, height: 20, marginTop: 2, marginStart: 5 }}
            size={15}
            color="white"
          />
        </View>
      )}
    </LinearGradient>
  );
}
