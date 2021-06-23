import React from "react";

import { View, Text } from "react-native";

import { Avatar } from "react-native-elements";

import { styles } from "./styles";

function ChatDialogItem(props) {
  const { message, currentUser } = props;

  const isLoggedUser = currentUser.email === message.item.email;

  const { messageContainer, textContainer, text, caption, avatar } =
    styles(isLoggedUser);

  return (
    <View style={messageContainer}>
      <View style={textContainer}>
        <Text style={text}>{message.item.message}</Text>
        {!isLoggedUser && (
          <Text style={caption}>{message.item.displayName}</Text>
        )}
      </View>
      <Avatar
        containerStyle={avatar}
        rounded
        size={30}
        source={{
          uri: message?.item?.photoURL,
        }}
      />
    </View>
  );
}

export default React.memo(ChatDialogItem);
