import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomePage from "../pages/HomePage.js";
import CartPage from "../pages/CartPage.js";
import SubjectsPage from "../pages/SubjectsPage.js";

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerStyle: {
        backgroundColor: "#9AC4F8",
    },
    headerTintColor: "white",
    headerBackTitle: "Back"
};

const MainStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Home" component={HomePage} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

const SubjectStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Subject" component={SubjectsPage} />
        </Stack.Navigator>
    );
}

const CartStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name="Cart" component={CartPage} />
        </Stack.Navigator>
    );
}

export { MainStackNavigator, CartStackNavigator, SubjectStackNavigator };