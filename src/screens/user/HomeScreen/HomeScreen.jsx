import React, { useEffect, useState, useCallback } from "react";

import {
  SafeAreaView,
  FlatList,
  Text,
  ActivityIndicator,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { screenOptions } from "./screenOptions";

import { CustomListItem } from "../../../components/CustomListItem";

import { firestore } from "../../../../firebase";

import { normalizeFetchedData } from "../../../helpers/getMessagesCollection";

export function HomeScreen(props) {
  const { navigation } = props;

  const [currentChats, setCurrentChats] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectChathandler = useCallback(
    function (chatID, chatName) {
      navigation.navigate("Chat", { chatID, chatName });
    },
    [navigation]
  );

  useEffect(() => {
    navigation.setOptions(screenOptions(navigation));
  }, []);

  useEffect(() => {
    const unsubscribeOnSnapshot = firestore
      .collection("chats")
      .onSnapshot((querySnapshot) => {
        const chats = normalizeFetchedData(querySnapshot);
        setLoading(false);
        setCurrentChats(chats);
      });
    return unsubscribeOnSnapshot;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={100} color="#2288dc" />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: "100%",
        paddingBottom: 10,
        alignItems: currentChats.length ? null : "center",
        justifyContent: currentChats.length ? null : "center",
      }}
    >
      <StatusBar style="dark" />
      {currentChats.length ? (
        <FlatList
          data={currentChats}
          renderItem={(chatItem) => (
            <CustomListItem
              chatName={chatItem.item.chatName}
              chatID={chatItem.item.id}
              selectChat={selectChathandler}
            />
          )}
        ></FlatList>
      ) : (
        <Text>No chats were cretead. You can create first one</Text>
      )}
    </SafeAreaView>
  );
}
