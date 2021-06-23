import { firestore } from "../../firebase";

export function normalizeFetchedData(dbResponce) {
  const result = dbResponce.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .sort(
      (firstItem, secondItem) => firstItem.timestamp - secondItem.timestamp
    );

  return result;
}

export function getMessageCollection(chatID) {
  return firestore.collection("chats").doc(chatID).collection("messages");
}

export function getMessagesCollectionSnapshot(chatID, setFunction) {
  return getMessageCollection(chatID).onSnapshot((querySnapshot) => {
    const result = normalizeFetchedData(querySnapshot);
    setFunction(result);
  });
}
