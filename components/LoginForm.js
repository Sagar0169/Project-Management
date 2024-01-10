import { View, Alert, StyleSheet } from "react-native";

import { useState } from "react";
import Input from "./Input";

function LoginForm() {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  function onChangeText(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
    }
  }
  const [isChecked, setChecked] = useState(false);

  // const handleToggle = () => {
  //     setChecked(!isChecked);
  // };
  return (
    <View>
      <View>
        <Input
          label="Email Id"
          secure={false} onUpdateValue={onChangeText.bind(this, "email")}
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
    </View>
  );
}
export default LoginForm;
const styles = StyleSheet.create({});
