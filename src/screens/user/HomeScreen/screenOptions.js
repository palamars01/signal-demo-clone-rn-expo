import React from "react";

import { View, TouchableNativeFeedback, Platform } from "react-native";

import { Avatar } from "react-native-elements";

import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

import { auth } from "../../../../firebase";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { CustomHeaderButton } from "../../../components/CustomHeaderButton";

async function signOutHandler() {
  await auth.signOut();
}

export function screenOptions(navigation) {
  return {
    headerLeft: () => (
      <View style={{ marginLeft: 23, borderRadius: 50 }}>
        <TouchableNativeFeedback
          useForeground
          background={TouchableNativeFeedback.Ripple(
            "rgba(0, 0, 0, 0.4)",
            true,
            30
          )}
          onPress={signOutHandler}
        >
          <Avatar
            rounded
            source={{
              uri: auth?.currentUser?.photoURL,
            }}
            imageProps={{ resizeMode: "contain" }}
          />
        </TouchableNativeFeedback>
      </View>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="camera"
          iconName="camerao"
          IconComponent={AntDesign}
          iconSize={24}
        />
        <Item
          title="edit"
          iconName="pencil"
          IconComponent={SimpleLineIcons}
          iconSize={21}
          onPress={() => navigation.navigate("AddChat")}
        />
      </HeaderButtons>
    ),
  };
}
