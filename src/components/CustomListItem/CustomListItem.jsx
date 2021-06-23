import React, { useLayoutEffect, useState } from "react";

import { ListItem, Avatar } from "react-native-elements";

import { getMessagesCollectionSnapshot } from "../../helpers/getMessagesCollection";

function CustomListItem(props) {
  const { chatID, chatName, selectChat } = props;

  const [allMessages, setAllMessages] = useState([]);

  let lastMessagePhotoURL;
  let lastMessageText;
  if (allMessages.length) {
    lastMessagePhotoURL = allMessages[allMessages.length - 1]["photoURL"];
    lastMessageText = allMessages[allMessages.length - 1]["message"];
  }

  useLayoutEffect(() => {
    const unsubscribe = getMessagesCollectionSnapshot(chatID, setAllMessages);
    return unsubscribe;
  }, [chatID]);

  return (
    <ListItem
      style={{ marginTop: 10, width: "95%", alignSelf: "center" }}
      onPress={() => selectChat(chatID, chatName)}
    >
      <Avatar
        containerStyle={{ backgroundColor: "#ccc" }}
        rounded
        size="small"
        title="S"
        source={
          allMessages.length
            ? {
                uri: lastMessagePhotoURL,
              }
            : null
        }
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {lastMessageText || "Empty chat"}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}

export default React.memo(CustomListItem);
