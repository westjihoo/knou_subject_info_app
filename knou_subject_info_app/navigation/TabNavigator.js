import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainStackNavigator, CartStackNavigator, SubjectStackNavigator } from "./StackNavigator.js";
import { AntDesign } from '@expo/vector-icons';

const TabIcon = ({ name, size, color }) => {
    return <AntDesign name={name} size={size} color={color} />;
};

const Tab = createBottomTabNavigator();

const screenOptionStyle = {
    headerShown: false,
    tabBarShowLabel: false
}

const BottomTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={screenOptionStyle}
        >
            <Tab.Screen
                name="HomeTab"
                component={MainStackNavigator}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: props => TabIcon({ ...props, name: 'home' }),
                }} />
            <Tab.Screen
                name="SubjectTab"
                component={SubjectStackNavigator}
                options={{
                    tabBarLabel: 'Subject',
                    tabBarIcon: props => TabIcon({ ...props, name: 'filter' }),
                }} />
            <Tab.Screen
                name="CartTab"
                component={CartStackNavigator}
                options={{
                    tabBarLabel: 'Cart',
                    tabBarIcon: props => TabIcon({ ...props, name: 'folder1' }),
                }} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;