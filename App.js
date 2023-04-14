import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,LogBox} from 'react-native';
//import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import LoadingScreen from "./screens/LoadingScreen";
import Login from "./screens/Login";
import Register from "./screens/Register";
import OnboardingScreen from "./screens/OnboardingScreen";
import DrawerNavigator from "./navigation/DrawerNavigator";

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
 " Key cancelled in the image picker result is deprecated and will be removed in SDK 48, use canceled instead",
]);
const Stack = createStackNavigator();
const StackNav = () => {
  return(
  <Stack.Navigator initialRouteName="LoadingScreen"  screenOptions={{
    headerShown: false,
    gestureEnabled: false
  }}>
     <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
     <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
   
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
  </Stack.Navigator>)
}


export default function App() {
  return (
    <NavigationContainer>
    <StackNav />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
