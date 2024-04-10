import React, { useState, useEffect } from "react";
import {
  Button,
  Pressable,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Input from "./Input";
import SubmitButton from "./ui/SubmitButton";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../Utilities/Colors";
import { TextInput } from "react-native-paper";
import { colors } from "./config/theme";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";



function LoginForm({ onSubmit }) {
  const {theme}=useContext(ThemeContext)
  let activeColors=colors[theme.mode]
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const onChangeText = (inputType, enteredValue) => {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
    }
  };

  const handleFormSubmit = () => {
    onSubmit(enteredEmail, enteredPassword);
  };

  return (
    <View>
      <View>
        <Text style={{ color: activeColors.hint, fontSize: 15 }}>Email Address</Text>
        <TextInput
          onChangeText={onChangeText.bind(this, "email")}
          value={enteredEmail}
          style={{
            underlineColorAndroid: "white",
            backgroundColor: activeColors.background,
            borderBottomColor: "#C4C4C4",
          }}
          textColor={activeColors.color}
          placeholder="abcd@gmail.com"
          placeholderTextColor="#C4C4C4"
        />
      </View>
      <View style={{ marginTop: 25}}>
        <Text style={{ color: activeColors.hint, fontSize: 15 }}>Password</Text>
        <View style={[styles.inputContainer,{backgroundColor:activeColors.background }]}>
          <TextInput
            secureTextEntry={isPasswordVisible}
            onChangeText={onChangeText.bind(this, "password")}
            value={enteredPassword}
            style={{
             flex:1,
              backgroundColor: activeColors.background,
              maxWidth: "100%",
              borderBottomColor: "#C4C4C4",             
            }}
            textColor={activeColors.color}
            placeholder="Password"
            placeholderTextColor="#C4C4C4"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={togglePasswordVisibility}
          >
            <Ionicons
              style={{ marginStart: -22 }}
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Pressable>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 16, color: activeColors.hint }}>
              Forget Password?
            </Text>
          </View>
        </Pressable>
      </View>
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <SubmitButton onPress={handleFormSubmit}>Login</SubmitButton>
      </View>
    </View>
  );
}

export default LoginForm;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "white",
    flexDirection: "row", // Add this line to align items horizontally
    alignItems: "center",
  },
  label: {
    color: "white",
    marginBottom: 4,
  },
  labelInvalid: {
    color: "red",
  },
  input: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: "white",
    borderBottomColor: "#DCDCDC",
    fontSize: 16,
    color: "black",
    width: "90%",
  },
  inputInvalid: {
    backgroundColor: "red",
  },
});
