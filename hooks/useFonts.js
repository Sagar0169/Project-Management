import * as Font from 'expo-font';

const useFonts = async () => {
  return await Font.loadAsync({
    sanFrancisco: require('../assets/fonts/sfd.ttf'),
    poppins: require('../assets/fonts/poppinsregular.ttf'),
    poppinsemi: require('../assets/fonts/poppinsemibold.ttf'),
   
  });
};

export default useFonts;
