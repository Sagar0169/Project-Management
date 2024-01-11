import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'


function Input({
  label,
  editable,
  onFocus,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) {
  const [isPasswordVisible, setPasswordVisible] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  return (
    <View style={styles.inputContainer}>
      <TextInput
        editable={editable}
        style={[styles.input, isInvalid && styles.inputInvalid]}
        keyboardType={keyboardType}
        secureTextEntry={secure ? isPasswordVisible :!isPasswordVisible}
        placeholder={label}
        onChangeText={onUpdateValue}
        value={value}
      />
      {secure && (
        <TouchableOpacity style={{marginEnd:10}} onPress={togglePasswordVisibility}>
          <Ionicons
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      )}
    
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth:2,
    borderColor:'black',
    borderRadius:10,
    justifyContent:'space-between',
    marginVertical: 8,
    backgroundColor:'white',
    flexDirection: 'row', // Add this line to align items horizontally
    alignItems: 'center', 
  },
  label: {
    color: 'white',
    marginBottom: 4,
  },
  labelInvalid: {
    color: 'red',
  },
  input: {
    flex:1,
    borderRadius:10,
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderBottomColor:'#DCDCDC',
    fontSize: 16,
    color:'black',
   
  },
  inputInvalid: {
    backgroundColor: 'red',
  },
});
