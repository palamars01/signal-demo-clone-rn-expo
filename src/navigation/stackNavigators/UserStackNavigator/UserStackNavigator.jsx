import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen, AddChatScreen, ChatScreen } from "../../../screens/user";

import { screenOptions } from "./screenOptions";

const UserStack = createStackNavigator();

export function UserStackNavigator(props) {
  return (
    <UserStack.Navigator screenOptions={screenOptions}>
      <UserStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Signal",
        }}
      />
      <UserStack.Screen
        name="AddChat"
        component={AddChatScreen}
        options={{
          title: "Add New Chat",
          headerStyle: {
            backgroundColor: "#2492e9",
          },
          headerTitleStyle: {
            color: "#fff",
            alignItems: "center",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
        }}
      />
      <UserStack.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          headerStyle: {
            backgroundColor: "#2492e9",
          },
          headerTitleStyle: {
            color: "#fff",
            alignItems: "center",
          },
          headerTintColor: "#fff",
        }}
      />
    </UserStack.Navigator>
  );
}
