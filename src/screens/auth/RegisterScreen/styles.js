import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    marginTop: 30,
  },
  inputContainer: {
    width: 300,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200,
    marginTop: 30,
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
    backgroundColor: "white",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "center",
  },
});

export default styles;
