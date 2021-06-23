import React, { useEffect, useState, useLayoutEffect, useRef } from "react";

import {
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  Text,
  FlatList,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { StatusBar } from "expo-status-bar";

import { HeaderButtons as Button, Item } from "react-navigation-header-buttons";
import { CustomHeaderButton } from "../../../components/CustomHeaderButton";

import { screenOptions } from "./screenOptions";

import { auth } from "../../../../firebase";

import { ChatDialogItem } from "../../../components/ChatDialogItem";

import {
  getMessageCollection,
  getMessagesCollectionSnapshot,
} from "../../../helpers/getMessagesCollection";

import { styles } from "./styles";
const { screen, container, footer, textInput } = styles;

export function ChatScreen(props) {
  const { navigation, route } = props;
  const { chatName, chatID } = route.params;

  const [allMessages, setAllMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const screenHeight = Dimensions.get("screen")["height"];
  const currentUser = auth.currentUser;

  let lastMessageUserPhotoURI;
  if (allMessages.length) {
    lastMessageUserPhotoURI = allMessages[allMessages.length - 1].photoURL;
  }

  const flatListRef = useRef();

  function sendMessageHandler() {
    Keyboard.dismiss();

    if (!inputMessage) return;

    getMessageCollection(chatID).add({
      timestamp: Date.now(),
      message: inputMessage,
      displayName: currentUser.displayName,
      email: currentUser.email,
      photoURL: currentUser.photoURL,
    });

    if (allMessages.length * 120 > screenHeight) {
      flatListRef.current.scrollToIndex({
        index: allMessages.length - 1,
      });
    }

    setInputMessage("");
  }

  useEffect(() => {
    navigation.setOptions(
      screenOptions(chatName, lastMessageUserPhotoURI, !!allMessages.length)
    );
  }, [lastMessageUserPhotoURI]);

  useLayoutEffect(() => {
    const unsubscribe = getMessagesCollectionSnapshot(chatID, setAllMessages);
    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={screen}>
      <StatusBar style="light" auto />
      <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={70}
        style={container}
      >
        <>
          <FlatList
            ref={flatListRef}
            data={allMessages}
            style={{
              flex: 1,
              width: "100%",
              paddingBottom: 10,
            }}
            renderItem={(message) => (
              <ChatDialogItem message={message} currentUser={currentUser} />
            )}
            ListEmptyComponent={
              <Text style={{ textAlign: "center", marginTop: "50%" }}>
                No messaged yet. Start to typing
              </Text>
            }
            initialScrollIndex={
              allMessages.length * 120 > screenHeight
                ? allMessages.length - 1
                : null
            }
            getItemLayout={(data, index) => {
              return {
                length: 120,
                offset: 120 * index,
                index,
              };
            }}
          />
          <View style={footer}>
            <TextInput
              style={textInput}
              placeholder="Signal message"
              onChangeText={setInputMessage}
              value={inputMessage}
              onSubmitEditing={sendMessageHandler}
            />
            <Button HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="send"
                iconName="send"
                IconComponent={Ionicons}
                iconSize={30}
                color="#2492e9"
                onPress={sendMessageHandler}
              />
            </Button>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
