import "react-native-gesture-handler";

import React from "react";

import { StatusBar } from "expo-status-bar";

import { AppNavigationContainer } from "./src/navigation/AppNavigationContainer";

export default function App() {
  return (
    <>
      <AppNavigationContainer />
      <StatusBar style="light" />
    </>
  );
}
