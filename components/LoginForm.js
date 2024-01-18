import React, { useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import Input from "./Input";
import SubmitButton from "./ui/SubmitButton";
import { Colors } from "../Utilities/Colors";

function LoginForm({ onSubmit }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

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

  const  handleFormSubmit = () => {
    onSubmit(enteredEmail, enteredPassword);
  };

  return (
    <View>
      <View>
        <Input
          label="Email Id"
          secure={false}
          onUpdateValue={onChangeText.bind(this, "email")}
          value={enteredEmail}
        />
      </View>
      <View>
        <Input
          label="Password"
          secure={true}
          onUpdateValue={onChangeText.bind(this, "password")}
          value={enteredPassword}
        />
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
              <Text style={{ fontSize: 16 }}>Forget Password?</Text>
            </View>
          </Pressable>
        </View>
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <SubmitButton onPress={handleFormSubmit} color={Colors.black}>
            SUBMIT
          </SubmitButton>
        </View>
    </View>
  );
}

export default LoginForm;
