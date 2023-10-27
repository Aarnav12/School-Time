import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';

import Feed from "../screens/Feed";
import CreatePost from "../screens/CreatePost";



const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator({route}){


   
        return (
            <Tab.Navigator
                barStyle={ styles.bottomTabStyle}
                screenOptions={({ route }) => ({
                    headerShown: false,
                   
                    tabBarIcon: ({ focused }) => {
                        let iconName;
                        if (route.name === "Dashboard") {
                            iconName = focused ? "home" : "home-outline";
                        } else if (route.name === "Add Post") {
                            iconName = focused ? "add-circle" : "add-circle-outline";
                        }
                        return (
                            <Ionicons
                                name={iconName}
                                size={25}
                                color='#6d6b6e'
                                style={styles.icons}
                                
                            />
                        );
                    }
                })}
            >
                <Tab.Screen name="Dashboard" component={Feed} options={{ unmountOnBlur: true }} />
                 <Tab.Screen name="Add Post" component={CreatePost} options={{ unmountOnBlur: true }} /> 
            </Tab.Navigator>
        );
    
}

const styles = StyleSheet.create({
    bottomTabStyle: {
        backgroundColor: "#190f1f",
        height: "8%",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        overflow: "hidden",
        position: "absolute",
        alignSelf:'center'
    },
 
    icons: {
        width: 25,
        height: 25,
        
    }
});