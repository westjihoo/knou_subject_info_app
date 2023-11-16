import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator.js";
import { StatusBar } from "expo-status-bar";

export default function App() {

	console.disableYellowBox = true;

	return (
		<NavigationContainer>
			<StatusBar style="auto" />
			<BottomTabNavigator />
		</NavigationContainer>
	);
}