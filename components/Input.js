import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'


function Input({
  label,
  editable,
  onFocus,
  numberOfLines,
  multiline,
  keyboardType,
  secure,
  onChangeText,
  
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
      numberOfLines={numberOfLines}
      multiline={multiline}
        editable={editable}
        style={[styles.input, isInvalid && styles.inputInvalid]}
        keyboardType={keyboardType}
        secureTextEntry={secure ? isPasswordVisible :!isPasswordVisible}
        placeholder={label}
        onChangeText={onChangeText}
        value={value}
      />
      {secure && (
        <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
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
    borderWidth:1,
    borderColor:'#8A96D3',
    borderRadius:1,
    marginVertical: 8,
    backgroundColor:'#E9EEFF',
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
    
    
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: '#E9EEFF',
    borderBottomColor:'#DCDCDC',
    fontSize: 16,
    color:'black',
    width:'100%'
  },
  inputInvalid: {
    backgroundColor: 'red',
  },
});
