import { StyleSheet } from "react-native";

export function styles(isLoggedUser) {
  return StyleSheet.create({
    messageContainer: {
      //   flexDirection: "row",
      marginBottom: 5,
      marginHorizontal: 10,
      alignItems: isLoggedUser ? "flex-end" : "flex-start",
      marginTop: 5,
    },

    textContainer: {
      maxHeight: "100%",
      maxWidth: "60%",
      backgroundColor: isLoggedUser ? "#e6e6e6" : "#2b68e6",
      //   marginVertical: 5,
      borderRadius: 10,
      padding: 15,
      marginHorizontal: isLoggedUser ? 5 : null,
      marginLeft: isLoggedUser ? null : 15,
      marginRight: isLoggedUser ? 15 : null,
    },
    text: {
      fontSize: 15,
      paddingHorizontal: 10,
      marginLeft: 5,
      color: isLoggedUser ? "#000" : "#fff",
      marginBottom: 5,
    },
    caption: {
      color: "#fff",
      fontSize: 10,
    },
    avatar: {
      marginTop: -15,
      alignSelf: isLoggedUser ? null : "flex-start",
      //   marginHorizontal: isLoggedUser ? null : 5,
    },
  });
}
