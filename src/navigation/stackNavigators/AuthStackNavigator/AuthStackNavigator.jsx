import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../../../screens/auth/LoginScreen";
import { RegisterScreen } from "../../../screens/auth/RegisterScreen";

import { screenOptions } from "./screenOptions";

const AuthStack = createStackNavigator();

export function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={screenOptions}>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Login",
        }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: "Register",
        }}
      />
    </AuthStack.Navigator>
  );
}
