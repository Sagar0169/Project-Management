import { Alert, Dimensions, Platform } from 'react-native';
// import { StringUtil } from './StringUtil';
// const Loader = require('../../App');

// const _baseURL = 'http://dhulayi.php-staging.com/apiv1/';
// const _userProfile =  "noData";
// let isLoding = false;

export const AppUtil = {

  // onLoding: (value: Boolean) => {
  //   isLoding = value;
  //   Loader.onLoding(value);
  // },

  getWP: (percentage) => {
    const { width: viewportWidth } = Dimensions.get('window');
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  },

  getHP: (percentage) => {
    const { height: viewportHeight } = Dimensions.get('window');
    const value = (percentage * viewportHeight) / 100;
    return Math.round(value);
  },

  // setUserProfile: (value) => {
  //   if (value != "" && value != undefined)
  //     _userProfile = value;
  //   else
  //     _userProfile = "";
  // },
  // getUserProfile: () => {
  //   return _userProfile;
  // }

}

export const inputFieldHight = AppUtil.getHP(5.63)
export const hederHeight = AppUtil.getHP(7)
export const buttonHeight = AppUtil.getHP(6.14)
export const buttonFontSize = AppUtil.getHP(2.5)
export const headerFontSize = AppUtil.getHP(2.7)
export const buttonBorderRadius = 5

// export const getBaseURL = () => {
//   return _baseURL;
// }

export const showMessageWithCallBack = (message, callBack) => {
  if (Platform.OS == 'ios') {
      Alert.alert(message, null,
          [
              { text: 'OKAY', onPress: () => { callBack() } },
          ]);
  } else {
      Alert.alert(null, message,
          [
              { text: 'OKAY', onPress: () => { callBack() } },
          ]);
  }
}

export const showMessageWithAnotherCallBack = (message, callBack) => {
  if (Platform.OS == 'ios') {
      Alert.alert(message, null,
          [
              { text: StringUtil.getString(64), onPress: () => { callBack("CANCEL") } },
              { text: StringUtil.getString(65), onPress: () => { callBack() } },
          ]);
  } else {
      Alert.alert(null, message,
          [
              { text: Label.NO, onPress: () => { callBack("CANCEL") } },
              { text: Label.YES, onPress: () => { callBack() } },
          ]);
  }
}






