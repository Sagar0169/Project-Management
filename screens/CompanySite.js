import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { StyleSheet } from 'react-native';

export default function CompanySite() {
  return (
    <WebView
      style={styles.container}
      source={{ uri: 'https://www.silvertouch.com/company-overview/' }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
