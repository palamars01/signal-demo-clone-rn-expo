import React from "react";

import { View, Text } from "react-native";

import { Avatar } from "react-native-elements";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { CustomHeaderButton } from "../../../components/CustomHeaderButton";

import { customBackArrow } from "../../../helpers/customBackArrow";

import { Ionicons, FontAwesome } from "@expo/vector-icons";

export function screenOptions(chatName, uri, isEmptyChat) {
  return {
    ...customBackArrow("#fff"),
    headerTitleAlign: "left",
    headerTitle: () => (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: -10,
        }}
      >
        <Avatar
          containerStyle={{ backgroundColor: "#ccc" }}
          rounded
          size="small"
          title="S"
          source={
            isEmptyChat
              ? {
                  uri,
                }
              : null
          }
        />
        <Text
          style={{
            color: "#fff",
            marginLeft: 10,
            fontWeight: "700",
            fontSize: 16,
          }}
        >
          {chatName}
        </Text>
      </View>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="camera"
          iconName="video-camera"
          IconComponent={FontAwesome}
          iconSize={21}
          color="#fff"
        />
        <Item
          title="edit"
          iconName="call"
          IconComponent={Ionicons}
          iconSize={20}
          color="#fff"
        />
      </HeaderButtons>
    ),
  };
}
