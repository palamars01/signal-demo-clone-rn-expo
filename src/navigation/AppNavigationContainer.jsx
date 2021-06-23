import React, { useEffect, useState } from "react";

import { View, ActivityIndicator } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { AuthStackNavigator } from "./stackNavigators/AuthStackNavigator";
import { UserStackNavigator } from "./stackNavigators/UserStackNavigator/UserStackNavigator";

import { auth } from "../../firebase";

export function AppNavigationContainer() {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={100} color="#2288dc" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!isAuth && <AuthStackNavigator />}
      {isAuth && <UserStackNavigator />}
    </NavigationContainer>
  );
}
