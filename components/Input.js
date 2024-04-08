import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { useState,useContext } from 'react';
import { Ionicons } from '@expo/vector-icons'
import { ThemeContext } from '../context/ThemeContext';
import { colors } from './config/theme';


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
  const {theme}=useContext(ThemeContext)
let activeColors=colors[theme.mode]
  const [isPasswordVisible, setPasswordVisible] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };
  return (
    <View style={[styles.inputContainer,{borderColor:activeColors.blackBg,}]}>
      <TextInput
      numberOfLines={numberOfLines}
      multiline={multiline}
        editable={editable}
        style={[styles.input, isInvalid && styles.inputInvalid,{backgroundColor:activeColors.inputBg,color:activeColors.color}]}
        keyboardType={keyboardType}
        secureTextEntry={secure ? isPasswordVisible :!isPasswordVisible}
        placeholder={label}
        placeholderTextColor={activeColors.color}
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
    
    borderRadius:1,
    marginVertical: 8,
   
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
  
    borderBottomColor:'#DCDCDC',
    fontSize: 16,
    
    width:'100%'
  },
  inputInvalid: {
    backgroundColor: 'red',
  },
});
