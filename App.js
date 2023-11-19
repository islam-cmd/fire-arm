import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { AuthProvider } from "./src/provider/AuthProvider";
import { ThemeProvider } from "react-native-rapi-ui";
import { LogBox, StyleSheet, Text, View } from "react-native";
import * as SplashScreen from 'expo-splash-screen';


// Prevent native splash screen from auto-hiding before App component declaration
SplashScreen.preventAutoHideAsync()
  .then(result => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
  .catch(console.warn);

// LogBox.ignoreLogs([
//   "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
// ]);
LogBox.ignoreAllLogs();


export default class App extends React.Component {
  // const images = [
  //   require("./assets/icon.png"),
  //   require("./assets/splash.png"),
  //   require("./assets/login.png"),
  //   require("./assets/register.png"),
  //   require("./assets/forget.png"),
  // ];

  componentDidMount() {
    setTimeout(async () => {await SplashScreen.hideAsync();}, 500); // Hide splash screen
  }

  render() {
    return (
      <ThemeProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </ThemeProvider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#aabbcc',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
