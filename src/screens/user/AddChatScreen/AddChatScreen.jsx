import React, { useEffect, useState } from "react";

import { View, Alert } from "react-native";

import { Input, Button } from "react-native-elements";

import { styles } from "./styles";
const { screen } = styles;

import { firestore } from "../../../../firebase";

import { customBackArrow } from "../../../helpers/customBackArrow";

import { AntDesign } from "@expo/vector-icons";

import { StatusBar } from "expo-status-bar";

export function AddChatScreen(props) {
  const { navigation } = props;

  const [chatNameInputValue, setChatNameInputValue] = useState("");

  async function handleCreateChat() {
    if (chatNameInputValue.trim()) {
      try {
        await firestore.collection("chats").add({
          chatName: chatNameInputValue,
          timestamp: Date.now(),
        });

        navigation.goBack();
      } catch (error) {
        Alert.alert("Something goes wrong", `${error.message}`, [
          {
            text: "Okay",
          },
        ]);
        console.log("CREATE CHAT ERROR = ", error.message);
      }
    } else {
      Alert.alert(
        "Check chat name field",
        "Name field need to contain a characters",
        [
          {
            text: "Okay",
          },
        ]
      );
    }
  }

  useEffect(() => {
    navigation.setOptions(customBackArrow("#fff"));
    return () => setChatNameInputValue("");
  }, []);

  return (
    <View style={screen}>
      <StatusBar style="light" />
      <Input
        placeholder="Enter a chat name"
        value={chatNameInputValue}
        onChangeText={setChatNameInputValue}
        leftIcon={<AntDesign name="wechat" size={24} color="black" />}
      />
      <Button title="Craete New Chat" onPress={handleCreateChat} />
    </View>
  );
}
