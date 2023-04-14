import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";
import YourContent from "../screens/YourContent";
import CustomDrawer from "../screens/CustomDrawer";
import Logout from '../screens/Logout';
import TabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator  drawerContent={props => <CustomDrawer {...props} />}
    screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: '#1c0f24',
      drawerActiveTintColor: "white",
      drawerInactiveTintColor: "black",
      drawerLabelStyle: {
        fontSize: 17,
      },}}>
      <Drawer.Screen name="Home" component={TabNavigator} />

      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Content" component={YourContent} />
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
